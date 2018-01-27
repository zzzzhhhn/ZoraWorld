import Boss2 from "./boss2";

/**
 * Created by Zora on 2017/2/12.
 * boss子弹
 */
export default class Seed1 {
    private _x: number[] = [];
    private _y: number[] = [];
    private _X: number[] = [];
    private _Y: number[] = [];
    private _s: number;
    private _r: number[] = [];
    private _num: number;
    private _alive: boolean[] = [];
    private _growing: boolean[] = [];
    private _al: number[] = [];
    private _dir: string[] = [];
    private _sp1: number;
    private _sp2: number;
    private _dps: number;
    private _dpsup: boolean;
    private _bossnum: number[] = [];
    private _boss2: Boss2;
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


    constructor(ctx2: any, boss2: Boss2,) {
        this._num = 50;
        this._sp1  = 0;
        this._sp2  = 0;
        this._dps  = 0;
        this._dpsup= false;
        this._boss2 = boss2;
        this._ctx2 = ctx2;
        for (let i=0;i<this._num;i++) {
            this._x[i] = boss2.x[this._bossnum[i]];
            this._y[i] = boss2.y[this._bossnum[i]]+75;
            this._s = 50;
            this._r[i] = 0;
            this._alive[i] = false;
            this._growing[i]  = false;
            this._X[i] = 0;
            this._Y[i] = 0;
            this._sp1 = 0.075;
            this._sp2 = 0.5;
            this._bossnum[i]=0;
        }
    }

    born(i: number) {
        this._bossnum[i]= Math.floor(Math.random()*this._boss2.num);
        if(this._boss2.alive[this._bossnum[i]]){
            this._alive[i]  = true;
            this._x[i] = this._boss2.x[this._bossnum[i]];
            this._y[i] = this._boss2.y[this._bossnum[i]]+75;
            this._r[i]      = 0;
            this._dir[i] = this._boss2.dir[this._bossnum[i]];
        }
    }

    die(i: number) {
        this._growing[i] = false;
        this._alive[i] = false;
        this._r[i]     = 0;
    }

    draw(W: number, H: number, deltaTime: number, boss2PicWidth: number) {
        this._ctx2.save();
        this._ctx2.lineWidth = 2;
        for (let i=0;i<this._num;i++) {
            if (this._boss2.alive[this._bossnum[i]]) {
                if (this._r[i] < this._s) {
                    if (this._boss2.dir[this._bossnum[i]] == "left") {
                        this._x[i] = this._boss2.x[this._bossnum[i]];
                    } else {
                        this._x[i] = this._boss2.x[this._bossnum[i]] + boss2PicWidth;
                    }
                    this._r[i] += deltaTime * this._sp1;
                    this._growing[i] = true;
                } else {
                    this._growing[i] = false;
                    if (this._dir[i] == "left") {
                        this._x[i] -= deltaTime * this._sp2;
                    } else {
                        this._x[i] += deltaTime * this._sp2;
                    }
                }
                if (this._y[i] < 0 || this._x[i] < 0 || this._x[i] > W || this._y[i] > H) {
                    this.die(i);
                }
                if (this._alive[i] && this._boss2.alive[this._bossnum[i]]) {
                    this._ctx2.beginPath();
                    this._ctx2.strokeStyle = "purple";
                    this._ctx2.arc(this._x[i], this._y[i], this._r[i], 0, Math.PI * 2);
                    this._ctx2.fillStyle = "black";
                    this._ctx2.shadowBlur = 50;
                    this._ctx2.shadowColor = "purple";
                    this._ctx2.fill();
                    this._ctx2.closePath();
                    this._ctx2.stroke();
                }
            }
        }
        this._ctx2.restore();
    }

    numControl() {
        let count = 0;
        for (let i=0;i<this._num;i++) {
            if(this._alive[i] && this._growing[i]){
                count++;
            }
        }
        if(count<1){
            this.sentseed1();
            return;
        }
    }

    sentseed1() {
        for (let i=0;i<this._num;i++) {
            if(!this._alive[i]){
                this.born(i);
                return;
            }
        }
    }
}


