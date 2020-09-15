class Game{
    constructor(gameid1, gameid2){
        this.id = undefined;
        this.gameid1 = gameid1;
        this.gameid2 = gameid2;
        this.guns = new Array();
        this.guns[0] = new Object();
        this.guns[0].gunnr = 0;
        this.guns[0].x=50;
        this.guns[0].y=50;
        this.guns[1] = new Object();
        this.guns[1].gunnr = 1;
        this.guns[1].x=50;
        this.guns[1].y=950;
        this.newwind = 0;
    }
}

function newGame(){
    //TODO

}

module.exports = {
    Game:Game,
    newGame:newGame
}