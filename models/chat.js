import { model, Schema } from "mongoose";

const chatSchema = new Schema(
  {
    usersId: {
      type: [String],
      required: true,
    },
    users: {
      type: [
        {
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
      ],
      required: true,
    },
    chats: [
      {
        sendBy: { type: String },
        sendTime: { type: Date, default: Date.now() },
        message: { type: String },
      },
    ],
  },
  { timestamps: true }
);
const ChatModel = model("chat", chatSchema);

export default ChatModel;
