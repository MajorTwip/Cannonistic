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

function sendToGame(id, msg){
    var opengame = games.get(id);
    if(opengame === undefined){
        console.log("nobody connected to Game " + id)
        return;
    }
    for (var sock of opengame.socks) {
        console.log("Send message to " + sock.gameid);
        sock.send(msg);
    }
}

function getGames(){
    return games;
}

module.exports = {
    addPlayer:addPlayer,
    sendToGame:sendToGame,
    getGames:getGames
}