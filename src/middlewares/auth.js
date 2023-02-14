import { SECRET_KEY_ACCESS } from "../../config";
import CustomError from "../services/CustomError";
import JwtService from "../services/JwtService";

const verifyAccess = (connectObj, token, next, error) => {
  //check header
  const reqHead = token;
  if (!reqHead) {
    return next(error);
  }
  //verify access token
  try {
    const token = reqHead.split(" ")[1];
    const { userId } = JwtService.verify(token, SECRET_KEY_ACCESS);
    connectObj.user_id = userId;
    next();
  } catch (err) {
    next(error);
  }
};

const verifyAccessHttp = (req, res, next) => {
  verifyAccess(
    req,
    req.headers.authorization,
    next,
    CustomError.unAuthorizedError()
  );
};

const verifyAccessWs = (socket, next) => {
  verifyAccess(
    socket,
    socket.handshake.headers.authorization,
    next,
    new Error("unathorized user detected")
  );
};

export { verifyAccessHttp, verifyAccessWs };
