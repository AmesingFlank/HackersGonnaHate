import {Game,Messenger,Hacker} from "../Game/Game.js"
import {Vec2} from "../Game/Vec2.js"
import {MODE_ALL_MOVES, MODE_NEXT_MOVE} from "../Game/Game.js";

const getGameOfLevel = (level) => {
    if (level === 0) {
        let game = new Game(new Vec2(2,2), new Vec2(1,2), MODE_ALL_MOVES,5);
        game.messengers.push(new Messenger(new Vec2(1,0), new Vec2(0,1),5));
        return game
    }
    if (level === 1) {
        let game = new Game(new Vec2(4, 4), new Vec2(2, 4), MODE_ALL_MOVES, 5);
        game.messengers.push(new Messenger(new Vec2(2, 0), new Vec2(0, 1), 5));
        let hacker = new Hacker(new Vec2(2, 2), new Vec2(-1, 0))
        hacker.getNextMove = (state) => {
            if (hacker.position.x === 0 && hacker.direction.x === -1) {
                return {x: 1, y: 0, goInvisible: false}
            } else if (hacker.position.x === 4 && hacker.direction.x === 1) {
                return {x: -1, y: 0, goInvisible: false}
            } else {
                return {x: hacker.direction.x, y: 0, goInvisible: false}
            }
        }
        game.hackers.push(hacker)
        return game
    }
    if (level === 2) {
        let game = new Game(new Vec2(5,5), new Vec2(5,5), MODE_ALL_MOVES, 5);
        game.messengers.push(new Messenger(new Vec2(0,0), new Vec2(0,1),5));
        game.hackers.push(new Hacker(new Vec2(1,3 ), new Vec2(0, -1)))
        game.hackers.push(new Hacker(new Vec2(3,4 ), new Vec2(-1, 0)))
        game.hackers.push(new Hacker(new Vec2(2,2 ), new Vec2(1, 0)))
        return game
    }
}

export{getGameOfLevel}