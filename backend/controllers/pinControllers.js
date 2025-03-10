import TryCatch from "../utils/TryCatch.js";
import cloudinary from 'cloudinary'
import getDataUrl from "../utils/urlGenerator.js";
import {Pin} from "../models/pinModel.js"
export const createPin = TryCatch(async (req, res) => {
    const { title, pin } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = getDataUrl(file).content;

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
})

