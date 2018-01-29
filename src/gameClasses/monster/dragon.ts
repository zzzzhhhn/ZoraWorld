/**
 * Created by Zora on 2017/6/10.
 * 龙
 */
export default class Dragon {
    private _x = [];
    private _y = [];
    private _planX = [];
    private _planY = [];
    private _alive = [];
    private _Pic = [];
    private _num;
    private _limit;
    private _front = [];
    private _PicCount = [];
    private _delta = [];
    private _frontDel = [];
    private _full = [];
    private _sjDel = [];
    private _grassCost;
    private _sjCost;
    private _sjDelTime;
    private _grassCost = 100;
    private _sjCost = 50;
    private _sjDelTime = 10*1000;
    private _fight = [];
    private _life = [];
    private _bg = [];
    private _aim = [];
    private _aimX = [];
    private _aimY = [];

    constructor() {
        this._num = 10;
        this._limit = 0;
        for (var i=0;i<this._num;i++) {
            this._x[i] = 0;
            this._y[i] = 0;
            this._alive[i] = false;
            this._front[i] = "left";
            this._Pic[i] = dragonPicl;
            this._PicCount[i] = 0;
            this._delta[i] = 0;
            this._frontDel[i] = 0;
            this._full[i] = false;
            this._planX[i] = 0;
            this._planY[i] = 0;
            this._sjDel[i] = 0;
            this._fight[i] = false;
            this._life[i] = 200;
            this._bg[i] = 0;
            this._aim[i] = '';
            this._aimX[i] = 0;
            this._aimY[i] = 0;
        }
    }
    draw() {
        for (var i=0;i<this._num;i++) {
            if(this._full[i]) {
                this._delta[i] += deltaTime;
                if(this._delta[i] > 50) {
                    this._PicCount[i] = (this._PicCount[i] + 1)%4;
                    this._delta[i] %= 50;
                }
                this._sjDel[i] += deltaTime;
                if(this._sjDel[i]>this._sjDelTime) {
                    for(var j=0;j<sj.num;j++) {
                        if(!sj.alive[j] && this._alive[i]) {
                            sj.born(j,this._planX[i]+Math.random()*100,this._planY[i]+70);
                            break;
                        }
                    }
                    this._sjDel[i] %= this._sjDelTime;

                }
                var limit = 2000 + Math.random()*2000;
                this._frontDel[i] += deltaTime;
                if(this._frontDel[i] > limit) {
                    var m = Math.random();
                    if(m<0.25) {
                        this._front[i] = 'front';
                    }else if(m>=0.25 && m<0.5) {
                        this._front[i] = 'back';
                    }else if(m>=0.5 && m<0.75) {
                        this._front[i] = 'left';
                    }else if(m>=0.75) {
                        this._front[i] = 'right';
                    }
                    this._frontDel[i] %= limit;
                }
                if(this._front[i] == 'front') {
                    this._y[i] ++;
                }else if(this._front[i] == 'back') {
                    this._y[i] --;
                }else if(this._front[i] == 'left') {
                    this._x[i] --;
                    this._Pic = dragonPicl;
                }else if(this._front[i] == 'right') {
                    this._x[i] ++;
                    this._Pic = dragonPicr;
                }
                if(this._x[i] < (this._planX[i]-100)) {
                    this._front[i] = 'right';
                }
                if(this._x[i] > (this._planX[i]+100)) {
                    this._front[i] = 'left';
                }
                if(this._y[i] < (this._planY[i]-100)) {
                    this._front[i] = 'front';
                }
                if(this._y[i] > (this._planY[i]+100)) {
                    this._front[i] = 'back';
                }
                for(var j=0;j<knight.num;j++) {
                    if(!this._fight[i] &&(knight.x[j]>=this._planX[i]-200) &&(knight.x[j]<=this._planX[i]+300)&&(knight.y[j]>=this._planY[i]-200)&&(knight.y[j]<=this._planY[i]+300)&&knight.alive[j]) {
                        this._aim[i] = j;
                        this._fight[i] = true;
                    }
                }
                if(this._aim[i]!=='') {
                    this._aimX[i] = knight.x[this._aim[i]];
                    this._aimY[i] = knight.y[this._aim[i]];
                }

                if(this._fight[i] ) {
                    this._x[i] = lerpDistance(this._aimX[i],this._x[i],0.995);
                    this._y[i] = lerpDistance(this._aimY[i],this._y[i],0.995);

                    for (var j=0;j<knight.num;j++) {
                        const l = calLength2(knight.x[j],knight.y[j],this._x[i]+50,this._y[i]+50);
                        if(l<=900) {
                            knight.life[j]--;
                            if(knight.life[j]<=0) {
                                knight.die(j);
                                this._fight[i] = false;
                            }
                        }
                    }

                }
                if(this._alive[i]) {
                    ctx2.save();
                    ctx1.drawImage(dragonPlan,this._planX[i],this._planY[i],100,100);
                    ctx2.drawImage(this._Pic[this._PicCount[i]],this._x[i],this._y[i],65,100);
                    ctx2.restore();
                    ctx2.save();
                    ctx2.strokeStyle = "blue";
                    ctx2.globalAlpha = 0.7;
                    ctx2.lineWidth = 10;
                    ctx2.lineCap = "round";
                    ctx2.shadowBlur = 10;
                    ctx2.shadowColor = "white";
                    ctx2.font = "20px Verdana";
                    ctx2.fillStyle = "white";
                    ctx2.textAlign = "center";
                    ctx2.beginPath();
                    ctx2.moveTo(this._x[i],this._y[i]-20);
                    ctx2.lineTo(this._x[i]+70*this._life[i]/1000,this._y[i]-20);
                    ctx2.closePath();
                    ctx2.stroke();
                    ctx2.restore();
                }

            }
            if(!this._full[i] && this._alive[i]) {
                this._delta[i] += deltaTime;
                if(this._delta[i] > 5000) {
                    this._full[i] = true;
                    this._delta[i] = 0;
                    this._life[i] = 1000;
                }
                ctx2.save();
                ctx2.drawImage(dragonEgg,this._x[i],this._y[i],100,100);
                ctx2.restore();
                ctx2.save();
                ctx2.strokeStyle = "blue";
                ctx2.globalAlpha = 0.7;
                ctx2.lineWidth = 10;
                ctx2.lineCap = "round";
                ctx2.shadowBlur = 10;
                ctx2.shadowColor = "white";
                ctx2.font = "20px Verdana";
                ctx2.fillStyle = "white";
                ctx2.textAlign = "center";
                ctx2.beginPath();
                ctx2.moveTo(this._x[i]+40,this._y[i]-20);
                ctx2.lineTo(this._x[i]+40+20*this._life[i]/200,this._y[i]-20);
                ctx2.closePath();
                ctx2.stroke();
                ctx2.restore();
            }
        }
    born(i) {
        this._x[i] = cx;
        this._y[i] = cy;
        this._alive[i] = true;
        this._front[i] = 'front';
        this._Pic = dragonPicl;
        this._PicCount[i] = 0;
        this._delta[i] = 0;
        this._full[i] = false;
        this._planX[i] = cx;
        this._planY[i] = cy;
        bg.over[bg.cbg] = 'dragon';
        data.limit++;
        this._fight[i] = false;
        this._life[i] = 200;
        this._bg[i] = bg.cbg;
    }
    die(i) {
        this._alive[i] = false;
        data.limit--;
        this._fight[i] = false;
        bg.over[bg.cbg] = '';
        bg.occupied[this._bg[i]] = false;
        this._limit--;
    }
    dragonControl() {
        var count = 0;
        for(var i=0;i<dragon.num;i++) {
            if(dragon.alive[i]) {
                count ++;
            }
        }
        if(count<dragon.limit) {
            dragonBorn();
        }
    }

    dragonBorn() {
        for(var i=0; i<dragon.num;i++) {
            if(!dragon.alive[i]) {
                dragon.born(i);
                return;
            }
        }
    }
}






