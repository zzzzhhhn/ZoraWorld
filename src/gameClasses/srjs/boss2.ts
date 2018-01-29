/**
 * Created by zoramac on 2017/2/8.
 */
import Sr from './sr';

export default class Boss2 {

    private _x: number[] = [];
    private _y: number[] = [];
    private _bodyTimer: number[] = [];
    private _bodyCount: number[] = [];
    private _bodyPic: HTMLImageElement[] = [];
    private _blood: number[] = [];
    private _alive: boolean[] = [];
    private _num: number;
    private _dir: string[] = [];
    private _ctx2: any;
    private _sr: any;
    private _boss2lPic: HTMLImageElement[] = [];
    private _boss2rPic: HTMLImageElement[] = [];

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get num() {
        return this._num;
    }

    get dir() {
        return this._dir;
    }

    get alive() {
        return this._alive;
    }

    set blood(val: number[]) {
        this._blood = val;
    }

    set alive(val: boolean[]) {
        this._alive = val;
    }


    constructor(ctx2: any, W: number, H: number, boss2lPic: HTMLImageElement[], boss2rPic: HTMLImageElement[], sr: Sr) {
        this._ctx2 = ctx2;
        this._sr = sr;
        this._boss2lPic = boss2lPic;
        this._boss2rPic = boss2rPic;
        this._num = 3;
        for (let i = 0; i < this._num; i++) {
            this._x[i] = W * 0.1 + W * Math.random() * 0.7;
            this._y[i] = H * 0.1 + H * Math.random() * 0.7;
            this._bodyTimer[i] = 0;
            this._bodyCount[i] = 0;
            this._blood[i] = 500;
            this._alive[i] = false;
        }
    }

    draw(W: number, H: number, deltaTime: number) {
        for (let i = 0; i < this._num; i++) {
            this._bodyTimer[i] += deltaTime;
            if (this._x[i] > this._sr.x) {
                this._bodyPic = this._boss2lPic;
                this._dir[i] = "left";
            } else {
                this._bodyPic = this._boss2rPic;
                this._dir[i] = "right";
            }
            if (this._bodyTimer[i] > 50) {
                this._bodyCount[i] = (this._bodyCount[i] + 1) % 8;
                this._bodyTimer[i] %= 50;
            }
            if (this._x[i] < 0) {
                this._x[i] = 0;
            }
            if (this._x[i] > W - this._boss2lPic[0].width) {
                this._x[i] = W - this._boss2lPic[0].width;
            }
            if (this._y[i] < 0) {
                this._y[i] = 0;
            }
            if (this._y[i] > H - this._boss2lPic[0].height) {
                this._y[i] = H - this._boss2lPic[0].height;
            }
            if (this._alive[i]) {
                this._ctx2.save();
                this._ctx2.drawImage(this._bodyPic[this._bodyCount[i]], this._x[i], this._y[i]);
                this._ctx2.restore();

                this._ctx2.save();
                this._ctx2.strokeStyle = "white";
                this._ctx2.lineWidth = 20;
                this._ctx2.globalAlpha = 0.1;
                this._ctx2.lineCap = "round";
                this._ctx2.beginPath();
                this._ctx2.moveTo(this._x[i], this._y[i] - 20);
                this._ctx2.lineTo(this._x[i] + 200, this._y[i] - 20);
                this._ctx2.closePath();
                this._ctx2.stroke();
                this._ctx2.restore();

                this._ctx2.save();
                this._ctx2.strokeStyle = "purple";
                this._ctx2.lineWidth = 20;
                this._ctx2.lineCap = "round";
                this._ctx2.beginPath();
                this._ctx2.moveTo(this._x[i], this._y[i] - 20);
                this._ctx2.lineTo(this._x[i] + 100 * this._blood[i] / 500, this._y[i] - 20);
                this._ctx2.closePath();
                this._ctx2.stroke();
                this._ctx2.restore();
            }
        }

    }

    boss2show() {
        for (let i = 0; i < this._num; i++) {
            if (!this._alive[i]) {
                this._alive[i] = true;
                this._blood[i] = 500;
                return;
            }
        }
    }

}
