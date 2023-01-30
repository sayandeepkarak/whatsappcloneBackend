import Joi from "joi";
import ChatModel from "../../models/chat";
import UserModel from "../../models/users";
import CustomError from "../../services/CustomError";

const addPerson = async (req, res, next) => {
  //validate body
  const bodySchema = Joi.object({
    personId: Joi.string().required(),
  });
  const { error } = bodySchema.validate(req.body);
  if (error) {
    return next(CustomError.validationError(error.message));
  }
  try {
    //check friend
    const friend = await UserModel.findById(req.body.personId).select(
      "_id fullName photoUrl"
    );
    if (!friend) {
      return next(CustomError.notFoundError("User not found"));
    }
    //check connection
    const bothUser = [req.user_id, req.body.personId];
    const chatData = await ChatModel.find({
      $and: [{ usersId: req.user_id }, { usersId: req.body.personId }],
    });

    if (chatData.length !== 0) {
      return next(CustomError.alreadyExist("Connection already created"));
    }
    //get requested person details
    const userData = await UserModel.findById(req.user_id).select(
      "_id fullName photoUrl"
    );
    //create connection
    const newConnection = new ChatModel({
      usersId: bothUser,
      users: [
        {
          userId: userData._id,
          name: userData.fullName,
          photoUrl: userData.photoUrl,
        },
        {
          userId: friend._id,
          name: friend.fullName,
          photoUrl: friend.photoUrl,
        },
      ],
    });
    await newConnection.save();
    res
      .status(200)
      .json({ status: true, message: "Person added successfully" });
  } catch (error) {
    return next();
  }
};

export default addPerson;
