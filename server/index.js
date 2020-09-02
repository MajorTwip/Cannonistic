/*
Cannonistic by O.S. and Y.vK, done at the Bsc Inf @ FFHS (WenE)
*/
var VERSION = "0.0.2" 



console.log(`Starting Cannoninistic Server V ${VERSION}`);

//Initializig Database
var CanonDB = require('./db');
var db = new CanonDB.CanonDB();

const PORT = 80;

//Define servers
var express = require('express');
var app = express();
var expressws = require('express-ws')(app);

//Defining the static files server. Serving from /static/
app.use(express.static('static'));

//Defining the WS server.
app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(msg);
    });
    console.log('socket', req.testing);
  });

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
  })


//Make server stoppable by ie Ctrl+C  
process.on('SIGINT', function() {
    console.log("Received SIGINT");
    process.exit();
});