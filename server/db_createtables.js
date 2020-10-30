
    function create(database){
        console.log("Creating table: games");
        database.run("CREATE TABLE games(id INTEGER PRIMARY KEY AUTOINCREMENT, gameid1 TEXT NOT NULL, gameid2 TEXT NOT NULL, name1 TEXT, pass1 TEXT, name2 TEXT, pass2 TEXT, wind INTEGER, state TEXT, lastele INTEGER, lastV0 INTEGER, lastwind INTEGER, level INTEGER)");
        console.log("Creating table: guns");
        database.run("CREATE TABLE guns(id INTEGER PRIMARY KEY AUTOINCREMENT, games_id INTEGER REFERENCES games(id),gunnr INTEGER NOT NULL, owner TEXT NOT NULL, x INTEGER, y INTEGER, health INTEGER)");
        console.log("Creating table: chats");
        database.run("CREATE TABLE chats(id INTEGER PRIMARY KEY AUTOINCREMENT, games_id INTEGER REFERENCES games(id), gameid text, datetime text, message text)");
    }

    module.exports = {
        create : create
    }