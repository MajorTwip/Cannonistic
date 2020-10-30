var v0scale = 1/500;
var gravityScale = 1/1;
var windScale = 1/1000;
var maxwind = 100;

function getDamage(xg,yg,x,y){
    var dist = Math.hypot(xg-x,yg-y);
    var dmg = 512 - (dist*10);
    if(dmg <0)dmg=0; 
    return Math.round(dmg);
}

var SenderObjects = require("./messageObjects/toClient")

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
        var traj = new Array();
        var eleInRad = elevation / 1600 * Math.PI / 2; //Oben = 0, Rechts = 1/2 Pi
        var x = gunX + (37 * Math.sin(eleInRad)); //add barrel
        var y = gunY + (37 * Math.cos(eleInRad));
        var vx = Math.sin(eleInRad) * v0 * v0scale;
        var vy = Math.cos(eleInRad) * v0 * v0scale;

        var timeline = 0

        traj.push({"t":timeline,"x":Math.round(x),"y":Math.round(y)}); // add first point just after the barrel

        while(!checkCollision(x,y)){
            timeline += 1;
            x=x+(vx/10); //move by tenth of a second (artillery standard)
            y=y+(vy/10);
            vy = vy - (9.81 / 10 * gravityScale) // add gravity
            vx = vx + (wind * windScale ) // add wind (factor to play)  
            traj.push({"t":timeline,"x":Math.round(x),"y":Math.round(y)}); // add first point just after the barrel
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


        //is it your turn?
        if((this.state == "T1" && gameid!=this.gameid1)||(this.state == "T2" && gameid!=this.gameid2)){
            var err = new SenderObjects.Error("Not your turn",202);
            sock.send(err.toJson());
            console.error("Not your turn");
            return;
        }
    
        //get gun
        var gun;
        this.guns.forEach((g)=>{if(g.gunnr==msg.gunnr)gun = g});
        if(gun===undefined){
            sock.send(new SenderObjects.Error("no gun with this nr",201).toJson());
            console.error("no gun with this nr");
            return;
        }

        this.trajectory = this.getTrajectory(gun.x,gun.y,msg.elevation,msg.v0,this.wind);
        var hitpt = this.trajectory.pop();
        this.trajectory.push(hitpt);

        var workingguns = [0,0]

        this.guns.forEach((g)=>{
            g.health -= getDamage(g.x,g.y,hitpt.x,hitpt.y);
            if(g.health<0)g.health=0;

            if(g.health>0 && g.owner == this.gameid1)workingguns[0]++
            if(g.health>0 && g.owner == this.gameid2)workingguns[1]++
        });

        if(workingguns[0]==0)this.state="W2"
        else if(workingguns[1]==0)this.state="W1"
        else if(workingguns[0]==0 && workingguns[1]==0)this.state="D"
        else if(this.state=="T1")this.state="T2"
        else if(this.state=="T2")this.state="T1"

        this.lastV0 = msg.v0;
        this.lastele = msg.lastele;
        this.lastwind = this.wind;
        this.wind = Math.round(Math.random() - 0.5 * 2 * maxwind);


    }
}

module.exports = {
    Game: Game
}