let utils =
{
    clamp: function (value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    },

    mirrorImage: function(ctx, image, x = 0, y = 0, horizontal = false, vertical = false) {
        ctx.save();  // save the current canvas state
        ctx.setTransform(
            horizontal ? -1 : 1, 0, // set the direction of x axis
            0, vertical ? -1 : 1,   // set the direction of y axis
            x + horizontal ? image.width : 0, // set the x origin
            y + vertical ? image.height : 0   // set the y origin
        );
        ctx.restore()
        return image;

    },
}

let controls = {
    loadVelo: false,
    lv: null,
    velo: 0,
    degree: 0,
    shooting: false,

    create: function(){
        return this;
    },

    load: function(canvas){

        canvas.addEventListener("mousedown", e=> {
            if (this.velo < 100) {
                this.velo++;
                //this.lv = setTimeout(this.load(canvas), 20);

            }
            this.lv = setTimeout(this.load(canvas), 10);
            console.log("velo " + this.velo);

        });

        },


    elevate: function(canvas){
        //let f_can = document.getElementById("foreground_canvas");
        //let degree = 0;
        let center_x = 310;
        let center_y = 265;

        canvas.addEventListener("mousemove", e=>{


            let mouse_x = e.pageX;
            let mouse_y = e.pageY;
            //let radians = Math.atan2(mouse_x - center_x, mouse_y - center_y)*0.4;
            let radians = Math.atan2(mouse_y - center_y, mouse_x - center_x)*0.4;
            this.degree = radians * 180 / Math.PI;
            //console.log("rad_control:" + radians);
            //console.log("result_control:" + this.degree);
            //rotateBarrel(degree);

        });

    },

    shoot: function (canvas){
        canvas.addEventListener("mouseup", e=>{
            clearInterval(this.lv);
            this.shooting = true;
        });

    },

};
