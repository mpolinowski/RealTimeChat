const express = require("express");
const socket = require("socket.io");

var app = express();

var port = 8888;

var server = app.listen(port, function () {
  console.log("Listening to Port " + port);
});

app.use(express.static("public"));

var upgradedServer = socket(server);

upgradedServer.on("connection", function (socket) {
  socket.on("sendingMessage", function (data) {
    upgradedServer.emit("broadcastMessage", data);
  });

  console.log("Websocket Connected", socket.id);
});
