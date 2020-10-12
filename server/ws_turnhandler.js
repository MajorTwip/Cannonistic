const db = require("./db");
const directory = require("./directory");


async function newTurn(msg, sock){
    var game = await db.getGame(msg.gameid);
    //directory.sendToGame(gameid, chat.toJson())
}

module.exports = {
    newTurn : newTurn
}