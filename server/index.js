const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});


io.on("connection", (socket) => {
  console.log("new user connected..!", socket.id);


  socket.on("msg", ({message,senderId}) => {
    io.to(senderId).emit("receive", message);
    // socket.broadcast.emit("receive", obj);
  });

  // WHEN DISCONNECT
  socket.on("disconnect", () => {
    console.log(" User got disconnect !", socket.id);
  });
});

// SERVER
server.listen("2000", () => {
  console.log("Server is running at 2000 !");
});
