module.exports.User = User;
module.exports.Room = Room;

function User(socket){
    this.socket = socket;
    this.id = "1" + Math.floor(Math.random()*10000);
}

function Room(){
    this.users = [];
}

Room.prototype.addUser = function(user) {
    this.users.push(user);
    var room = this;
    this.handleOnUserMessage(user);

    // handle user closing
    user.socket.onclose = function () {
        console.log("Connection left");
        room.removeUser(user);
    }
};

Room.prototype.removeUser = function(user){
    // Loop to find user
    for (var i=this.users.length;i >=0;i--){
        if (this.users[i] === user){
            this.users.splice(i, 1)
        }
    }
};

Room.prototype.sendAll = function(message) {
    for (var i=0,len=this.users.length;i<len;i++){
        this.users[i].socket.send(message);
    }

};
