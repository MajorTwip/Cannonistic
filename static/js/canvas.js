let width;
let height;

let currentgame;

let barrel_width;
let barrel_heigt;

window.onload = function () {

    // Get canvas and context
    var b_canvas = document.getElementById("background_canvas");
    var f_canvas = document.getElementById("foreground_canvas");
    var b_ctx = b_canvas.getContext("2d");
    var f_ctx = f_canvas.getContext("2d");



    // Get Size of Window
    //function adaptWindowSize()
    {
        width = b_canvas.width;
        height = b_canvas.height;
    }

    //window.onresize = adaptWindowSize;

    var tank = new Image();
    var barrel = new Image();

    var tankpivotX = 880;
    var tankpivotY = 870;

    //redraw when images are loaded
    tank.onload = function () {
        tank.width = tank.naturalWidth;
        tank.height = tank.naturalHeight;
        drawCannons();
    }
    barrel.onload = function () {
        barrel.width = barrel_width = barrel.naturalWidth;
        barrel.height = barrel_heigt = barrel.naturalHeight;
        drawCannons();
    }

    tank.src = 'images/tank.png';
    barrel.src = 'images/tank_barrel.png';

    var scalingFactor = 10; // 1/x

    //To translate Floor=0 to Canvas' Heaven=0
    function translateY(coordY) {
        return (height - coordY)
    }


    function drawCannons() {
        f_ctx.setTransform(1, 0, 0, 1, 0, 0)
        f_ctx.clearRect(0, 0, f_canvas.width, f_canvas.height);

        //debug indicator
        f_ctx.fillRect(-2, -2, 20, 50 * Math.random());

        if(currentgame!==undefined){
            if(currentgame.hasOwnProperty("guns")){
                let guns = currentgame.guns;
                guns.forEach(gun=>{
                    let ele = 800;
                    if(gun.owner == $("#txt_youid").val() && myTurn){
                        //calculate elevation
                        let deltaX=getMouseX()-gun.x;
                        let deltaY=getMouseY()-gun.y;
                        if(deltaY<=0)deltaY=1;
                        let ele = Math.atan(deltaX/deltaY);//should be 0-tolerant, JS retorns on x/0 "INFINITY" and ArcTan INFINITY shoulb be 0...
                        drawCannon(gun.x,gun.y,ele*1600/(Math.PI/2))
                        }else{
                            drawCannon(gun.x,gun.y,ele)
                        }
                });
            }
        }


    }

    function drawCannon(x, y, ele) {
        if (!barrel.complete && barrel.naturalHeight != 0) return;
        if (!tank.complete && tank.naturalHeight != 0) return;

        f_ctx.setTransform(1, 0, 0, 1, 0, 0)

        var baseele = -800; //elevation -1600(left) to +1600 right. baseele = Barreldirection without rotation
        var deltaele_rad = (ele - baseele) / 6400 * 2 * Math.PI; //360degrees are 2PI rad an 6400 artillery permille

        //console.log("H:" + tank.height * scalingFactor + " W:" + tank.width * scalingFactor + " ele:" + ele)
        //translete everything, so the pivot is on the origin (0,0)
        f_ctx.translate(x, translateY(y));

        //mirror if needed
        //Uf dä bini de huere Stolz! Nüt Stackoverflow oder so, LinAlg usem letschte semester, meh nid!
        if (ele >= 0) {
            var transform = f_ctx.getTransform()
            transform.a = -1
            f_ctx.setTransform(transform)
            deltaele_rad = Math.PI / 2 - deltaele_rad
        }
        //debug
        f_ctx.fillStyle = "pink"
        f_ctx.fillRect(-2, -2, 4, 4)

        //sub half of size to put center on coord (in y negated)
        f_ctx.drawImage(tank, -tankpivotX / scalingFactor, -tankpivotY / scalingFactor, tank.naturalWidth / scalingFactor, tank.naturalHeight / scalingFactor);

        //now begins the funny part
        f_ctx.rotate(deltaele_rad);
        f_ctx.drawImage(barrel, -tankpivotX / scalingFactor, -tankpivotY / scalingFactor, barrel.naturalWidth / scalingFactor, barrel.naturalHeight / scalingFactor);
    }

    console.log(width, height);

    
    bullet = bullet.create(10);


    function update() {
        drawCannons();
        let animation = requestAnimationFrame(update);

        b_ctx.clearRect(0, 0, width, height);

        b_ctx.translate(0, height);
        b_ctx.clearRect(0, 0, width, -height);
        bullet.draw(b_ctx);
        bullet.trajectory();
        b_ctx.translate(0, -height);

    }

    // Animation
    update();
};