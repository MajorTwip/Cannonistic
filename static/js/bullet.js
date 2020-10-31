// bullet
let bullet = {
    x: 0 ,//width -290,
    y: 0,
    moveX: 0,
    moveY: 0,
    rad: 2,
    velo: 0,
    angle: 0,
    gravity: 9.81,
    bulletPath: [],
    i: 0,

    create: function(x, y, radius, velocity, angle){
        this.x = x;
        this.y = y;
        this.rad = radius;
        this.velo = velocity;
        this.angle = angle;
        return this;
    },

    trajectory: function(){
        /*
        let moveX;
        let moveY;

        this.velo = speed;
        this.angle = elevation;
        console.log('velo ', this.velo, 'angle', this.angle);

        let trajectory = (Math.tan(bullet.angle) - (bullet.gravity * bullet.x) / (Math.cos(bullet.angle) * bullet.velo ** 2));

        if (myTurn) {
            moveX = 6;
            moveY = -1 * trajectory;
        }else{
            moveX = -6;
            moveY = trajectory;
        }
        // shoot from left to right


         */

        console.log(this.bulletPath);
        let traceLength = this.bulletPath.length;

        if (this.i < traceLength) {
            this.moveX = this.bulletPath[this.i]["x"];
            this.moveY = this.bulletPath[this.i++]["y"];
            this.x += this.moveX;
            this.y += this.moveY;
        }


        // shoot from right to left

        // draw the bullet
        //bullet.draw(context);
    },

    draw: function(context){
        context.beginPath();
        context.fillStyle = 'BLACK';
        context.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    },

};