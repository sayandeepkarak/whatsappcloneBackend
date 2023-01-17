import Joi from "joi";
import OtpModel from "../../models/otp";
import CustomError from "../../services/CustomError";
import JwtService from "../../services/JwtService";
import Mailer from "../../services/Mailer";
import bcrypt from "bcryptjs";

const sendOtp = async (req, res, next) => {
  const data = req.body;
  //body schema for sendotp request and validation
  const bodySchema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = bodySchema.validate(data);
  if (error) {
    return next(CustomError.validationError(error.message));
  }
  //create an otp
  const dig = "0123456789";
  let otp = "";
  for (let i = 1; i <= 6; i++) {
    otp += dig[Math.floor(Math.random() * dig.length)];
  }
  //create a hash of generated otp with 3min validity token
  const hashedOtp = await bcrypt.hash(otp, 10);
  const token = JwtService.sign({ hashedOtp });

  try {
    //remove all existing otp with given email and save data
    await OtpModel.deleteMany({ email: data.email });
    const newDataObj = new OtpModel({
      email: data.email,
      token,
    });
    await newDataObj.save();
    //mail service send otp
    const mailService = new Mailer();
    const subject = "WhatsappClone verification code";
    const message = `Your whatsappclone verification code is - ${otp}\nDon't share this otp to anyone\nThis otp will expires in 3 minutes`;
    mailService.sendMail(data.email, subject, message, (error, info) => {
      if (error) {
        next();
      } else {
        res.status(200).json({
          status: true,
          message: `Successfully send otp to ${data.email}`,
        });
      }
    });
  } catch (error) {
    return next();
  }
};

export default sendOtp;
