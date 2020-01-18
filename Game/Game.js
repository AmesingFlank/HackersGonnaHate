import {Vec2} from './Vec2.js'

export class Action{
    constructor(direction, activateInvisibility){
        this.direction = direction;
        this.activateInvisibility = activateInvisibility
    }
}

export class Bot{
    constructor(position, direction, invisibilityCount){
        this.position = position
        this.direction = direction
        this.invisibilityCount = invisibilityCount
        this.isInvisible = false;
        this.dead = false;
        this.atDestination = false
        this.nextMove = (state) =>{
        this.printer = new Sprite(document.getElementById("Hacker"));

        }
    }

    render(context) {
        this.printer.render(context, this.position, this.direction)
    }
}

export class Hacker{
    constructor(position, direction){
        this.position = position
        this.direction = direction
        this.nextMove = (state) => {
            let weights = [0.25, 0.25, 0.25, 0.25] // possibilities of next move in the direction of E, N, W, S respectively
            weights = [0,1,0,0];
            let random = Math.random()
            let percentile = 0
            for (let i = 0; i < weights.length; i++) {
                percentile += weights[i];
                if (random <= percentile) {
                    if (i === 0) {
                        return new Action(new Vec2(1,0), false)
                    }
                    if (i === 1) {
                        return new Action(new Vec2(0,1), false)
                    }
                    if (i === 2) {
                        return new Action(new Vec2(-1,0), false)
                    }
                    if (i === 3) {
                        return new Action(new Vec2(0,-1), false)
                    }
                }
            }
        }
        
    }

    render(context) {
        if(!this.printer){
            this.printer = new Sprite(document.getElementById("Hacker"));
        }
        this.printer.render(context, this.position, this.direction)
    }
}

export class Game{
    constructor(mapSize,destination){
        this.bots = []
        this.hackers = []
        this.mapSize = mapSize
        this.destination = destination

        this.arrivedBots = []
        this.killedBots = []
    }
    step(){
        let state = this;
        for(let i = 0;i<this.bots.length;++i){
            let move = this.bots[i].nextMove(state)
            this.applyBotMove(this.bots[i],move)
            if(this.bots[i].position.equals(this.destination)){
                this.bots[i].atDestination = true;
                this.arrivedBots.push(this.bots[i])
            }
        }

        for(let i = 0;i<this.hackers.length;++i){
            let move = this.hackers[i].nextMove(state)
            this.applyBotMove(this.hackers[i],move)

        }
        this.checkKilling();
    }
    applyBotMove(bot,move){
        bot.position.x += move.direction.x;
        bot.position.y += move.direction.y;
        bot.position.x = Math.max(0,Math.min(bot.position.x,this.mapSize.x))
        bot.position.y = Math.max(0,Math.min(bot.position.y,this.mapSize.y))
        bot.direction = move.direction
        bot.isInvisible = move.activateInvisibility
    }
    applyHackerMove(hacker,move){
        hacker.position.x += move.direction.x;
        hacker.position.y += move.direction.y;
        hacker.position.x = Math.max(0,Math.min(hacker.position.x,this.mapSize.x))
        hacker.position.y = Math.max(0,Math.min(hacker.position.y,this.mapSize.y))
        hacker.direction = move.direction
    }
    checkKilling(){
        for (let hacker of this.hackers) {
            for (let bot of this.bots) {
                if(bot.dead || bot.atDestination){
                    continue;
                }
                if (hacker.direction.x === -1 && hacker.direction.y === 0 && hacker.position.x === bot.position.x && hacker.position.y >= bot.position.y) {
                    bot.dead = true
                }
                if (hacker.direction.x === 1 && hacker.direction.y === 0 && hacker.position.x === bot.position.x && hacker.position.y <= bot.position.y) {
                    bot.dead = true
                }
                if (hacker.direction.x === 0 && hacker.direction.y === 1 && hacker.position.y === bot.position.y && hacker.position.x <= bot.position.x) {
                    bot.dead = true
                }
                if (hacker.direction.x === 0 && hacker.direction.y === -1 && hacker.position.y === bot.position.y && hacker.position.x >= bot.position.x) {
                    bot.dead = true
                }
                if(bot.dead){
                    this.killedBots.push(bot)
                }
            }
        }
    }
}


