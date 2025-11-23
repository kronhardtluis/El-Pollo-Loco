import { Backgroundobject } from "./background-object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";

export class World {
    ctx;
    canvas;

    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];

    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ];

    backgroundObjects = [
        new Backgroundobject('img/5_background/layers/air.png'),
        new Backgroundobject('img/5_background/layers/3_third_layer/1.png'),
        new Backgroundobject('img/5_background/layers/2_second_layer/1.png'),
        new Backgroundobject('img/5_background/layers/1_first_layer/1.png'),
    ]

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        const self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}
