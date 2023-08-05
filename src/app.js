import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DATABASE_URL } from "../config";
import errorHandler from "./middlewares/errorHandler";
import router from "./routes";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import WsConnect from "./events/wsManage";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || APP_PORT;

// middleware configurations
app.use(
  cors({
    // * for cookie transport *
    // origin: ["*"],
    // credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
app.use(errorHandler);
app.use("/uploads", express.static("uploads"));

// frontend app serving
app.use(express.static(path.join(__dirname, "../public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//mongoose setup
mongoose.set("strictQuery", false);
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Connection failed");
  });

//server configurations
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", WsConnect);

server.listen(port, () => {
  console.log(`Listening on port ${port} : process ${process.pid}`);
});
