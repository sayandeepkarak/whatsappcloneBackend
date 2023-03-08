import { SECRET_KEY } from "../../../config";
import UserModel from "../../models/users";
import CustomError from "../../services/CustomError";
import JwtService from "../../services/JwtService";

const logout = async (req, res, next) => {
  //validate body
  const refreshToken = req.cookies["refresh-key"];
  if (!refreshToken) {
    return next(CustomError.unAuthorizedError());
  }
  const { userId } = JwtService.verify(refreshToken, SECRET_KEY);
  //delete token
  try {
    const result = await UserModel.findByIdAndUpdate(
      {
        _id: userId,
      },
      { token: null }
    );

    if (!result) {
      return next(CustomError.unAuthorizedError());
    }
    res.status(200).json({ staus: true, message: "Successfully deleted" });
  } catch (error) {
    next();
  }
  res.end();
};

export default logout;
