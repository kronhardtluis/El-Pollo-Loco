//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { Backgroundobject } from "../models/background-object.class.js";
import { Bottle } from "../models/bottle.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { Coins } from "../models/coins.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Level } from "../models/level.class.js";
//#endregion

export const LEVEL1 = new Level({
    // festlegen der in diesem Level vorkommenden Strukturen
    _enemies: [
        ...Array.from({ length: 20 }, () => new Chicken(calcLevelEnd(1))),
        new Endboss(calcLevelEnd(1)),
    ],
    _collectables: setCollectables(1),
    _clouds: [
        ...Array.from(
            { length: setCloudCounter(1) }, () => new Cloud(calcLevelEnd(1)),),
    ],
    _backgroundObjects: addBackgroundImages(1),
    _levelEndX: calcLevelEnd(1),
    _level: 1,
});

function addBackgroundImages(level) {
    const objects = [];
    for (let t = -2; t < level * 10; t += 2) {                                          //level * x setzt die länge der Level
        objects.push(
            ...ImageHub.background.images.slice(0, 8).map((img, i) => 
                new Backgroundobject(img, 720 * (t + (i >= 4 ? 1 : 0)))                  //entweder 720*0 wenn i<4 oder 720*1 wenn i>4 als offset
            )
        );
    }
    objects.push(
        Object.assign(new Backgroundobject(ImageHub.background.start, -820), {
            width: 380, height: 220, y: 213
        }),
        Object.assign(new Backgroundobject(ImageHub.background.end, calcLevelEnd(level) + 80), {
            width: 720, height: 220, y: 210
        }),
    );
    return objects;
}

function calcLevelEnd(level) {
    const levelWidth = 8 * 720 * level - 100;
    return levelWidth;
}

function setCloudCounter(level) {
    const count = 8 * level;
    return count;
}

function setCollectables(level) {
    const collectableCounter = Math.floor(8 * level / 2);
    const collectableArray = [];
    for(let count = 0; count < collectableCounter; count++) {
        const bottleX = count * 720 * 2 + 630;
        const coinX = count * 720 * 2 + 355;
        collectableArray.push(new Bottle(bottleX));
        for(let i = 0; i < 3; i++) {
            collectableArray.push(new Coins(coinX))
        }
    }
    return collectableArray;
}
