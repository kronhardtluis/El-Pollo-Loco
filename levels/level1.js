//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { Backgroundobject } from "../models/background-object.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Level } from "../models/level.class.js";
//#endregion

export const LEVEL1 = new Level({
    // festlegen der in diesem Level vorkommenden Strukturen
    _enemies: [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Endboss()],
    _clouds: [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],
    _backgroundObjects: addBackgroundImages(1),
    _levelEndX: calcLevelEnd(1),
},);

    function addBackgroundImages(level) {
        const objects = [];
        for (let t = -2; t < level * 10; t += 2) {                                          //level * x setzt die länge der Level
            objects.push(
                ...ImageHub.background.images.slice(0, 8).map((img, i) => 
                    new Backgroundobject(img, 720 * (t + (i < 4 ? 0 : 1)))                  //entweder 720*0 wenn i<4 oder 720*1 wenn i>4 als offset
                )
            );
        }
        return objects;
    }

    function calcLevelEnd(level) {
        const levelWidth = 9.5 * 720 * level;
        return levelWidth;
    }