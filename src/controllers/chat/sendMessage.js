import Joi from "joi";
import ChatModel from "../../models/chat";
import CustomError from "../../services/CustomError";

const sendMessage = async (req, res, next) => {
  // validate body
  const bodySchema = Joi.object({
    message: Joi.string().required(),
    chatId: Joi.string().required(),
    userId: Joi.string().required(),
  });
  const { error } = bodySchema.validate(req.body);
  if (error) {
    return next(CustomError.validationError(error.message));
  }
  try {
    //check messageId and userId
    const exist = await ChatModel.find({
      _id: req.chatId,
      usersId: { $in: [req.body.userId] },
    });
    if (!exist) {
      return next(CustomError.validationError("Invalid details"));
    }
    //update
    const data = await ChatModel.updateOne(
      { _id: req.body.chatId },
      {
        $push: {
          chats: { sendBy: req.body.userId, message: req.body.message },
        },
      },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Successfully send" });
  } catch (error) {
    console.log(error);
    next();
  }
};

export default sendMessage;
