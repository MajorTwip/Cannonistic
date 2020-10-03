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

    getTrajectory(gunX, gunY, elevation, v0, wind){
        switch (this.level) {
            case 1:
                var level1 = require("./levels/level1");
                return level1.getTrajectory(gunX, gunY, elevation, v0, wind);
                break;
        }
        return undefined;
    }
}

module.exports = {
    Game: Game
}