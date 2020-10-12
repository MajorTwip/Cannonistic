var v0scale = 1/50;

class Game {
    constructor(gameid1, gameid2) {
        this.id = undefined;
        this.gameid1 = gameid1;
        this.gameid2 = gameid2;
        this.guns = new Array();
        this.newwind = 0;
    }

    initLevel(level) {
        switch (level) {
            case 1:
                var levels = require("./levels/level1");
                this.guns = levels.getInitialGunStates(this.gameid1,this.gameid2);
                this.level=1;
                break;
        }
    }

    calculateTrajectory(gunX, gunY, elevation, v0, wind, checkCollision){
        var traj = new Object();
        traj.trajectory = new Array();
        var eleInRad = elevation / 1600 * Math.PI / 2; //Oben = 0, Rechts = 1/2 Pi
        var x = gunX + (37 * Math.sin(eleInRad)); //add barrel
        var y = gunY + (37 * Math.cos(eleInRad));
        var vx = Math.sin(eleInRad) * v0 * v0scale;
        var vy = Math.cos(eleInRad) * v0 * v0scale;

        var timeline = 0

        traj.trajectory.push({"t":timeline,"x":x,"y":y}); // add first point just after the barrel

        while(!checkCollision(x,y)){
            timeline += 1;
            x=x+(vx/10); //move by tenth of a second (artillery standard)
            y=y+(vy/10);
            vy = vy - (9.81 / 10) // add gravity
            vx = vx + (wind / 1000) // add wind (factor to play)  
            traj.trajectory.push({"t":timeline,"x":x,"y":y}); // add first point just after the barrel
        }
        return traj;
    }

    getTrajectory(gunX, gunY, elevation, v0, wind){
        switch (this.level) {
            case 1:
                var level1 = require("./levels/level1");
                return this.calculateTrajectory(gunX, gunY, elevation, v0, wind, level1.checkCollision);
                break;
        }
        return undefined;
    }
}

module.exports = {
    Game: Game
}