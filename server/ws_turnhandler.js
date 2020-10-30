const db = require("./db");
const directory = require("./directory");


async function newTurn(msg, sock){
    console.log("new turn...")
    var game = await db.getGame(sock.gameid);
    game.doTurn(msg,sock);
    directory.sendToGame(game.id, JSON.stringify(game))
}

module.exports = {
    newTurn : newTurn
}