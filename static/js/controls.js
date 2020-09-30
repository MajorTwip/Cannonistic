let utils =
{
    clamp: function (value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    }
}

let controls = {
    loadVelo: false,
    lv: false,
    velo: 0,
    degree: 0,

    create: function(){
        let obj = Object.create(this);
        return obj;
    },

    load: function(canvas){

        canvas.addEventListener("mousedown", e=> {
            if (this.velo < 100) {
                this.velo++;
                this.lv = setTimeout(this.load(canvas), 20);
            }
            console.log("velo " + this.velo);
        });
        },


    elevate: async function(canvas){
        //let f_can = document.getElementById("foreground_canvas");
        //let degree = 0;
        canvas.addEventListener("mousemove", e=>{

            let center_x = 310;
            let center_y = 265;
            let mouse_x = e.pageX;
            let mouse_y = e.pageY;
            let radians = Math.atan2(mouse_x - center_x, mouse_y - center_y)*0.4;
            this.degree = radians * 180 / Math.PI;
            console.log("rad_control:" + radians);
            console.log("result_control:" + this.degree);
            //rotateBarrel(degree);

        });
        return this.degree;
    },

    shoot: function (canvas){
        canvas.addEventListener("mouseup", e=>{


        });

    },

};
