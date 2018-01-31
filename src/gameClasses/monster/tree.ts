/**
 * Created by Zora on 2017/6/2.
 */
import Bg from './bg';

export default class Tree {
    private _x: number[] = [];
    private _y: number[] = [];
    private _num: number;
    private _limit: number;
    private _del: number;
    private _alive: boolean[] = [];
    private _collected: boolean[] = [];
    private _growDel: number;
    private _ctx1: any;
    private _bg: Bg;
    private _treePic: HTMLImageElement;

    constructor(ctx1: any, bg: Bg, treePic: HTMLImageElement) {
        this._num = bg.num;
        this._limit = 3;
        this._del = 0;
        this._ctx1 = ctx1;
        this._bg = bg;
        this._treePic = treePic;
        this._growDel = 1000 * 10 + Math.random() * 5000;
        for (let i = 0; i < this._num; i++) {
            this._x[i] = 0;
            this._y[i] = 0;
            this._alive[i] = false;
            this._collected[i] = false;
        }
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get num() {
        return this._num;
    }

    get alive() {
        return this._alive;
    }

    get collected() {
        return this._collected;
    }

    get limit() {
        return this._limit;
    }

    set limit(val: number) {
        this._limit = val;
    }

    set collected(val: boolean[]) {
        this._collected = val;
    }

    draw(deltaTime: number) {
        this._del += deltaTime;

        if (this._del > this._growDel) {
            this._limit++;
            this._del %= this._growDel;
        }

        for (let i = 0; i < this._num; i++) {
            if (this._alive[i]) {
                this._ctx1.drawImage(this._treePic, this._x[i], this._y[i], this._treePic.width, this._treePic.height);
            }

        }
    }

    grow(i: number) {
        if (!this._bg.occupied[i]) {
            this._x[i] = this._bg.x[i] + Math.random() * 50;
            this._y[i] = this._bg.y[i] + Math.random() * 50;
            this._bg.occupied[i] = true;
            this._alive[i] = true;
            this._collected[i] = false;
            this._bg.over[i] = 'tree';
        }
    }

    clean(i: number) {
        this._alive[i] = false;
        this._bg.occupied[i] = false;
    }

    treeControl() {
        let count = 0;
        for (let i = 0; i < this._num; i++) {
            if (this._alive[i]) {
                count++;
            }
        }
        if (count < this._limit) {
            let i = Math.floor(Math.random() * this._bg.num);
            if (!this._alive[i] && !this._bg.occupied[i]) {
                this.grow(i);
                return;
            }

        }
    }
}





