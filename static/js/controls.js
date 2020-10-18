// Cannon controls
let myTurn = true;
let gunnr = 1;
let v0 = 1;
let elevation= 0;
let loadingInterval;
let jsonObject;
let firing = false;

// Handles mouse input
let oldY = 0;

let handleInput = function() {
    $("#foreground_canvas").bind("mousedown", function(e){
        console.log("down");
        loadingInterval = setInterval(load, 1);
    });

    $("#foreground_canvas").bind("mousemove", function(e) {

        if (oldY < e.pageY) {
            if (elevation > -7) {
                elevation--;
            }
        } else {
            if (elevation < 7) {
                elevation++;
            }
        }
        console.log("elevation: ", elevation)
        oldY = e.pageY;

    });

    $("#foreground_canvas").bind("mouseup", function(e){
        console.log("up");
        stopLoading();
        fire()
    });
};

// load
function load(){
    if (v0 <= 1024) {
        v0++;
        console.log('v0: ', v0);
    }
}

// Konnte das JSON-Schema nicht verwenden
function sendToServer(gun, v, e) {
    jsonObject = {
        "newturn": {
            "gunnr": gun,
            "v0" : v,
            "elevation": e,
        }
    }
    console.log(jsonObject);
    connection.send(JSON.stringify(jsonObject));
}

// fire
function fire() {
    console.log("fire");
    sendToServer(gunnr, v0, elevation);
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