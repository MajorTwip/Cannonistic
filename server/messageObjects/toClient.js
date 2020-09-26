class Userevent{
    constructor(gameid, name){
        this.eventtype = "join";
        this.gameid = gameid;
        this.name = name;
    }

    toJson(){
        return JSON.stringify(this);
    }
}

module.exports = {
    Userevent:Userevent
}