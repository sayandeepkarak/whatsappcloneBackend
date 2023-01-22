import ChatModel from "../../models/chat";

const allChats = async (req, res, next) => {
  try {
    //get chats
    const userChats = await ChatModel.find({
      users: { $in: [req.user_id] },
    });
    //check chat exist
    if (userChats.length === 0) {
      res.status(204).json({ status: false, message: "No chats available" });
    }
    //filter out all friends id
    const friends = [];
    userChats.forEach((e) => {
      const filterUsers = e.users.filter((e) => e !== req.user_id);
      friends.push(...filterUsers);
    });
    //get all friends basic details

    res.status(200).json({ status: true, message: "ok" });
  } catch (error) {
    next();
  }
};

export default allChats;
