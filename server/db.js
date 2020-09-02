

function CanonDB(){
    console.log("initializing DB");
    var sqlite3 = require('sqlite3').verbose();
    var database = new sqlite3.Database('./data/db.sqlite',(err)=>{
        if(err){
            console.error("error occured: " . err.message);
            process.exit(1);
        }else{
            console.log("DB opened");
        }
    });
}

module.exports = {
    CanonDB : CanonDB
}