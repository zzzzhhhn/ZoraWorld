/**
 * Created by Zora on 2017/6/11.
 */
import Knight from "./knight";

export default class Data {
    private _sjCount: number;
    private _grassCount: number;
    private _limit: number;
    private _attact: number;
    private _attactDel: number;
    private _al: number;
    private _ctx2: any;
    private _knight: Knight;

    constructor(ctx2: any) {
        this._sjCount = 0;
        this._grassCount = 0;
        this._limit = 0;
        this._attact = 1;
        this._attactDel = 120000;
        this._al = 0;
        this._ctx2 = ctx2;
    }

    init(knight: Knight) {
        this._knight = knight;
    }

    get sjCount() {
        return this._sjCount;
    }

    get grassCount() {
        return this._grassCount;
    }

    get limit() {
        return this._limit;
    }

    set grassCount(val: number) {
        this._grassCount = val;
    }

    set sjCount(val: number) {
        this._sjCount = val;
    }

    set limit(val: number) {
        this._limit = val;
    }

    draw(deltaTime: number, W: number, H: number, isGameOver: boolean, houseLife: number,) {
        this._ctx2.save();
        this._ctx2.shadowBlur = 10;
        this._ctx2.shadowColor = "gray";
        this._ctx2.fillStyle = "yellow";
        this._ctx2.font = "20px Verdana";
        this._ctx2.textAlign = "left";
        this._ctx2.fillText('水晶：' + this._sjCount, 50, 30);
        this._ctx2.fillText('纤维：' + this._grassCount, 50, 60);
        this._ctx2.fillText('怪物：' + this._limit, 50, 90);
        this._ctx2.fillText('房屋耐久：' + houseLife, 50, 120);
        this._ctx2.fillText('下一波人数：' + this._attact, 1000, 30);
        this._ctx2.fillText('下一波倒计时：' + Math.ceil(this._attactDel / 1000), 1000, 60);
        this._ctx2.fillText(" © 左拉Zora 2017.07", W - 250, H - 30);
        this._ctx2.restore();
        if (isGameOver) {
            this._al += deltaTime * 0.0005;
            if (this._al >= 1) {
                this._al = 1;
            }
            this._ctx2.save();
            this._ctx2.shadowBlur = 10;
            this._ctx2.shadowColor = "white";
            this._ctx2.fillStyle = "rgba(255,255,255," + this._al + ")";
            this._ctx2.font = "50px Verdana";
            this._ctx2.textAlign = "center";
            this._ctx2.fillText("Game Over", W * 0.5, H * 0.5);
            this._ctx2.restore();
        }
    }

    attact(deltaTime: number) {
        this._attactDel -= deltaTime;
        if (this._attactDel <= 0) {
            this._knight.num += this._attact;
            this._attactDel = 120000;
            this._attact += 2;
            return;
        }
    }
}
