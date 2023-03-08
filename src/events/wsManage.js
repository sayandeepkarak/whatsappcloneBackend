const WsConnect = (socket) => {
  const { userId, name } = socket.handshake.query;
  if (userId) {
    socket.join(userId);
    console.log(`${name} connected`);
  }

  socket.on("join-chat-room", (chatId) => {
    socket.join(chatId);
  });

  socket.on("addFriend", (id, userName, friendName) => {
    socket.to(id).emit("newFriend");
    console.log(`${userName} connect with ${friendName}`);
  });

  socket.on("sendActiveResponse", (chatId) => {
    socket.to(chatId).emit("recieveUserResponse", chatId);
  });

  socket.on("chatsend", (chatId, message) => {
    socket.to(chatId).emit("chatUpdate", chatId, message);
  });

  socket.on("messageRecieved", (chatId, message) => {
    socket.to(chatId).emit("messageSent", chatId, message);
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
};

export default WsConnect;
