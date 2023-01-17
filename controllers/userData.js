import UserModel from "../models/users";
import CustomError from "../services/CustomError";

const getUserData = async (req, res, next) => {
  try {
    //find user
    const data = await UserModel.findById(req.user_id).select(
      "-_id -createdAt -updatedAt -__v"
    );
    if (!data) {
      return next(CustomError.notFoundError("User doesn't exist"));
    }
    //send
    res.status(200).json({ status: true, userdata: data });
  } catch (error) {
    next();
  }
};

export default getUserData;
