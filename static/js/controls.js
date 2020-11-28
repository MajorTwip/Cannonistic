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
let mouseX=-1;
let mouseY=-1;

// Turn controls
let playerone = false;


let handleInput = function() {
    $("#foreground_canvas").bind("mousedown", function(e){
        //console.log("down");
        loadingInterval = setInterval(load, 1);
    });

    $("#foreground_canvas").bind("mousemove", function(e) {
        let canvas = document.getElementById("foreground_canvas");
        let rect = canvas.getBoundingClientRect();
        let scaleX = canvas.width / rect.width;
        let scaleY = canvas.height / rect.height;
        mouseX = (e.clientX - rect.left) * scaleX;
        mouseY = canvas.height - ((e.clientY - rect.top) * scaleY);
    });

    $("#foreground_canvas").bind("mouseup", function(e){
        //console.log("up");
        stopLoading();
        fire()
    });
};

// load
function load(){
    if (playerone) {
        $("#powerindicator-l").addClass('loadpower');
    }else{
        $("#powerindicator-r").addClass('loadpower');
    }
    //let banner = document.querySelector('#powerindicator-l')
    //if (v0 < 1024) {
    //    v0+=4;
        //console.log('v0: ', v0);
    //}
}

// JSON-Object should now match to JSON-Schema
function sendToServer(gun, v, e) {
    if(v<1)v=1;
    jsonObj_newturn = {
        "type": "newturn",
            "gunnr": gun,
            "v0" : Math.round(v),
            "elevation": Math.round(e)
    }

    //console.log(jsonObj_newturn);
    connection.send(JSON.stringify(jsonObj_newturn));
}


// fire
function fire() {
    //console.log("fire");

    let power;
    let firepower;
    if (playerone) {
        power = document.getElementById('powerindicator-l');
        firepower = getComputedStyle(power).y;
        $("#powerindicator-l").removeClass('loadpower');

    }else{
        power = document.getElementById('powerindicator-r');
        firepower = getComputedStyle(power).y;
        $("#powerindicator-r").removeClass('loadpower');
    }

    console.log("all:", firepower);
    let str = firepower;
    let fl = str.substring(0, str.length - 1);
    let tmp = 100-parseFloat(fl);
    v0 = 1024/100*tmp;
    console.log("v0", Math.round(v0));
    bullet.muzzlePos(parseInt(fl));

    setGunNr();
    sendToServer(gunnr, Math.round(v0), getElevation());

    myTurn = false;
    firing = true;
    v0 = 1;
    bullet.i = 0;
    unbindHandler();
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

function getElevation(){
    if(currentgame==undefined)return NaN;
    if(!currentgame.hasOwnProperty("guns"))return NaN;
    console.log("calc")
    let guns = currentgame.guns;
    let ele = NaN
    guns.forEach(gun=>{
        if(gun.owner == $("#txt_youid").val()){
            //calculate elevation
            let deltaX=getMouseX()-gun.x;
            let deltaY=getMouseY()-gun.y;
            if(deltaY<=0)deltaY=1;
            ele = 1600/(Math.PI/2)*Math.atan(deltaX/deltaY);//should be 0-tolerant, JS retorns on x/0 "INFINITY" and ArcTan INFINITY shoulb be 0...
        };
    });
    return ele;
};

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
        console.log("register handlers")
    });
}