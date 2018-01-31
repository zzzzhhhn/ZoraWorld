/**
 * Created by Zora on 2017/6/4.
 * 农民
 */
import Toolkit from '../common/commonFunctions';
import Bg from './bg';
import Data from './data';
import Grass from './grass';
import Tree from './tree';
import House from './house';
import Game from '../common/game';

export default class Farmer {
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
    private _grassIndex: number[] = [];
    private _colletDel: number[] = [];
    private _show: boolean[] = [];
    private _treeIndex: number[] = [];
    private _colleted: string[] = [];
    private _num: number;
    private _farmerF: HTMLImageElement[] = [];
    private _farmerB: HTMLImageElement[] = [];
    private _farmerL: HTMLImageElement[] = [];
    private _farmerR: HTMLImageElement[] = [];
    private _housePic: HTMLImageElement[] = [];
    private _ctx2: any;
    private _bg: Bg;
    private _data: Data;
    private _house: House;
    private _game: Game;
    private _tree: Tree;
    private _grass: Grass;

    constructor(ctx2: any, farmerF: HTMLImageElement[], farmerB: HTMLImageElement[], farmerL: HTMLImageElement[], farmerR: HTMLImageElement[], housePic: HTMLImageElement[]) {
        this._ctx2 = ctx2;
        this._num = 2;
        this._housePic = housePic;
        this._farmerF = farmerF;
        this._farmerB = farmerB;
        this._farmerL = farmerL;
        this._farmerR = farmerR;
        for (let i = 0; i < this._num; i++) {
            this._x[i] = 500;
            this._y[i] = 300;
            this._alive[i] = false;
            this._front[i] = 'front';
            this._Pic = this._farmerF;
            this._PicCount[i] = 0;
            this._delta[i] = 0;
            this._frontDel[i] = 0;
            this._working[i] = false;
            this._holding[i] = false;
            this._aimX[i] = 0;
            this._aimY[i] = 0;
            this._grassIndex[i] = 0;
            this._treeIndex[i] = 0;
            this._colletDel[i] = 0;
            this._show[i] = false;
            this._colleted[i] = '';
        }

    }

    init(bg: Bg, data: Data, grass: Grass, tree: Tree, house: House, game: Game) {
        this._bg = bg;
        this._data = data;
        this._house = house;
        this._game = game;
        this._tree = tree;
        this._grass = grass;
    }

    get num() {
        return this._num;
    }

    set num(val: number) {
        this._num = val;
    }

    draw(deltaTime: number, W: number, H: number,) {
        for (let i = 0; i < this._num; i++) {
            const houseX1 = this._bg.x[41];
            const houseX2 = houseX1 + 90;
            const houseY1 = this._bg.y[41];
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
            if (this._frontDel[i] > limit) {
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
                this._Pic = this._farmerF;
            } else if (this._front[i] == 'back') {
                this._y[i]--;
                this._Pic = this._farmerB;
            } else if (this._front[i] == 'left') {
                this._x[i]--;
                this._Pic = this._farmerL;
            } else if (this._front[i] == 'right') {
                this._x[i]++;
                this._Pic = this._farmerR;
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
            for (let j = 0; j < this._tree.num; j++) {
                if (this._tree.alive[j] && !this._working[i] && !this._tree.collected[j]) {
                    this._working[i] = true;
                    this._tree.collected[j] = true;
                    this._aimX[i] = this._tree.x[j] + 20;
                    this._aimY[i] = this._tree.y[j] + 50;
                    this._treeIndex[i] = j;
                    this._colleted[i] = 'tree';
                    break;
                }
            }
            for (let j = 0; j < this._grass.num; j++) {
                if (this._grass.alive[j] && !this._working[i] && !this._grass.collected[j]) {
                    this._working[i] = true;
                    this._grass.collected[j] = true;
                    this._aimX[i] = this._grass.x[j];
                    this._aimY[i] = this._grass.y[j];
                    this._grassIndex[i] = j;
                    this._colleted[i] = 'grass';
                    break;
                }
            }


            if (this._working[i]) {
                this._x[i] = Toolkit.lerpDistance(this._aimX[i], this._x[i], 0.995);
                this._y[i] = Toolkit.lerpDistance(this._aimY[i], this._y[i], 0.995);
                const l = Toolkit.calLength2(this._aimX[i], this._aimY[i], this._x[i], this._y[i]);
                if (l <= 900 && !this._holding[i]) {

                    if (this._colleted[i] === 'grass') {
                        this._colletDel[i] += deltaTime;
                        if (this._colletDel[i] > 1500) {
                            this._holding[i] = true;
                            this._grass.alive[this._grassIndex[i]] = false;
                            this._grass.limit--;
                            this._bg.occupied[this._grassIndex[i]] = false;
                            this._aimX[i] = this._house.x + this._housePic[this._house.level].width * 0.5;
                            this._aimY[i] = this._house.y + this._housePic[this._house.level].height * 0.5;
                            this._colletDel[i] = 0;
                        }
                    }


                    if (this._colleted[i] === 'tree') {
                        this._colletDel[i] += deltaTime;
                        if (this._colletDel[i] > 5000) {
                            this._holding[i] = true;
                            this._tree.alive[this._treeIndex[i]] = false;
                            this._tree.limit--;
                            this._bg.occupied[this._treeIndex[i]] = false;
                            this._aimX[i] = this._house.x + this._housePic[this._house.level].width * 0.5;
                            this._aimY[i] = this._house.y + this._housePic[this._house.level].height * 0.5;
                            this._colletDel[i] = 0;
                        }
                    }


                }
                const l2 = Toolkit.calLength2(this._aimX[i], this._aimY[i], this._x[i], this._y[i]);
                if (l2 <= 900 && this._holding[i]) {
                    this._holding[i] = false;
                    this._working[i] = false;
                    if (this._colleted[i] === 'grass')
                        this._data.grassCount++;
                    if (this._colleted[i] === 'tree')
                        this._data.grassCount += 3;
                    // ctx2.drawImage(sjPic,sj.x+housePic[sj.level].width*0.5,sj.y-10,15,30);
                    return;
                }
                if (this._game.gameover) {
                    this._aimX[i] = -100;
                    this._aimY[i] = -100;
                    this._front[i] = 'left';
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
        this._Pic = this._farmerF;
        this._PicCount[i] = 0;
        this._delta[i] = 0;
        this._holding[i] = false;
        this._colletDel[i] = 0;
    }

    farmerControl() {
        let count = 0;
        for (let i = 0; i < this._num; i++) {
            if (this._alive[i]) {
                count++;
            }
        }
        if (count < this._num) {
            this.farmerBorn();
        }
    }

    farmerBorn() {
        for (let i = 0; i < this._num; i++) {
            if (!this._alive[i]) {
                this.born(i);
                return;
            }
        }
    }
}

