/**
 * Created by Zora on 2017/6/10.
 * 龙
 */
import Toolkit from '../common/commonFunctions';
import Sj from './sj';
import Knight from './knight';
import Bg from './bg';
import Data from './data';

export default class Dragon {
    private _x: number[] = [];
    private _y: number[] = [];
    private _planX: number[] = [];
    private _planY: number[] = [];
    private _alive: boolean[] = [];
    private _Pic: HTMLImageElement[] = [];
    private _num: number;
    private _limit: number;
    private _front: string[] = [];
    private _PicCount: number[] = [];
    private _delta: number[] = [];
    private _frontDel: number[] = [];        //方向间隔时间
    private _full: boolean[] = [];
    private _sjDel: number[] = [];           //生产水晶间隔
    private _grassCost: number;
    private _sjCost: number;
    private _sjDelTime: number;                 //生产水晶cd
    private _fight: boolean[] = [];
    private _life: number[] = [];
    private _bgIndex: number[] = [];              //所在地块索引
    private _aim: number[] = [];             //目标索引
    private _aimX: number[] = [];
    private _aimY: number[] = [];
    private _ctx1: any;
    private _ctx2: any;
    private _sj: Sj;
    private _dragonPicl: HTMLImageElement[] = [];
    private _dragonPicr: HTMLImageElement[] = [];
    private _knight: Knight;
    private _dragonPlan: HTMLImageElement;
    private _dragonEgg: HTMLImageElement;
    private _bg: Bg;
    private _data: Data;
    private _cx: number;
    private _cy: number;

    constructor(ctx1: any, ctx2: any, dragonPicl: HTMLImageElement[], dragonPicr: HTMLImageElement[], dragonPlan: HTMLImageElement, dragonEgg: HTMLImageElement) {
        this._grassCost = 100;
        this._sjCost = 50;
        this._sjDelTime = 10 * 1000;
        this._num = 10;
        this._limit = 0;
        this._dragonPicl = dragonPicl;
        this._dragonPicr = dragonPicr;
        this._Pic = dragonPicl;
        this._ctx1 = ctx1;
        this._ctx2 = ctx2;
        
        this._dragonPlan = dragonPlan;
        this._dragonEgg = dragonEgg;

        for (let i = 0; i < this._num; i++) {
            this._x[i] = 0;
            this._y[i] = 0;
            this._alive[i] = false;
            this._front[i] = "left";
            this._PicCount[i] = 0;
            this._delta[i] = 0;
            this._frontDel[i] = 0;
            this._full[i] = false;
            this._planX[i] = 0;
            this._planY[i] = 0;
            this._sjDel[i] = 0;
            this._fight[i] = false;
            this._life[i] = 200;
            this._bgIndex[i] = 0;
            this._aim[i] = -1;
            this._aimX[i] = 0;
            this._aimY[i] = 0;
        }
    }

    init(sj: Sj, knight: Knight, bg: Bg, data: Data) {
        this._sj = sj;
        this._knight = knight;
        this._bg = bg;
        this._data = data;
    }
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get life() {
        return this._life;
    }

    get limit() {
        return this._limit;
    }


    get num() {
        return this._num;
    }


    get grassCost() {
        return this._grassCost;
    }

    get sjCost() {
        return this._sjCost;
    }

    get alive() {
        return this._alive;
    }


    set life(val: number[]) {
        this._life = val;
    }


    set limit(val: number) {
        this._limit = val;
    }

    draw(deltaTime: number) {
        for (let i = 0; i < this._num; i++) {
            if (this._full[i]) {
                this._delta[i] += deltaTime;
                if (this._delta[i] > 50) {
                    this._PicCount[i] = (this._PicCount[i] + 1) % 4;
                    this._delta[i] %= 50;
                }
                this._sjDel[i] += deltaTime;
                if (this._sjDel[i] > this._sjDelTime) {
                    for (let j = 0; j < this._sj.num; j++) {
                        if (!this._sj.alive[j] && this._alive[i]) {
                            this._sj.born(j, this._planX[i] + Math.random() * 100, this._planY[i] + 70);
                            break;
                        }
                    }
                    this._sjDel[i] %= this._sjDelTime;

                }
                const limit = 2000 + Math.random() * 2000;
                this._frontDel[i] += deltaTime;
                if (this._frontDel[i] > limit) {
                    const m = Math.random();
                    if (m < 0.25) {
                        this._front[i] = 'front';
                    } else if (m >= 0.25 && m < 0.5) {
                        this._front[i] = 'back';
                    } else if (m >= 0.5 && m < 0.75) {
                        this._front[i] = 'left';
                    } else if (m >= 0.75) {
                        this._front[i] = 'right';
                    }
                    this._frontDel[i] %= limit;
                }
                if (this._front[i] == 'front') {
                    this._y[i]++;
                } else if (this._front[i] == 'back') {
                    this._y[i]--;
                } else if (this._front[i] == 'left') {
                    this._x[i]--;
                    this._Pic = this._dragonPicl;
                } else if (this._front[i] == 'right') {
                    this._x[i]++;
                    this._Pic = this._dragonPicr;
                }
                if (this._x[i] < (this._planX[i] - 100)) {
                    this._front[i] = 'right';
                }
                if (this._x[i] > (this._planX[i] + 100)) {
                    this._front[i] = 'left';
                }
                if (this._y[i] < (this._planY[i] - 100)) {
                    this._front[i] = 'front';
                }
                if (this._y[i] > (this._planY[i] + 100)) {
                    this._front[i] = 'back';
                }
                for (let j = 0; j < this._knight.num; j++) {
                    if (!this._fight[i] && (this._knight.x[j] >= this._planX[i] - 200) && (this._knight.x[j] <= this._planX[i] + 300) &&
                        (this._knight.y[j] >= this._planY[i] - 200) && (this._knight.y[j] <= this._planY[i] + 300) && this._knight.alive[j]) {
                        this._aim[i] = j;
                        this._fight[i] = true;
                    }
                }
                if (this._aim[i] !== -1) {
                    this._aimX[i] = this._knight.x[this._aim[i]];
                    this._aimY[i] = this._knight.y[this._aim[i]];
                }

                if (this._fight[i]) {
                    this._x[i] = Toolkit.lerpDistance(this._aimX[i], this._x[i], 0.995);
                    this._y[i] = Toolkit.lerpDistance(this._aimY[i], this._y[i], 0.995);

                    for (let j = 0; j < this._knight.num; j++) {
                        const l = Toolkit.calLength2(this._knight.x[j], this._knight.y[j], this._x[i] + 50, this._y[i] + 50);
                        if (l <= 900) {
                            this._knight.life[j]--;
                            if (this._knight.life[j] <= 0) {
                                this._knight.die(j);
                                this._fight[i] = false;
                                this._aim[i] = -1;
                            }
                        }
                    }

                }
                if (this._alive[i]) {
                    this._ctx2.save();
                    this._ctx1.drawImage(this._dragonPlan, this._planX[i], this._planY[i], 100, 100);
                    this._ctx2.drawImage(this._Pic[this._PicCount[i]], this._x[i], this._y[i], 65, 100);
                    this._ctx2.restore();
                    this._ctx2.save();
                    this._ctx2.strokeStyle = "blue";
                    this._ctx2.globalAlpha = 0.7;
                    this._ctx2.lineWidth = 10;
                    this._ctx2.lineCap = "round";
                    this._ctx2.shadowBlur = 10;
                    this._ctx2.shadowColor = "white";
                    this._ctx2.font = "20px Verdana";
                    this._ctx2.fillStyle = "white";
                    this._ctx2.textAlign = "center";
                    this._ctx2.beginPath();
                    this._ctx2.moveTo(this._x[i], this._y[i] - 20);
                    this._ctx2.lineTo(this._x[i] + 70 * this._life[i] / 1000, this._y[i] - 20);
                    this._ctx2.closePath();
                    this._ctx2.stroke();
                    this._ctx2.restore();
                }

            }
            if (!this._full[i] && this._alive[i]) {
                this._delta[i] += deltaTime;
                if (this._delta[i] > 5000) {
                    this._full[i] = true;
                    this._delta[i] = 0;
                    this._life[i] = 1000;
                }
                this._ctx2.save();
                this._ctx2.drawImage(this._dragonEgg, this._x[i], this._y[i], 100, 100);
                this._ctx2.restore();
                this._ctx2.save();
                this._ctx2.strokeStyle = "blue";
                this._ctx2.globalAlpha = 0.7;
                this._ctx2.lineWidth = 10;
                this._ctx2.lineCap = "round";
                this._ctx2.shadowBlur = 10;
                this._ctx2.shadowColor = "white";
                this._ctx2.font = "20px Verdana";
                this._ctx2.fillStyle = "white";
                this._ctx2.textAlign = "center";
                this._ctx2.beginPath();
                this._ctx2.moveTo(this._x[i] + 40, this._y[i] - 20);
                this._ctx2.lineTo(this._x[i] + 40 + 20 * this._life[i] / 200, this._y[i] - 20);
                this._ctx2.closePath();
                this._ctx2.stroke();
                this._ctx2.restore();
            }
        }

    }

    born(i: number) {
        this._x[i] = this._cx;
        this._y[i] = this._cy;
        this._alive[i] = true;
        this._front[i] = 'front';
        this._Pic = this._dragonPicl;
        this._PicCount[i] = 0;
        this._delta[i] = 0;
        this._full[i] = false;
        this._planX[i] = this._cx;
        this._planY[i] = this._cy;
        this._bg.over[this._bg.cbg] = 'dragon';
        this._data.limit++;
        this._fight[i] = false;
        this._life[i] = 200;
        this._bgIndex[i] = this._bg.cbg;
        this._aim[i] = -1;
    }

    die(i: number) {
        this._alive[i] = false;
        this._data.limit--;
        this._fight[i] = false;
        this._bg.over[this._bg.cbg] = '';
        this._bg.occupied[this._bgIndex[i]] = false;
        this._limit--;
    }

    dragonControl(cx: number, cy: number) {
        this._cx = cx;
        this._cy = cy;
        let count = 0;
        for (let i = 0; i < this._num; i++) {
            if (this._alive[i]) {
                count++;
            }
        }
        if (count < this._limit) {
            this.dragonBorn();
        }
    }

    dragonBorn() {
        for (let i = 0; i < this._num; i++) {
            if (!this._alive[i]) {
                this.born(i);
                return;
            }
        }
    }
}




