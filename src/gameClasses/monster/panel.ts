/**
 * Created by Zora on 2017/6/10.
 */
import Bg from './bg';
import Data from './data';
import House from './house';
import Dragon from "./dragon";
import Fish from "./fish";
import Slm from "./slm";
import Mogu from "./mogu";

export default class Panel {
    private _x: number;
    private _y: number;
    private _show: boolean;
    private _ctx2: any;
    private _bg: Bg;
    private _data: Data;
    private _house: House;
    private _dragon: Dragon;
    private _fish: Fish;
    private _slm: Slm;
    private _mogu: Mogu;
    private _fishLogo: HTMLImageElement;
    private _moguLogo: HTMLImageElement;
    private _slmLogo: HTMLImageElement;
    private _dragonLogo: HTMLImageElement;

    constructor(ctx2: any, cx: number, cy: number, fishLogo: HTMLImageElement, moguLogo: HTMLImageElement, slmLogo: HTMLImageElement, dragonLogo: HTMLImageElement) {
        this._x = cx;
        this._y = cy;
        this._show = false;
        this._ctx2 = ctx2;
        this._fishLogo = fishLogo;
        this._moguLogo = moguLogo;
        this._slmLogo = slmLogo;
        this._dragonLogo = dragonLogo;
    }

    init( bg: Bg, data: Data, house: House, dragon: Dragon, fish: Fish, slm: Slm, mogu: Mogu) {
        this._bg = bg;
        this._data = data;
        this._house = house;
        this._dragon = dragon;
        this._fish = fish;
        this._slm = slm;
        this._mogu = mogu;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get show() {
        return this._show;
    }

    set show(val: boolean) {
        this._show = val;
    }

    set x(val: number) {
        this._x = val;
    }

    set y(val: number) {
        this._y = val;
    }

    draw() {
        if (this._show && !this._bg.occupied[this._bg.cbg]) {
            this._ctx2.save();
            this._ctx2.fillStyle = "rgba(60,255,60,0.5)";
            this._ctx2.beginPath();
            this._ctx2.fillRect(this._x, this._y, 100, 100);
            this._ctx2.closePath();
            this._ctx2.stroke();
            this._ctx2.drawImage(this._fishLogo, this._x, this._y - 100);
            this._ctx2.drawImage(this._moguLogo, this._x, this._y + 100);
            this._ctx2.drawImage(this._slmLogo, this._x - 100, this._y);
            this._ctx2.drawImage(this._dragonLogo, this._x + 100, this._y);
            this._ctx2.save();
            this._ctx2.fillStyle = "white";
            this._ctx2.textAlign = "center";
            this._ctx2.font = "20px Verdana";
            this._ctx2.fillText('取消', this._x + 50, this._y + 60);
            this._ctx2.restore();
        }
        if (this._show && this._bg.occupied[this._bg.cbg]) {
            this._ctx2.save();
            this._ctx2.fillStyle = "rgba(255,0,0,0.5)";
            this._ctx2.fillRect(this._x, this._y, 100, 100);
            this._ctx2.restore();
            this._ctx2.save();
            this._ctx2.fillStyle = "white";
            this._ctx2.textAlign = "center";
            this._ctx2.font = "20px Verdana";
            this._ctx2.fillText('取消', this._x + 50, this._y + 60);
            this._ctx2.restore();
        }

        if (this._show && this._bg.occupied[this._bg.cbg] && this._bg.over[this._bg.cbg] == 'house') {
            this._ctx2.save();
            this._ctx2.fillStyle = "rgba(60,255,60,0.5)";
            this._ctx2.strokeStyle = "white";
            this._ctx2.beginPath();
            this._ctx2.fillRect(this._x, this._y, 100, 100);
            this._ctx2.strokeRect(this._x, this._y, 100, 100);
            this._ctx2.fillRect(this._x, this._y - 100, 100, 100);
            this._ctx2.closePath();
            this._ctx2.stroke();
            this._ctx2.restore();
            this._ctx2.save();
            this._ctx2.fillStyle = "white";
            this._ctx2.textAlign = "center";
            this._ctx2.font = "20px Verdana";
            this._ctx2.fillText('升级', this._x + 50, this._y - 40);
            this._ctx2.restore();
            if (this._house.grassCost > this._data.grassCount || this._house.sjCost > this._data.sjCount) {
                this._ctx2.save();
                this._ctx2.fillStyle = "rgba(100,100,100,0.8)";
                this._ctx2.fillRect(this._x, this._y - 100, 100, 100);
                this._ctx2.restore();
                this._ctx2.save();
                this._ctx2.fillStyle = "white";
                this._ctx2.font = "20px Verdana";
                this._ctx2.fillText('纤维：' + this._house.grassCost, this._x, this._y - 70);
                this._ctx2.fillText('水晶：' + this._house.sjCost, this._x, this._y - 20);
                this._ctx2.restore();
            }
        }
        if ((this._fish.grassCost > this._data.grassCount || this._fish.sjCost > this._data.sjCount || this._data.limit >= this._house.limit) && this._show && !this._bg.occupied[this._bg.cbg]) {
            this._ctx2.save();
            this._ctx2.fillStyle = "rgba(100,100,100,0.8)";
            this._ctx2.fillRect(this._x, this._y - 100, 100, 100);
            this._ctx2.restore();
            this._ctx2.save();
            this._ctx2.fillStyle = "white";
            this._ctx2.font = "20px Verdana";
            this._ctx2.fillText('纤维：' + this._fish.grassCost, this._x, this._y - 70);
            this._ctx2.fillText('水晶：' + this._fish.sjCost, this._x, this._y - 40);
            this._ctx2.restore();
        }
        if ((this._mogu.grassCost > this._data.grassCount || this._mogu.sjCost > this._data.sjCount || this._data.limit >= this._house.limit) && this._show && !this._bg.occupied[this._bg.cbg]) {
            this._ctx2.save();
            this._ctx2.fillStyle = "rgba(100,100,100,0.8)";
            this._ctx2.fillRect(this._x, this._y + 100, 100, 100);
            this._ctx2.restore();
            this._ctx2.save();
            this._ctx2.fillStyle = "white";
            this._ctx2.font = "20px Verdana";
            this._ctx2.fillText('纤维：' + this._mogu.grassCost, this._x, this._y + 140);
            this._ctx2.fillText('水晶：' + this._mogu.sjCost, this._x, this._y + 170);
            this._ctx2.restore();
        }
        if ((this._slm.grassCost > this._data.grassCount || this._data.limit >= this._house.limit) && this._show && !this._bg.occupied[this._bg.cbg]) {
            this._ctx2.save();
            this._ctx2.fillStyle = "rgba(100,100,100,0.8)";
            this._ctx2.fillRect(this._x - 100, this._y, 100, 100);
            this._ctx2.restore();
            this._ctx2.save();
            this._ctx2.fillStyle = "white";
            this._ctx2.font = "20px Verdana";
            this._ctx2.fillText('纤维：' + this._slm.grassCost, this._x - 100, this._y + 40);
            this._ctx2.restore();
        }
        if ((this._dragon.grassCost > this._data.grassCount || this._dragon.sjCost > this._data.sjCount || this._data.limit >= this._house.limit) && this._show && !this._bg.occupied[this._bg.cbg]) {
            this._ctx2.save();
            this._ctx2.fillStyle = "rgba(100,100,100,0.8)";
            this._ctx2.fillRect(this._x + 100, this._y, 100, 100);
            this._ctx2.restore();
            this._ctx2.save();
            this._ctx2.fillStyle = "white";
            this._ctx2.font = "20px Verdana";
            this._ctx2.fillText('纤维：' + this._dragon.grassCost, this._x + 100, this._y + 40);
            this._ctx2.fillText('水晶：' + this._dragon.sjCost, this._x + 100, this._y + 70);
            this._ctx2.restore();
        }

    }
}