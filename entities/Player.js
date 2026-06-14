export default class Player {

    constructor(x, y, frames) {
        this.x = x;
        this.y = y;

        this.width = 64;
        this.height = 64;

        this.frames = frames || [];
        this.frame = 0;
        this.animSpeed = 0.15;
    }

    update() {

        if (keyIsDown(65)) this.x -= 3;
        if (keyIsDown(68)) this.x += 3;

        this.frame += this.animSpeed;

        if (this.frame >= this.frames.length) {
            this.frame = 0;
        }
    }

    draw() {

        if (this.frames.length > 0) {

            const current =
                this.frames[Math.floor(this.frame)];

            image(
                current,
                this.x,
                this.y,
                this.width,
                this.height
            );

        } else {

            fill("red");
            rect(
                this.x,
                this.y,
                this.width,
                this.height
            );

        }
    }
}