import Joi from "joi";
import OtpModel from "../models/otp";
import CustomError from "../services/CustomError";
import JwtService from "../services/JwtService";
import Mailer from "../services/Mailer";
import bcrypt from "bcryptjs";

const removeOtp = async (email) => {
  await OtpModel.deleteMany({ email });
};

const sendOtp = async (req, res, next) => {
  const data = req.body;

  const bodySchema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = bodySchema.validate(data);
  if (error) {
    return next(CustomError.validationError(error.message));
  }

  const dig = "0123456789";
  let otp = "";
  for (let i = 1; i <= 6; i++) {
    otp += dig[Math.floor(Math.random() * dig.length)];
  }
  const hashedOtp = await bcrypt.hash(otp, 10);
  const token = JwtService.sign({ hashedOtp });

  try {
    await removeOtp(data.email);
    const newDataObj = new OtpModel({
      email: data.email,
      token,
    });
    await newDataObj.save();

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

const verifyOtp = async (req, res, next) => {
  const data = req.body;

  const bodySchema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().min(6).max(6),
  });

  const { error } = bodySchema.validate(data);
  if (error) {
    return next(CustomError.validationError(error.message));
  }

  try {
    const findRes = await OtpModel.findOne({ email: data.email });
    if (!findRes) {
      return next(CustomError.notFoundError("Email id doesn't exist"));
    }

    const valid = JwtService.verify(findRes.token);
    if (!valid) {
      return CustomError.invalidToken("Otp expired");
    }

    const decodeData = JwtService.decode(findRes.token);
    const hashedOtp = decodeData.hashedOtp;
    const matchOtp = await bcrypt.compare(data.otp, hashedOtp);
    if (!matchOtp) {
      return next(CustomError.invalidToken("Invalid otp"));
    }

    await removeOtp(data.email);
    res.status(200).json({ status: true, message: "Otp verified" });
  } catch (error) {
    return next();
  }
};

const deleteOtp = async (req, res, next) => {
  const data = req.body;

  const bodySchema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = bodySchema.validate(data);
  if (error) {
    return next(CustomError.validationError(error.message));
  }

  try {
    await removeOtp(data.email);
    res.status(200).json({ status: true, message: "Otp deleted" });
  } catch (error) {
    next();
  }
};

export { sendOtp, verifyOtp, deleteOtp };
