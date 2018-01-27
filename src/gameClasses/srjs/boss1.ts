/**
 * Created by zoramac on 2017/2/8.
 * boss1 类
 */

import Toolkit from '../common/commonFunctions';
import Sr from './sr';

export default class Boss1 {

    private _x: number[] = [];
    private _y: number[] = [];
    private _bodyTimer: number[] = [];
    private _bodyCount: number[] = [];
    private _bodyPic: HTMLImageElement[] = [];
    private _blood: number[] = [];
    private _alive: boolean[] = [];
    private _num: number;
    private _boss1lPic: HTMLImageElement[] = [];
    private _boss1rPic: HTMLImageElement[] = [];
    private _ctx2: any;
    private _sr: Sr;

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

    set blood(val: number[]) {
        this._blood = val;
    }

    set alive(val: boolean[]) {
        this._alive = val;
    }

    constructor(ctx2: any, W: number, H: number, boss1lPic: HTMLImageElement[], boss1rPic: HTMLImageElement[], sr: Sr) {
        this._ctx2 = ctx2;
        this._sr = sr;
        this._boss1lPic = boss1lPic;
        this._boss1rPic = boss1rPic;
        this._num = 1;
        for (let i = 0; i < this._num; i++) {
            this._x[i] = W * 0.1 + W * Math.random() * 0.7;
            this._y[i] = H * 0.1 + H * Math.random() * 0.7;
            this._bodyTimer[i] = 0;
            this._bodyCount[i] = 0;
            this._blood[i] = 1000;
            this._alive[i] = false;
        }
    }

    draw (deltaTime: number) {
        for (let i = 0; i < this._num; i++) {
            this._x[i] = Toolkit.lerpDistance(this._sr.x, this._x[i], 0.99);
            this._y[i] = Toolkit.lerpDistance(this._sr.y, this._y[i], 0.99);
            this._bodyTimer[i] += deltaTime;
            if (this._x[i] > this._sr.x) {
                this._bodyPic = this._boss1lPic;
            } else {
                this._bodyPic = this._boss1rPic;
            }
            if (this._bodyTimer[i] > 50) {
                this._bodyCount[i] = (this._bodyCount[i] + 1) % 8;
                this._bodyTimer[i] %= 50;
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
                this._ctx2.lineTo(this._x[i] + 200 * this._blood[i] / 1000, this._y[i] - 20);
                this._ctx2.closePath();
                this._ctx2.stroke();
                this._ctx2.restore();
            }
        }
    }

    boss1show() {
        for (let i=0;i<this._num;i++){
            if(!this._alive[i]){
                this._alive[i] = true;
                this._blood[i]=1000;
                return;
            }
        }
    }
}


