let explosionImage = new Image();
explosionImage.src = "images/exp2_0.png";
let columns = 1;
let row = 0;
let animationFrames = 0;
let sx = 0;
let sy = 0;

function createExplosion() {
    let exp = {
        width: 64,
        height: 64,
        image: explosionImage
    }
    return exp;
}

function updateExplosion(ftp, exp){
    animationFrames += 1;

    columns = animationFrames/ftp;

    if (columns > 4){
        animationFrames = 0;
    }

    if (row > 4){
        isexploding = false;
        row = 0;
        return;
    }

    if (Number.isInteger(columns)){
        sx = (columns - 1) * exp.width;
        if ( columns-1 % 4 == 0) {
            sy = row * exp.height;
            row +=1;
        }
    }
}

function drawExplosion(context,exp, dx, dy){
    context.drawImage(explosionImage, sx, sy, exp.width, exp.height, dx, dy, 100, 100);
}


