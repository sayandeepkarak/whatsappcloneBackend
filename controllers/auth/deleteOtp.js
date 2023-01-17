import Joi from "joi";
import OtpModel from "../../models/otp";
import CustomError from "../../services/CustomError";

const deleteOtp = async (req, res, next) => {
  const data = req.body;
  //verify request data
  const bodySchema = Joi.object({
    email: Joi.string().email().required(),
  });
  //check error
  const { error } = bodySchema.validate(data);
  if (error) {
    return next(CustomError.validationError(error.message));
  }
  //remove
  try {
    await OtpModel.deleteMany({ email: data.email });
    res.status(200).json({ status: true, message: "Otp deleted" });
  } catch (error) {
    next();
  }
};

export default deleteOtp;
