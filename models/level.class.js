export class Level {
    //#region Attributes
    enemies;
    clouds;
    backgroundObjects;
    static levelEndX = 2160;
    //#endregion

    constructor({_enemies, _clouds, _backgroundObjects}={}) {
        this.enemies = _enemies;
        this.clouds = _clouds;
        this.backgroundObjects = _backgroundObjects;
    }
}