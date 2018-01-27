/**
 * Created by Zora on 2017/2/11.
 * 黄药瓶
 */
import Toolkit from "../common/commonFunctions";

export default class Ypy {
    private _x: number[] = [];
    private _y: number[] = [];
    private _num: number;
    private _alive: boolean[] = [];
    private _lifetime: number[] = [];
    private _ctx2: any;
    private _ypyPic: HTMLImageElement;

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get alive() {
        return this._alive;
    }

    set x(val: number[]) {
        this._x = val;
    }

    set y(val: number[]) {
        this._y = val;
    }

    set alive(val: boolean[]) {
        this._alive = val;
    }

    constructor(ctx2: any, W: number, H: number, ypyPic: HTMLImageElement) {
        this._num = 50;
        this._ctx2 = ctx2;
        this._ypyPic = ypyPic;
        for (let i = 0; i < this._num; i++) {
            this._x[i] = W * 0.5;
            this._y[i] = H * 0.5;
            this._alive[i] = false;
            this._lifetime[i] = 5000;
        }
    }

    draw(deltaTime: number) {
        for(let i =0;i<this._num;i++){
            if(this._alive[i]){
                this._lifetime[i] -= deltaTime;
                if(this._lifetime[i]<=0){
                    this._alive[i] = false;
                }
                this._ctx2.save();
                this._ctx2.shadowBlur = 5;
                this._ctx2.shadowColor = Toolkit.randomColor(1);
                this._ctx2.drawImage(this._ypyPic,this._x[i],this._y[i],30,50);
                this._ctx2.restore();
            }
        }
    }

}
