// Cannon controls
let myTurn = true;
let gunnr = 1;
let v0 = 0;
let elevation = 0;
let loadingInterval;
let jsonObj_newturn;
let firing = false;

// elevation variables
let max_limit = 1600;
let min_limit = - max_limit;
let scaler = max_limit/90;

// Handles mouse input
let oldY = 0;

let handleInput = function() {
    $("#foreground_canvas").bind("mousedown", function(e){
        console.log("down");
        loadingInterval = setInterval(load, 1);
    });

    $("#foreground_canvas").bind("mousemove", function(e) {

        if (oldY > e.pageY) {
            if (elevation >= min_limit) {
                elevation = elevation - scaler;
            }
        } else {
            if (elevation <= max_limit)  {
                elevation = elevation + scaler;
            }
        }
        console.log("elevation: ", elevation)
        oldY = e.pageY;

        console.log(elevation / scaler);

    });

    $("#foreground_canvas").bind("mouseup", function(e){
        console.log("up");
        stopLoading();
        fire()
    });
};

// load
function load(){
    if (v0 < 1024) {
        v0+=4;
        console.log('v0: ', v0);
    }
}

// JSON-Objec should now match to JSON-Schema
function sendToServer(gun, v, e) {

    jsonObj_newturn = {
        "type": "newturn",
            "gunnr": gun,
            "v0" : Math.round(v),
            "elevation": Math.round(e)
    }

    console.log(jsonObj_newturn);
    connection.send(JSON.stringify(jsonObj_newturn));
}

// fire
function fire() {
    console.log("fire");
    sendToServer(gunnr, v0, getElevation());
    //v0 = 1;
    //elevation = 0;
    myTurn = false;
    firing = true;
    $("#foreground_canvas").unbind();

}

// Stops loading
function stopLoading(){
    clearInterval(loadingInterval);
}

function isMyTurn(){
    return myTurn;
}

function isFiring(){
    return firing;
}

function getElevation(){
    return elevation;
}

function getV0(){
    return v0;
}

if (isMyTurn()) {
    // Ready to go
    $(document).ready(function () {
        handleInput();
        console.log("register handlersS")
    });
}