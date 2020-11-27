const db = require("./db");
const directory = require("./directory");
const { Userevent } = require("./messageObjects/toClient");

//generiert eine neue gameID
function generateGameID(len) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var id = '';
    for (var i = len; i > 0; --i) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
}


async function establish(msg, sock){
    //prepare response
    var gamelogic = require("./gamelogic");
    var resp;

    if(msg.gameid == ""){
        //new game

        //generate 2 new gameid and check if unique
        var gameid1;
        var gameid2;
        do{
            gameid1 = generateGameID(12);
            gameid2 = generateGameID(12);
        }while(await db.gameIdcollision(gameid1, gameid2));

        //instanciate new game
        resp = new gamelogic.Game(gameid1,gameid2);
        resp.initLevel(1);
        //set requester as player1
        msg.gameid = resp.gameid1

        //save new game to db and set id
        resp.id = await db.newgame(resp);
    }else{
        //get game by gameid
        resp = await db.getGame(msg.gameid);

        if(typeof resp == "string"){
            console.log("database-error: " + resp)
            var errorevent = require("./messageObjects/toClient");
            var errmsg = new errorevent.Error(resp,500);
            sock.send(errmsg.toJson());
            return;
        }
        //Check Password
        var passhash = ""
        if(msg.gameid==resp.gameid1){
            //player1
            passhash = resp.pass1;
        }else{
            passhash = resp.pass2;
        }
        if(!(passhash=="" ||  passhash=="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" )){ //no pass saved (the hash is the hash of "")
            console.log("check pass for " + msg.gameid + ", should be " + passhash)
            if(!msg.hasOwnProperty("pass")  ||  msg.pass=="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" ){
                console.log("no pass given")
                var errorevent = require("./messageObjects/toClient");
                var errmsg = new errorevent.Error("Password required",401);
                sock.send(errmsg.toJson());
                return;
            }
            if(!(msg.pass == passhash)){
                console.log("wrong pass given")
                var errorevent = require("./messageObjects/toClient");
                var errmsg = new errorevent.Error("wrong Password",402);
                sock.send(errmsg.toJson());
                return;
            }
        }
    }
    
    if(msg.gameid==resp.gameid1){
        //player1

    }
    //bind gameid to sock
    sock.gameid = msg.gameid;

    directory.addPlayer(resp,sock);

    resp.type="initgame";
    db.saveGame(resp)
    sock.send(JSON.stringify(resp, function(key, val) {
        if (key !== "socks")
            return val;
    }));
    console.log(directory.getGames());

    var userevent = require("./messageObjects/toClient")
    var joinmsg = new userevent.Userevent(msg.gameid,undefined);

    directory.sendToGame(resp.id, joinmsg.toJson())
}

async function setupass(msg, sock){
    //prepare response
    var name = ""
    if(msg.hasOwnProperty("newname")){
        name = msg.newname;
    }

    var pass = ""
    if(msg.hasOwnProperty("newpass")){
        pass = msg.newpass;
    }
    
    db.setupass(sock.gameid,name,pass)

    var userevent = require("./messageObjects/toClient")
    var namechange = new userevent.Userevent(sock.gameid,name);
    namechange.setNamechange();

    gameid = await db.getGameId(sock.gameid);
    directory.sendToGame(gameid, namechange.toJson())
}





module.exports = {
    establish : establish,
    setupass : setupass
}