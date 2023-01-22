import UserModel from "../models/users";

const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserModel.find().select("fullName photoUrl");
    res.status(200).json({ status: true, data });
  } catch (error) {
    next();
  }
};

export default getAllUsers;
