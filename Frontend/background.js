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
        this._padding = 10;
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


    update(timeDelta) {
        //console.log("Updating component id: ", this.id);
    }

    render(context) {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, this._width, this._height);
        this.drawGrid(context);
    }
    
    drawGrid(context){
        var dx = (this._width - this._padding * 2) / this._column
        var dy = (this._height - this._padding * 2) / this._row
        var diff = Math.min(dx, dy)
        var right = this._padding + this._column * diff
        var bottom = this._padding + this._row * diff

        for (var x = this._padding; x <= right; x += diff) {
            context.moveTo(x, this._padding);
            context.lineTo(x, bottom);
        }

        for (var x = this._padding; x <= bottom; x += diff) {
            context.moveTo(this._padding, x);
            context.lineTo(right, x);
        }
        context.strokeStyle = "white";
        context.stroke();
    }

}

export {Background}