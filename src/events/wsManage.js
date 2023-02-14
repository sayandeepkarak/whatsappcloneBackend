const WsConnect = (socket) => {
  console.log("Connected");

  socket.on("join-chat-room", (chatId) => {
    socket.join(chatId);
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
