import express from "express";
import { deleteOtp, sendOtp, verifyOtp } from "../controllers/login";

const router = express.Router();

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.delete("/deleteOtp", deleteOtp);

export default router;
