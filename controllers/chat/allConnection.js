import ChatModel from "../../models/chat";
import UserModel from "../../models/users";

const structureData = async (data, userId) => {
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    const { _id, usersId, chats } = data[i];
    const friendId = usersId.filter((el) => el !== userId);
    const friendData = await UserModel.findById(friendId).select(
      "_id fullName photoUrl"
    );
    let tmp = {
      _id,
      friend: friendData,
      chats: chats.length > 0 ? Array.from(chats).at(-1) : [],
    };
    newData.push(tmp);
  }
  return newData;
};

const allConnection = async (req, res, next) => {
  try {
    //get chats
    const filters = { usersId: { $in: [req.user_id] } };
    const userChats = await ChatModel.find(filters).select("-__v");
    //check chat exist
    if (userChats.length === 0) {
      return res
        .status(204)
        .json({ status: false, message: "No chats available" });
    }
    //filter out current user from all chats
    const data = await structureData(userChats, req.user_id);
    res.status(200).json({ status: true, data });
  } catch (error) {
    console.log(error);
    next();
  }
};

export default allConnection;
