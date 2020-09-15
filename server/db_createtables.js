
    function create(database){
        console.log("Creating table: games");
        database.run("CREATE TABLE games(id INTEGER PRIMARY KEY AUTOINCREMENT, gameid1 TEXT NOT NULL, gameid2 TEXT NOT NULL, pass1 TEXT, pass2 TEXT, wind INTEGER, nextturn TEXT)");
        console.log("Creating table: guns");
        database.run("CREATE TABLE guns(id INTEGER PRIMARY KEY AUTOINCREMENT, games_id INTEGER REFERENCES games(id), gameid TEXT NOT NULL, x INTEGER, y INTEGER, health INTEGER)");
        console.log("Creating table: chats");
        database.run("CREATE TABLE chats(id INTEGER PRIMARY KEY AUTOINCREMENT, games_id INTEGER REFERENCES games(id), gameid text, datetime text, message text)");
    }

    module.exports = {
        create : create
    }