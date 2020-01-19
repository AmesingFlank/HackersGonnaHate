
import { Vec2 } from "../Game/Vec2.js"

function readUserCode(bot, code){
    
    let temp = {}
    let newCode = 'temp = '+code
    eval(newCode)
    bot.getNextMove = temp.getNextMove
    bot.getAllMoves = temp.getAllMoves
}

export {readUserCode}