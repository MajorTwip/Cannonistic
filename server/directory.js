var games = new Map();

function addPlayer(game, sock){
    var opengame = games.get(game.id);
    if(opengame === undefined){
        opengame = game;
        opengame.socks = [sock];
    }else{
        opengame.socks.push(sock);
    }
    games.set(game.id, opengame);
}

function removePlayer(gameid, id){
    if(id===undefined){
        for(var [id, game] of games){
            for(var i=0; i < game.socks.length; i++){
                if(game.socks[i].gameid == gameid) game.socks.splice(i,1);
                console.log("removed sock from game");
            }
            if(game.socks.length==0){
                games.delete(id);
                console.log("removed game from directory, due to no players left online");
            }
        }
    }else{
        var game = games.get(id);
        console.log(game)
        for(var i=0; i < game.socks.length; i++){
            if(game.socks[i].gameid == gameid) game.socks.splice(i,1);
            console.log("removed sock from game");
        }
        games.set(id, game);
        if(game.socks.length==0){
            games.delete(id);
            console.log("removed game from directory, due to no players left online");
        }
    }
    console.log(game)
}

function sendToGame(id, msg){
    var opengame = games.get(id);
    if(opengame === undefined){
        console.log("nobody connected to Game " + id)
        return;
    }
    for (var sock of opengame.socks) {
        console.log("Send message to " + sock.gameid);
        try{
            sock.send(msg);
        }catch{
            console.log("Sending message to " + sock.gameid + "failed, removing sock from game");
            removePlayer(sock.gameid,id);
        }
    }
}

function getGames(){
    return games;
}

module.exports = {
    addPlayer:addPlayer,
    removePlayer:removePlayer,
    sendToGame:sendToGame,
    getGames:getGames
}