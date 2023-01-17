import Joi from "joi";
import CustomError from "../../services/CustomError";
import JwtService from "../../services/JwtService";
import UserModel from "../../models/users";
import { uploadImage } from "../../middlewares/fileUpload";
import fs from "fs";
import path from "path";
import { SECRET_KEY } from "../../config";
import TokenModel from "../../models/token";

const uploadUserDetails = (req, res, next) => {
  //pass field name and get imageUpload function with multer
  const uploader = uploadImage("profile");
  // call upload
  uploader(req, res, async (err) => {
    if (err) {
      return next();
    }
    //data and file path
    const data = req.body;
    const filePath = req.file.path;
    //data schema
    const bodySchema = Joi.object({
      fullName: Joi.string().required(),
      email: Joi.string().email().required(),
    });
    //check if error remove image
    const { error } = bodySchema.validate(data);
    if (error) {
      fs.unlink(path.resolve(__dirname, filePath), (er) => {
        return next();
      });
      return next(CustomError.validationError(error.message));
    }
    //update data
    try {
      const updateResult = await UserModel.findOneAndUpdate(
        {
          email: data.email,
        },
        {
          fullName: data.fullName,
          photoUrl: filePath,
          isProfileComplete: true,
        },
        { new: true }
      );
      //check update status and genarate refresh token
      if (!updateResult) {
        return next(CustomError.validationError("Email id doesn't exist"));
      }
      const token = JwtService.sign(
        { userId: updateResult._id },
        "90d",
        SECRET_KEY
      );
      //save token to database
      await TokenModel.create({ token });
      res.status(200).json({
        status: true,
        message: "Successfully updated Data",
        refreshToken: token,
      });
    } catch (err) {
      return next();
    }
  });
};

export default uploadUserDetails;
