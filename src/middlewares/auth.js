import { SECRET_KEY_ACCESS } from "../../config";
import CustomError from "../services/CustomError";
import JwtService from "../services/JwtService";

const verifyAccessHttp = (req, res, next) => {
  //check header
  const token = req.cookies["access-key"];
  if (!token) {
    return next(CustomError.unAuthorizedError());
  }
  //verify access token
  try {
    const { userId } = JwtService.verify(token, SECRET_KEY_ACCESS);
    req.user_id = userId;
    next();
  } catch (err) {
    next(CustomError.unAuthorizedError());
  }
};

export { verifyAccessHttp };
