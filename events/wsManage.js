const WsConnect = (socket) => {
  console.log(`A user connected `);

  socket.on("join-chat-room", (chatId) => {
    socket.join(chatId);
  });

  socket.on("sendActiveResponse", (chatId) => {
    socket.to(chatId).emit("recieveServerResponse", chatId);
  });

  socket.on("chatsend", (chatId) => {
    socket.to(chatId).emit("chatUpdate");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnect");
  });
};

export default WsConnect;