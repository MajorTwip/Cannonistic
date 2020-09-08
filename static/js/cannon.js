
// Get canvas and context
var canvas = document.getElementById("can_game");
var ctx = canvas.getContext("2d");

// Get Size of Window
var width = canvas.width = window.innerWidth - 100;
var height = canvas.height = window.innerHeight - 100;

// Trajectory variables
var pos = { x: 100, y: height - 100 };
var velo = 10,
    corner = 50,
    rad = 2;
var ball = { x: pos.x, y: pos.y };
var time = 0.1;
var angle = math.PI/4;
var gravity = 9.81;
var vuln = 20;

var startShoot;

var myTurn = true;

var scalingFactor = 0.998;

// Ready to go
$(document).ready(function(){
    drawCannons ();
    handleInput();
});

// places both cannons in the field

// To adjust scaleFactor
function scaleImage(image, scaleFactor){
    image.height = 200;
    image.width = image.height/1.4;
    return image;
}

function mirrorImage(ctx, image, x = 0, y = 0, horizontal = false, vertical = false){
    ctx.save();  // save the current canvas state
    ctx.setTransform(
        horizontal ? -1 : 1, 0, // set the direction of x axis
        0, vertical ? -1 : 1,   // set the direction of y axis
        x + horizontal ? image.width : 0, // set the x origin
        y + vertical ? image.height : 0   // set the y origin
    );
    return image;
    ctx.drawImage(image,0,0);
    ctx.restore(); // restore the state as it was when this function was called
}

var cannon_mirrored;
var barrel_mirrored;
var cannon_height;
var cannon_with;

function drawCannons(){

    var tank = new Image();
    var barrel = new Image();
    tank.src = 'images/tank.png';
    barrel.src = 'images/tank_barrel.png';

    // scaling tank and barrel
    var cannon_resized = scaleImage(tank, 0);
    var barrel_resized = scaleImage(barrel, 0);

    // mirroring tank and barrel to the left
    cannon_mirrored = mirrorImage(ctx, tank, 0, 0, true, false);
    barrel_mirrored = mirrorImage(ctx, barrel, 0, 0, true, false);

    x_pos = -100;
    y_pos = scalingFactor * height - cannon_resized.height;
    sym_x_pos = (scalingFactor-0.05) * width - cannon_resized.width;

    //ctx.drawImage(barrel,x_pos, y_pos, c_height, c_width);
    cannon_height = cannon_resized.height;
    cannon_with = cannon_resized.width;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    //ctx.drawImage(cannon_mirrored, x_pos, y_pos, cannon_height, cannon_with);
    //ctx.drawImage(barrel_mirrored,x_pos, y_pos, cannon_height, cannon_with);

    // draw right cannon
    ctx.drawImage(cannon_mirrored, -canvas.width + 200, y_pos, cannon_height, cannon_with);
    ctx.drawImage(barrel_mirrored, -canvas.width + 200, y_pos, cannon_height, cannon_with);

    // draw left cannon
    ctx.drawImage(cannon_resized, x_pos, y_pos, cannon_height, cannon_with);
    ctx.drawImage(barrel_resized, x_pos, y_pos, cannon_height, cannon_with);
    ctx.restore();
}

function elevateBarrel(image, x, y, scale, degree){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.translate(image.width/2, image.height/2);
    //ctx.translate(200, 500);
    ctx.setTransform(scale, 0, 0, -scale, x, y); // sets scale and origin
    ctx.rotate(degree);
    //ctx.drawImage(image, -image.width / 2, -image.height / 2);
    //ctx.drawImage(image, 500, 400);

    ctx.restore();
    //drawCannons();
}


// Elevation of Tube
function elevation(angle){
    angle = angle;

}

// Power of the shot
var allowVelo = false;
function startVelo(){
    if (allowVelo && velo < 100){
        velo ++;
        setTimeout("startVelo()", 20);
    }
    console.log(velo);
}

function stopVelo(){
    allowVelo = false;
}


var moveX = -1;
var moveY = -1;//-(gravity/(2*velo**2*math.cos(angle)**2))*ball.x**2 + math.tan(angle)*ball.x;
// Calculates the trajectory of the bullet
function trajectory(){
    time = time + 0.1;

    //var moveX = (-velo * Math.cos(angle) * time)/width;
    //var moveY = (velo * Math.sin(angle) * time - gravity/2*time)/height;



    console.log(moveX, moveY);
    if (ball.x > canvas.width - rad || ball.x < rad ||
        ball.y > canvas.height - rad || ball.y < rad){
            stopFire();
    }

    //ball.x += moveX;
    ball.x += moveX;
    ball.y += moveY;
    //console.log("X:" + ball.x + " Y:" + ball.y);
}

// Drawing the Bullet
function drawBullet(){
    ctx.beginPath();
    ctx.fillStyle = 'BLACK';
    ctx.arc(ball.x, ball.y, rad, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
}

// Handles mouse input
handleInput = function() {
    $("#can_game").bind("mousedown", function(e){
        console.log("down");
        allowVelo = true;
        startVelo();
     });

    $("#can_game").bind("mousemove", function(e){
        console.log("move");
        //mouseY = e.pageY - rect.top ;

        //console.log(mouseY);
        //console.log(e.pageY);
        //cannon.style.rotate = "90deg";
        //canvas.style.transform = 'rotate(180deg)';
        //ctx.drawImage(cannon, sym_x_pos, y_pos, c_height, c_width)

        var offset = canvas.getBoundingClientRect();
        var center_x = (offset.left) + (barrel_mirrored.width / 2);
        var center_y = (offset.top) + (barrel_mirrored.height / 2);
        var mouse_x = e.pageX;
        var mouse_y = e.pageY;
        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y)*(-0.4);
        //var radians = Math.atan2(mouse_y - center_y, mouse_x - center_x);
        var degree = (radians * (180 / Math.PI) * -1)+90;
        console.log("rad:" + radians );

        console.log("degree:" + degree);

        //drawImage(cannon_left, cannon_left.width/2, cannon_left.height/2,0.05,degree);
        //if (degree > 100 && degree < 110) {
        elevateBarrel(barrel_mirrored, - cannon_with + 335 , height - 110, 0.1, degree) ;
        //}
        //drawRotated(cannon_left, degree);
        //cannon.style.transform = "rotate("+ degree +"deg)";

    });


    $("#can_game").bind("mouseup", function(e){
        console.log("up");
        stopVelo();
        startShoot = setInterval(shoot, 10);
        velo = 0;
        });
};

// fire
function shoot() {
    ctx.clearRect(0, 0, width, height);
    drawCannons();
    trajectory();
    drawBullet();
}

// Stops fire
function stopFire(){
    clearInterval(startShoot);
}