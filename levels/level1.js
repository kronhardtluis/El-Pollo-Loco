import { ImageHub } from "../js/imagehub.js";
import { Backgroundobject } from "../models/background-object.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Level } from "../models/level.class.js";

export const LEVEL1 = new Level({
    _enemies: [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Endboss()],
    _clouds: [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],
    _backgroundObjects: [
        new Backgroundobject(ImageHub.background.images[4], -720),
        new Backgroundobject(ImageHub.background.images[5], -720),
        new Backgroundobject(ImageHub.background.images[6], -720),
        new Backgroundobject(ImageHub.background.images[7], -720),
        new Backgroundobject(ImageHub.background.images[0], 0),
        new Backgroundobject(ImageHub.background.images[1], 0),
        new Backgroundobject(ImageHub.background.images[2], 0),
        new Backgroundobject(ImageHub.background.images[3], 0),
        new Backgroundobject(ImageHub.background.images[4], 720),
        new Backgroundobject(ImageHub.background.images[5], 720),
        new Backgroundobject(ImageHub.background.images[6], 720),
        new Backgroundobject(ImageHub.background.images[7], 720),
        new Backgroundobject(ImageHub.background.images[0], 720 * 2),
        new Backgroundobject(ImageHub.background.images[1], 720 * 2),
        new Backgroundobject(ImageHub.background.images[2], 720 * 2),
        new Backgroundobject(ImageHub.background.images[3], 720 * 2),
        new Backgroundobject(ImageHub.background.images[4], 720 * 3),
        new Backgroundobject(ImageHub.background.images[5], 720 * 3),
        new Backgroundobject(ImageHub.background.images[6], 720 * 3),
        new Backgroundobject(ImageHub.background.images[7], 720 * 3),
    ],
}
);

// addBackgroundImages(5)
// function addBackgroundImages(times) {
//     for (let t = 0; t < times; t += 2) {
//         LEVEL1.backgroundObjects.push(
//             new Backgroundobject(ImageHub.background.images[0], 720 * t),
//             new Backgroundobject(ImageHub.background.images[1], 720 * t),
//             new Backgroundobject(ImageHub.background.images[2], 720 * t),
//             new Backgroundobject(ImageHub.background.images[3], 720 * t),
//             new Backgroundobject(ImageHub.background.images[4], 720 * t++),
//             new Backgroundobject(ImageHub.background.images[5], 720 * t++),
//             new Backgroundobject(ImageHub.background.images[6], 720 * t++),
//             new Backgroundobject(ImageHub.background.images[7], 720 * t++)
//         );
//     }
// }