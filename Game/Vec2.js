class Vec2{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    equals(that){
        return this.x===that.x && this.y === that.y
    }
}

export {Vec2}