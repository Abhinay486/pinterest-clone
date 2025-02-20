import bcrypt from 'bcrypt'
import { User } from '../models/userModel.js';
import TryCatch from '../utils/TryCatch.js';
import generateToken from '../utils/generateToken.js'
export const registerUser = TryCatch(async(req, res) => {
    const {name, email, password} = req.body;

        let user = await User.findOne({email});

        if(user) return res.status(400).json({
            message : "Already registere"
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
})