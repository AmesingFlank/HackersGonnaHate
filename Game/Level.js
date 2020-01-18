const getGameOfLevel = (level) => {
    if(level === 0){
        
        let game = new Game(new Vec2(3,3));
        game.bots.push(new Bot(new Vec2(1,0), new Vec2(0,1),5));
        return game

    }
}