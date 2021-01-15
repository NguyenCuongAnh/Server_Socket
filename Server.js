const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

let userNames = [];

server.listen(3000);
io.on("connection", (socket) => {
  socket.on("Send-Message", (msg) => {
    io.emit("Get-Message-To-Server", msg);
  });

  socket.on("Send-UserName", (username) => {
    if (userNames.indexOf(username) >= 0) {
      io.emit("Register-Error");
    } else {
      userNames.push(username);
      io.emit("Success-Register", username);
    }
  });

  socket.on("Focus-Message", (status) => {
    socket.broadcast.emit("Focus", status);
  });

  socket.on("Un-Focus-Message", (status) => {
    socket.broadcast.emit("UnFocus", status);
  });
});
