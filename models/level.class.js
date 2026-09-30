export class Level {
    //#region Attributes
    enemies;
    clouds;
    backgroundObjects;
    levelEndX;
    //#endregion

    constructor({ _enemies, _clouds, _backgroundObjects, _levelEndX } = {}) {
        this.enemies = _enemies;
        this.clouds = _clouds;
        this.backgroundObjects = _backgroundObjects;
        this.levelEndX = _levelEndX;
    }
}

// export class Level {
//     //#region Attributes
//     enemies;
//     clouds;
//     backgroundObjects;
//     level;
//     levelWidth;
//     //#endregion

//     constructor({ _enemies, _clouds, _backgroundObjects, _level } = {}) {
//         this.enemies = _enemies;
//         this.clouds = _clouds;
//         this.backgroundObjects = _backgroundObjects;
//         this.level = _level;
//     }

//     addBackgroundImages(level) {
//         const objects = [];
//         for (let t = -2; t < level * 10; t += 2) {                                          //level * x setzt die länge der Level
//             objects.push(
//                 ...ImageHub.background.images.slice(0, 8).map((img, i) => 
//                     new Backgroundobject(img, 720 * (t + (i < 4 ? 0 : 1)))                  //entweder 720*0 wenn i<4 oder 720*1 wenn i>4 als offset
//                 )
//             );
//         }
//         return objects;
//     }

//     calcLevelEnd() {
//         const levelWidth = 9.5 * 720 * this.level;
//         return levelWidth;
//     }
// }
