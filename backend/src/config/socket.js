const socketIO = require("socket.io");

const configureSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user has just connected!");

    socket.on("disconnect", () => {
      console.log("A user has just disconnected!");
    });
  });

  return io;
};

module.exports = configureSocket;
