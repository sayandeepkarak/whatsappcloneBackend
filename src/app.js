import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DATABASE_URL } from "../config";
import errorHandler from "./middlewares/errorHandler";
import router from "./routes";
// import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import WsConnect from "./events/wsManage";
import path from "path";

const port = APP_PORT;
const app = express();
const server = http.createServer(app);

// app.use(cors());

// express setup http
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
app.use(errorHandler);
app.use("/uploads", express.static("uploads"));

//serve react-production
app.use(express.static(path.join(__dirname, "../public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//ws setup
const io = new Server(server);
io.on("connection", WsConnect);

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

server.listen(port, () =>
  console.log(`Listening on port ${port} : process ${process.pid}`)
);
