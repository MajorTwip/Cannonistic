// Cannon controls
let myTurn = true;
let gunnr = -1;
let v0 = 0;
let elevation = 800;
let loadingInterval;
let jsonObj_newturn;
let firing = false;

// elevation variables
let max_limit = 1600;
let min_limit = - max_limit;
let scaler = max_limit/90;

// Handles mouse input
let oldY = 0;
let mouseX=-1;
let mouseY=-1;

// Turn controls
let playerone = false;
let playertwo = false;

let handleInput = function() {
    $("#foreground_canvas").bind("mousedown", function(e){
        //console.log("down");
        loadingInterval = setInterval(load, 1);
    });

    $("#foreground_canvas").bind("mousemove", function(e) {
        mouseX = e.page;
        mouseX = e.pageY;
        console.log(`X: ${mouseX} Y: ${mouseY}`);


        /*
        if (oldY > e.pageY) {
            if (elevation >= min_limit) {
                elevation = elevation - scaler;
            }
        } else {
            if (elevation <= max_limit)  {
                elevation = elevation + scaler;
            }
        }
        //console.log("elevation: ", elevation)
        oldY = e.pageY;
        */
        //console.log(elevation / scaler);

    });

    $("#foreground_canvas").bind("mouseup", function(e){
        //console.log("up");
        stopLoading();
        fire()
    });
};

// load
function load(){
    if (v0 < 1024) {
        v0+=4;
        //console.log('v0: ', v0);
    }
}

// JSON-Object should now match to JSON-Schema
function sendToServer(gun, v, e) {
    setGunNr();
    jsonObj_newturn = {
        "type": "newturn",
            "gunnr": gunnr,
            "v0" : Math.round(v),
            "elevation": Math.round(e)
    }

    //console.log(jsonObj_newturn);
    connection.send(JSON.stringify(jsonObj_newturn));
}

// fire
function fire() {
    //console.log("fire");

    sendToServer(gunnr, v0, getElevation());
    myTurn = false;
    firing = true;
    unbindHandler();
    v0 = 1;
    elevation = 800;
    bullet.i = 0;
}

function unbindHandler(){
    $("#foreground_canvas").unbind();
}

// Stops loading
function stopLoading(){
    clearInterval(loadingInterval);
}

function setMyTurn(myturn){
    myTurn = myturn;
}

function isMyTurn(){
    return myTurn;
}

function setFiring(fire){
    firing = fire;
}

function isFiring(){
    return firing;
}

function getMouseX(){
    return mouseX;
}

function getMouseY(){
    return mouseY;
}

function getV0(){
    return v0;
}

function setGunNr(){
    if (playerone){
        gunnr = 0;
    }
    else{
        gunnr = 1;
    }
}

function getGunNr(){
    return gunnr;
}

if (isMyTurn()) {
    // Ready to go
    $(document).ready(function () {
        console.log("register handlersS")
    });
}