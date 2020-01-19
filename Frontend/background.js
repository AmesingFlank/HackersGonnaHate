"use strict";


// The Background scene is drawn before everything else in the game. This means it's drawn at the back.
// At the moment it only has a ClearBackground entity, but any other entites added here would be drawn
// behind the player, the wanderers, the pickups and the score board.


class Background {
    constructor(width=1280, height=800, row = 10, column = 10) {
        this._time_scale = 1.0;

        console.log(this.nameAndID + " Constructing Background scene");
        this._width = width;
        this._height = height;
        this._row = row;
        this._column = column;
        this._sizeLength = Math.min(this._height / (this._row + 1), this._width / (this._column + 1))
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
        context.fillStyle = "#333333";
        context.fillRect(0, 0, this._width, this._height);
        this.drawGrid(context);
    }
    
    drawGrid(context){
        var right = this._sizeLength / 2 + this._column * this._sizeLength
        var bottom = this._sizeLength / 2 + this._row * this._sizeLength

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