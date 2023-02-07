import { model, Schema } from "mongoose";

const userDetailsSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      validate: {
        validator: (value) => /^([a-zA-Z0-9.-]+)@gmail.com$/.test(value),
        message: "Please provide a valid email",
      },
      unique: true,
    },
    photoUrl: {
      type: String,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userDetailsSchema);

export default UserModel;
