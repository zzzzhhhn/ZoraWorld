/**
 * Created by Zora on 2017/6/11.
 */
export default class Sj {
    private _x: number[] = [];
    private _y: number[] = [];
    private _alive: boolean[] = [];
    private _num = 200;
    private _del: number;
    private _collected: boolean[] = [];
    private _sjPic: HTMLImageElement;
    private _ctx1: any;

    constructor(ctx1: any, sjPic: HTMLImageElement) {
        this._num = 200;
        this._del = 20 * 1000;
        this._ctx1 = ctx1;
        this._sjPic = sjPic;
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


    get collected() {
        return this._collected;
    }


    get alive() {
        return this._alive;
    }

    draw() {
        for (let i = 0; i < this._num; i++) {
            if (this._alive[i]) {
                this._ctx1.drawImage(this._sjPic, this._x[i], this._y[i], 15, 30);
            }
        }
    }

    born(i: number, x: number, y: number) {
        this._x[i] = x;
        this._y[i] = y;
        this._alive[i] = true;
        this._collected[i] = false;
        return;
    }

}



