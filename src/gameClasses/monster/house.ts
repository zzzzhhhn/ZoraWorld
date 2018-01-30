/**
 * Created by Zora on 2017/6/10.
 */
import Farmer from "./farmers";
import Grass from "./grass";
import Maid from "./maids";

export default class House {
    private _x: number;
    private _y: number;
    private _level: number;
    private _grassCost: number;
    private _sjCost: number;
    private _limit: number;
    private _life: number;
    private _alive: boolean;
    private _ctx2: any;
    private _housePic: HTMLImageElement[];
    private _farmer: Farmer;
    private _maid: Maid;
    private _grass: Grass;

    constructor(ctx2: any, bgX: number, bgY: number, housePic: HTMLImageElement[], farmer: Farmer, maid: Maid, grass: Grass) {
        this._level = 1;
        this._x = bg.x[41];
        this._y = bg.y[41];
        this._grassCost = 50;
        this._sjCost = 10;
        this._limit = 10;
        this._life = 10000;
        this._alive = true;
        this._ctx2 = ctx2;
        this._housePic = housePic;
        this._farmer = farmer;
        this._maid = maid;
        this._grass = grass;
    }

    draw() {
        if (this._level == 2) {
            this._grassCost = 100;
            this._sjCost = 50;
            this._limit = 20;
            this._farmer.num = 3;
            this._maid.num = 3;
            this._grass.growDel = 1000 * 4 + Math.random() * 1000;
            this._life = 15000;
        }
        if (this._level == 3) {
            this._grassCost = 300;
            this._sjCost = 100;
            this._limit = 30;
            this._farmer.num = 5;
            this._maid.num = 5;
            this._grass.growDel = 1000 * 3 + Math.random() * 1000;
            this._life = 20000;
        }
        if (this._level == 4) {
            this._grassCost = 500;
            this._sjCost = 200;
            this._limit = 40;
            this._farmer.num = 8;
            this._maid.num = 8;
            this._grass.growDel = 1000 * 2 + Math.random() * 1000;
            this._life = 25000;
        }
        if (this._level == 5) {
            this._grassCost = 1000;
            this._sjCost = 300;
            this._limit = 50;
            this._farmer.num = 10;
            this._maid.num = 10;
            this._grass.growDel = 1000 + Math.random() * 1000;
            this._life = 30000;
        }
        if (this._alive) {
            this._ctx2.save();
            this._ctx2.drawImage(this._housePic[this._level], this._x, this._y, 100, 100);
            this._ctx2.restore();
        }
    }

    levelUp() {
        if (this._level < 5) {
            this._level++;
        }

    }
}
