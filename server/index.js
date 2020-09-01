/*
Cannonistic by O.S. and Y.vK, done at the Bsc Inf @ FFHS (WenE)
*/

const PORT = 80


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

