import bcrypt from 'bcrypt'
import { User } from '../models/userModel.js';
import TryCatch from '../utils/TryCatch.js';
import generateToken from '../utils/generateToken.js'
export const registerUser = TryCatch(async(req, res) => {
    const {name, email, password} = req.body;

        let user = await User.findOne({email});

        if(user) return res.status(400).json({
            message : "Already registered"
        });

        const hashPassword = await bcrypt.hash(password, 10)

        user = await User.create({
            name,
            email,
            password : hashPassword,
        })

        res.status(201).json({
            user,
            message : "User Registered",
        })
})
export const loginUser = TryCatch(async(req, res) => {
     const {email, password} = req.body;

     const user = await User.findOne({email})

     if(!user) {
        return res.status(400).json({
            message : "User not existed"
        })
     }
     generateToken(user._id, res);

     const comparePassword = await bcrypt.compare(password, user.password);

     if(!comparePassword) {
        return res.status(400).json({
            message : "Wrong Password"
        })
     }
     generateToken(user._id, res);
     res.json({
        user,
        message : "Logged In",
     })
})

export const myProfile = TryCatch(async(req, res) => {
    const user = await User.findById(req.user._id)
    
    res.json(user)
});

export const userProfile = TryCatch(async(req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    
    res.json(user)
});
export const followUnfollow = TryCatch(async (req, res) => {
    const { id } = req.params;
    const { _id: loggedInUserId } = req.user;

    if (id === loggedInUserId.toString()) {
        return res.status(400).json({ message: "You can't follow your own account" });
    }

    // Fetch both users concurrently
    const [user, loggedInUser] = await Promise.all([
        User.findById(id),
        User.findById(loggedInUserId)
    ]);

    if (!user) {
        return res.status(400).json({ message: "No user with this id" });
    }

    // Convert arrays to Sets for faster lookup
    const userFollowersSet = new Set(user.followers);
    const loggedInUserFollowingSet = new Set(loggedInUser.following);

    if (userFollowersSet.has(loggedInUserId)) {
        // Unfollow user
        user.followers = user.followers.filter(followerId => followerId.toString() !== loggedInUserId.toString());
        loggedInUser.following = loggedInUser.following.filter(followingId => followingId.toString() !== id);
        
        await Promise.all([user.save(), loggedInUser.save()]);

        return res.json({ message: "User Unfollowed" });
    }

    // Follow user
    user.followers.push(loggedInUserId);
    loggedInUser.following.push(id);

    await Promise.all([user.save(), loggedInUser.save()]);

    return res.json({ message: "User Followed" });
});


export const logOut = TryCatch(async(req, res) => {
    res.cookie("token", "", { maxAge : 0});

    res.json({
        message : "Logged Out Successfully",
    })
})