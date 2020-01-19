"use strict";

import { Sprite } from "./sprite.js";


// The Background scene is drawn before everything else in the game. This means it's drawn at the back.
// At the moment it only has a ClearBackground entity, but any other entites added here would be drawn
// behind the player, the wanderers, the pickups and the score board.


class Background {
    constructor(width=1280, height=800, mapSize, destination) {
        this._time_scale = 1.0;

        console.log(this.nameAndID + " Constructing Background scene");
        this._width = width;
        this._mapSize = mapSize;
        this._height = height;
        this._row = mapSize.y;
        this._column = mapSize.x;
        this._sideLength = Math.min(this._height / (this._mapSize.y + 1), this._width / (this._mapSize.x + 1))
        this._destination = new Sprite(document.getElementById("Target"));
        this._destinationCoor = destination;
        this._shift = {x: this._width / 2 - this._sideLength * this._mapSize.x / 2, y: this._height / 2 - this._sideLength * this._mapSize.y / 2}
    }

    get time_scale() {
        return this._time_scale;
    }


    set time_scale(_time_scale) {
        this._time_scale = _time_scale;
    }


    addEntity(entity) {
        this._entities.push(entity);
    }


    removeEntity(entity) {
        for (var index = 0; index < this._entities.length; index++) {
            if (this._entities[index] == entity) {
                this._entities.splice(index, 1);
                break;
            }
        }
    }

    getSideLength(){
        return this._sideLength
    }

    update(timeDelta) {
        //console.log("Updating component id: ", this.id);
    }

    render(context) {
        context.fillStyle = "#999999";
        context.fillRect(0, 0, this._width, this._height);
        this.drawGrid(context);
        this._destination.render(context, this._destinationCoor, {sideLength: this._sideLength, mapSize: this._mapSize, shift: this._shift})
    }
    
    drawGrid(context){
        var left = this._width / 2 - this._sideLength * this._mapSize.x / 2;
        var right = this._width / 2 + this._sideLength * this._mapSize.x / 2;
        var top = this._height / 2 - this._sideLength * this._mapSize.y / 2;
        var bottom = this._height / 2 + this._sideLength * this._mapSize.y / 2;
        // this._shift = {x: left, y: top};

        for (var x = left; x <= right+5; x += this._sideLength) {
            context.moveTo(x, top);
            context.lineTo(x, bottom);
        }

        for (var x = top; x <= bottom+5; x += this._sideLength) {
            context.moveTo(left, x);
            context.lineTo(right, x);
        }
        context.strokeStyle = "white";
        for (var x = 1; x<=4; x++) {
            context.stroke();
        }
    }

}

export {Background}