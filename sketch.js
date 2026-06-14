import { loadPiskel } from "./core/loader.js";

import Player from "./entities/Player.js";
import Wall from "./entities/Wall.js";

let player;
let walls = [];
async function preloadAssets() {

    const playerLayers =
        await loadPiskel("./assets/player.piskel");
    const wallLayers =
        await loadPiskel("./assets/wall.piskel");

    player = new Player(
        100,
        100,
        playerLayers[0]
    );

    walls.push(
        new Wall(
            0,
            500,
            800,
            100,
            wallLayers[0]
        )
    );

    walls.push(
        new Wall(
            300,
            350,
            200,
            32,
            wallLayers[0]
        )
    );

    walls.push(
        new Wall(
            600,
            200,
            32,
            200,
            wallLayers[0]
        )
    );
}

window.setup = async function () {

    createCanvas(800, 600);

    await preloadAssets();
};

window.draw = function () {

    background(30);

    for (const wall of walls) {
        wall.update();
        wall.draw();
    }

    if (player) {
        player.update(walls);
        player.draw();
    }
};