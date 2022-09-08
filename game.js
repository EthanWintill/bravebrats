class Game {
    constructor(){
        this.applewood = new Player();
        this.yarg = new Player();
        this.battles = [];
    }
    chooseCards(pa,py){
        this.applewood.card = pa;
        this.applewood.deck.splice(this.applewood.deck.indexOf(pa),1);

        this.yarg.card = py;
        this.yarg.deck.splice(this.yarg.deck.indexOf(pa),1);
    }
    fight(){
        result = battle(this.applewood.card,this.yarg.card)
        
    }


    checkWin(){
        if(this.yarg.score - this.applewood.score >= 4){
            return "Yarg wins";
        }else if(this.applewood.score - this.yarg.score >= 4){
            return "Applewood wins";
        }else if(this.battles.length >= 8){
            return "Tie"
        }else{
            return "Still going"
        }
    }

}