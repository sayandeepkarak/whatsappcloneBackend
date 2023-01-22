import { model, Schema } from "mongoose";

const chatSchema = new Schema(
  {
    users: {
      type: [String],
      required: true,
    },
    user_one: {
      userId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      photoUrl: {
        type: String,
        required: true,
      },
    },
    user_two: {
      userId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      photoUrl: {
        type: String,
        required: true,
      },
    },
    chats: [
      {
        sendBy: { type: String },
        message: { type: String },
      },
    ],
  },
  { timestamps: true }
);
const ChatModel = model("chat", chatSchema);

export default ChatModel;
