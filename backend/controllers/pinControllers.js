import TryCatch from "../utils/TryCatch.js";
import cloudinary from 'cloudinary'
import getDataUrl from "../utils/urlGenerator.js";
import {Pin} from "../models/pinModel.js"
export const createPin = TryCatch(async (req, res) => {
    const { title, pin } = req.body;
    const file = req.file;
    console.log(title, pin);
    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    if (!fileUrl.startsWith("data:")) {
        return res.status(400).json({ error: "Invalid file format" });
    }

    const cloud = await cloudinary.v2.uploader.upload(fileUrl, {
        folder: "pins",
    });

    await Pin.create({
        title,
        pin,
        image: {
            id: cloud.public_id,
            url: cloud.secure_url,
        },
        owner: req.user._id,
    });

    res.json({ message: "Pin created" });
});
export const getAllPins = TryCatch(async (req, res) => {
    const pins = await Pin.find().sort({createdAt: -1});

    res.json(pins);
})
export const getSinglepins = TryCatch(async (req, res) => {
    const pins = await Pin.findById(req.params.id).populate("owner", "-password");

    res.json(pins);
})

export const cmntonPin = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id);

    if(!pin) return res.status(400).json({
        message : "No pin with this id"
    })

    pin.comments.push({
        user : req.user._id,
        name : req.user.name,
        comment : req.body.comment,
    });

    await pin.save();

    res.json({
        message : "Comment Added",
    })
});



export const deleteComment = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id);

    if(!pin) return res.status(400).json({
        message : "No pin with this id"
    })

    if(!req.query.commentId) 
        return res.status(404).json({
        message : "Please give comment"
    });

    const commentIdx = pin.comments.findIndex(
        (item) => item._id.toString() === req.query.commentId.toString()
    );

    if(commentIdx == -1) 
        return res.status(404).json({
            message : "Comment not found",
    })

    const comment = pin.comments[commentIdx];

    if(comment.user.toString() == req.user._id.toString()) {
        pin.comments.splice(commentIdx, 1);

        await pin.save();

        return res.json({
            message : "Comment deleted",
        })
    }
    else {
        return res.status(403).json({
            message : "This comment doesn't belongs to you",
        })
    }
});

export const deletePin = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id);

    if(!pin) return res.status(400).json({
        message : "No pin with this id"
    })


    if(pin.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message : "Unauthorized",
        })
    }

    await cloudinary.v2.uploader.destroy(pin.image.id);

    await pin.deleteOne();

    res.json({
        message : "Pin deleted",
    })

});

export const updatePin = TryCatch(async(req, res) => {
    const pin = await Pin.findById(req.params.id);

    if(!pin) return res.status(400).json({
        message : "No pin with this id"
    })

    if(pin.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message : "Unauthorized",
        })
    }

    pin.title = req.body.title;
    pin.pin = req.body.pin;

    await pin.save();

    res.json({
        message : "Pin Updated",
    })

})
