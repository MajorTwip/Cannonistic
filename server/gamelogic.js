var v0scale = 1/50;

class Game {
    constructor(gameid1, gameid2) {
        this.id = undefined;
        this.gameid1 = gameid1;
        this.gameid2 = gameid2;
        this.guns = new Array();
        this.wind = 0;
        this.state = "T1";
        if(Math.random()>0.5) this.state = "T2"; //Random definition who begins
        this.name1 = gameid1;
        this.name2 = gameid2;
        this.pass1 = "";
        this.pass2 = "";
        this.lastele = undefined;
        this.lastV0 = undefined;
        this.lastwind = undefined;
        this.level = 0;
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

    doTurn(msg, sock){
        var gameid = sock.gameid;
        var gun;
        this.guns.forEach((g)=>{if(g.gunnr==msg.gunnr)gun = g});
        if(gun===undefined)console.error("no gun with this nr");
        this.trajectory = this.getTrajectory(gun.x,gun.y,msg.elevation,msg.v0,this.wind);
    }
}

module.exports = {
    Game: Game
}