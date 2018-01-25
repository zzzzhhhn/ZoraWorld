/**
 * Created by Zora on 2017/2/12.
 * 游戏入口
 */
import Boss1 from "./boss1";


export default class Game {
    private _can1: any;
    private _can2: any;
    private _ctx1: any;
    private _ctx2: any;
    private _bg: any;
    private _W: number;
    private _H: number;
    private _lastTime: number;
    private _deltaTime: number;
    private _srPicl: HTMLImageElement[];
    private _srPicr: HTMLImageElement[];
    private _sr: Sr;
    private _seed: Seed;
    private _mx: number;
    private _my: number;
    private _jsPic: HTMLImageElement[];
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
    private _boss1lPic: HTMLImageElement[];
    private _boss1rPic: HTMLImageElement[];
    private _boss2: Boss2;
    private _boss2lPic: HTMLImageElement[];
    private _boss2rPic: HTMLImageElement[];
    private _seed1: Seed;

    constructor() {
        this._can1 = document.getElementById('canvas1');
        this._can2 = document.getElementById('canvas2');
        this._ctx1 = this._can1.getContext('2d');
        this._ctx2 = this._can2.getContext('2d');

        this._lastTime = Date.now();
        this._deltaTime= 0;

        this._W = this._can2.width;
        this._H = this._can2.height;
        this._bg = new Image();
        this._bg.src = "../images/sr/bg.jpg";
        this._sr = new Sr();
        this._can2.addEventListener("click",onClick,false);
        this._seed = new Seed();
        this._fzPic = new Image();
        this._fzPic.src = "../images/sr/fz.png";
        this._fz = new Fz();
        this._yprPic = new Image();
        this._yprPic.src = "../images/sr/ypr.png";
        this._ypr = new Ypr();
        this._zbPic = new Image();
        this._zbPic.src = "../images/sr/zb.png";
        this._zb = new Zb();
        this._szPic = new Image();
        this._szPic.src = "../images/sr/sz.png";
        this._sz = new Sz();
        this._ypyPic = new Image();
        this._ypyPic.src = "../images/sr/ypy.png";
        this._ypy = new Ypy();
        this._xzPic = new Image();
        this._xzPic.src = "../images/sr/xz.png";
        this._xz = new Xz();
        this._seed1 = new Seed1();

        if(document.addEventListener){
            document.addEventListener("keydown",fireFoxMove, true);
        } else{
            document.addEventListener("onkeydown",ieMove);
        }
        if(document.addEventListener){
            document.addEventListener("keyup",fireFoxStop, true);
        } else{
            document.addEventListener("onkeyup",ieStop);
        }
        for (let i=0;i<4;i++) {
            this._srPicl[i] = new  Image();
            this._srPicl[i].src = "../images/sr/srl"+ i + ".png";
        }
        for (let i=0;i<4;i++) {
            this._srPicr[i] = new  Image();
            this._srPicr[i].src = "../images/sr/srr"+ i + ".png";
        }
        for (let i=0;i<7;i++) {
            this._jsPic[i] = new  Image();
            this._jsPic[i].src = "../images/sr/js"+ i + ".png";
        }
        this._js = new Js();
        this._data  = new Data();
        for (let i=0;i<8;i++) {
            this._boss1lPic[i] = new  Image();
            this._boss1lPic[i].src = "../images/sr/boss1l"+ i + ".png";
        }
        for (let i=0;i<8;i++) {
            this._boss1rPic[i] = new  Image();
            this._boss1rPic[i].src = "../images/sr/boss1r"+ i + ".png";
        }
        this._boss1 = new Boss1(this._ctx2, this._W, this._H, this._boss1lPic, this._boss1rPic, this._sr);

        for (let i=0;i<8;i++) {
            this._boss2lPic[i] = new  Image();
            this._boss2lPic[i].src = "../images/sr/boss2l"+ i + ".png";
        }
        for (let i=0;i<8;i++) {
            this._boss2rPic[i] = new  Image();
            this._boss2rPic[i].src = "../images/sr/boss2r"+ i + ".png";
        }
        this._boss2 = new Boss2();
    }

    gameLoop() {
        window.requestAnimationFrame(this.gameLoop);
        this._deltaTime = Date.now() - this._lastTime;
        if(this._deltaTime>40){
            this._deltaTime = 40;
        }
        this._lastTime = Date.now();
        this._ctx1.drawImage(this._bg,0,0,this._W,this._H);
        this._ctx2.clearRect(0,0,this._W,this._H);
        this._sr.draw();
        this._seed.draw();
        jsControl();
        this._js.draw();
        this._data.draw();
        hit();
        this._fz.draw();
        this._ypr.draw();
        this._zb.draw();
        this._sz.draw();
        this._ypy.draw();
        this._xz.draw();
        arm();
        hurt();
        boss();
        numControl();
        this._boss1.draw(this._deltaTime);
        this._boss2.draw();
        this._seed1.draw();
    }

    fireFoxMove(evt: any){
        if(!this._data.gameover){
            if(evt.keyCode==37) {
                this._sr.moveLeft();
            }
            if(evt.keyCode==38){
                this._sr.moveUp();
            }
            if(evt.keyCode==39){
                this._sr.moveRight();
            }
            if(evt.keyCode==40){
                this._sr.moveDown();
            }
            if(evt.keyCode==32){
                sentseed();
            }
        }
    }

    ieMove(evt: any){
        if(!this._data.gameover){
            if(evt.keyCode==37) {
                this._sr.moveLeft();
            }
            if(evt.keyCode==38){
                this._sr.moveUp();
            }
            if(evt.keyCode==39){
                this._sr.moveRight();
            }
            if(evt.keyCode==40){
                this._sr.moveDown();
            }
            if(evt.keyCode==32){
                sentseed();
            }
        }
    }

    fireFoxStop(evt: any){
        if(!this._data.gameover){
            if(evt.keyCode==37) {
                this._sr.stopLeft();
            }
            if(evt.keyCode==38){
                this._sr.stopUp();
            }
            if(evt.keyCode==39){
                this._sr.stopRight();
            }
            if(evt.keyCode==40){
                this._sr.stopDown();
            }

        }
    }

    ieStop(evt: any){
        if(!this._data.gameover){
            if(evt.keyCode==37) {
                this._sr.stopLeft();
            }
            if(evt.keyCode==38){
                this._sr.stopUp();
            }
            if(evt.keyCode==39){
                this._sr.stopRight();
            }
            if(evt.keyCode==40){
                this._sr.stopDown();
            }

        }
    }

    onClick(e: any) {
        if(!this._data.gameOver){
            if(e.offsetX || e.layerX){
                this._mx = e.offsetX == undefined ? e.layerX : e.offsetX;
                this._my = e.offsetY == undefined ? e.layerY : e.offsetY;
            }
        }

    }
}


