// const WebSocketServer = new require("ws");

// const PORT = 8080;

// const wss = new WebSocketServer.Server({ port: PORT }, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });

// let clients = [];

// wss.on("connection", (socket) => {
//   clients.push(socket);

//   console.log("New user was successfully connected");

//   //   setInterval(() => {
//   //     socket.send(JSON.stringify({ message: "Hello world!" }));
//   //   }, 3000);

//   clients.forEach((element) => {
//     if (element !== socket) {
//       element.send(JSON.stringify("New user was successfully connected"));
//     }
//   });

//   socket.on("message", (message) => {
//     console.log(message.toString());
//   });
// });
