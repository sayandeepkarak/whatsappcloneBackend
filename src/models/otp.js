import { model, Schema } from "mongoose";

const otpSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (value) => /^([a-zA-Z0-9.-]+)@gmail.com$/.test(value),
        message: "Please provide a valid email",
      },
      unique: true,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OtpModel = model("otp", otpSchema);

export default OtpModel;
