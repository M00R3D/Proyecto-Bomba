// entities/Entity.js

export default class Entity {

    constructor(x, y, frames = []) {
        this.x = x;
        this.y = y;
        this.frames = frames;
    }

    update() {}

    draw() {}
}