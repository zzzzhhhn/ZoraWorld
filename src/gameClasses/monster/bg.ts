import Game from "../common/game";

/**
 * Created by Zora on 2017/6/10.
 * 背景
 */
export default class BG {
    private _num: number;
    private _x: number[] = [];               //左上角坐标
    private _y: number[] = [];
    private _x2: number[] = [];              //右下角
    private _y2: number[] = [];
    private _occupied: boolean[] = [];       //当前地块上是否已被其他物品覆盖
    private _cbg: number;               //当前点击地块索引
    private _over: string[] = [];            //当前地块覆盖物名称
    private _wl: boolean[] = [];             //是否显示围栏
    private _wlPic: HTMLImageElement;
    private _bgPic: HTMLImageElement;
    private _ctx1: any;

    constructor(ctx1: any, W: number, H: number, bgPic: HTMLImageElement, wlPic: HTMLImageElement) {
        this._ctx1 = ctx1;
        this._bgPic = bgPic;
        this._wlPic = wlPic;
        this._num = W * H / 10000;
        for (let i = 0; i < this._num; i++) {
            if (i == 0) {
                this._x[i] = 0;
                this._y[i] = 0;
            } else {
                this._x[i] = this._x[i - 1] + 100;
                this._y[i] = this._y[i - 1];
                if ((i + 1) * 100 % W == 100) {
                    this._x[i] = 0;
                    this._y[i] = this._y[i - 1] + 100;
                }
            }
            this._wl[i] = false;
            this._over[i] = '';
            this._x2[i] = this._x[i] + 100;
            this._y2[i] = this._y[i] + 100;
            this._occupied[i] = false;
            if (this._x[i] == 0 || this._x[i] == W - 100 || this._y[i] == 0 || this._y[i] == H - 100) {
                this._occupied[i] = true;
                this._wl[i] = true;
            }
            if ((this._x[i] == this._x[89] || this._x[i] == this._x[90]) && this._y[i] == 700) {
                this._wl[i] = false;
            }

        }
        this._occupied[41] = true;
        this._over[41] = 'house';

    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get cbg() {
        return this._cbg;
    }

    get num() {
        return this._num;
    }

    get over() {
        return this._over;
    }

    get x2() {
        return this._x2;
    }

    get y2() {
        return this._y2;
    }

    get occupied() {
        return this._occupied;
    }

    set cbg(val: number) {
        this._cbg = val;
    }

    set occupied(val: boolean[]) {
        this._occupied = val;
    }

    set over(val: string[]) {
        this._over = val;
    }

    draw() {
        for (let i = 0; i < this._num; i++) {
            this._ctx1.drawImage(this._bgPic, this._x[i], this._y[i]);
            if (this._wl[i]) {
                this._ctx1.drawImage(this._wlPic, this._x[i], this._y[i]);
            }
        }

    }
}


