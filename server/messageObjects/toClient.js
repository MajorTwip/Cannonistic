class Userevent{
    constructor(gameid, name){
        this.eventtype = "join";
        this.gameid = gameid;
        this.name = name;
    }

    toJson(){
        return JSON.stringify(this);
    }

    setNamechange(){
        this.eventtype = "namechange";
    }
}

class Chat{
    constructor(sender, message){
        this.type = "chat";
        this.sender = sender;
        this.chatmessage = message;
        this.msgid=0;
        this.datetime = Date.now();
    }

    toJson(){
        return JSON.stringify(this);
    }
}

module.exports = {
    Userevent:Userevent,
    Chat:Chat
}