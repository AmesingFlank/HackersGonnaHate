

// Components can be added to Entity objects to give them special behaviours.
// Components can be updated and rendered.
// Any given Entity can only have one instance of any given Component (arbitrarily.)

var next_component_id = 0;

class Sprite{
    constructor(image) {
        // Give each component a unique identifier as it's created. This can help with debugging.
        this._id = next_component_id++;
        this._image = image;
    }


    get id() {
        return this._id;
    }


    set owner(owner) {
        this._owner = owner;
    }


    get name() {
        return this.constructor.name;
    }


    get nameAndID() {
        return this.constructor.name + "[" + this._id + "]";
    }


    render(context, position, board) {
        let temp = board.sideLength;
        //console.log(temp / 2+ (position.x) * temp - temp * 0.4 + board.shift.x)
        //console.log(position)
        context.drawImage(this._image, board.shift.x + board.sideLength * position.x - temp * 0.4, board.shift.y + board.sideLength * (board.mapSize.y - position.y) - temp * 0.4, temp * 0.8, temp * 0.8);
    }
}

export {Sprite}