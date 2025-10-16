import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = [];

wss.on("connection", function (socket) {
  allSockets.push(socket);

  userCount = userCount + 1;
  console.log(`Total Users: ${userCount}`);

  socket.send("Welcome to Chat Room");

  // broadcast function
  socket.on("message", (message) => {
    for (let i = 0; i < allSockets.length; i++) {
      const users = allSockets[i];
      users?.send(`${message.toString()} : send from server`);
    }
  });
});

console.log(allSockets);
