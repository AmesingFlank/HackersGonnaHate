

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


    render(context, position, direction) {
        //console.log("sprite render");
        let rotate;
        if(direction.x == 0) {
            if(direction.y > 0){
                rotate = Math.PI / 2;
            }
            else { rotate = - Math.PI / 2};
        }
        else{
            if(direction.x > 0){
                rotate = 0;
            }
            else {rotate = Math.PI};
        }
        context.drawImage(this._image, position.x, position.y, 1, rotate);
    }
}

export {Sprite}