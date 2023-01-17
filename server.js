import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DATABASE_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import router from "./routes";
import cors from "cors";
const app = express();

const port = process.env.PORT || APP_PORT;

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
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => {
    console.log("Connection failed");
    console.log(err);
  });
