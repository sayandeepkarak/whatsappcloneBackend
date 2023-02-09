import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DATABASE_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import router from "./routes";
import cors from "cors";
import cluster from "cluster";
import http from "http";
import os from "os";
import { Server } from "socket.io";
import WsConnect from "./events/wsManage";
import { verifyAccessWs } from "./middlewares/auth";

const port = process.env.PORT || APP_PORT;
const app = express();
const server = http.createServer(app);

const cpuCors = os.cpus().length;

if (cluster.isPrimary) {
  //active all cors
  for (let i = 0; i < cpuCors; i++) {
    cluster.fork();
  }

  cluster.on("exit", () => cluster.fork());
} else {
  // express setup http
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api", router);
  app.use(errorHandler);
  app.use("/uploads", express.static("uploads"));

  //ws setup
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://whatsappclone-sayandeep18.netlify.app/authentication",
        "https://whatsappclone-sayandeep18.netlify.app/authentication",
      ],
    },
  });
  io.use(verifyAccessWs);
  io.on("connection", WsConnect);

  //mongoose setup
  mongoose.set("strictQuery", false);
  mongoose
    .connect(DATABASE_URL)
    .then(() => {
      server.listen(port, () =>
        console.log(`Listening on port ${port} : process ${process.pid}`)
      );
    })
    .catch((err) => {
      console.log("Connection failed");
      console.log(err);
    });
}
