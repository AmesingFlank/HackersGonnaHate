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
        game.title = "JavaScript 101 - Hellow World";
        game.description = `
Welcome to Hackers Gonna Hate! 
In this game, you will assist our lovely little messenger to go across a dangerous network filled with malicious softwares.
You will be able to guide our messenger with their language - JavaScript.
Never heard of it? That's okay! We will be here to help you master the language.
Hopefully after playing these introductory games, you will converse with our messenger with ease.
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
        game.title = "JavaScript 101 - while loop";
        get.description = `
A while loop look like this:

while (condition) {
    action
}

If the condition holds, then the action will be triggered;
and the action will be triggered until the condition has broken.
A very common implementation of while loop works like this:

    var i = 1; var sum = 0
    while (i <= 3) {
        sum = sum + i
        i = i + 1
    }

Take a moment to think about what the above code is doing?
.
.
.
That's right, the code is trying to sum up the numbers 1, 2 and 3!
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
        game.title = "JavaScript 101 - foor loop";
        get.description = `
A for loop generally has one of the following two forms:

    for (var i = 0; i < length; i++) {
        action
    }

This is equivalent to the while loop that we have introduced previously, except that we have piece together the construction of variable i, 
the condition it ought to hold and its increment within one pair of parentheses. 

The other form looks like this:

    for (var object of objects) {
        action
    }

Here, "objects" is an array (we will explain this term in more details afterwards!) containing some objects, as the name implies.
Then for every object in this array, we will carry out the action.

Now, let's try out our new friend, for loop!
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
        game.title("JavaScript 101 - if, else if, else");
        game.description(`
Think about this statement: "If the lecture tomorrow is at 9am, I will skip it. Otherwise, I'd better go", which describes 
a causal relationship. In fact, the "if" syntax in JavaScript is very similar to that of 
our daily language. When the event inside the parentheses after "if" is true, the events 
described in the following curly parentheses will happen. What's more exciting is the 
key word "else", which allows you to take other actions when things don't go as you have expected. 
Now, let us shapen our new weapon by practice.
`);
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
                return hacker.position.y === me.position.y + 1
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
            return {x: , y: , goInvisible:shouldGoInvisible}
        }
        else {
            return {x: , y: , goInvisible:false}
        }
    }
}
`;
        return game
    }
    if (level === 5) {
        let game = new Game(new Vec2(15, 15), new Vec2(15, 15), MODE_NEXT_MOVE, 5);
        game.messengers.push(new Messenger(new Vec2(0, 0), new Vec2(0, 1), 5));

        let hackerNum = Math.floor(Math.random() * 5) + 5;
        for (let i = 0; i < hackerNum; i++) {
            let x = Math.floor(Math.random() * 16);
            let y = Math.floor(Math.random() * 16);
            if (x === 0 && y === 0) {
                x = 15; y = 0
            }
            if (x === 15 && y === 15) {
                x = 0; y = 15
            }
            let dirx = Math.floor(Math.random() * 3) - 1;
            let diry = Math.floor(Math.random() * 3) - 1;
            game.hackers.push(new Hacker(new Vec2(x, y), new Vec2(dirx, diry)));
        }

        game.initialCode = `
{
    getNextMove: (game, me) => {
        
    }
}
`;
        return game
    }
};

export{getGameOfLevel}