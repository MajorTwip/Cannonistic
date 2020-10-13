// bullet
let bullet = {
    x: 0 ,//width -290,
    y: 0,
    rad: 2,
    velo: 0,
    angle: 0,
    gravity: 9.81,

    create: function(x, y, radius, velocity, angle){
        this.x = x;
        this.y = y;
        this.rad = radius;
        this.velo = velocity;
        this.angle = angle;
        return this;
    },

    trajectory: function(context, myTurn){
        let moveX;
        let moveY;
        let trajectory = (Math.tan(bullet.angle) - (bullet.gravity * bullet.x) / (Math.cos(bullet.angle) * bullet.velo ** 2));

        if (myTurn) {
            moveX = 6;
            moveY = -1 * trajectory;
        }else{
            moveX = -6;
            moveY = trajectory;
        }
        // shoot from left to right
        bullet.x += moveX;
        bullet.y += moveY;

        // shoot from right to left

        // draw the bullet
        //bullet.draw(context);
    },

    draw: function(context){
        context.beginPath();
        context.fillStyle = 'BLACK';
        context.arc(bullet.x, bullet.y, bullet.rad, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    },

};