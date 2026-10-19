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
