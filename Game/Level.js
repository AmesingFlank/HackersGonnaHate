import {Game,Messenger,Hacker} from "../Game/Game.js"
import {Vec2} from "../Game/Vec2.js"
import {MODE_ALL_MOVES, MODE_NEXT_MOVE} from "../Game/Game.js";

const getGameOfLevel = (level) => {
    if (level === 0) {
        let game = new Game(new Vec2(2,2), new Vec2(1,2), MODE_ALL_MOVES,5);
        game.messengers.push(new Messenger(new Vec2(1,0), new Vec2(0,1),5));
        game.initialCode = `
            {
                // How should the messenger move to where it should be?
                getAllMoves: (game, me) => {
                    me.move({x: , y:  });
                    me.move({x: , y:  })
                }
            }
        `;
        return game
    }
    if (level === 1) {
        let game = new Game(new Vec2(10,1), new Vec2(10,0), MODE_ALL_MOVES,5);
        game.messengers.push(new Messenger(new Vec2(0,0), new Vec2(0,1),5));
        game.initialCode = `
            {
                getAllMoves: (game, me) => {
                    let i;
                    // How many steps does the messenger need to move in a specific direction?
                    while (i < ) {
                        me.move({x: , y: });
                        i = i + 1
                    }
                }
            }
        `;
        return game
    }
    if (level === 2) {
        let game = new Game(new Vec2(1,10), new Vec2(0,10), MODE_ALL_MOVES,5);
        game.messengers.push(new Messenger(new Vec2(0,0), new Vec2(0,1),5));
        game.initialCode = `
            {
                getAllMoves: (game, me) => {
                    // How many steps does the messenger need to move in a specific direction?
                    for (let i = 0; i <  ; i++) {
                        me.move({x: , y:  })
                    }
                }
            }
        `;
        return game
    }
    if (level === 3) {
        let game = new Game(new Vec2(4, 1), new Vec2(2, 1), MODE_ALL_MOVES, 5);
        game.messengers.push(new Messenger(new Vec2(2, 0), new Vec2(0, 1), 5));
        let hacker = new Hacker(new Vec2(1, 1), new Vec2(1, 0));
        hacker.getNextMove = (state) => {
            if (hacker.position.x === 0 && hacker.direction.x === -1) {
                return {x: 1, y: 0, goInvisible: false}
            } else if (hacker.position.x === 4 && hacker.direction.x === 1) {
                return {x: -1, y: 0, goInvisible: false}
            } else {
                return {x: hacker.direction.x, y: 0, goInvisible: false}
            }
        };
        game.hackers.push(hacker);
        game.initialCode = `
            {
                getAllMoves: (game, me) => {
                    let hacker = game.hackers[0];
                    // A malicious hacker is looking for its prey on its row!
                    // In what situation is it definitely safe for the messenger to move forward?
                    if (hacker.position.x ===  ) {
                        return {x: 0, y: 1}
                    } else if (hacker.position.x ===  ) {
                        return {x: 0, y: 1}
                    } else {
                        return {x: 0, y: 0}
                    }
                }
            }
        `;
        return game
    }
    if (level === 4) {
        let game = new Game(new Vec2(10, 10), new Vec2(10, 10), MODE_ALL_MOVES, 5);
        game.messengers.push(new Messenger(new Vec2(0, 0), new Vec2(0, 1), 5));
        game.hackers.push(new Hacker(new Vec2(1, 1), new Vec2(-1, 0)));
        game.hackers.push(new Hacker(new Vec2(3, 3), new Vec2(-1, 0)));
        game.hackers.push(new Hacker(new Vec2(5, 5), new Vec2(-1, 0)));
        game.hackers.push(new Hacker(new Vec2(7, 7), new Vec2(-1, 0)));
        game.hackers.push(new Hacker(new Vec2(9, 9), new Vec2(-1, 0)));
        for (let hacker of game.hackers) {
            hacker.getNextMove = (state) => {
                if (hacker.position.x === 0 && hacker.direction.x === -1) {
                    return {x: 1, y: 0, goInvisible: false}
                } else if (hacker.position.x === 4 && hacker.direction.x === 1) {
                    return {x: -1, y: 0, goInvisible: false}
                } else {
                    return {x: hacker.direction.x, y: 0, goInvisible: false}
                }
            }
        }
        game.initialCode = `
            {
                getAllMoves: (game, me) => {
                    let hacker = game.hackers[0];
                    // More hackers are patrolling on their respective rows!
                    // Our messenger is actually more capable than you might have thought,
                    // you can make the messenger invisible to evade attacks - however, only 5 times.
                    for (let i = 0; i < 10 ; i++) {
                        if () {
                            me.move({x: 0, y: 0})
                        }
                    }
                }
            }
        `;
        return game
    }
};

export{getGameOfLevel}