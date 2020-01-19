import {Game,Bot,Hacker} from "../Game/Game.js"
import {Vec2} from "../Game/Vec2.js"

const getGameOfLevel = (level) => {
    if (level === 0) {
        let game = new Game(new Vec2(2,2), new Vec2(1,2));
        game.bots.push(new Bot(new Vec2(1,0), new Vec2(0,1),5));
        return game
    }
    if (level === 1) {
        let game = new Game(new Vec2(3,3), new Vec2(3,0));
        game.bots.push(new Bot(new Vec2(0,0), new Vec2(0,1),5));
        game.hackers.push(new Hacker(new Vec2(2,1 ), new Vec2(-1, 0)))
        game.hackers.push(new Hacker(new Vec2(1,3 ), new Vec2(1, 0)))
        return game
    }
    if (level === 2) {
        let game = new Game(new Vec2(5,5), new Vec2(5,5));
        game.bots.push(new Bot(new Vec2(0,0), new Vec2(0,1),5));
        game.hackers.push(new Hacker(new Vec2(1,3 ), new Vec2(0, -1)))
        game.hackers.push(new Hacker(new Vec2(3,4 ), new Vec2(-1, 0)))
        game.hackers.push(new Hacker(new Vec2(2,2 ), new Vec2(1, 0)))
        return game
    }
}

export{getGameOfLevel}