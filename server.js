import express, { urlencoded } from "express";
import mongoose from "mongoose";
import { APP_PORT, DATABASE_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import router from "./routes";

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connection success");
  })
  .catch((err) => {
    console.log("Connection failed");
    console.log(err);
  });

const app = express();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
app.use(errorHandler);

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));
