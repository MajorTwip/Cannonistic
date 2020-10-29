const db = require("./db");
const directory = require("./directory");


async function newTurn(msg, sock){
    console.log("new turn...")
    var game = await db.getGame(sock.gameid);
    console.log(game);
    //directory.sendToGame(gameid, chat.toJson())
}

module.exports = {
    newTurn : newTurn
}