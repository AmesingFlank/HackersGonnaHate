
function readUserCode(bot, code){
    let temp = {}
    let newCode = 'temp = '+code
    eval(newCode)
    bot.nextMove = temp.nextMove
}

export {readUserCode}