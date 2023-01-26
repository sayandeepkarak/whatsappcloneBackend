import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DATABASE_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import router from "./routes";
import cors from "cors";
import cluster from "cluster";
import os from "os";
const app = express();

const port = process.env.PORT || APP_PORT;

const cpuCors = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < cpuCors; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => cluster.fork());
} else {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api", router);
  app.use(errorHandler);
  app.use("/uploads", express.static("uploads"));

  mongoose.set("strictQuery", false);

  mongoose
    .connect(DATABASE_URL)
    .then(() => {
      app.listen(port, () =>
        console.log(`Listening on port ${port} : process ${process.pid}`)
      );
    })
    .catch((err) => {
      console.log("Connection failed");
      console.log(err);
    });
}
