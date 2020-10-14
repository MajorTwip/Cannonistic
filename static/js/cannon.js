let cannon = {
    img: new Image(),
    context: null,
    sf: 0.15,
    x: 0,
    y: 0,
    barrel: null,
    is_mirrored: false,


    create: function(context, x_pos, y_pos, is_mirrored = false){
        this.img.src = 'images/tank.png';
        if (is_mirrored){
            this.img = utils.mirrorImage(context, this.img,0,0,1,0);
        }
        this.x = x_pos;
        this.y = y_pos;
        //barrel = barrel.create(x_pos, y_pos, is_mirrored);
        return this;
    },



    draw: function(context, width){
        /*
        context.beginPath();
        context.fillStyle = 'BLUE';
        context.arc(this.x,this.y,20,0, Math.PI*2, false);
        context.fill();
        context.closePath();
        */


        //context.save();
        //let tank = utils.mirrorImage(context, this.tank, 0, 0,1 ,0 );
        //context.drawImage(this.tank, this.cannonXleft, this.cannonY , width*this.sf, width*this.sf/1.4);
        //context.translate(width - width * 0.28, 0);
        //context.drawImage(tank, this.x_pos, this.y_pos , width*this.sf, width*this.sf/1.4);
        context.drawImage(this.img, this.x, this.y, 140, 100);

        //context.drawImage(this.img, 0,0,140,100);

        //context.drawImage(this.img, this.x_pos, this.y_pos , width*this.sf, width*this.sf/1.4);
        //context.restore();
        //context.drawImage(mirrorImage(targetContext,tank,cannonXleft,cannonY, 1,0), cannonXleft,cannonY , width*sf, width*sf/1.4);
    },
};

/*
window.onload = function() {

    // Get canvas and context
    let b_canvas = document.getElementById("background_canvas");
    let f_canvas = document.getElementById("foreground_canvas");
    let b_ctx = b_canvas.getContext("2d");
    let f_ctx = f_canvas.getContext("2d");

    // Get Size of Window
    let width = b_canvas.width = f_canvas.width = window.innerWidth;
    let height = b_canvas.height = f_canvas.height = window.innerHeight;

    console.log(width);
    console.log(height);

    // load images
    let tank = new Image();
    let barrel = new Image();
    tank.src = 'images/tank.png';
    barrel.src = 'images/tank_barrel.png';

    // Tank positions

    // loading bullet


    function drawCannon(){
        f_ctx.drawImage(tank, width - width*0.15, height - height*0.20, width*0.112, width*0.08);
        f_ctx.drawImage(barrel, width - width*0.15, height - height*0.20, width*0.112, width*0.08);


        //f_ctx.drawImage(tank, 370, 370, width*0.112, width*0.08);
        //f_ctx.drawImage(barrel, 370, 370, width*0.112, width*0.08);
    }

    function rotateBarrel(degree){
        let xdev = 425;
        let ydev = 365;
        let dev = 0.85;
        let barrelLength = 135;
        //bullet.x = barrelLength * Math.sin(degree);
        //bullet.y = barrelLength * -Math.cos(degree);

        f_ctx.save();

        //targetContext.drawImage(barrel, 300, 250, width*sf, height*sf);
        f_ctx.translate(xdev,ydev);
        f_ctx.font = "20px Arial";
        f_ctx.fillText("0",0,0);
        //targetContext.fillText("o",ballx,bally);

//		targetContext.save();
        f_ctx.rotate(degree);
        f_ctx.translate(-xdev,-ydev);
        f_ctx.clearRect(0,0, width, height);
        f_ctx.translate(xdev,ydev);

        //f_ctx.beginPath();
        //f_ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI*2, false);
        //f_ctx.fill();

        f_ctx.translate(-xdev,-ydev);
        f_ctx.drawImage(barrel, 200, height -50, width*0.10, height*0.1);

//		targetContext.restore();
        f_ctx.restore();

    }

    function elevate() {
        let f_can = document.getElementById("foreground_canvas");
        //let degree= 20;
        f_can.addEventListener("mousemove", e=>{

            let center_x = 310;
            let center_y = 265;
            let mouse_x = e.pageX;
            let mouse_y = e.pageY;
            let radians = Math.atan2(mouse_x - center_x, mouse_y - center_y)*0.4;
            let degree = radians * 180 / Math.PI;
            console.log("rad:" + radians);
            console.log("result:" + degree);
            rotateBarrel(degree);

        }); }

    function fire(){
        //x += 1;
        //moveY = -1*(x*math.tan(bullet.angle) - (bullet.gravity*x**2)/(2*(bullet.velo**2)*math.pow(math.cos(bullet.angle),2)));
        let moveY = -1*(Math.tan(bullet.angle) - (bullet.gravity*bullet.x)/(Math.cos(bullet.angle)*bullet.velo**2));
        console.log(moveY);

        // shoot form right to left
        //bullet.x -= 1;
        //bullet.y -= moveY;// + height - height*0.1;

        // shoot from left to right
        bullet.x += 5;
        bullet.y += moveY;// + height - height*0.1;
        //drawBullet();
        bullet.draw(b_ctx);
    }

    function drawBullet(){

        b_ctx.beginPath();
        b_ctx.fillStyle = 'BLACK';
        b_ctx.arc(bullet.x, bullet.y, bullet.rad, 0, Math.PI * 2, false);
        b_ctx.fill();
        b_ctx.closePath();
    }

    function setVelocity(velo){
        bullet.velo = velo;
    }

    function setAngle(angle){
        bullet.angle = angle;
    }
};*/