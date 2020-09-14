var _db;

function init(){

    console.log("initializing DB");
    var sqlite3 = require('sqlite3').verbose();
    var database = new sqlite3.Database('./data/db.sqlite',(err)=>{
        
        //open DB
        if(err){
            console.error("error occured: " + err.message);
            process.exit(1);
        }else{
            console.log("DB opened");
        }

        //check if allread tables created
        var sql = "SELECT name FROM sqlite_master WHERE type='table' AND name=?;";
        var params = ["games"];


        database.get(sql, params, (err, row) => {
            if(err){
                console.error(err.message);
            }
            if(row==undefined){
                console.log("Database seems to be empty, creating tables");
                require("./db_createtables").create(database);
            }
        });
        _db=database;
    });
}

function gameIdcollision(gameid,enygameid){
    //check if gameids unused
    var sql = "SELECT COUNT(*) FROM games WHERE gameid1 = ? OR gameid1 = ? OR gameid2 = ? OR gameid2 = ?"
    var params = [gameid,enygameid,gameid,enygameid];
    return new Promise(function(resolve,reject){
        _db.get(sql, params, (err, row) => {
            if (err) {
                console.warn(err.message);
                reject(err);
            }
            if(row["COUNT(*)"]>0){
                console.log("gameId Duplicate");
                resolve(true);
            }else{
                resolve(false);
            }
        });
    });
}


function getGame(gameid){
    //check if gameids unused
    var sql = "SELECT * FROM games WHERE gameid1 = ? OR gameid2 = ?"
    var params = [gameid,gameid];
    return new Promise(function(resolve,reject){
        _db.get(sql, params, (err, row) => {
            if (err) {
                console.warn(err.message);
                reject(err);
            }else{
                resolve(row);
            }
        });
    });

}


function newgame(gameid,enygameid){
    
        var sql = "INSERT INTO games VALUES (?,?)"
        var params = [gameid,enygameid];
       

        return new Promise(function(resolve,reject){
            _db.run(sql,params, function(err) {
                if (err) {
                  return console.log(err.message);
                }
                console.log(`A game has been created: ${this.lastID}`);
                resolve(this.lastID);
            });
        });
}

module.exports = {
    init : init,
    gameIdcollision: gameIdcollision,
    getGame:getGame,
    newgame : newgame
}