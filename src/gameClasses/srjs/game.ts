export default class Game {
    private _gameover: boolean;

    get gameover() {
        return this._gameover;
    }

    set gameover(val: boolean) {
        this._gameover = val;
    }

    constructor() {
        this._gameover = false;
    }
}