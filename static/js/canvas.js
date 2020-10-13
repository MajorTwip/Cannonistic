window.onload = function() {

    // Get canvas and context
    let b_canvas = document.getElementById("background_canvas"),
    f_canvas = document.getElementById("foreground_canvas");
    b_ctx = b_canvas.getContext("2d"),
    f_ctx = f_canvas.getContext("2d"),


    // Get Size of Window
    width = b_canvas.width = f_canvas.width = window.innerWidth,
    height = b_canvas.height = f_canvas.height = window.innerHeight;

    console.log(width, height);
    let scaleFactor = 0.03;

    x_pos = width * scaleFactor;
    y_pos = height - (height * scaleFactor)*5;

    console.log(x_pos, y_pos);

    // Initialize Objects
    cannon = cannon.create(f_ctx,x_pos, y_pos, false);
    //cannon_r = cannon.create(f_ctx,0, 0, true);
    barrel = barrel.create(x_pos, y_pos, width);
    bullet = bullet.create(x_pos, y_pos, 2, 90, 45);

    let myTurn = true;

    if (myTurn){
        controls = controls.create();
        controls.load(f_canvas);
        controls.elevate(f_canvas);
        controls.shoot(f_canvas);
    }

    /*
    //bullet = bullet.create(cannon.cannonXleft, cannon.cannonY,2, 92, 0.92),
    bullet = bullet.create(cannon.x_pos, cannon.cannonY,2, 92, 0.92),
    //controls = controls.create()
    controls.load(f_canvas);
    controls.elevate(f_canvas);

    myTurn = true;

    console.log(width);
    console.log(height);

    console.log(cannon.x_pos);

*/


    //elevate();
    function update(){
        let animation = requestAnimationFrame(update);

        f_ctx.clearRect(0, 0, width, height);
        b_ctx.clearRect(0, 0, width, height);


        // elevation barrel
        //let degree = controls.elevate(f_canvas);
        //console.log('degree: ' + degree);

        // Draw Tanks
        cannon.draw(f_ctx);
        //cannon_r.draw(f_ctx);

        // Draw bullet
        if (controls.shooting){
            bullet.draw(b_ctx);
            bullet.trajectory(b_ctx, true);
        }
        //barrel.draw(f_ctx);
        //barrel.elevate(f_ctx, cannon.x_pos, cannon.cannonY);

        let deg = controls.degree;
        barrel.draw(f_ctx);
        barrel.elevate(f_ctx, x_pos,y_pos , deg);







        //b_ctx.drawImage(cannon.img, 0, 0, 200, 100)



        // Collision detection
        let imageData;
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


    }

    // Animation
    update();
};