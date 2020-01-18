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
    }

}

class Hacker{
    constructor(position){
        this.position = position
    }
}

class Game{
    constructor(mapSize){
        this.bots = []
        this.hackers = []
        this.mapSize = mapSize
    }

}

function read(code){
    var temp = {}
    var newCode = 'temp = ' + code;
    eval(newCode)
    temp.nextMove
}