import express from "express";
import {isAuth} from "backend\middlewares\isAuth.js";
import { cmntonPin, createPin, getAllPins, getSinglepins } from "../controllers/pinControllers.js";
import uploadFile from "../middlewares/multer.js";
const router = express.Router();
router.post("/new", isAuth, uploadFile, createPin)
router.get("/all", isAuth, getAllPins);
router.get("/:id", isAuth, getSinglepins);
router.post("/comment/:id", isAuth, cmntonPin);


export default router;

