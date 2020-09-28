var fs = require('fs');
const db = require('./db');
const directory = require('./directory');
var jschema = JSON.parse(fs.readFileSync("./doc/WS_schema_client2server.json", 'utf8'));

function handlews(ws, req) {
    ws.on('message', (msg)=>handlemsg(msg,ws));
    ws.on('close', ()=>handledisconnect(ws));
}

async function handledisconnect(sock){
    //console.log(sock);
    if(sock.gameid!==undefined){
        console.log("remove " + sock.gameid + " from dictionary");
        var id = await db.getGameId(sock.gameid);
        directory.removePlayer(sock.gameid, id)
    }
}

function handlemsg(msg, sock) {
    console.log("Got Msg: " + msg);
    var msgJSON;
    try {
        msgJSON = JSON.parse(msg);
    } catch (e) {
        if (e) {
            return console.warn(e.message);
        }
    }

    //JSON-Schema-Validator
    var Ajv = require('ajv');
    var ajv = new Ajv();
    var valid = ajv.validate(jschema,msgJSON);
    if (!valid){
        return console.warn(ajv.errors);
    }
    
    console.log("OK: "+ JSON.stringify(msgJSON));

    switch(msgJSON.type){
        case "establish":
            var SessionHandler = require('./ws_sessionhandler');
            SessionHandler.establish(msgJSON,sock);
            break;
        case "setupass":
            var SessionHandler = require('./ws_sessionhandler');
            SessionHandler.setupass(msgJSON,sock);
            break;
        case "newchat":
            var ChatHandler = require("./ws_chathandler");
            ChatHandler.receiveChat(msgJSON,sock);
        //TODO other messagetypes
        default:
            console.log(msgJSON.type + " not yet implemented");
    }

};

module.exports = {
    handlews : handlews
}