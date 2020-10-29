var _db;

function init() {

    console.log("initializing DB");
    var sqlite3 = require('sqlite3').verbose();
    var database = new sqlite3.Database('./data/db.sqlite', (err) => {

        //open DB
        if (err) {
            console.error("error occured: " + err.message);
            process.exit(1);
        } else {
            console.log("DB opened");
        }

        //check if allread tables created
        var sql = "SELECT name FROM sqlite_master WHERE type='table' AND name=?;";
        var params = ["games"];


        database.get(sql, params, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            if (row == undefined) {
                console.log("Database seems to be empty, creating tables");
                require("./db_createtables").create(database);
            }
        });
        _db = database;
    });
}

function gameIdcollision(gameid, enygameid) {
    //check if gameids unused
    var sql = "SELECT COUNT(*) FROM games WHERE gameid1 = ? OR gameid1 = ? OR gameid2 = ? OR gameid2 = ?"
    var params = [gameid, enygameid, gameid, enygameid];
    return new Promise(function (resolve, reject) {
        _db.get(sql, params, (err, row) => {
            if (err) {
                console.warn(err.message);
                reject(err);
            }
            if (row["COUNT(*)"] > 0) {
                console.log("gameId Duplicate");
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}


function getGame(gameid) {
    var game = _getGame(gameid);
    game.guns = _getGuns(game.id);
    return game;
}

function _getGame(gameid) {
    return new Promise(function (resolve, reject) {

        var sql = "SELECT * FROM games WHERE gameid1 = ? OR gameid2 = ?"
        var params = [gameid, gameid];
        _db.get(sql, params, (err, row) => {
            if (err) {
                console.warn(err.message);
                reject(err);
            } else {
                var Gamelogic = require("./gamelogic");
                var game = new Gamelogic.Game(row.gameid1, row.gameid2);
                game.id = row.id;
                game.name1 = row.name1;
                game.pass1 = row.pass1;
                game.name2 = row.name2;
                game.pass2 = row.pass2;
                game.wind = row.wind;
                game.state = row.state;
                game.lastele = row.lastele;
                game.lastV0 = row.lastV0;
                game.lastwind = row.lastwind;
                game.level = row.level;
                game.guns = undefined;
                resolve(game);
            }
        });
    });
}


function _getGuns(games_id) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM guns WHERE games_id = ?"
        var params = [games_id];
        var guns = new Array();
        _db.each(sql, params, (err, row) => {
            if (err) {
                console.warn(err.message);
                reject(err);
            } else {
                var gun = new Object();
                gun.id = row.id;
                gun.gunnr = row.gunnr;
                gun.owner = row.owner;
                gun.x = row.x;
                gun.y = row.y;
                gun.health = row.health;
                guns.push(gun);
                console.log(gun);
            }
        });
        resolve(guns);
    });
}



function saveGame(game) {
    _saveGame(game)
    for (var gun in game.guns) {
        _saveGun(game.id, gun);
    }
}

function _saveGame(game) {
    var sql = "UPDATE games SET \
            name1 = ?, \
            pass1 = ?, \
            name2 = ?, \
            pass2 = ?, \
            wind = ?, \
            state = ?, \
            lastele = ?, \
            lastV0 = ?, \
            lastwind =?, \
            level = ? \
        WHERE \
            id = ?;"
    var params = [game.name1, game.pass1, game.name2, game.pass2, game.wind, game.state, game.lastele, game.lastV0, game.lastwind, game.level, game.id];


    return new Promise(function (resolve, reject) {
        _db.run(sql, params, function (err) {
            if (err) {
                reject(err.message);
            }
            console.log(`A game has been updated: ${this.lastID}`);
            resolve(this.lastID);
        });
    });
}


function _saveGun(games_id, gun) {
    var sql = "UPDATE guns SET \
            x = ?, \
            y = ?, \
            health = ? \
        WHERE \
            gunnr = ? AND games_id = ?;"
    var params = [gun.x, gun.y, gun.health, gun.gunnr, games_id];


    return new Promise(function (resolve, reject) {
        _db.run(sql, params, function (err) {
            if (err) {
                reject(err.message);
            }
            console.log(`A gun has been updated: ${this.lastID}`);
            resolve(this.lastID);
        });
    });
}


function getGameId(gameid) {
    //check if gameids unused
    var sql = "SELECT rowid FROM games WHERE gameid1 = ? OR gameid2 = ?"
    var params = [gameid, gameid];
    return new Promise(function (resolve, reject) {
        _db.get(sql, params, (err, row) => {
            if (err) {
                console.warn(err.message);
                reject(err);
            } else {
                if (row !== undefined && row.id !== undefined) {
                    resolve(row.id);
                } else {
                    reject("no game for this gameId: " + gameid)
                }

            }
        });
    });

}


function newgame(game) {

    var sql = "INSERT INTO games(gameid1, gameid2) VALUES (?,?)"
    var params = [game.gameid1, game.gameid2];


    return new Promise(function (resolve, reject) {
        _db.run(sql, params, function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`A game has been created: ${this.lastID}`);
            game.guns.forEach(gun => {
                console.log(gun)
                _newGun(this.lastID,gun)
            });
            /*for(var gun in game.guns){
                console.log("b" + gun);
            };*/
            resolve(this.lastID);
        });
    });
}

function _newGun(games_id, gun) {
    console.log(gun.owner)
    var sql = "INSERT INTO guns (games_id, gunnr, owner) VALUES (?,?,?);"
    var params = [games_id, gun.gunnr, gun.owner];

    return new Promise(function (resolve, reject) {
        _db.run(sql, params, function (err) {
            if (err) {
                console.log(gun);
                reject(err.message);
            }
            console.log(`A gun has been created: ${this.lastID}`);
            resolve(this.lastID);
        });
    });
}

module.exports = {
    init: init,
    gameIdcollision: gameIdcollision,
    saveGame: saveGame,
    getGame: getGame,
    getGameId: getGameId,
    newgame: newgame
}