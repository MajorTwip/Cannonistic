

function CanonDB(){

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

    });
}

module.exports = {
    CanonDB : CanonDB
}