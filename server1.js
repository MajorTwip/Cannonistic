const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({ port: 8088 });

console.log("Listening on Port 8088")

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

function broadcast(data) {
    webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}