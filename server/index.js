import { Server } from "socket.io";

let onlineUsers = [];

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});


const addUser = (userEmail, chatRoom, socketId) => {
  const existingUser = onlineUsers.find((user) => user.userEmail === userEmail);
  if (!existingUser) {
    onlineUsers.push({ userEmail, chatRoom, socketId });
  }
};

io.on("connection", (socket) => {
  socket.on("newUserJoining", (payload) => {
    socket.join(payload.chatRoom);
    addUser(payload.userEmail, payload.chatRoom, socket.id);
    io.to(payload.chatRoom).emit("onlineUsers", onlineUsers.filter((user) => user.chatRoom === payload.chatRoom));
  });

  socket.on("sendMessage", (payload) => {
    console.log(payload);
    io.to(payload.chatRoom).emit("message", payload);
  });

  socket.on("disconnect", () => {
    const user = onlineUsers.find((user) => user.socketId === socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    if (user) {
      io.to(user.chatRoom).emit("onlineUsers", onlineUsers.filter((user) => user.chatRoom === user.chatRoom));
      io.to(user.chatRoom).emit("userLeftMessage", `${user.userEmail} has left the chat.`);
    }
  });

  socket.on("userLeft", (payload) => {
    onlineUsers = onlineUsers.filter((user) => user.userEmail !== payload.userEmail);
    io.to(payload.chatRoom).emit("onlineUsers", onlineUsers.filter((user) => user.chatRoom === payload.chatRoom));
    io.to(payload.chatRoom).emit("userLeftMessage", `${payload.userEmail} has left the chat.`);
  });
});

io.listen(3001);
