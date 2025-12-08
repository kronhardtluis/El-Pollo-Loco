import { World } from "../models/world.class.js";

let canvas;  // das ist der "Screen / ScreenRef"
let world;   // hier werden alle Infos und Berechnungen gespeichert

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}

init();