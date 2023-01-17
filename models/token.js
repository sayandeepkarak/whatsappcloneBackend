import { model, Schema } from "mongoose";

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

const TokenModel = model("refreshToken", tokenSchema);

export default TokenModel;
