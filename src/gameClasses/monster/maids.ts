/**
 * Created by Zora on 2017/6/4.
 */
import ToolKit from '../common/commonFunctions';
import Sj from "./sj";
import House from "./house";
import Game from "../common/game";
import Data from './data';

export default class Maid {
    private _Pic: HTMLImageElement[] = [];
    private _PicCount: number[] = [];
    private _x: number[] = [];
    private _y: number[] = [];
    private _front: string[] = [];//方向
    private _alive: boolean[] = [];
    private _delta: number[] = [];
    private _frontDel: number[] = [];
    private _working: boolean[] = [];
    private _holding: boolean[] = [];
    private _aimX: number[] = [];
    private _aimY: number[] = [];
    private _sjIndex: number[] = [];
    private _show: boolean[] = [];
    private _num: number;
    private _ctx2: any;
    private _maidF: HTMLImageElement[] = [];
    private _maidB: HTMLImageElement[] = [];
    private _maidL: HTMLImageElement[] = [];
    private _maidR: HTMLImageElement[] = [];
    private _sj: Sj;
    private _house: House;
    private _housePic: HTMLImageElement[] = [];
    private _data: Data;
    private _game: Game;

    constructor(ctx2: any, W: number, H: number, maidF: HTMLImageElement[], maidB: HTMLImageElement[], maidL: HTMLImageElement[], maidR: HTMLImageElement[],  housePic: HTMLImageElement[]) {
        this._num = 2;
        this._Pic = maidF;
        this._ctx2 = ctx2;
        this._maidF = maidF;
        this._maidB = maidB;
        this._maidL = maidL;
        this._maidR = maidR;
        this._housePic = housePic;

        for (let i = 0; i < this._num; i++) {
            this._x[i] = Math.random() * W;
            this._y[i] = Math.random() * H;
            this._alive[i] = false;
            this._front[i] = 'front';
            this._PicCount[i] = 0;
            this._delta[i] = 0;
            this._frontDel[i] = 0;
            this._working[i] = false;
            this._holding[i] = false;
            this._aimX[i] = 0;
            this._aimY[i] = 0;
            this._sjIndex[i] = 0;
            this._show[i] = false;
        }
    }

    init(sj: Sj, house: House,data: Data, game: Game) {
        this._house = house;
        this._data = data;
        this._game = game;
        this._sj = sj;
    }

    set num(val: number) {
        this._num = val;
    }

    draw(deltaTime: number, W: number, H: number, bgX: number, bgY: number) {
        for (let i = 0; i < this._num; i++) {
            const houseX1 = bgX;
            const houseX2 = houseX1 + 90;
            const houseY1 = bgY;
            const houseY2 = houseY1 + 90;
            if (this._x[i] > houseX1 && this._x[i] < houseX2 && this._y[i] > houseY1 && this._y[i] < houseY2) {
                this._show[i] = false;
            } else {
                this._show[i] = true;
            }
            this._delta[i] += deltaTime;
            if (this._delta[i] > 50) {
                this._PicCount[i] = (this._PicCount[i] + 1) % 4;
                this._delta[i] %= 50;
            }
            const limit = 2000 + Math.random() * 2000;
            this._frontDel[i] += deltaTime;
            if (this._frontDel[i] > limit && !this._working[i]) {
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
                this._Pic = this._maidF;
            } else if (this._front[i] == 'back') {
                this._y[i]--;
                this._Pic = this._maidB;
            } else if (this._front[i] == 'left') {
                this._x[i]--;
                this._Pic = this._maidL;
            } else if (this._front[i] == 'right') {
                this._x[i]++;
                this._Pic = this._maidR;
            }
            if (this._x[i] < 100) {
                this._front[i] = 'right';
            }
            if (this._x[i] > (W - 100)) {
                this._front[i] = 'left';
            }
            if (this._y[i] < 100) {
                this._front[i] = 'front';
            }
            if (this._y[i] > (H - 100)) {
                this._front[i] = 'back';
            }
            for (let j = 0; j < this._sj.num; j++) {
                if (this._sj.alive[j] && !this._working[i] && !this._sj.collected[j]) {
                    this._working[i] = true;
                    this._sj.collected[j] = true;
                    this._aimX[i] = this._sj.x[j];
                    this._aimY[i] = this._sj.y[j];
                    this._sjIndex[i] = j;
                    break;
                }
            }


            if (this._working[i]) {
                this._x[i] = ToolKit.lerpDistance(this._aimX[i], this._x[i], 0.995);
                this._y[i] = ToolKit.lerpDistance(this._aimY[i], this._y[i], 0.995);
                const l = ToolKit.calLength2(this._aimX[i], this._aimY[i], this._x[i], this._y[i]);
                if (l <= 900 && !this._holding[i]) {
                    this._holding[i] = true;
                    this._sj.alive[this._sjIndex[i]] = false;
                    this._aimX[i] = this._house.x + this._housePic[this._house.level].width * 0.5;
                    this._aimY[i] = this._house.y + this._housePic[this._house.level].height * 0.5;
                }
                const l2 = ToolKit.calLength2(this._aimX[i], this._aimY[i], this._x[i], this._y[i]);
                if (l2 <= 900 && this._holding[i]) {
                    this._holding[i] = false;
                    this._working[i] = false;
                    this._data.sjCount++;
                    // ctx2.drawImage(sjPic,sj.x+housePic[sj.level].width*0.5,sj.y-10,15,30);
                    return;
                }

                if (this._aimX[i] - this._x[i] > 10) {
                    this._front[i] = 'right';
                }
                if (this._x[i] - this._aimX[i] > 10) {
                    this._front[i] = 'left';
                }
                if (this._aimY[i] - this._y[i] > 10) {
                    this._front[i] = 'front';
                }
                if (this._y[i] - this._aimY[i] > 10) {
                    this._front[i] = 'back';
                }

            }
            if (this._game.gameover) {
                this._aimX[i] = -100;
                this._aimY[i] = -100;
                this._x[i] = ToolKit.lerpDistance(this._aimX[i], this._x[i], 0.995);
                this._y[i] = ToolKit.lerpDistance(this._aimY[i], this._y[i], 0.995);
                this._front[i] = 'left';
            }


            if (this._alive[i] && this._show[i]) {
                this._ctx2.save();
                this._ctx2.drawImage(this._Pic[this._PicCount[i]], this._x[i], this._y[i]);
                this._ctx2.restore();
            }

        }
    }

    born(i: number) {
        this._x[i] = 550;
        this._y[i] = 350;
        this._alive[i] = true;
        this._show[i] = true;
        this._front[i] = 'front';
        this._Pic = this._maidF;
        this._PicCount[i] = 0;
        this._delta[i] = 0;
    }

    maidControl() {
        let count = 0;
        for (let i = 0; i < this._num; i++) {
            if (this._alive[i]) {
                count++;
            }
        }
        if (count < this._num) {
            this.maidBorn();
        }
    }

    maidBorn() {
        for (let i = 0; i < this._num; i++) {
            if (!this._alive[i]) {
                this.born(i);
                return;
            }
        }
    }
}


