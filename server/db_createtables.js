
    function create(database){
        console.log("Creating table: games");
        database.run("CREATE TABLE games(gameid1 text, gameid2 text)");
        console.log("Creating table: chats");
        database.run("CREATE TABLE chats(gametableid number, gameid text, datetime text, message text)");
    }

    module.exports = {
        create : create
    }