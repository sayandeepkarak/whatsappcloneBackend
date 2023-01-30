import ChatModel from "../../models/chat";

const allConnection = async (req, res, next) => {
  try {
    //get chats
    const filters = { usersId: { $in: [req.user_id] } };
    const userChats = await ChatModel.find(filters).select("-usersId -__v");
    //check chat exist
    if (userChats.length === 0) {
      return res
        .status(204)
        .json({ status: false, message: "No chats available" });
    }
    //filter out current user from all chats
    userChats.forEach((e, i) => {
      if (e.users[0].userId === req.user_id) {
        delete userChats[i].users.splice(0, 1);
      } else {
        delete userChats[i].users.splice(1, 1);
      }
      userChats[i].chats.splice(0, userChats[i].chats.length - 1);
    });

    res.status(200).json({ status: true, data: userChats });
  } catch (error) {
    console.log(error);
    next();
  }
};

export default allConnection;
