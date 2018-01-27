/**
 * Created by Zora on 2017/2/12.
 * 兽人子弹
 */
import Sr from "./sr";
import Toolkit from "../common/commonFunctions";

export default class Seed {
    private _x: number[] = [];
    private _y: number[] = [];
    private _X: number[] = [];
    private _Y: number[] = [];
    private _s: number;
    private _r: number[] = [];
    private _num: number;
    private _alive: boolean[] = [];
    private _growing: boolean[] = [];
    private _dir: string[] = [];
    private _sp1: number;
    private _sp2: number;
    private _dps: number;
    private _dpsup: boolean;
    private _shadow: number;
    private _sr: Sr;
    private _ctx2: any;

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

    get dps() {
        return this._dps;
    }

    set alive(val: boolean[]) {
        this._alive = val;
    }


    set dpsup(val: boolean) {
        this._dpsup = val;
    }

    set dps(val: number) {
        this._dps = val;
    }

    set sp1(val: number) {
        this._sp1 = val;
    }

    set sp2(val: number) {
        this._sp2 = val;
    }

    set s(val: number) {
        this._s = val;
    }

    constructor(ctx2: any, sr: Sr) {
        this._ctx2 = ctx2;
        this._num = 50;
        this._s = 10;
        this._sp1 = 0.03;
        this._sp2 = 0.5;
        this._dps = 10;
        this._dpsup= false;
        this._shadow=5;
        this._sr = sr;
        for (let i=0;i<this._num;i++) {
            this._x[i] = this._sr.x;
            this._y[i] = this._sr.y;
            this._r[i] = 0;
            this._alive[i] = false;
            this._growing[i]  = false;
            this._X[i] = 0;
            this._Y[i] = 0;
            this._dir[i] = this._sr.dir;
        }
    }

    born(i: number) {
        this._alive[i]  = true;
        this._x[i] =this._sr.x;
        this._y[i] =this._sr.y;
        this._r[i]      = 0;
        this._dir[i] =this._sr.dir;
    }

    die(i: number) {
        this._growing[i] = false;
        this._alive[i] = false;
        this._r[i]     = 0;
    }

    draw(W: number, H: number, deltaTime: number, srPiclWidth: number) {
        this._ctx2.save();
        this._ctx2.lineWidth = 2;
        for (let i=0;i<this._num;i++) {
            if (this._r[i] < this._s) {
                if(this._sr.dir=="left"){
                    this._x[i] =this._sr.x;
                }else{
                    this._x[i] =this._sr.x + srPiclWidth;
                }
                this._r[i] += deltaTime*this._sp1;
                this._growing[i] = true;
            } else {
                this._growing[i] = false;
                if(this._dir[i]=="left"){
                    this._x[i] -= deltaTime * this._sp2;
                } else{
                    this._x[i] += deltaTime * this._sp2;
                }
            }
            if(this._y[i] < 0 || this._x[i] < 0 || this._x[i] > W || this._y[i] > H){
                this.die(i);
            }
            if(this._alive[i]){
                this._ctx2.beginPath();
                this._ctx2.strokeStyle = "yellow";
                this._ctx2.arc(this._x[i],this._y[i],this._r[i],0,Math.PI*2);
                this._ctx2.fillStyle = "blue";
                if(this._dpsup){
                    this._ctx2.shadowBlur = 20;
                    this._ctx2.shadowColor = Toolkit.randomColor(1);
                    this._ctx2.strokeStyle = Toolkit.randomColor(1);
                    this._ctx2.fillStyle = Toolkit.randomColor(1);

                }
                this._ctx2.fill();
                this._ctx2.closePath();
                this._ctx2.stroke();
            }


        }
        this._ctx2.restore();
    }


    sentseed() {
        let count = 0;
        for (let i=0;i<this._num;i++) {
            if(this._alive[i] && this._growing[i]){
                count++;
            }
            if(!this._alive[i] && count<1){
                this.born(i);
                return;
            }
        }
    }
}

