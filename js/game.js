import { World } from "../models/world.class.js";

let CANVAS;
let WORLD;

function init() {
    CANVAS = document.getElementById('canvas');
    WORLD = new World(CANVAS);
}

init();