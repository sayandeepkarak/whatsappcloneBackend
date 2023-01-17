import Joi from "joi";
import TokenModel from "../../models/token";
import CustomError from "../../services/CustomError";

const logout = async (req, res, next) => {
  //validate body
  const logoutSchema = Joi.object({
    refreshToken: Joi.string().required(),
  });
  const { error } = logoutSchema.validate(req.body);
  if (error) {
    return next(CustomError.validationError());
  }
  //delete token
  try {
    const result = await TokenModel.findOneAndDelete({
      token: req.body.refreshToken,
    });

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
