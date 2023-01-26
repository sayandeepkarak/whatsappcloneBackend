import UserModel from "../models/users";

const setOnline = async (req, res, next) => {
  try {
    const updateRes = await UserModel.findByIdAndUpdate(
      req.user_id,
      {
        isActive: true,
      },
      { new: true }
    );
    setTimeout(async () => {
      await UserModel.findByIdAndUpdate(req.user_id, {
        isActive: false,
      });
    }, 5000);
    res.status(200).json({ status: true, message: "Set Active" });
  } catch (error) {
    next();
  }
};

export default setOnline;
