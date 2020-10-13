let barrel = {
    img: new Image(),
    sf: 0.15,
    x: 0,
    y: 0,
    angle: 0,
    power: 0,
    bullet: null,
    is_mirrored: false,

    create: function(x_pos, y_pos, is_mirrored = false){
        this.img.src = 'images/tank_barrel.png';
        this.x = x_pos;
        this.y = y_pos;
        return this;
        //console.log(cannonXleft,cannonXright, cannonY)
    },


    elevate: function(context, xdev, ydev ,degree = 0 ){
        //let xdev = 425;
        //let ydev = 365;
        //let dev = 0.85;
        //let barrelLength = width*this.sf;
        //bullet.x = barrelLength * Math.sin(degree);
        //bullet.y = barrelLength * -Math.cos(degree);

        context.save();

        //targetContext.drawImage(barrel, 300, 250, width*sf, height*sf);
        context.translate(xdev,ydev);
        context.font = "20px Arial";
        context.fillText("0",50,50);
        //targetContext.fillText("o",ballx,bally);

//		targetContext.save();
        context.rotate(degree);
        context.translate(-xdev,-ydev);
        context.clearRect(0,0, width, height);
        context.translate(xdev,ydev);

        //f_ctx.beginPath();
        //f_ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI*2, false);
        //f_ctx.fill();

        context.translate(-xdev,-ydev);

//		targetContext.restore();
        context.restore();

    },

    load: function(context){
        controls.load(context);

    },

    draw: function(context, width){


        // draw left cannon
        //context.save();
        //let mirror_barrel_img = utils.mirrorImage(context, this.img, 0, 0,1 ,0 );
        //context.drawImage(this.tank, this.cannonXleft, this.cannonY , width*this.sf, width*this.sf/1.4);
        //context.translate(width - width * 0.28, 0);
        //context.drawImage(mirror_barrel_img, this.x, this.y , width*this.sf, width*this.sf/1.4);
        //context.beginPath();

        context.drawImage(this.img, this.x, this.y, 140, 100);


    },


};
