export default class Player {

    constructor(x, y, frames) {

        this.x = x;
        this.y = y;

        // collider
        this.width = 32;
        this.height = 32;

        // visual
        this.drawWidth = 32;
        this.drawHeight = 32;

        // physics
        this.vx = 0;
        this.vy = 0;

        this.acceleration = 0.8;
        this.maxSpeed = 6;

        this.gravity = 0.5;
        this.friction = 0.8;

        this.jumpForce = 12;

        this.onGround = false;

        // animation
        this.frames = frames || [];
        this.frame = 0;
        this.animSpeed = 0.15;
    }

    collidesWith(entity) {

        return (
            this.x < entity.x + entity.width &&
            this.x + this.width > entity.x &&
            this.y < entity.y + entity.height &&
            this.y + this.height > entity.y
        );
    }

    update(walls) {

        //----------------------------------
        // INPUT
        //----------------------------------

        if (keyIsDown(65)) { // A
            this.vx -= this.acceleration;
        }

        if (keyIsDown(68)) { // D
            this.vx += this.acceleration;
        }

        //----------------------------------
        // JUMP
        //----------------------------------

        if (
            keyIsDown(87) &&
            this.onGround
        ) {
            this.vy = -this.jumpForce;
            this.onGround = false;
        }

        //----------------------------------
        // LIMIT SPEED
        //----------------------------------

        this.vx = constrain(
            this.vx,
            -this.maxSpeed,
            this.maxSpeed
        );

        //----------------------------------
        // FRICTION
        //----------------------------------

        this.vx *= this.friction;

        if (abs(this.vx) < 0.05) {
            this.vx = 0;
        }

        //----------------------------------
        // GRAVITY
        //----------------------------------

        this.vy += this.gravity;

        //----------------------------------
        // HORIZONTAL MOVEMENT
        //----------------------------------

        this.x += this.vx;

        for (const wall of walls) {

            if (this.collidesWith(wall)) {

                if (this.vx > 0) {

                    this.x =
                        wall.x -
                        this.width;

                } else if (this.vx < 0) {

                    this.x =
                        wall.x +
                        wall.width;
                }

                this.vx = 0;
            }
        }

        //----------------------------------
        // VERTICAL MOVEMENT
        //----------------------------------

        this.y += this.vy;

        this.onGround = false;

        for (const wall of walls) {

            if (this.collidesWith(wall)) {

                // floor

                if (this.vy > 0) {

                    this.y =
                        wall.y -
                        this.height;

                    this.vy = 0;
                    this.onGround = true;
                }

                // ceiling

                else if (this.vy < 0) {

                    this.y =
                        wall.y +
                        wall.height;

                    this.vy = 0;
                }
            }
        }

        //----------------------------------
        // ANIMATION
        //----------------------------------

        if (this.frames.length > 0) {

            this.frame += this.animSpeed;

            if (
                this.frame >=
                this.frames.length
            ) {
                this.frame = 0;
            }
        }
    }

    draw() {

        if (this.frames.length > 0) {

            const current =
                this.frames[
                    Math.floor(this.frame)
                ];

            image(
                current,
                this.x,
                this.y,
                this.drawWidth,
                this.drawHeight
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

        // DEBUG COLLIDER

        noFill();
        stroke(255, 0, 0);

        rect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}