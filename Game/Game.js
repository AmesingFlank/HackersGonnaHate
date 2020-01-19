import {Vec2} from './Vec2.js'
import {Sprite} from '../Frontend/sprite.js'

export const MODE_NEXT_MOVE = 111
export const MODE_ALL_MOVES = 222

export class Bot{
    constructor(position, direction, invisibilityCount){
        this.position = position
        this.direction = direction
        this.invisibilityCount = invisibilityCount
        this.isInvisible = true;
        this.dead = false;
        this.atDestination = false
       
    }

    render(context, board) {
        if(!this.printers){
            this.printers = [new Sprite(document.getElementById("Bot")), new Sprite(document.getElementById("TransparentBot"))];
        }
        if(!this.isInvisible) {
            this.printers[0].render(context, this.position, board);
        }
        else {
            console.log("hi")
            this.printers[1].render(context, this.position, board);
        }
    }
}

export class Hacker{
    constructor(position, direction ){
        this.position = position
        this.direction = direction
        
        this.getNextMove = (state) => {
            let weights = [0.25, 0.25, 0.25, 0.25] // possibilities of next move in the direction of E, N, W, S respectively
            let random = Math.random()
            let percentile = 0
            for (let i = 0; i < weights.length; i++) {
                percentile += weights[i];
                if (random <= percentile) {
                    if (i === 0) {
                        return {x:1,y:0,goInvisible:false}
                    }
                    if (i === 1) {
                        return {x:0,y:1,goInvisible:false}
                    }
                    if (i === 2) {
                        return {x:-1,y:0,goInvisible:false}
                    }
                    if (i === 3) {
                        return {x:0,y:-1,goInvisible:false}
                    }
                }
            }
        }
        
    }

    render(context, board) {
        if(!this.printer){
            this.printer = new Sprite(document.getElementById("Hacker"));
        }
        this.printer.render(context, this.position, board)
    }
}

export class Game{
    constructor(mapSize,destination,mode,botInvisibilityCount){
        this.bots = []
        this.hackers = []
        this.mapSize = mapSize
        this.destination = destination

        this.arrivedBots = []
        this.killedBots = []

        this.mode = mode
        this.botInvisibilityCount = botInvisibilityCount
    }
    step(){
        let state = this;
        for(let i = 0;i<this.bots.length;++i){
            let move = this.bots[i].getNextMove(state)
            this.applyBotMove(this.bots[i],move)
            if(this.bots[i].position.equals(this.destination)){
                this.bots[i].atDestination = true;
                this.arrivedBots.push(this.bots[i])
            }
        }

        for(let i = 0;i<this.hackers.length;++i){
            let move = this.hackers[i].getNextMove(state)
            this.applyBotMove(this.hackers[i],move)

        }
        this.checkKilling();
    }
    applyBotMove(bot,move){
        bot.position.x += move.x;
        bot.position.y += move.y;
        bot.position.x = Math.max(0,Math.min(bot.position.x,this.mapSize.x))
        bot.position.y = Math.max(0,Math.min(bot.position.y,this.mapSize.y))
        bot.direction.x = move.x
        bot.direction.y = move.y
        bot.isInvisible = move.goInvisible
    }
    applyHackerMove(hacker,move){
        hacker.position.x += move.x;
        hacker.position.y += move.y;
        hacker.position.x = Math.max(0,Math.min(hacker.position.x,this.mapSize.x))
        hacker.position.y = Math.max(0,Math.min(hacker.position.y,this.mapSize.y))
        hacker.direction.x = move.x
        hacker.direction.y = move.y
    }
    checkKilling(){
        for (let hacker of this.hackers) {
            for (let bot of this.bots) {
                if(bot.dead || bot.atDestination || bot.isInvisible){
                    continue;
                }
                // Kill bot if the distance between hacker and bot <= 1
                if (hacker.position.x === bot.position.x && hacker.position.y === bot.position.y) {
                    bot.dead = true
                }
                if(bot.dead){
                    this.killedBots.push(bot)
                }
            }
        }
    }
}


