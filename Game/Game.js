import {Vec2} from 'Vec2.js'

class Action{
    constructor(direction, activateInvisibility){
        this.direction = direction;
        this.activateInvisibility = activateInvisibility
    }
}

class Bot{
    constructor(position, invisibilityCount){
        this.position = position
        this.invisibilityCount = invisibilityCount
        this.nextMove = (state) =>{

        }
        this.isInvisible = false;
        this.dead = false;
    }
}

class Hacker{
    constructor(position){
        this.position = position
        this.nextMove = (state) =>{
            return new Action(new Vec2(1,0),false)
        }
    }
}

class Game{
    constructor(mapSize){
        this.bots = []
        this.hackers = []
        this.mapSize = mapSize
    }
    step(){
        let state = this;
        for(let i = 0;i<this.bots.length;++i){
            let move = this.bots.nextMove(state)
            this.applyBotMove(this.bots[i],move)

        }
    }
    applyBotMove(bot,move){
        bot.position.x += move.direction.x;
        bot.position.y += move.direction.y;
        bot.position.x = Math.max(0,Math.min(bot.position.x,this.mapSize.x))
        bot.position.y = Math.max(0,Math.min(bot.position.y,this.mapSize.y))
        bot.isInvisible = move.activateInvisibility
    }
    applyHackerMove(hacker,move){
        hacker.position.x += move.direction.x;
        hacker.position.y += move.direction.y;
        hacker.position.x = Math.max(0,Math.min(hacker.position.x,this.mapSize.x))
        hacker.position.y = Math.max(0,Math.min(hacker.position.y,this.mapSize.y))
    }
    checkKilling(){
        
    }
}


