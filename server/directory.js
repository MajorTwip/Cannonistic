var games = new Map();

function addPlayer(game){
    games.set(game.gameid, game);
}

function getGames(){
    return games;
}

module.exports = {
    addPlayer:addPlayer,
    getGames:getGames
}