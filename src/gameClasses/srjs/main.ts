/**
 * Created by Zora on 2017/2/12.
 * 游戏入口
 */
import Boss1 from "./boss1";
import Boss2 from "./boss2";
import Sr from './sr';
import Data from './data';
import Seed1 from './seed1';
import Js from './js';
import Seed from './seed';
import Xz from './xz';
import Ypr from './ypr';
import Zb from './zb';
import Fz from './fz';
import Ypy from './ypy';
import Sz from './sz';
import Game from '../common/game';

export default class orcishGame {
    private _can1: HTMLCanvasElement;
    private _can2: HTMLCanvasElement;
    private _ctx1: any;
    private _ctx2: any;
    private _bg: HTMLImageElement;
    private _W: number;
    private _H: number;
    private _lastTime: number;
    private _deltaTime: number;
    private _srPicl: HTMLImageElement[] = [];
    private _srPicr: HTMLImageElement[] = [];
    private _sr: Sr;
    private _seed: Seed;
    private _mx: number;
    private _my: number;
    private _jsPic: HTMLImageElement[] = [];
    private _js: Js;
    private _data: Data;
    private _fzPic: HTMLImageElement;
    private _fz: Fz;
    private _yprPic: HTMLImageElement;
    private _ypr: Ypr;
    private _szPic: HTMLImageElement;
    private _sz: Sz;
    private _zbPic: HTMLImageElement;
    private _zb: Zb;
    private _ypyPic: HTMLImageElement;
    private _ypy: Ypy;
    private _xzPic: HTMLImageElement;
    private _xz: Xz;
    private _boss1: Boss1;
    private _boss1lPic: HTMLImageElement[] = [];
    private _boss1rPic: HTMLImageElement[] = [];
    private _boss2: Boss2;
    private _boss2lPic: HTMLImageElement[] = [];
    private _boss2rPic: HTMLImageElement[] = [];
    private _seed1: Seed1;
    private _game: Game;
    private _timer: any;

    constructor() {
        this._can1 = <HTMLCanvasElement>document.getElementById('canvas1');
        this._can2 = <HTMLCanvasElement>document.getElementById('canvas2');
        this._ctx1 = this._can1.getContext('2d');
        this._ctx2 = this._can2.getContext('2d');

        this._lastTime = Date.now();
        this._deltaTime = 0;

        this._W = this._can2.width;
        this._H = this._can2.height;

        this._bg = new Image();
        this._bg.src = require('../../assets/img/orcish/bg.jpg');
        this._fzPic = new Image();
        this._fzPic.src = require('../../assets/img/orcish/fz.png');
        this._yprPic = new Image();
        this._yprPic.src = require('../../assets/img/orcish/ypr.png');
        this._zbPic = new Image();
        this._zbPic.src = require('../../assets/img/orcish/zb.png');
        this._szPic = new Image();
        this._szPic.src = require('../../assets/img/orcish/sz.png');
        this._ypyPic = new Image();
        this._ypyPic.src = require('../../assets/img/orcish/ypy.png');
        this._xzPic = new Image();
        this._xzPic.src = require('../../assets/img/orcish/xz.png');
        for (let i = 0; i < 4; i++) {
            this._srPicl[i] = new Image();
            this._srPicl[i].src = require('../../assets/img/orcish/srl' + i + '.png');
        }
        for (let i = 0; i < 4; i++) {
            this._srPicr[i] = new Image();
            this._srPicr[i].src = require('../../assets/img/orcish/srr' + i + '.png');
        }
        for (let i = 0; i < 7; i++) {
            this._jsPic[i] = new Image();
            this._jsPic[i].src = require('../../assets/img/orcish/js' + i + '.png');
        }
        for (let i = 0; i < 8; i++) {
            this._boss1lPic[i] = new Image();
            this._boss1lPic[i].src = require('../../assets/img/orcish/boss1l' + i + '.png');
        }
        for (let i = 0; i < 8; i++) {
            this._boss1rPic[i] = new Image();
            this._boss1rPic[i].src = require('../../assets/img/orcish/boss1r' + i + '.png');
        }
        for (let i = 0; i < 8; i++) {
            this._boss2lPic[i] = new Image();
            this._boss2lPic[i].src = require('../../assets/img/orcish/boss2l' + i + '.png');
        }
        for (let i = 0; i < 8; i++) {
            this._boss2rPic[i] = new Image();
            this._boss2rPic[i].src = require('../../assets/img/orcish/boss2r' + i + '.png');
        }
    }

    start() {
        this._game = new Game();
        this._xz = new Xz(this._ctx2, this._W, this._H, this._xzPic);
        this._zb = new Zb(this._ctx2, this._W, this._H, this._zbPic);
        this._sz = new Sz(this._ctx2, this._W, this._H, this._szPic);
        this._ypy = new Ypy(this._ctx2, this._W, this._H, this._ypyPic);
        this._ypr = new Ypr(this._ctx2, this._W, this._H, this._yprPic);
        this._fz = new Fz(this._ctx2, this._W, this._H, this._fzPic);
        this._sr = new Sr(this._ctx2, this._W, this._H, this._srPicl, this._srPicr);
        this._js = new Js(this._ctx2, this._W, this._H, this._game, this._jsPic);
        this._seed = new Seed(this._ctx2, this._sr);
        this._boss1 = new Boss1(this._ctx2, this._W, this._H, this._boss1lPic, this._boss1rPic, this._sr);
        this._boss2 = new Boss2(this._ctx2, this._W, this._H, this._boss2lPic, this._boss2rPic, this._sr);
        this._seed1 = new Seed1(this._ctx2, this._boss2);
        this._data = new Data(this._ctx2,this._js, this._boss1, this._boss2, this._seed, this._boss1lPic[0].width, this._boss1lPic[0].height, this._boss2lPic[0].width, this._boss2lPic[0].height,
            this._xz, this._ypr, this._zb, this._fz, this._sz, this._ypy, this._jsPic[0].width,this._jsPic[0].height, this._srPicl[0].width, this._srPicl[0].height, this._sr, this._seed1, this._game);


        if (this._can2.addEventListener) {
            document.addEventListener("keydown", this.fireFoxMove.bind(this), true);
            document.addEventListener("keyup", this.fireFoxStop.bind(this), true);
        } else {
            document.addEventListener("onkeydown", this.ieMove);
            document.addEventListener("onkeyup", this.ieStop.bind(this));
        }

        this.gameLoop();

    }

    end() {
        cancelAnimationFrame(this._timer);
    }

    gameLoop() {
        this._timer = requestAnimationFrame(this.gameLoop.bind(this));
        this._deltaTime = Date.now() - this._lastTime;
        if (this._deltaTime > 40) {
            this._deltaTime = 40;
        }
        this._lastTime = Date.now();
        this._ctx1.drawImage(this._bg, 0, 0, this._W, this._H);
        this._ctx2.clearRect(0, 0, this._W, this._H);

        this._sr.draw(this._W, this._H, this._deltaTime);
        this._seed.draw(this._W, this._H, this._deltaTime, this._srPicl[0].width);
        this._js.jsControl();
        this._js.draw(this._W, this._H, this._deltaTime);
        this._data.draw(this._W, this._H, this._deltaTime);
        this._data.hit();
        this._fz.draw(this._deltaTime);
        this._ypr.draw(this._deltaTime);
        this._zb.draw(this._deltaTime);
        this._sz.draw(this._deltaTime);
        this._ypy.draw(this._deltaTime);
        this._xz.draw(this._deltaTime);
        this._data.arm();
        this._data.hurt();
        this._data.boss(this._deltaTime);
        this._seed1.numControl();
        this._seed1.draw(this._W, this._H, this._deltaTime, this._boss2lPic[0].width);
        this._boss1.draw(this._deltaTime);
        this._boss2.draw(this._W, this._H, this._deltaTime);

    }

    fireFoxMove(evt: any) {
        if (!this._game.gameover) {
            if (evt.keyCode === 37) {
                this._sr.moveLeft();
            }
            if (evt.keyCode === 38) {
                this._sr.moveUp();
            }
            if (evt.keyCode === 39) {
                this._sr.moveRight();
            }
            if (evt.keyCode === 40) {
                this._sr.moveDown();
            }
            if (evt.keyCode === 32) {
                this._seed.sentseed();
            }
        }
    }

    ieMove(evt: any) {
        if (!this._game.gameover) {
            if (evt.keyCode == 37) {
                this._sr.moveLeft();
            }
            if (evt.keyCode == 38) {
                this._sr.moveUp();
            }
            if (evt.keyCode == 39) {
                this._sr.moveRight();
            }
            if (evt.keyCode == 40) {
                this._sr.moveDown();
            }
            if (evt.keyCode == 32) {
                this._seed.sentseed();
            }
        }
    }

    fireFoxStop(evt: any) {
        if (!this._game.gameover) {
            if (evt.keyCode == 37) {
                this._sr.stopLeft();
            }
            if (evt.keyCode == 38) {
                this._sr.stopUp();
            }
            if (evt.keyCode == 39) {
                this._sr.stopRight();
            }
            if (evt.keyCode == 40) {
                this._sr.stopDown();
            }

        }
    }

    ieStop(evt: any) {
        if (!this._game.gameover) {
            if (evt.keyCode == 37) {
                this._sr.stopLeft();
            }
            if (evt.keyCode == 38) {
                this._sr.stopUp();
            }
            if (evt.keyCode == 39) {
                this._sr.stopRight();
            }
            if (evt.keyCode == 40) {
                this._sr.stopDown();
            }

        }
    }


}


