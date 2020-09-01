var User = require("./game").User;
var Room = require("./game").Room;
var room1 = new Room();


const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({ port: 8088 });

console.log("Listening on Port 8088")

webSocketServer.on('connection', function (socket) {
    var user = new User(socket);
    room1.addUser(user);
    console.log("Connection established");
    var message = "Welcome " + user.id + "\n Total Users: " + room1.users.length;

    room1.sendAll(message);

});



}
/*
webSocketServer.on('connection', (webSocket) => {
    const remote_ip = webSocket.remoteAddress;
    const remote_port = webSocket.remotePort;
    console.log("Incoming connection from" + remote_ip +
    "on Port" + remote_port);
    webSocket.on('message', (message) => {
        console.log('Received:', message);
        broadcast(message);
    });
});
 */

Room.prototype.handleOnUserMessage = function(user){
    var room = this;
    user.socket.on("message", function(message){
        console.log("Receive MSG form " + user.id + ": " + message);
        broadcast(message);
    });
};


function broadcast(data) {
    webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}



