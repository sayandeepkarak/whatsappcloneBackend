import { SECRET_KEY_ACCESS } from "../../config";
import CustomError from "../services/CustomError";
import JwtService from "../services/JwtService";

const verifyAccessHttp = (req, res, next) => {
  //check header
  const reqHead = req.headers.authorization;
  if (!reqHead) {
    return next(error);
  }
  //verify access token
  try {
    const token = reqHead.split(" ")[1];
    const { userId } = JwtService.verify(token, SECRET_KEY_ACCESS);
    req.user_id = userId;
    next();
  } catch (err) {
    next(CustomError.unAuthorizedError());
  }
};

export { verifyAccessHttp };
