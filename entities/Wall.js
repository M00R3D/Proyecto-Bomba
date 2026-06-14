export default class Wall {

    constructor(x, y, w, h, frames) {

        this.x = x;
        this.y = y;

        this.width = w;
        this.height = h;

        this.frames = frames || [];
    }

    draw() {

        if (this.frames.length > 0) {

            image(
                this.frames[0],
                this.x,
                this.y,
                this.width,
                this.height
            );

        } else {

            fill("gray");
            rect(
                this.x,
                this.y,
                this.width,
                this.height
            );

        }
    }
}