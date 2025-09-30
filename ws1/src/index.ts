import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//event handler
wss.on("connection", function (socket) {
  console.log("User connected");
  socket.send("Welcome to Server");

  socket.on("message", (e) => {
    console.log(e.toString());
  });
});
