import express from "express";
import deleteOtp from "../controllers/auth/deleteOtp";
import logout from "../controllers/auth/logout";
import refreshaccess from "../controllers/auth/refresh";
import sendOtp from "../controllers/auth/sendOtp";
import uploadUserDetails from "../controllers/auth/uploadDetails";
import verifyOtp from "../controllers/auth/verifyOtp";
import addPerson from "../controllers/chat/addPerson";
import allConnection from "../controllers/chat/allConnection";
import getChat from "../controllers/chat/getChats";
import getLastMessage from "../controllers/chat/getLastMessage";
import sendMessage from "../controllers/chat/sendMessage";
import getUserData from "../controllers/userData";
import getAllUsers from "../controllers/users";
import { verifyAccessHttp } from "../middlewares/auth";

const router = express.Router();

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.delete("/deleteOtp", deleteOtp);
router.post("/uploadDetails", uploadUserDetails);
router.post("/logout", logout);
router.get("/refresh", refreshaccess);
router.get("/userDetails", verifyAccessHttp, getUserData);
router.get("/users", getAllUsers);

router.post("/createConnection", verifyAccessHttp, addPerson);
router.get("/allConnection", verifyAccessHttp, allConnection);
router.get("/getChat", verifyAccessHttp, getChat);
router.post("/sendMessage", sendMessage);
router.get("/lastMessage", verifyAccessHttp, getLastMessage);

export default router;
