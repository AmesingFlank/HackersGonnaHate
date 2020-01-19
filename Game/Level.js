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
                    let i = 0;
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
        let game = new Game(new Vec2(4, 1), new Vec2(2, 1), MODE_NEXT_MOVE, 5);
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
                getNextMove: (game, me) => {
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
        let game = new Game(new Vec2(10, 10), new Vec2(10, 10), MODE_NEXT_MOVE, 5);
        game.messengers.push(new Messenger(new Vec2(0, 0), new Vec2(0, 1), 5));
        game.hackers.push(new Hacker(new Vec2(1, 1), new Vec2(-1, 0)));
        game.hackers.push(new Hacker(new Vec2(3, 3), new Vec2(1, 0)));
        game.hackers.push(new Hacker(new Vec2(5, 5), new Vec2(-1, 0)));
        game.hackers.push(new Hacker(new Vec2(7, 7), new Vec2(1, 0)));
        game.hackers.push(new Hacker(new Vec2(9, 9), new Vec2(-1, 0)));
        for (let hacker of game.hackers) {
            hacker.getNextMove = (state) => {
                if (hacker.position.x === 0 && hacker.direction.x === -1) {
                    return {x: 1, y: 0, goInvisible: false}
                } else if (hacker.position.x === 10 && hacker.direction.x === 1) {
                    return {x: -1, y: 0, goInvisible: false}
                } else {
                    return {x: hacker.direction.x, y: 0, goInvisible: false}
                }
            }
        }
        game.initialCode = `
            {
                getNextMove: (game, me) => {
                    // More hackers are patrolling on their respective rows!
                    // Our messenger is actually more capable than you might have thought,
                    // you can make the messenger invisible to evade attacks. 
                    // However, only 5 times - but sufficient for this game.
                    
                    // This is an auxiliary function which tells you whether a hacker will be on the same row as you if you move forward.
                    // Your messenger will be put into a dangerous position if that happens.
                    // Complete it by accessing the hackers array.
                    me.dangerous = () => {
                        for (    hacker    game.hackers) {
                            return hacker.position.y === bot.position.y + 1
                        }
                    }
                    
                    let hacker = game.hackers[0];
                    if (me.position.y < 10) {
                        let shouldGoInvisible;
                        if (me.dangerous()) {
                            // Change the visibility here!
                            shouldGoInvisible = 
                        }
                        else{
                            shouldGoInvisible = 
                        }
                        return {x: , y: ,goInvisible:shouldGoInvisible}
                    }
                    else {
                        return {x: , y: ,goInvisible:shouldGoInvisible}
                    }
                }
            }
        `;
        return game
    }
};

export{getGameOfLevel}