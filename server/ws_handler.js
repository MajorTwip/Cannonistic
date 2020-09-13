var fs = require('fs');
var jschema = JSON.parse(fs.readFileSync("./doc/WS_schema.json", 'utf8'));

function handlews(ws, req, games) {
    ws.on('message', (msg)=>handlemsg(msg,ws));
    this.games = games;
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
            SessionHandler.establish(msgJSON,sock, this.games);
            break;
        default:
            console.log(msgJSON.type + " not yet implemented");
    }

};

module.exports = {
    handlews : handlews
}