const socketIo = require("socket.io");

const SocketServer = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    socket.io("join", async (user) => {
      console.log("New user joined: ", user.firstName);
    });
  });
};

module.exports = SocketServer;
