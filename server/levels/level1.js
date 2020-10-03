function getInitialGunStates(gameid1,gameid2){
    var guns = new Array();
    guns[0] = new Object();
    guns[0].gunnr = 0;
    guns[0].owner = gameid1;
    guns[0].health = 1024;
    guns[0].x=50;
    guns[0].y=0;
    guns[1] = new Object();
    guns[1].owner = gameid2;
    guns[1].health = 1024;
    guns[1].gunnr = 1;
    guns[1].x=0;
    guns[1].y=4096-50;
    return guns;
}

function getTrajectory(gunX, gunY, elevation, v0, wind, g=9.81){
    var traj = new Object();
    traj.trajectory = new Array();
    traj.trajectory.push({"t":0,"x":gunX,"y":gunY});
    traj.impactX = -1;
    traj.impactY = -1;
    return traj;
}


module.exports = {
    getInitialGunStates:getInitialGunStates,
    getTrajectory:getTrajectory
}