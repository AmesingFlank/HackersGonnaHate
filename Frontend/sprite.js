

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
        context.drawImage(this._image, board.padding + (position.x) * board.sizeLength - 16, board.padding + (position.y) * board.sizeLength - 16, 32, 32);
    }
}

export {Sprite}