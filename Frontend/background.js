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
        this._sizeLength = Math.min(this._height / (this._mapSize.y + 1), this._width / (this._mapSize.x + 1))
        this._destination = new Sprite(document.getElementById("Target"));
        this._destinationCoor = destination;
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

    getSizeLength(){
        return this._sizeLength
    }

    update(timeDelta) {
        //console.log("Updating component id: ", this.id);
    }

    render(context) {
        context.fillStyle = "#999999";
        context.fillRect(0, 0, this._width, this._height);
        this.drawGrid(context);
        this._destination.render(context, this._destinationCoor, {sizeLength: this._sizeLength, mapSize: this._mapSize})
    }
    
    drawGrid(context){
        var right = this._sizeLength / 2 + this._mapSize.x * this._sizeLength
        var bottom = this._sizeLength / 2 + this._mapSize.y * this._sizeLength

        for (var x = this._sizeLength / 2; x <= right; x += this._sizeLength) {
            context.moveTo(x, this._sizeLength / 2);
            context.lineTo(x, bottom);
        }

        for (var x = this._sizeLength / 2; x <= bottom; x += this._sizeLength) {
            context.moveTo(this._sizeLength / 2, x);
            context.lineTo(right, x);
        }
        context.strokeStyle = "white";
        for (var x = 1; x<=4; x++) {
            context.stroke();
        }
    }

}

export {Background}