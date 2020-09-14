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
            game.gameid1 = generateGameID(12);
            game.gameid2 = generateGameID(12);
        }while(await db.gameIdcollision(game.gameid1, game.gameid2));
        msg.gameid = game.gameid1
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
        game.id = await db.newgame(game.gameid1, game.gameid2);
    }else{
        game = await db.getGame(msg.gameid);
    }
    games.addPlayer(game,msg.gameid,sock);
    sock.send(JSON.stringify(game));
    console.log(games.getGames());

    games.sendToGame(game.id, "welcome")
}



module.exports = {
    establish : establish
}