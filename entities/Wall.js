export default class Wall {

    constructor(
        x,
        y,
        width,
        height,
        frames = []
    ) {

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.frames = frames;
        this.showHitbox = true;  
        this.showhitkey = 72; // H key
    }
    update() {
    if (keyIsPressed && keyCode === this.showhitkey) {
            if (!this.showHitbox) {
                this.showHitbox = true;
            }else {
                this.showHitbox = false;
            }
        }
    }
    draw() {

        if (
            this.frames &&
            this.frames.length > 0
        ) {

            image(
                this.frames[0],
                this.x,
                this.y,
                this.width,
                this.height
            );

        } else {

            fill(120);

            rect(
                this.x,
                this.y,
                this.width,
                this.height
            );
        }

        // DEBUG COLLIDER
        if(this.showHitbox){
        noFill();
        stroke(0, 255, 0);

        rect(
            this.x,
            this.y,
            this.width,
            this.height
        );}
    }
}