/**
 * Created by Zora on 2017/6/2.
 */
import BG from "./bg";
import Grass from "./grass";
import Farmer from "./farmers";
import Maid from "./maids";
import Knight from "./knight";
import House from "./house";
import Panel from "./panel";
import Dragon from "./dragon";
import Mogu from "./mogu";
import Slm from "./slm";
import Fish from "./fish";
import Sj from "./sj";
import Data from "./data";
import Tree from "./tree";

export default class MonsterGame {
    private _can1: HTMLCanvasElement;
    private _can2: HTMLCanvasElement;
    private _ctx1: any;
    private _ctx2: any;
    private _bgPic: HTMLImageElement;
    private _bg: BG;
    private _lasttime: number;
    private _deltaTime: number;
    private _W: number;
    private _H: number;
    private _grassPic: HTMLImageElement;
    private _grass: Grass;
    private _farmerF: HTMLImageElement[];
    private _farmerB: HTMLImageElement[];
    private _farmerL: HTMLImageElement[];
    private _farmerR: HTMLImageElement[];
    private _farmer: Farmer;
    private _maidF: HTMLImageElement[];
    private _maidB: HTMLImageElement[];
    private _maidL: HTMLImageElement[];
    private _maidR: HTMLImageElement[];
    private _maid: Maid;
    private _knightF: HTMLImageElement[];
    private _knightB: HTMLImageElement[];
    private _knightL: HTMLImageElement[];
    private _knightR: HTMLImageElement[];
    private _knight: Knight;
    private _housePic: HTMLImageElement[];
    private _house: House;
    private _mx: number;
    private _my: number;
    private _cx: number;
    private _cy: number;
    private _dragonLogo: HTMLImageElement;
    private _fishLogo: HTMLImageElement;
    private _moguLogo: HTMLImageElement;
    private _slmLogo: HTMLImageElement;
    private _panel: Panel;
    private _dragonPicl: HTMLImageElement[];
    private _dragonPicr: HTMLImageElement[];
    private _dragon: Dragon;
    private _moguPicl: HTMLImageElement[];
    private _moguPicr: HTMLImageElement[];
    private _mogu: Mogu;
    private _dragonEgg: HTMLImageElement;
    private _fishEgg: HTMLImageElement;
    private _moguEgg: HTMLImageElement;
    private _slmEgg: HTMLImageElement;
    private _dragonPlan: HTMLImageElement;
    private _fishPlan: HTMLImageElement;
    private _moguPlan: HTMLImageElement;
    private _slmPlan: HTMLImageElement;
    private _slmPicl: HTMLImageElement[];
    private _slmPicr: HTMLImageElement[];
    private _slm: Slm;
    private _fishPicl: HTMLImageElement[];
    private _fishPicr: HTMLImageElement[];
    private _fish: Fish;
    private _sjPic: HTMLImageElement;
    private _sj: Sj;
    private _data: Data;
    private _treePic: HTMLImageElement;
    private _tree: Tree;
    private _wl: HTMLImageElement;

    constructor() {
        this._can1 = document.getElementById('canvas1');
        this._can2 = document.getElementById('canvas2');
        this._ctx1 = this._can1.getContext('2d');
        this._ctx2 = this._can2.getContext('2d');
        this._mx = 0;
        this._my = 0;
        this._cx = 0;
        this._cy = 0;
        this._W = this._can1.width;
        this._H = this._can2.height;

        this._bgPic = new Image();
        this._bgPic.src = './img/ground.png';
        this._wl = new Image();
        this._wl.src = "./img/wl.png";
        this._grassPic = new Image();
        this._grassPic.src = './img/grass.png';
        this._treePic = new Image();
        this._treePic.src = './img/tree.png';
        for (let i = 0; i < 4; i++) {
            this._farmerF[i] = new Image();
            this._farmerF[i].src = "./img/farmers/font" + i + ".png";
        }
        for (let i = 0; i < 4; i++) {
            this._farmerB[i] = new Image();
            this._farmerB[i].src = "./img/farmers/back" + i + ".png";
        }
        for (let i = 0; i < 4; i++) {
            this._farmerL[i] = new Image();
            this._farmerL[i].src = "./img/farmers/left" + i + ".png";
        }
        for (let i = 0; i < 4; i++) {
            this._farmerR[i] = new Image();
            this._farmerR[i].src = "./img/farmers/right" + i + ".png";
        }
        for (let i = 0; i < 4; i++) {
            this._maidF[i] = new Image();
            this._maidF[i].src = "./img/maids/front" + i + ".png";
        }
        for (let i = 0; i < 4; i++) {
            this._maidB[i] = new Image();
            this._maidB[i].src = "./img/maids/back" + i + ".png";
        }
        for (let i = 0; i < 4; i++) {
            this._maidL[i] = new Image();
            this._maidL[i].src = "./img/maids/left" + i + ".png";
        }
        for (let i = 0; i < 4; i++) {
            this._maidR[i] = new Image();
            this._maidR[i].src = "./img/maids/right" + i + ".png";
        }
        for (let i = 0; i < 4; i++) {
            this._knightF[i] = new Image();
            this._knightF[i].src = "./img/knight/knightf" + i + ".png";
        }
        for (let i = 0; i < 4; i++) {
            this._knightB[i] = new Image();
            this._knightB[i].src = "./img/knight/knightb" + i + ".png";
        }
        for (let i = 0; i < 4; i++) {
            this._knightL[i] = new Image();
            this._knightL[i].src = "./img/knight/knightl" + i + ".png";
        }
        for (let i = 0; i < 4; i++) {
            this._knightR[i] = new Image();
            this._knightR[i].src = "./img/knight/knightr" + i + ".png";
        }
        for (let i = 1; i <= 5; i++) {
            this._housePic[i] = new Image();
            this._housePic[i].src = "./img/house/house" + i + ".png";
        }
        this._dragonLogo = new Image();
        this._dragonLogo.src = "./img/logo/dragon.jpg";
        this._fishLogo = new Image();
        this._fishLogo.src = "./img/logo/fish.jpg";
        this._slmLogo = new Image();
        this._slmLogo.src = "./img/logo/slm.jpg";
        this._moguLogo = new Image();
        this._moguLogo.src = "./img/logo/mogu.jpg";
        for (let i = 0; i < 4; i++) {
            this._dragonPicl[i] = new Image();
            this._dragonPicl[i].src = "./img/dragon/dragonl" + i + ".png";
        }
        for (let i = 0; i < 4; i++) {
            this._dragonPicr[i] = new Image();
            this._dragonPicr[i].src = "./img/dragon/dragonr" + i + ".png";
        }
        for (let i = 0; i < 6; i++) {
            this._moguPicl[i] = new Image();
            this._moguPicl[i].src = "./img/mogu/mogul" + i + ".png";
        }
        for (let i = 0; i < 6; i++) {
            this._moguPicr[i] = new Image();
            this._moguPicr[i].src = "./img/mogu/mogur" + i + ".png";
        }
        for (let i = 0; i < 29; i++) {
            this._slmPicl[i] = new Image();
            this._slmPicl[i].src = "./img/slm/slml" + i + ".png";
        }
        for (let i = 0; i < 29; i++) {
            this._slmPicr[i] = new Image();
            this._slmPicr[i].src = "./img/slm/slmr" + i + ".png";
        }
        for (let i = 0; i < 8; i++) {
            this._fishPicl[i] = new Image();
            this._fishPicl[i].src = "./img/fish/fishl" + i + ".png";
        }
        for (let i = 0; i < 8; i++) {
            this._fishPicr[i] = new Image();
            this._fishPicr[i].src = "./img/fish/fishr" + i + ".png";
        }
        this._dragonEgg = new Image();
        this._dragonEgg.src = "./img/egg/dragonEgg.png";
        this._fishEgg = new Image();
        this._fishEgg.src = "./img/egg/fishEgg.png";
        this._moguEgg = new Image();
        this._moguEgg.src = "./img/egg/moguEgg.png";
        this._slmEgg = new Image();
        this._slmEgg.src = "./img/egg/slmEgg.png";
        this._dragonPlan = new Image();
        this._dragonPlan.src = "./img/plan/dragonPlan.png";
        this._fishPlan = new Image();
        this._fishPlan.src = "./img/plan/fishPlan.png";
        this._moguPlan = new Image();
        this._moguPlan.src = "./img/plan/moguPlan.png";
        this._slmPlan = new Image();
        this._slmPlan.src = "./img/plan/slmPlan.png";
        this._sjPic = new Image();
        this._sjPic.src = "./img/sj.png";

        this._house = new House();
        this._knight = new Knight();
        this._maid = new Maid();
        this._farmer = new Farmer();
        this._grass = new Grass();
        this._tree = new Tree();
        this._bg = new BG();
        this._dragon = new Dragon();
        this._mogu = new Mogu();
        this._slm = new Slm();
        this._fish = new Fish();
        this._panel = new Panel();
        this._sj = new Sj();
        this._data = new Data();
        this._lasttime = Date.now();
        this._deltaTime = 0;

        this._can2.addEventListener('click', this.build, false);
    }

    gameLoop() {
        window.requestAnimationFrame(gameLoop);
        this._deltaTime = Date.now() - this._lasttime;
        if (this._deltaTime >= 40) {
            this._deltaTime = 40;
        }
        this._lasttime = Date.now();
        this._ctx2.clearRect(0, 0, this._W, this._H);
        this._bg.draw();
        this._grass.draw();

        this._grassControl();
        this._treeControl();
        this._tree.draw();
        this._farmerControl();
        this._farmer.draw();
        this._maidControl();
        this._maid.draw();
        this._knightControl();
        this._knight.draw();
        this._house.draw();
        this._dragonControl();
        this._dragon.draw();
        this._moguControl();
        this._mogu.draw();
        this._fishControl();
        this._fish.draw();
        this._slmControl();
        this._slm.draw();
        this._sj.draw();
        this._data.draw();
        this._panel.draw();
        this._attact();
    }

    build(e) {
        if (e.offsetX || e.layerX) {
            this._mx = e.offsetX == undefined ? e.layerX : e.offsetX;
            this._my = e.offsetY == undefined ? e.layerY : e.offsetY;
        }
        for (let i = 0; i < this._bg.num; i++) {
            if (this._mx >= this._bg.x[i] && this._mx <= this._bg.x2[i] && this._my >= this._bg.y[i] && this._my < this._bg.y2[i] && !this._panel.show) {
                this._cx = this._bg.x[i];
                this._cy = this._bg.y[i];
                this._panel.x = this._cx;
                this._panel.y = this._cy;
                this._bg.cbg = i;
                if (!this._bg.occupied[i]) {
                    this._panel.show = true;
                    return;
                } else {
                    this._panel.show = true;
                    return;
                }


            }
            if (this._panel.show && !this._bg.occupied[this._bg.cbg]) {
                if (this._mx >= this._panel.x && this._mx <= this._panel.x + 100 && this._my >= (this._panel.y - 100) && this._my < this._panel.y) {
                    if (this._data.grassCount >= this._fish.grassCost && this._data.sjCount >= this._fish.sjCost && this._data.limit < this._house.limit) {
                        this._bg.occupied[this._bg.cbg] = true;
                        this._fish.limit++;
                        this._panel.show = false;
                        this._data.grassCount = this._data.grassCount - this._fish.grassCost;
                        this._data.sjCount = this._data.sjCount - this._fish.sjCost;
                        return;
                    }
                }
                if (this._mx >= this._panel.x && this._mx <= this._panel.x + 100 && this._my >= (this._panel.y + 100) && this._my < this._panel.y + 200) {
                    if (this._data.grassCount >= this._mogu.grassCost && this._data.sjCount >= this._mogu.sjCost && this._data.limit < this._house.limit) {
                        this._bg.occupied[this._bg.cbg] = true;
                        this._mogu.limit++;
                        this._panel.show = false;
                        this._data.grassCount = this._data.grassCount - this._mogu.grassCost;
                        this._data.sjCount = this._data.sjCount - this._mogu.sjCost;
                        return;
                    }
                }
                if (this._mx >= this._panel.x - 100 && this._mx <= this._panel.x && this._my >= this._panel.y && this._my < this._panel.y + 100) {
                    if (this._data.grassCount >= this._slm.grassCost && this._data.limit <this._house.limit) {
                        this._bg.occupied[this._bg.cbg] = true;
                        this._slm.limit++;
                        this._panel.show = false;
                        this._data.grassCount = this._data.grassCount - this._slm.grassCost;
                        return;
                    }
                }
                if (this._mx >= this._panel.x + 100 && this._mx <= this._panel.x + 200 && this._my >= this._panel.y && this._my < this._panel.y + 100) {
                    if ( this._data.grassCount >=this._dragon.grassCost &&  this._data.sjCount >=this._dragon.sjCost &&  this._data.limit <this._house.limit) {
                        this._bg.occupied[this._bg.cbg] = true;
                        this._dragon.limit++;
                        this._panel.show = false;
                        this._data.grassCount =  this._data.grassCount -this._dragon.grassCost;
                        this._data.sjCount = this._data.sjCount -this._dragon.sjCost;
                        return;
                    }
                }
                if (this._mx >= this._panel.x && this._mx <= this._panel.x + 100 && this._my >= this._panel.y && this._my < this._panel.y + 100) {
                    this._panel.show = false;
                    return;
                }
            }
            if (  this._panel.show && this._bg.occupied[this._bg.cbg]) {
                if (this._mx >= this._panel.x && this._mx <= this._panel.x + 100 && this._my >= ( this._panel.y - 100) && this._my < this._panel.y) {
                    if (this._bg.over[this._bg.cbg] == 'house' && this._data.grassCount >=this._house.grassCost && this._data.sjCount >=this._house.sjCost) {
                        this._house.level++;
                        this._panel.show = false;
                        this._data.grassCount = this._data.grassCount -this._house.grassCost;
                        this._data.sjCount = this._data.sjCount -this._house.sjCost;
                        return;
                    }
                    ;
                    return;
                }
                if (this._mx >= this._panel.x && this._mx <= this._panel.x + 100 && this._my >= ( this._panel.y + 100) && this._my < this._panel.y + 200) {

                    return;
                }
                if (this._mx >= this._panel.x && this._mx <= this._panel.x + 100 && this._my >= this._panel.y && this._my < this._panel.y + 100) {
                    this._panel.show = false;
                    return;
                }
            }

        }
    }
}



