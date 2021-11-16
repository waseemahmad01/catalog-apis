import express from "express";
import { auth, admin, favorite, notification, removeFavorite, uploads, } from "../../app";
const router = express.Router();

router.post("/notification", [auth, admin, uploads.single("image")], notification.notification);

router.get("/notification", [auth], notification.index);


export default router;
