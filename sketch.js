import { loadPiskel } from "./core/loader.js";

import Player from "./entities/Player.js";
import Wall from "./entities/Wall.js";

let player;
let wall;

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

    wall = new Wall(
        300,
        100,
        64,
        64,
        wallLayers[0]
    );
}

window.setup = async function () {

    createCanvas(800, 600);

    await preloadAssets();
};

window.draw = function () {

    background(30);

    if (player) {
        player.update();
        player.draw();
    }

    if (wall) {
        wall.draw();
    }
};