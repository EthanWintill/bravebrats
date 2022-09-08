const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const Game = require('./game');
var newGame = new Game();

app.use(express.static(__dirname + "/client"));
app.get('/', (req, res) => {
  
});

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    const choices = msg.split(" ");
    newGame.chooseCards(parseInt(choices[0]), parseInt(choices[1]));
    newGame.fight();
  });
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});






