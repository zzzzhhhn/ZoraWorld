/**
 * Created by Zora on 2017/6/4.
 */
import Slm from "./slm";
import Mogu from "./mogu";
import Dragon from "./dragon";
import Fish from "./fish";
import House from "./house";
import Toolkit from '../common/commonFunctions';
import Game from "../common/game";
import Data from './data';


export default class Knight {
    private _Pic: HTMLImageElement[] = [];
    private _PicCount: number[] = [];
    private _x: number[] = [];
    private _y: number[] = [];
    private _front: string[] = [];//方向
    private _alive: boolean[] = [];
    private _delta: number[] = [];
    private _aim: string[] = [];     //目标种类
    private _dragonIndex: number[] = [];
    private _fishIndex: number[] = [];
    private _slmIndex: number[] = [];
    private _moguIndex: number[] = [];
    private _fight: boolean[] = [];
    private _life: number[] = [];
    private _aimX: number[] = [];
    private _aimY: number[] = [];
    private _lx: number[] = [];      //错位
    private _ly: number[] = [];
    private _num: number;
    private _ctx2: any;
    private _knightF: HTMLImageElement[] = [];
    private _knightB: HTMLImageElement[] = [];
    private _knightL: HTMLImageElement[] = [];
    private _knightR: HTMLImageElement[] = [];
    private _housePic: HTMLImageElement[] = [];
    private _slm: Slm;
    private _mogu: Mogu;
    private _dragon: Dragon;
    private _fish: Fish;
    private _house: House;
    private _data: Data;
    private _game: Game;

    constructor(ctx2: any, bgX: number, bgY: number, knightF: HTMLImageElement[], knightB: HTMLImageElement[], knightL: HTMLImageElement[], knightR: HTMLImageElement[], housePic: HTMLImageElement[]) {
        this._num = 0;
        this._Pic = knightF;
        this._ctx2 = ctx2;
        this._knightF = knightF;
        this._knightB = knightB;
        this._knightL = knightL;
        this._knightR = knightR;
        this._housePic = housePic;

        for (let i = 0; i < this._num; i++) {
            this._x[i] = bgX + Math.random() * 200;
            this._y[i] = bgY + 100;
            this._alive[i] = false;
            this._front[i] = 'front';
            this._PicCount[i] = 0;
            this._delta[i] = 0;
            this._aim[i] = '';
            this._dragonIndex[i] = 0;
            this._fishIndex[i] = 0;
            this._slmIndex[i] = 0;
            this._moguIndex[i] = 0;
            this._fight[i] = false;
            this._life[i] = 100;
            this._aimX[i] = 0;
            this._aimY[i] = 0;
            this._lx[i] = 0;
            this._ly[i] = 0;
        }
    }

    init(slm: Slm, mogu: Mogu, dragon: Dragon, fish: Fish, house: House, data: Data, game: Game) {
        this._slm = slm;
        this._mogu = mogu;
        this._dragon = dragon;
        this._fish = fish;
        this._house = house;
        this._data = data;
        this._game = game;
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

    get num() {
        return this._num;
    }

    get alive() {
        return this._alive;
    }

    set life(val: number[]) {
        this._life = val;
    }

    set num(val: number) {
        this._num = val;
    }

    draw(deltaTime: number) {
        for (let i = 0; i < this._num; i++) {
            this._delta[i] += deltaTime;
            if (this._delta[i] > 50) {
                this._PicCount[i] = (this._PicCount[i] + 1) % 4;
                this._delta[i] %= 50;
            }
            if (this._front[i] == 'front') {
                this._y[i]++;
                this._Pic = this._knightF;
                this._ly[i] = -100 * Math.random();
                this._lx[i] = 50 * Math.random();
            } else if (this._front[i] == 'back') {
                this._y[i]--;
                this._Pic = this._knightB;
                this._ly[i] = 100 * Math.random();
                this._lx[i] = 50 * Math.random();
            } else if (this._front[i] == 'left') {
                this._x[i]--;
                this._Pic = this._knightL;
                this._lx[i] = -100 * Math.random();
                this._ly[i] = 50 * Math.random();
            } else if (this._front[i] == 'right') {
                this._x[i]++;
                this._Pic = this._knightR;
                this._lx[i] = 100 * Math.random();
                this._ly[i] = 50 * Math.random();
            }

            for (let j = 0; j < this._slm.num; j++) {
                if (this._slm.alive[j] && !this._fight[i]) {
                    this._fight[i] = true;
                    this._aimX[i] = this._slm.x[j];
                    this._aimY[i] = this._slm.y[j];
                    this._slmIndex[i] = j;
                    this._aim[i] = 'this._slm';
                    break;
                }
            }
            for (let j = 0; j < this._mogu.num; j++) {
                if (this._mogu.alive[j] && !this._fight[i]) {
                    this._fight[i] = true;
                    this._aimX[i] = this._mogu.x[j];
                    this._aimY[i] = this._mogu.y[j];
                    this._moguIndex[i] = j;
                    this._aim[i] = 'this._mogu';
                    break;
                }
            }
            for (let j = 0; j < this._fish.num; j++) {
                if (this._fish.alive[j] && !this._fight[i]) {
                    this._fight[i] = true;
                    this._aimX[i] = this._fish.x[j] + 20;
                    this._aimY[i] = this._fish.y[j] + 50;
                    this._fishIndex[i] = j;
                    this._aim[i] = 'this._fish';
                    break;
                }
            }
            for (let j = 0; j < this._dragon.num; j++) {
                if (this._dragon.alive[j] && !this._fight[i]) {
                    this._fight[i] = true;
                    this._aimX[i] = this._dragon.x[j];
                    this._aimY[i] = this._dragon.y[j];
                    this._dragonIndex[i] = j;
                    this._aim[i] = 'this._dragon';
                    break;
                }
            }
            if (this._aim[i] === 'this._slm') {
                this._aimX[i] = this._slm.x[this._slmIndex[i]] + 100 * Math.random();
                this._aimY[i] = this._slm.y[this._slmIndex[i]] + 100 * Math.random();
                if (!this._slm.alive[this._slmIndex[i]]) {
                    this._fight[i] = false;
                    this._aim[i] = '';
                }
            } else if (this._aim[i] === 'this._mogu') {
                this._aimX[i] = this._mogu.x[this._moguIndex[i]] + this._lx[i];
                this._aimY[i] = this._mogu.y[this._moguIndex[i]] + this._ly[i];
                if (!this._mogu.alive[this._moguIndex[i]]) {
                    this._fight[i] = false;
                    this._aim[i] = '';
                }
            } else if (this._aim[i] === 'this._fish') {
                this._aimX[i] = this._fish.x[this._fishIndex[i]] + this._lx[i];
                this._aimY[i] = this._fish.y[this._fishIndex[i]] + this._ly[i];
                if (!this._fish.alive[this._fishIndex[i]]) {
                    this._fight[i] = false;
                    this._aim[i] = '';
                }
            } else if (this._aim[i] === 'this._dragon') {
                this._aimX[i] = this._dragon.x[this._dragonIndex[i]] + this._lx[i];
                this._aimY[i] = this._dragon.y[this._dragonIndex[i]] + this._ly[i];
                if (!this._dragon.alive[this._dragonIndex[i]]) {
                    this._fight[i] = false;
                    this._aim[i] = '';
                }
            } else {
                this._aim[i] = 'house';
                this._fight[i] = true;
                this._aimX[i] = this._house.x + this._housePic[this._house.level].width * 0.5;
                this._aimY[i] = this._house.y + this._housePic[this._house.level].height * 0.5;
            }

            if (this._fight[i]) {
                this._x[i] = Toolkit.lerpDistance(this._aimX[i], this._x[i], 0.995);
                this._y[i] = Toolkit.lerpDistance(this._aimY[i], this._y[i], 0.995);
                const l = Toolkit.calLength2(this._aimX[i], this._aimY[i], this._x[i], this._y[i]);
                if (l <= 900) {

                    if (this._aim[i] === 'this._slm' && this._slm.alive[this._slmIndex[i]] && this._alive[i]) {
                        this._slm.life[this._slmIndex[i]]--;
                        if (this._slm.life[this._slmIndex[i]] <= 0 && this._life[i] >= 0) {
                            this._slm.die(this._slmIndex[i]);
                            this._fight[i] = false;
                        }
                    }


                    if (this._aim[i] === 'this._mogu' && this._alive[i] && this._mogu.alive[this._moguIndex[i]]) {
                        this._mogu.life[this._moguIndex[i]]--;
                        if (this._mogu.life[this._moguIndex[i]] <= 0 && this._life[i] >= 0) {
                            this._mogu.die(this._moguIndex[i]);
                            this._fight[i] = false;
                        }
                    }

                    if (this._aim[i] === 'this._fish' && this._alive[i] && this._fish.alive[this._fishIndex[i]]) {
                        this._fish.life[this._fishIndex[i]]--;
                        if (this._fish.life[this._fishIndex[i]] <= 0 && this._life[i] >= 0) {
                            this._fish.die(this._fishIndex[i]);
                            this._fight[i] = false;
                        }
                    }
                    if (this._aim[i] === 'this._dragon' && this._alive[i] && this._dragon.alive[this._dragonIndex[i]]) {
                        this._dragon.life[this._dragonIndex[i]]--;
                        if (this._dragon.life[this._dragonIndex[i]] <= 0 && this._life[i] >= 0) {
                            this._dragon.die(this._dragonIndex[i]);
                            this._fight[i] = false;
                        }
                    }
                    if (this._aim[i] === 'house') {
                        this._house.life--;
                        if (this._house.life <= 0) {
                            this._house.life = 0;
                            this._house.alive = false;
                            this._game.gameover = true;
                        }
                    }


                }

                if (this._aimX[i] - this._x[i] >= 50) {
                    this._front[i] = 'right';
                }
                if (this._x[i] - this._aimX[i] >= 50) {
                    this._front[i] = 'left';
                }
                if (this._aimY[i] - this._y[i] >= 50) {
                    this._front[i] = 'front';
                }
                if (this._y[i] - this._aimY[i] >= 50) {
                    this._front[i] = 'back';
                }

            }


            if (this._alive[i]) {
                this._ctx2.save();
                this._ctx2.drawImage(this._Pic[this._PicCount[i]], this._x[i], this._y[i]);
                this._ctx2.restore();
                this._ctx2.save();
                this._ctx2.strokeStyle = "red";
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
                this._ctx2.lineTo(this._x[i] + 30 * this._life[i] / 100, this._y[i] - 20);
                this._ctx2.closePath();
                this._ctx2.stroke();
                this._ctx2.restore();
            }

        }
    }

    born(i: number) {
        this._x[i] = 500 + Math.random() * 200;
        this._y[i] = 800;
        this._alive[i] = true;
        this._front[i] = 'back';
        this._Pic = this._knightF;
        this._PicCount[i] = 0;
        this._delta[i] = 0;
        this._fight[i] = false;
        this._life[i] = 100;
    }

    die(i: number) {
        this._life[i] = 0;
        this._alive[i] = false;
        this._fight[i] = false;
        this._num--;
    }

    knightControl() {
        if (this._data.attact) {
            let count = 0;
            for (let i = 0; i < this._num; i++) {
                if (this._alive[i]) {
                    count++;
                }
            }
            if (count < this._num) {
                this.knightBorn();
            }
        }

    }

    knightBorn() {
        for (let i = 0; i < this._num; i++) {
            if (!this._alive[i]) {
                this.born(i);
                return;
            }
        }
    }
}




