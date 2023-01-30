import CustomError from "../../services/CustomError";
import ChatModel from "../../models/chat";

const getLastMessage = async (req, res, next) => {
  if (!req.query.chatId) {
    return next(CustomError.badRequest("missing paramaters"));
  }
  try {
    const lastMessage = await ChatModel.findById(req.query.chatId).select(
      "chats"
    );

    if (lastMessage.length === 0) {
      return res
        .status(204)
        .json({ status: false, message: "No chats available" });
    }

    lastMessage.chats.splice(0, lastMessage.chats.length - 1);

    res.status(200).json({ status: true, data: lastMessage });
  } catch (error) {
    console.log(error);
    next();
  }
};

export default getLastMessage;
