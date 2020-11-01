window.onload = function () {

    // Get canvas and context
    var b_canvas = document.getElementById("background_canvas");
    var f_canvas = document.getElementById("foreground_canvas");
    var b_ctx = b_canvas.getContext("2d");
    var f_ctx = f_canvas.getContext("2d");

    let width;
    let height;

    // Get Size of Window
    //function adaptWindowSize()
    {
        /*
        width = b_canvas.width = f_canvas.width = window.innerWidth - 100;
        height = b_canvas.height = f_canvas.height = width * 1080 / 1920;
        */
        width = b_canvas.width = f_canvas.width = window.innerWidth;
        height = b_canvas.height = f_canvas.height = window.innerHeight;
    }

    //window.onresize = adaptWindowSize;

    var tank = new Image();
    var barrel = new Image();

    var tankpivotX = 880;
    var tankpivotY = 870;

    //redraw when images are loaded
    tank.onload = function () {
        tank.width = tank.naturalWidth;
        tank.height = tank.naturalHeight;
        drawCannons();
    }
    barrel.onload = function () {
        barrel.width = barrel.naturalWidth;
        barrel.height = barrel.naturalHeight;
        drawCannons();
    }

    tank.src = 'images/tank.png';
    barrel.src = 'images/tank_barrel.png';

    var scalingFactor = 10; // 1/x

    //To translate Floor=0 to Canvas' Heaven=0
    function translateY(coordY) {
        return (height - coordY)
    }


    function drawCannons() {
        f_ctx.setTransform(1, 0, 0, 1, 0, 0)
        f_ctx.clearRect(0, 0, f_canvas.width, f_canvas.height);

        //debug indicator
        f_ctx.fillRect(-2, -2, 20, 50 * Math.random());


        //TADA
        //Links = -1600
        //Rechts = +1600
        //getElevation liefert -7 bis +7 (Wieso?)
        //drawCannon(150, 150, 1600 * getElevation()/7);
        drawCannon(150, 150, getElevation());



        //DANCING CANNON
        drawCannon(1000, 150, -1600 + 3200 * Math.random());


    }

    function drawCannon(x, y, ele) {
        if (!barrel.complete && barrel.naturalHeight != 0) return;
        if (!tank.complete && tank.naturalHeight != 0) return;

        f_ctx.setTransform(1, 0, 0, 1, 0, 0)

        var baseele = -800; //elevation -1600(left) to +1600 right. baseele = Barreldirection without rotation
        var deltaele_rad = (ele - baseele) / 6400 * 2 * Math.PI; //360degrees are 2PI rad an 6400 artillery permille

        //console.log("H:" + tank.height * scalingFactor + " W:" + tank.width * scalingFactor + " ele:" + ele)
        //translete everything, so the pivot is on the origin (0,0)
        f_ctx.translate(x, translateY(y));

        //mirror if needed
        //Uf dä bini de huere Stolz! Nüt Stackoverflow oder so, LinAlg usem letschte semester, meh nid!
        if (ele >= 0) {
            var transform = f_ctx.getTransform()
            transform.a = -1
            f_ctx.setTransform(transform)
            deltaele_rad = Math.PI / 2 - deltaele_rad
        }
        //debug
        f_ctx.fillStyle = "pink"
        f_ctx.fillRect(-2, -2, 4, 4)

        //sub half of size to put center on coord (in y negated)
        f_ctx.drawImage(tank, -tankpivotX / scalingFactor, -tankpivotY / scalingFactor, tank.naturalWidth / scalingFactor, tank.naturalHeight / scalingFactor);

        //now begins the funny part
        f_ctx.rotate(deltaele_rad);
        f_ctx.drawImage(barrel, -tankpivotX / scalingFactor, -tankpivotY / scalingFactor, barrel.naturalWidth / scalingFactor, barrel.naturalHeight / scalingFactor);
    }

    console.log(width, height);
    let scaleFactor = 0.03;

    /*
    x_pos = width * scaleFactor;
    y_pos = height - (height * scaleFactor) * 5;


    console.log(x_pos, y_pos);
    */
    
    let angle = getElevation();
    let velocity = getV0();
    console.log('velo ', velocity, 'angle', angle);
    bullet = bullet.create(-tankpivotX / scalingFactor, -tankpivotY / scalingFactor, 50);


    //elevate();
    function update() {
        drawCannons();
        let animation = requestAnimationFrame(update);

        //f_ctx.clearRect(0, 0, width, height);
        b_ctx.clearRect(0, 0, width, height);


        // elevation barrel
        //let degree = controls.elevate(f_canvas);
        //console.log('degree: ' + degree);

        // Draw Tanks
        //cannon.draw(f_ctx);
        //cannon_r.draw(f_ctx);

        // Draw bullet
        if (isFiring()) {
            bullet.draw(b_ctx);
            bullet.trajectory();
        }
        //barrel.draw(f_ctx);
        //barrel.elevate(f_ctx, cannon.x_pos, cannon.cannonY);


        //let deg = getElevation();

        //barrel.elevate(f_ctx, x_pos,y_pos , deg*0.05);
        //barrel.draw(f_ctx);






        //b_ctx.drawImage(cannon.img, 0, 0, 200, 100)



        // Collision detection macht der Server
        /*let imageData;
        imageData = f_ctx.getImageData(bullet.x, bullet.y, bullet.rad, bullet.rad);
        imageData.crossOrigin = "Anonymous";
        if (imageData.data[3] > 0) {
            console.log(bullet.x, bullet.y, bullet.rad, bullet.rad, "imagedata " + imageData.data[3]);
            f_ctx.globalCompositeOperation = "destination-out";
            console.log("Hit");
            window.cancelAnimationFrame(animation);
        } else if (bullet.x > width || bullet.x <= 0
            || bullet.y > height || bullet.y <= 0) {
            console.log("Miss")
            window.cancelAnimationFrame(animation);
        }
        */

    }

    // Animation
    update();
};