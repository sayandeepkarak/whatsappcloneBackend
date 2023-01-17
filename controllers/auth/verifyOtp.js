import Joi from "joi";
import OtpModel from "../../models/otp";
import CustomError from "../../services/CustomError";
import JwtService from "../../services/JwtService";
import bcrypt from "bcryptjs";
import UserModel from "../../models/users";
import { SECRET_KEY } from "../../config";
import TokenModel from "../../models/token";

const verifyOtp = async (req, res, next) => {
  const data = req.body;
  //verify otp request data schema and validate
  const bodySchema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().min(6).max(6),
  });
  const { error } = bodySchema.validate(data);
  if (error) {
    return next(CustomError.validationError(error.message));
  }

  try {
    //find otp data with email and validate and check validity
    const findRes = await OtpModel.findOne({ email: data.email });
    if (!findRes) {
      return next(CustomError.notFoundError("Email id doesn't exist"));
    }
    const valid = JwtService.verify(findRes.token);
    if (!valid) {
      return CustomError.invalidToken("Otp expired");
    }
    //decode jwt token compare given otp and otphash
    const decodeData = JwtService.decode(findRes.token);
    const hashedOtp = decodeData.hashedOtp;
    const matchOtp = await bcrypt.compare(data.otp, hashedOtp);
    if (!matchOtp) {
      return next(CustomError.invalidToken("Invalid otp"));
    }
    await OtpModel.deleteMany({ email: data.email });
    //check if useExist or not
    const isExist = await UserModel.findOne({ email: data.email });
    if (!isExist) {
      const newUserData = new UserModel({
        email: data.email,
      });
      await newUserData.save();
    }
    //incomplete profile then send not complete
    if (!isExist || !isExist.isProfileComplete) {
      return res.status(200).json({
        status: true,
        isComplete: false,
        message: "Otp verified",
      });
    }
    //generate and save token to database
    const token = JwtService.sign({ userId: isExist._id }, "90d");
    await TokenModel.create({ token });

    res.status(200).json({
      status: true,
      isComplete: true,
      message: "Otp verified",
      refreshToken: token,
    });
  } catch (error) {
    return next();
  }
};

export default verifyOtp;
