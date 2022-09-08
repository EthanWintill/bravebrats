


// Brave Rats game recourses,

//game is 1v1, Yargs vs Applewoods

const deck = [0,1,2,3,4,5,6,7];

class Player {
  constructor(){
    this.hand = [0,1,2,3,4,5,6,7];
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
  console.log(pa);
  console.log(py);
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
    paWin: false,
    pyWin: false
  }

  if ((pa.card == 0 && py.card != 5) ||
    (py.card == 0 && pa.card != 5)) {
      result.win = 0;
    }

  else if (pa.card == 7 && py.card != 7){
    if (py.card == 1){
      result.win = -4;
      result.pyWin = true;
    }else{
      result.win = 1;
    }
  }

  else if (py.card == 7 && pa.card != 7){
    if (pa.card == 1){
      result.win = 4;
      result.paWin = true;
    }else{
      result.win = -1;
    }
  }

  else if ((pa.card == 3 || py.card == 3) && !wizardInPlay){
    result.win = pyStrength - paStrength;
  }

  else{
    result.win = paStrength - pyStrength;
  }



  return result;

}


class Game {
    constructor(){
        this.applewood = new Player();
        this.yarg = new Player();
        this.curDraws = [];
    }
    chooseCards(pa,py){
        this.applewood.card = pa;
        this.applewood.hand.splice(this.applewood.hand.indexOf(pa),1);

        this.yarg.card = py;
        this.yarg.hand.splice(this.yarg.hand.indexOf(py),1);
    }
    fight(){
        result = battle(this.applewood,this.yarg)
        if(result.paWin){
          this.applewood.score = 1000;
          console.log("PRINCESS WIN FOR APPLEWOOD");
        }else if(result.pyWin){
          this.yarg.score = 1000;
          console.log("PRINCESS WIN FOR YARG");
        }else if(result.win == 0){
          this.curDraws.push(result);
          console.log("DRAW");
        }else if(result.win>0){
          console.log("APPLEWOOD W");
          this.applewood.score++;
        }else if (result.win < 0){
          console.log("YARG W");
          this.yarg.score++;
        } else{
          console.log(result);
        }
        
        this.checkWin();
    }


    checkWin(){
        if(this.yarg.score - this.applewood.score >= 4){
            return "Yarg wins";
        }else if(this.applewood.score - this.yarg.score >= 4){
            return "Applewood wins";
        }else if(this.curDraws.length >= 8){
            return "Tie"
        }else{
            return "Still going"
        }
    }

}

module.exports = Game;
