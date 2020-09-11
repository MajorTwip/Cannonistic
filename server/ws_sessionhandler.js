const db = require("./db");

//generiert eine neue gameID
function generateGameID(len) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var id = '';
    for (var i = len; i > 0; --i) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
}


function establish(msg, sock){

    //prepare response
    var response = new Object();
    response.type = "initgame";

    if(msg.gameid == ""){
        //new game
        response.gameid = generateGameID(12);
        response.enygameid = generateGameID(12);
        response.guns = new Array();
        response.guns[0] = new Object();
        response.guns[0].gunnr = 0;
        response.guns[0].x=50;
        response.guns[0].y=50;
        response.guns[1] = new Object();
        response.guns[1].gunnr = 1;
        response.guns[1].x=50;
        response.guns[1].y=950;
        response.newwind = 0;

        //db.newgame(response.gameid, response.enygameid);
    }


    sock.send(JSON.stringify(response));
}

module.exports = {
    establish : establish
}