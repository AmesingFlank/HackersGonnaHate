import { Action } from "../Game/Game"
import { Vec2 } from "../Game/Vec2"

{
    nextMove : ()=>{
        return new Action(new Vec2(0,1),false);
    }
}