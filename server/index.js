/*
Cannonistic by O.S. and Y.vK, done at the Bsc Inf @ FFHS (WebE)
*/
var VERSION = "0.0.3" 



console.log(`Starting Cannoninistic Server V ${VERSION}`);

//Initializig Database
var db = require('./db');
db.init();

const PORT = 80;

//Define servers
var express = require('express');
var app = express();
var expressws = require('express-ws')(app);

//Defining the static files server. Serving from /static/
app.use(express.static('static'));

//Defining the WS server.
//Delegate handlich to ws_handler
var ws_handler = require("./ws_handler.js");
app.ws('/', (ws,req)=>ws_handler.handlews(ws,req));

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
  })


//Make server stoppable by ie Ctrl+C  
process.on('SIGINT', function() {
    console.log("Received SIGINT");
    process.exit();
});
