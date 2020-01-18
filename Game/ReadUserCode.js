import { Action } from "../Game/Game.js"
import { Vec2 } from "../Game/Vec2.js"

function readUserCode(bot, code){
    
    let temp = {}
    let newCode = 'temp = '+code
    eval(newCode)
    bot.nextMove = temp.nextMove
}

export {readUserCode}