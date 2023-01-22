class CustomError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }

  static validationError(message = "Please provide all fields") {
    return new CustomError(422, message);
  }

  static notFoundError(message = "no data found") {
    return new CustomError(404, message);
  }

  static invalidToken(message = "Invalid token") {
    return new CustomError(401, message);
  }

  static unAuthorizedError(message = "unauthorized user") {
    return new CustomError(401, message);
  }

  static alreadyExist(message = "already exist") {
    return new CustomError(409, message);
  }
}

export default CustomError;
