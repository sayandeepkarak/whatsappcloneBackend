import CustomError from "../services/CustomError";

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    res.status(error.status).json({
      status: false,
      error: {
        status: error.status,
        message: error.message,
      },
    });
  } else {
    res.status(500).json({
      status: false,
      error: {
        status: 500,
        message: "Internal server error",
      },
    });
  }
};

export default errorHandler;
