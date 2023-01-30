import ChatModel from "../../models/chat";
import CustomError from "../../services/CustomError";

const getChat = async (req, res, next) => {
  if (!req.query.chatId) {
    return next(CustomError.badRequest("missing parameters"));
  }
  try {
    const userChat = await ChatModel.findById(req.query.chatId).select("chats");
    //check chat exist
    if (userChat.length === 0) {
      return res
        .status(204)
        .json({ status: false, message: "No chats available" });
    }
    res.status(200).json({ status: true, data: userChat });
  } catch (error) {
    next();
  }
};

export default getChat;
