import { SECRET_KEY, SECRET_KEY_ACCESS } from "../../../config";
import UserModel from "../../models/users";
import CustomError from "../../services/CustomError";
import JwtService from "../../services/JwtService";

const refreshaccess = async (req, res, next) => {
  const token = req.cookies["refresh-key"];
  if (!token) {
    return next(CustomError.unAuthorizedError("RefreshToken required"));
  }
  try {
    //find token
    const isExist = await UserModel.findOne({
      token,
    });
    if (!isExist) {
      return next(CustomError.unAuthorizedError("Invalid refresh token"));
    }
    //verify token
    let user_id;
    try {
      const { userId } = JwtService.verify(isExist.token, SECRET_KEY);
      user_id = userId;
    } catch (error) {
      await UserModel.findByIdAndUpdate(isExist._id, { token: null });
      return next(CustomError.unAuthorizedError("Invalid refresh token"));
    }
    //find user
    const user = await UserModel.findOne({ _id: user_id });
    if (!user) {
      return next(CustomError.unAuthorizedError("No user found"));
    }
    //create access token and refresh token update and send
    const refreshToken = JwtService.sign({ userId: user_id }, "90d");
    const accessToken = JwtService.sign(
      { userId: user_id },
      "1m",
      SECRET_KEY_ACCESS
    );
    await UserModel.findByIdAndUpdate(user_id, { token: refreshToken });

    const refreshTokenExpire = new Date();
    const accessTokenExpire = new Date();
    refreshTokenExpire.setMonth(refreshTokenExpire.getMonth() + 3);
    accessTokenExpire.setMinutes(accessTokenExpire.getMinutes() + 1);
    // set new tokens to client
    res
      .cookie("refresh-key", refreshToken, { expires: refreshTokenExpire })
      .cookie("access-key", accessToken, { expires: accessTokenExpire })
      .status(200)
      .json({
        status: true,
        message: "Successfully updated tokens",
      });
  } catch (error) {
    next();
  }
};

export default refreshaccess;
