export class Level {
    //#region Attributes
    enemies;
    collectables;
    clouds;
    backgroundObjects;
    levelEndX;
    //#endregion

    constructor({ _enemies, _collectables, _clouds, _backgroundObjects, _levelEndX } = {}) {
        this.enemies = _enemies;
        this.collectables = _collectables;
        this.clouds = _clouds;
        this.backgroundObjects = _backgroundObjects;
        this.levelEndX = _levelEndX;
    }
}
