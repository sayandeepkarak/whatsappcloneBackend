import Joi from "joi";
import CustomError from "../../services/CustomError";
import JwtService from "../../services/JwtService";
import UserModel from "../../models/users";
import { uploadImage } from "../../middlewares/fileUpload";
import fs from "fs";

const uploadUserDetails = (req, res, next) => {
  //pass field name and get imageUpload function with multer
  const uploader = uploadImage("profile");
  // call upload
  uploader(req, res, async (err) => {
    if (err) {
      console.log(err);
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
      fs.unlink(filePath, (er) => {
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
          photoUrl: "/uploads/" + req.file.filename,
          isProfileComplete: true,
        },
        { new: true }
      );
      //check update status and genarate refresh token
      if (!updateResult) {
        return next(CustomError.validationError("Email id doesn't exist"));
      }
      //save token to database
      const token = JwtService.sign({ userId: updateResult._id }, "90d");
      await UserModel.updateOne({ _id: updateResult._id }, { token });

      const date = new Date();
      date.setMonth(date.getMonth() + 3);
      //send data with cookie
      res.cookie("refresh-key", token, { expires: date }).status(200).json({
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
