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

        let scaler = 4;

        let barrel_length = Math.sqrt(barrel_width^2 + barrel_height^2) * scaler;
        console.log('barrel_length', barrel_length);
        /*
        this.x_start = barrel_length * Math.cos(rad);
        this.y_start = barrel_length * -Math.sin(rad);
*/
        this.x_start = 0;
        this.y_start = 0;

        console.log('barrel_w', barrel_width, 'barrel_h', barrel_height);

        console.log('xs', this.x_start, 'ys',this.y_start);

    },

    trajectory: function(context){

        let traceLength = this.bulletPath.length;

        if (this.i < traceLength) {
            if (this.i == 1){
                sound("fire");
            }
            console.log('bw', barrel_width, 'bh', barrel_height );
            this.x = this.x_start + Math.round(this.bulletPath[this.i]["x"]);
            this.y = this.y_start + -Math.round(this.bulletPath[this.i++]["y"]);

            this.draw(context);
            if (this.i == traceLength - 1){
                dx = this.x -48;
                dy = this.y -48;

                console.log('dx',dx,'dy', dy);
                isexploding = true;
                sound("explode")
            }
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