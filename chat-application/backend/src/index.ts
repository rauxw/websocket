import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let userCount = 0;
let allSockets: User[] = [];

wss.on("connection", function (socket) {
  userCount = userCount + 1;
  console.log(`Total Users: ${userCount}`);

  // broadcast function
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);
    if (parsedMessage.type == "join") {
      console.log(`User joined room : ${parsedMessage.payload.roomId}`);
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type == "chat") {
      console.log("User wants to chat");
      let currentUserRoom = null;
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i]?.socket == socket) {
          currentUserRoom = allSockets[i]?.room;
        }
      }

      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i]?.room == currentUserRoom) {
          allSockets[i]?.socket.send(parsedMessage.payload.message);
        }
      }
    }
  });

  socket.on("disconnect", () => {});
});
