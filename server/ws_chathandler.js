const db = require("./db");
const directory = require("./directory");


async function receiveChat(msg, sock){
    var SemderObjects = require("./messageObjects/toClient")
    var chat = new SemderObjects.Chat(msg.gameid,msg.newchatmessage);
    gameid = await db.getGameId(msg.gameid);
    directory.sendToGame(gameid, chat.toJson())
}

module.exports = {
    receiveChat : receiveChat
}