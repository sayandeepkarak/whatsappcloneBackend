import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config";

class JwtService {
  static sign(payload, expire = "3m", secretkey = SECRET_KEY) {
    return jwt.sign(payload, secretkey, { expiresIn: expire });
  }

  static verify(token, secretkey = SECRET_KEY) {
    return jwt.verify(token, secretkey);
  }

  static decode(token) {
    return jwt.decode(token);
  }
}

export default JwtService;
