import mongoose from "mongoose";
import { DATABASE_URL } from "../config";

mongoose.set("strictQuery", false);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connection success");
  })
  .catch((err) => {
    console.log("Connection failed");
    console.log(err);
  });
