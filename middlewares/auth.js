import { SECRET_KEY_ACCESS } from "../config";
import CustomError from "../services/CustomError";
import JwtService from "../services/JwtService";

const verifyAccess = async (req, res, next) => {
  //check header
  const reqHead = req.headers.authorization;
  if (!reqHead) {
    return next(CustomError.unAuthorizedError());
  }
  //verify access token
  const token = reqHead.split(" ")[1];
  try {
    const { userId } = JwtService.verify(token, SECRET_KEY_ACCESS);
    req.user_id = userId;
    next();
  } catch (error) {
    next(CustomError.unAuthorizedError());
  }
};

export default verifyAccess;
