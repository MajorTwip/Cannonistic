// bullet
let bullet = {
    x_start: 0,
    y_start: 0,
    x: 0 ,//width -290,
    y: 0,
    ele: Math.PI/2,
    rad: 0,
    bulletPath: [],
    i: 0,

    create: function(radius){
        this.rad = radius;
        return this;
    },

    muzzlePos :function(ele){
        let rad = ele * Math.PI /180;
        console.log('rad', rad);



        this.x_start = barrel_width * Math.cos(rad) + this.bulletPath[0]["x"];
        this.y_start = barrel_heigt * -Math.sin(rad) + this.bulletPath[0]["y"];

        console.log('xs', this.x_start, 'ys',this.y_start);

    },

    trajectory: function(){


        let traceLength = this.bulletPath.length;


        if (this.i < traceLength) {
            console.log('bw', barrel_width, 'bh', barrel_heigt );
            this.x = this.x_start + Math.round(this.bulletPath[this.i]["x"]);
            this.y = this.y_start + -Math.round(this.bulletPath[this.i++]["y"]);
            console.log(this.x, this.y);
            //this.x += 50;
            //this.y -= 50;

        }
        else{
            this.i = 0;
            bullet.bulletPath = [];
            setFiring(false);
        }
    },

    draw: function(context){
        //console.log(this.x, this.y);
        context.beginPath();
        context.fillStyle = 'BLACK';
        context.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    },

};