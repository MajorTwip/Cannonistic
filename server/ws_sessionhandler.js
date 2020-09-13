const db = require("./db");
const games = require("./directory");

//generiert eine neue gameID
function generateGameID(len) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var id = '';
    for (var i = len; i > 0; --i) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
}


async function establish(msg, sock){
    //prepare response
    var game = new Object();
    game.type = "initgame";

    if(msg.gameid == ""){
        //new game
        do{
            game.gameid = generateGameID(12);
            game.enygameid = generateGameID(12);
        }while(await db.gameIdcollision(game.gameid, game.enygameid));
        game.id = 1
        game.guns = new Array();
        game.guns[0] = new Object();
        game.guns[0].gunnr = 0;
        game.guns[0].x=50;
        game.guns[0].y=50;
        game.guns[1] = new Object();
        game.guns[1].gunnr = 1;
        game.guns[1].x=50;
        game.guns[1].y=950;
        game.newwind = 0;
        //db.newgame(game.gameid, game.enygameid);
    }else{
        game = await db.getGame(msg.gameid);
    }
    games.addPlayer(game);
    sock.send(JSON.stringify(game));
    console.log(games.getGames());
}

module.exports = {
    establish : establish
}