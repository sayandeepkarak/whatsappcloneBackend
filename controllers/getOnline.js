import UserModel from "../models/users";
import CustomError from "../services/CustomError";

const getOnline = async (req, res, next) => {
  if (!req.query.userId) {
    return next(CustomError.validationError("UserId required"));
  }
  try {
    const findRes = await UserModel.findById(req.query.userId).select(
      "isActive -_id"
    );
    res.status(200).json({ status: true, userActive: findRes.isActive });
  } catch (error) {
    next();
  }
};

export default getOnline;
