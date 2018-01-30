/**
 * Created by Zora on 2017/2/10.
 * 僵尸
 */
import Toolkit from '../common/commonFunctions';
import Game from "../common/game";

export default class Js {
    private _x: number[] = [];
    private _y: number[] = [];
    private _bodyCount: number[] = [];
    private _num: number;
    private _bodyTimer: number[] = [];
    private _X: number[] = [];
    private _Y: number[] = [];
    private _tx: number[] = [];
    private _ampx: number[] = [];
    private _spx: number[] = [];
    private _al: number[] = [];
    private _ty: number[] = [];
    private _ampy: number[] = [];
    private _spy: number[] = [];
    private _alive: boolean[] = [];
    private _limit: number;
    private _blood: number[] = [];
    private _ctx2: any;
    private _game: Game;
    private _jsPic: HTMLImageElement[] = [];

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get num() {
        return this._num;
    }

    get limit() {
        return this._limit;
    }

    get alive() {
        return this._alive;
    }

    get blood() {
        return this._blood;
    }

    set limit(val: number) {
        this._limit = val;
    }

    set blood(val: number[]) {
        this._blood = val;
    }

    set alive(val: boolean[]) {
        this._alive = val;
    }

    constructor(ctx2: any, W: number, H: number, game: Game, jsPic: HTMLImageElement[]) {
        this._num = 50;
        this._ctx2 = ctx2;
        this._game = game;
        this._jsPic = jsPic;
        this._limit = 5;
        for (let i = 0; i < this._num; i++) {
            this._x[i] = W * Math.random();
            this._y[i] = H * 0.6 + Math.random() * 300;
            this._bodyCount[i] = 0;
            this._bodyTimer[i] = 0;
            this._alive[i] = false;
            this._X[i] = W * 0.5;
            this._Y[i] = H * 0.5;
            this._tx[i] = Math.random() * 10;
            this._ampx[i] = W * 0.4 + Math.random() * W * 0.1;
            this._spx[i] = 0.98 + Math.random() * 0.01;
            this._al[i] = 0;
            this._ty[i] = Math.random() * 10;
            this._ampy[i] = H * 0.4 + Math.random() * H * 0.1;
            this._spy[i] = 0.98 + Math.random() * 0.01;
            this._blood[i] = 100;
        }
    }

    draw(W: number, H: number, deltaTime: number) {
        this._limit += deltaTime * 0.0002;
        for (let i = 0; i < this._num; i++) {
            if (this._limit >= this._num) {
                this._limit = this._num;
                this._game.gameover = true;
            }
            this._tx[i] += deltaTime * Math.random() * 0.001;
            this._X[i] = W * 0.5 + Math.sin(this._tx[i]) * this._ampx[i];
            this._x[i] = Toolkit.lerpDistance(this._X[i], this._x[i], this._spx[i]);
            this._ty[i] += deltaTime * Math.random() * 0.001;
            this._Y[i] = H * 0.5 + Math.sin(this._ty[i]) * this._ampy[i];
            this._y[i] = Toolkit.lerpDistance(this._Y[i], this._y[i], this._spy[i]);
            this._bodyTimer[i] += deltaTime + Math.random() * 10;
            if (this._bodyTimer[i] > 50) {
                this._bodyCount[i] = (this._bodyCount[i] + 1) % 7;
                this._bodyTimer[i] %= 50;
            }
            if (this._x[i] < 0) {
                this._x[i] = 0;
            }
            if (this._x[i] > W - this._jsPic[0].width) {
                this._x[i] = W - this._jsPic[0].width;
            }
            if (this._y[i] < 0) {
                this._y[i] = 0;
            }
            if (this._y[i] > H - this._jsPic[0].height) {
                this._y[i] = H - this._jsPic[0].height;
            }
            if (this._alive[i]) {
                this._ctx2.save();
                this._ctx2.drawImage(this._jsPic[this._bodyCount[i]], this._x[i], this._y[i]);
                this._ctx2.fillText('0', this._x[i] + this._jsPic[0].width * 0.5, this._y[i] + this._jsPic[0].height * 0.5);
                this._ctx2.restore();

                this._ctx2.save();
                this._ctx2.strokeStyle = "white";
                this._ctx2.lineWidth = 20;
                this._ctx2.globalAlpha = 0.1;
                this._ctx2.lineCap = "round";
                this._ctx2.beginPath();
                this._ctx2.moveTo(this._x[i], this._y[i] - 20);
                this._ctx2.lineTo(this._x[i] + this._jsPic[0].width, this._y[i] - 20);
                this._ctx2.closePath();
                this._ctx2.stroke();
                this._ctx2.restore();

                this._ctx2.save();
                this._ctx2.strokeStyle = "red";
                this._ctx2.lineWidth = 20;
                this._ctx2.lineCap = "round";
                this._ctx2.beginPath();
                this._ctx2.moveTo(this._x[i], this._y[i] - 20);
                this._ctx2.lineTo(this._x[i] + this._jsPic[0].width * this._blood[i] / 100, this._y[i] - 20);
                this._ctx2.closePath();
                this._ctx2.stroke();
                this._ctx2.restore();
            }
        }

    }

    born(i: number) {
        this._alive[i] = true;
        this._blood[i] = 100;
    }

    jsControl() {
        let count = 0;
        for (let i = 0; i < this._num; i++) {
            if (this._alive[i]) {
                count++;
            }

        }
        if (count < this._limit) {
            this.sentjs();
            return;
        }
    }

    sentjs() {
        for (let i = 0; i < this._num; i++) {
            if (!this._alive[i]) {
                this.born(i);
                return;
            }
        }
    }
}






