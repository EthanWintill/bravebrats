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




// Brave Rats game recourses,

//game is 1v1, Yargs vs Applewoods

const deck = [0,1,2,3,4,5,6,7];

class Player {
  constructor(){
    this.hand = deck;
    this.score = 0;
    this.generalLast = false;
    this.spyLast = false;
    this.card = null;
  }
}


/* RETURNS:
const result = {
  win: 0, // 0 hold + pa - py  
  paAmbass: false,
  pyAmbass: false,
  paGeneral: false,
    pyGeneral: false,
    paSpy: false,
    pySpy: false,
    paWin:false,
    pyWin:false
}*/
// pre check for princess game win!!! //
// pre check if wizrd blocks general/spy!!!  //
function battle(pa , py){ //Players
  paStrength = pa.card + (pa.generalLast * 2);
  pyStrength = py.card + (py.generalLast * 2);
  const wizardInPlay = pa.card == 5 || py.card == 5;
  result = {
    win: 0,
    paAmbass: pa.card == 4 && !wizardInPlay ? true : false,
    pyAmbass: py.card == 4 && !wizardInPlay ? true : false,
    paGeneral: pa.card == 6 && !wizardInPlay ? true : false,
    pyGeneral: py.card == 6 && !wizardInPlay ? true : false,
    paSpy: pa.card == 2 && !wizardInPlay ? true : false,
    pySpy: py.card == 2 && !wizardInPlay ? true : false,
    paWin: pa.card == 1 && py.card == 7 ? true : false,
    pyWin: py.card == 1 && pa.card == 7 ? true : false
  }

  if ((pa.card == 0 && py.card != 5) ||
    (py.card == 0 && pa.card != 5)) {
      result.win = 0;
    }

  else if (pa.card == 7 && py.card != 7){
    result.win = 1;
  }

  else if (py.card == 7 && pa.card != 7){
    result.win = -1;
  }

  else if ((pa.card == 3 || py.card == 3) && !wizardInPlay){
    result.win = pyStrength - paStrength;
  }

  else{
    result.win = paStrength - pyStrength;
  }



  return result;

}

