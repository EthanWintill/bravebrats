const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + "/client"));
app.get('/', (req, res) => {
  
});

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

  });
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});




