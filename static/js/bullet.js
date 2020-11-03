// bullet
let bullet = {
    x: 0 ,//width -290,
    y: 0,
    moveX: 0,
    moveY: 0,
    rad: 0,
    bulletPath: [],
    i: 0,

    create: function(x, y, radius){
        this.x = x;
        this.y = y;
        this.rad = radius;
        return this;
    },

    trajectory: function(){

        //console.log(this.bulletPath);
        let traceLength = this.bulletPath.length;


        if (this.i < traceLength) {

            this.x = Math.round(this.bulletPath[this.i]["x"]);
            this.y = Math.round(this.bulletPath[this.i++]["y"]);

        }
        else{
            setFiring(false);
        }
    },

    draw: function(context){
        console.log(this.x, this.y);
        context.beginPath();
        context.fillStyle = 'BLACK';
        context.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    },

};