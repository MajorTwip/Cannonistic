function getInitialGunStates(gameid1,gameid2){
    var guns = new Array();
    guns[0] = new Object();
    guns[0].gunnr = 0;
    guns[0].owner = gameid1;
    guns[0].health = 1024;
    guns[0].x=50;
    guns[0].y=100;
    guns[1] = new Object();
    guns[1].owner = gameid2;
    guns[1].health = 1024;
    guns[1].gunnr = 1;
    guns[1].x=4096-50;
    guns[1].y=100;
    return guns;
}

function checkCollision(x,y){
    if(y<=100) return true; //Below Horizon
    if(Math.abs(x-50)<30 || Math.abs(x-(4096-50))<30){ //Koord X is less than 30Px from a guncenter
        if(Math.abs(y-100)<20) return true; // Koord Y is less than 20Px from guncenter. This gives an 60x40px HitBox
    }
    return false;
}


module.exports = {
    getInitialGunStates:getInitialGunStates,
    checkCollision:checkCollision
}