/**
 * Created by zoramac on 2017/2/8.
 */
import Toolkit from '../common/commonFunctions';

export default class Sr {

    private _x: number;
    private _y: number;
    private _sp: number;
    private _srTimer: number;
    private _srCount: number;
    private _Left: boolean;
    private _Up: boolean;
    private _Right: boolean;
    private _Down: boolean;
    private _dir: string;
    private _sr: HTMLImageElement[] = [];
    private _wd: boolean;
    private _wdtime: number;
    private _srPicl: HTMLImageElement[] = [];
    private _srPicr: HTMLImageElement[] = [];
    private _ctx2: any;

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set sp(val: number) {
        this._sp = val;
    }

    set wd(val: boolean) {
        this._wd = val;
    }

    set wdtime(val: number) {
        this._wdtime = val;
    }

    get dir() {
        return this._dir;
    }

    constructor(ctx2: any, W: number, H: number, srPicl: HTMLImageElement[], srPicr: HTMLImageElement[]) {
        this._ctx2 = ctx2;
        this._x = W * 0.5;
        this._y = H * 0.5;
        this._sp = 5;
        this._srTimer = 0;
        this._srCount = 0;
        this._Left = false;
        this._Up = false;
        this._Right = false;
        this._Down = false;
        this._dir = 'left';
        this._srPicl = srPicl;
        this._srPicr = srPicr;
        this._sr = srPicl;
        this._wd = false;
        this._wdtime = 5000;
    }

    draw(W: number, H: number, deltaTime: number) {
        this._srTimer += deltaTime;
        if (this._dir == 'left') {
            this._sr = this._srPicl;
        } else {
            this._sr = this._srPicr;
        }
        if (this._srTimer > 100) {
            this._srCount = (this._srCount + 1) % 4;
            this._srTimer %= 100;
        }
        if (this._Left) {
            this._x -= this._sp;
        }
        if (this._Right) {
            this._x += this._sp;
        }
        if (this._Up) {
            this._y -= this._sp;
        }
        if (this._Down) {
            this._y += this._sp;
        }
        if (this._x < 0) {
            this._x = 0;
        }
        if (this._x > W - this._srPicl[0].width) {
            this._x = W - this._srPicl[0].width;
        }
        if (this._y < 0) {
            this._y = 0;
        }
        if (this._y > H - this._srPicl[0].height) {
            this._y = H - this._srPicl[0].height;
        }
        this._ctx2.save();
        if (this._wd) {
            this._ctx2.shadowBlur = 10;
            this._ctx2.shadowColor = Toolkit.randomColor(1);
            this._wdtime -= deltaTime;
            if (this._wdtime <= 0) {
                this._wd = false;
            }
        }
        this._ctx2.drawImage(this._sr[this._srCount], this._x, this._y);
        this._ctx2.restore();
    }

    moveLeft() {
        this._Left = true;
        this._dir = 'left';
    }

    moveRight() {
        this._Right = true;
        this._dir = 'right';
    }

    moveUp() {
        this._Up = true;
    }

    moveDown() {
        this._Down = true;
    }

    stopLeft() {
        this._Left = false;
    }

    stopRight() {
        this._Right = false;
    }

    stopUp() {
        this._Up = false;
    }

    stopDown() {
        this._Down = false;
    }
}


