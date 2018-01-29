/**
 * Created by Zora on 2017/2/12.
 * 游戏数据控制
 */
import Toolkit from '../common/commonFunctions';
import Js from './js';
import Seed from './seed';
import Xz from './xz';
import Ypr from './ypr';
import Zb from './zb';
import Fz from './fz';
import Ypy from './ypy';
import Sz from './sz';

import Boss1 from "./boss1";
import Boss2 from "./boss2";
import Sr from "./sr";
import Seed1 from "./seed1";
import Game from "../common/game";

export default class Data {
    private _score: number;
    private _life: number;
    private _lifeLimit: number;
    private _al: number;
    private _protect: boolean;
    private _djs: number;
    private _ctx2: any;
    private _js: Js;
    private _boss1: Boss1;
    private _boss2: Boss2;
    private _seed: Seed;
    private _boss1lPicWidth: number;
    private _boss1lPicHeight: number;
    private _boss2lPicWidth: number;
    private _boss2lPicHeight: number;
    private _xz: Xz;
    private _ypr: Ypr;
    private _zb: Zb;
    private _fz: Fz;
    private _sz: Sz;
    private _ypy: Ypy;
    private _jsPicWidth: number;
    private _jsPicHeight: number;
    private _srPiclWidth: number;
    private _srPiclHeight: number;
    private _sr: Sr;
    private _seed1: Seed1;
    private _game: Game;



    constructor(ctx2: any, js: Js, boss1: Boss1, boss2: Boss2, seed: Seed, boss1lPicWidth: number, boss1lPicHeight: number,
                boss2lPicWidth: number,boss2lPicHeight: number, xz: Xz, ypr: Ypr, zb: Zb, fz: Fz, sz: Sz, ypy: Ypy,
                jsPicWidth: number, jsPicHeight: number, srPiclWidth: number,srPiclHeight: number, sr: Sr, seed1: Seed1, game: Game) {
        this._ctx2 = ctx2;
        this._js = js;
        this._boss1 = boss1;
        this._boss2 = boss2;
        this._seed = seed;
        this._xz = xz;
        this._ypr = ypr;
        this._zb = zb;
        this._fz = fz;
        this._sz = sz;
        this._ypy = ypy;
        this._sr = sr;
        this._game = game;
        this._jsPicWidth = jsPicWidth;
        this._jsPicHeight = jsPicHeight;
        this._srPiclWidth = srPiclWidth;
        this._srPiclHeight = srPiclHeight;
        this._boss1lPicWidth = boss1lPicWidth;
        this._boss1lPicHeight = boss1lPicHeight;
        this._boss2lPicWidth = boss2lPicWidth;
        this._boss2lPicHeight = boss2lPicHeight;
        this._seed1 = seed1;
        this._score = 0;
        this._life = 100;
        this._lifeLimit = 100;
        this._al = 0;
        this._protect = false;
        this._djs = 120000;
    }

    draw(W: number, H: number, deltaTime: number) {
        this._ctx2.save();
        this._ctx2.strokeStyle = "white";
        this._ctx2.lineWidth = 30;
        this._ctx2.globalAlpha = 0.1;
        this._ctx2.lineCap = "round";
        this._ctx2.beginPath();
        this._ctx2.moveTo(W - 200, 35);
        this._ctx2.lineTo(W - 30, 35);
        this._ctx2.closePath();
        this._ctx2.stroke();
        this._ctx2.restore();

        this._ctx2.save();
        this._ctx2.strokeStyle = "red";
        this._ctx2.globalAlpha = 0.7;
        this._ctx2.lineWidth = 30;
        this._ctx2.lineCap = "round";
        this._ctx2.shadowBlur = 10;
        this._ctx2.shadowColor = "white";
        this._ctx2.font = "20px Verdana";
        this._ctx2.fillStyle = "white";
        this._ctx2.textAlign = "center";
        this._ctx2.beginPath();
        this._ctx2.moveTo(W - 200, 35);
        this._ctx2.lineTo(W - 200 + 170 * this._life / this._lifeLimit, 35);
        this._ctx2.closePath();
        this._ctx2.stroke();
        this._ctx2.fillText(Math.floor(this._life) + "/" + this._lifeLimit, W - 150, 40);
        this._ctx2.restore();

        this._ctx2.save();
        this._ctx2.shadowBlur = 10;
        this._ctx2.shadowColor = "white";
        this._ctx2.font = "20px Verdana";
        this._ctx2.fillStyle = "white";
        this._ctx2.textAlign = "center";
        this._ctx2.fillText("生命值:", W - 250, 40);
        this._ctx2.fillText("得分：" + this._score, W - 400, 40);
        this._ctx2.fillText("僵尸数：" + Math.ceil(this._js.limit) + "/50", 100, 40);
        this._ctx2.fillText("Boss倒计时：" + Math.ceil(this._djs / 1000), 300, 40);
        this._ctx2.fillText(" © 左拉Zora 2017.2.14", W - 150, H - 30);
        this._ctx2.restore();
        this._ctx2.save();
        this._ctx2.shadowBlur = 20;
        this._ctx2.shadowColor = Toolkit.randomColor(1);
        this._ctx2.font = "30px Verdana";
        this._ctx2.fillStyle = Toolkit.randomColor(1);
        this._ctx2.textAlign = "center";
        this._ctx2.fillText("兽人大战僵尸", 600, 40);
        this._ctx2.restore();
        if (this._game.gameover) {
            this._al += deltaTime * 0.0005;
            if (this._al >= 1) {
                this._al = 1;
            }
            this._ctx2.save();
            this._ctx2.shadowBlur = 10;
            this._ctx2.shadowColor = "white";
            this._ctx2.font = "50px Verdana";
            this._ctx2.fillStyle = "rgba(255,255,255," + this._al + ")";
            this._ctx2.textAlign = "center";
            this._ctx2.fillText("GameOver", W * 0.5, H * 0.5);
            this._ctx2.restore();
        }

    }

    boss(deltaTime: number) {
        this._djs -= deltaTime;
        if (this._djs <= 0) {
            this._boss1.boss1show();
            this._boss2.boss2show();
            this._djs = 120000;
            return;
        }
    }

    hit() {
        for (let i = 0; i < this._boss1.num; i++) {
            for (let j = 0; j < this._seed.num; j++) {
                const l3 = Toolkit.calLength2(this._boss1.x[i] + this._boss1lPicWidth * 0.5, this._boss1.y[i] + this._boss1lPicHeight * 0.5, this._seed.x[j], this._seed.y[j]);

                if (l3 < 5000 && this._boss1.alive[i] && this._seed.alive[j]) {
                    this._seed.alive[j] = false;
                    this._boss1.blood[i] -= this._seed.dps;
                    if (this._boss1.blood[i] <= 0) {
                        this._boss1.blood[i] = 0;
                        this._boss1.alive[i] = false;
                        if (!this._game.gameover) {
                            this._score += 100;
                            this._ypr.alive[j] = true;
                            this._ypr.x[j] = this._boss1.x[i];
                            this._ypr.y[j] = this._boss1.y[i];
                            this._zb.alive[j] = true;
                            this._zb.x[j] = this._boss1.x[i];
                            this._zb.y[j] = this._boss1.y[i];
                            this._xz.alive[j] = true;
                            this._xz.x[j] = this._boss1.x[i];
                            this._xz.y[j] = this._boss1.y[i];
                        }
                    }
                }
            }
        }
        for (let i = 0; i < this._boss2.num; i++) {
            for (let j = 0; j < this._seed.num; j++) {
                const l4 = Toolkit.calLength2(this._boss2.x[i] + this._boss2lPicWidth * 0.5, this._boss2.y[i] + this._boss2lPicHeight * 0.5, this._seed.x[j], this._seed.y[j]);

                if (l4 < 5000 && this._boss2.alive[i] && this._seed.alive[j]) {
                    this._seed.alive[j] = false;
                    this._boss2.blood[i] -= this._seed.dps;
                    if (this._boss2.blood[i] <= 0) {
                        this._boss2.blood[i] = 0;
                        this._boss2.alive[i] = false;
                        if (!this._game.gameover) {
                            this._score += 200;
                            this._fz.alive[j] = true;
                            this._fz.x[j] = this._boss2.x[i];
                            this._fz.y[j] = this._boss2.y[i];
                            this._sz.alive[j] = true;
                            this._sz.x[j] = this._boss2.x[i];
                            this._sz.y[j] = this._boss2.y[i];
                            this._ypy.alive[j] = true;
                            this._ypy.x[j] = this._boss2.x[i];
                            this._ypy.y[j] = this._boss2.y[i];
                        }
                    }
                }
            }
        }
        for (let i = 0; i < this._js.num; i++) {
            for (let j = 0; j < this._seed.num; j++) {
                const l1 = Toolkit.calLength2(this._js.x[i] + this._jsPicWidth * 0.5, this._js.y[i] + this._jsPicHeight * 0.25, this._seed.x[j], this._seed.y[j]);
                const l2 = Toolkit.calLength2(this._js.x[i] + this._jsPicWidth * 0.5, this._js.y[i] + this._jsPicHeight * 0.75, this._seed.x[j], this._seed.y[j]);
                if ((l1 < 900 || l2 < 900) && this._seed.alive[j] && this._js.alive[i]) {
                    this._seed.alive[j] = false;
                    this._js.blood[i] -= this._seed.dps;
                    if (this._js.blood[i] <= 0) {
                        this._js.alive[i] = false;
                        this._js.limit--;
                        if (!this._game.gameover) {
                            this._score += 10;
                        }
                        const row1 = Math.random();
                        const row2 = Math.random();
                        const row3 = Math.random();
                        const row4 = Math.random();
                        const row5 = Math.random();
                        const row6 = Math.random();
                        if (row1 >= 0.90) {
                            this._ypr.alive[i] = true;
                            this._ypr.x[i] = this._js.x[i];
                            this._ypr.y[i] = this._js.y[i];
                        } else if (row2 >= 0.90) {
                            this._xz.alive[i] = true;
                            this._xz.x[i] = this._js.x[i];
                            this._xz.y[i] = this._js.y[i];
                        } else if (row3 >= 0.90) {
                            this._fz.alive[i] = true;
                            this._fz.x[i] = this._js.x[i];
                            this._fz.y[i] = this._js.y[i];
                        } else if (row4 >= 0.90) {
                            this._sz.alive[i] = true;
                            this._sz.x[i] = this._js.x[i];
                            this._sz.y[i] = this._js.y[i];
                        } else if (row5 >= 0.90) {
                            this._zb.alive[i] = true;
                            this._zb.x[i] = this._js.x[i];
                            this._zb.y[i] = this._js.y[i];
                        } else if (row6 >= 0.90) {
                            this._ypy.alive[i] = true;
                            this._ypy.x[i] = this._js.x[i];
                            this._ypy.y[i] = this._js.y[i];
                        }
                    }
                }
            }
        }
    }

    arm() {
        for (let i = 0; i < this._ypr.num; i++) {
            const lypr1 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.25, this._ypr.x[i], this._ypr.y[i]);
            const lypr2 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.75, this._ypr.x[i], this._ypr.y[i]);
            const lzb1 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.25, this._zb.x[i], this._zb.y[i]);
            const lzb2 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.75, this._zb.x[i], this._zb.y[i]);
            const lfz1 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.25, this._fz.x[i], this._fz.y[i]);
            const lfz2 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.75, this._fz.x[i], this._fz.y[i]);
            const lxz1 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.25, this._xz.x[i], this._xz.y[i]);
            const lxz2 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.75, this._xz.x[i], this._xz.y[i]);
            const lsz1 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.25, this._sz.x[i], this._sz.y[i]);
            const lsz2 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.75, this._sz.x[i], this._sz.y[i]);
            const lypy1 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.25, this._ypy.x[i], this._ypy.y[i]);
            const lypy2 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.75, this._ypy.x[i], this._ypy.y[i]);

            if ((lypr1 < 900 || lypr2 < 900) && this._ypr.alive[i]) {
                this._ypr.alive[i] = false;
                this._life += 10;
                if (this._life >= this._lifeLimit) {
                    this._life = this._lifeLimit;
                }
            }
            if ((lzb1 < 900 || lzb2 < 900) && this._zb.alive[i]) {
                this._zb.alive[i] = false;
                this._lifeLimit += 10;
            }
            if ((lfz1 < 900 || lfz2 < 900) && this._fz.alive[i]) {
                this._fz.alive[i] = false;
                this._seed.dps += 5;
                this._seed.dpsup = true;
            }
            if ((lxz1 < 900 || lxz2 < 900) && this._xz.alive[i]) {
                this._xz.alive[i] = false;
                this._sr.sp++;
            }
            if ((lsz1 < 900 || lsz2 < 900) && this._sz.alive[i]) {
                this._sz.alive[i] = false;
                this._seed.sp1 += 0.01;
                this._seed.sp2 += 0.1;
                this._seed.s++;
            }
            if ((lypy1 < 900 || lypy2 < 900) && this._ypy.alive[i]) {
                this._ypy.alive[i] = false;
                this._sr.wd = true;
                this._sr.wdtime = 5000;
            }
        }
    }

    hurt() {
        for (let i = 0; i < this._js.num; i++) {
            const l1 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.5, this._js.x[i] + this._jsPicWidth * 0.5, this._js.y[i] + this._jsPicHeight * 0.5);
            if (l1 < 1500 && this._js.alive[i] && !this._sr.wd) {
                this._life--;
                if (this._life <= 0) {
                    this._life = 0;
                    this._game.gameover = true;
                }
            }
        }
        for (let i = 0; i < this._seed1.num; i++) {
            const l1 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.5, this._seed1.x[i], this._seed1.y[i]);
            if (l1 < 5000 && this._boss2.alive[i] && !this._sr.wd) {
                this._life--;
                if (this._life <= 0) {
                    this._life = 0;
                    this._game.gameover = true;
                }
            }
        }
        for (let i = 0; i < this._boss1.num; i++) {
            const l2 = Toolkit.calLength2(this._sr.x + this._srPiclWidth * 0.5, this._sr.y + this._srPiclHeight * 0.5, this._boss1.x[i] + this._boss1lPicWidth * 0.5, this._boss1.y[i] + this._boss1lPicHeight * 0.5);
            if (l2 < 5000 && this._boss1.alive[i] && !this._sr.wd) {
                this._life--;
                if (this._life <= 0) {
                    this._life = 0;
                    this._game.gameover = true;
                }
            }
        }
    }
}


