import express from "express";
import deleteOtp from "../controllers/auth/deleteOtp";
import logout from "../controllers/auth/logout";
import refreshaccess from "../controllers/auth/refresh";
import sendOtp from "../controllers/auth/sendOtp";
import uploadUserDetails from "../controllers/auth/uploadDetails";
import verifyOtp from "../controllers/auth/verifyOtp";
import getUserData from "../controllers/userData";
import verifyAccess from "../middlewares/auth";

const router = express.Router();

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.delete("/deleteOtp", deleteOtp);
router.post("/uploadDetails", uploadUserDetails);
router.post("/logout", verifyAccess, logout);
router.post("/refresh", refreshaccess);
router.get("/userDetails", verifyAccess, getUserData);

export default router;
