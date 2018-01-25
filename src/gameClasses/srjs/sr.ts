/**
 * Created by zoramac on 2017/2/8.
 */
var srObj = function () {
    this.x;
    this.y;
    this.srTimer = 0;
    this.srCount = 0;
    this.Left = false;
    this.Up = false;
    this.Right = false;
    this.Down = false;
    this.dir  = 'left';
    this.sr;
    this.sp;
    this.wd  = false;
    this.wdtime = 5000;
}
srObj.prototype.init = function () {
    this.x = W*0.5;
    this.y = H*0.5;
    this.sp = 5;
}
srObj.prototype.draw = function () {
     this.srTimer += deltaTime;
     if(this.dir == 'left'){
        this.sr = srPicl;
     }else {
         this.sr = srPicr;
     }
     if(this.srTimer > 100){
         this.srCount = (this.srCount + 1)%4;
         this.srTimer %= 100;
     }
     if(this.Left){
         this.x -= this.sp;
     }
    if(this.Right){
        this.x += this.sp;
    }
    if(this.Up){
        this.y -= this.sp;
    }
    if(this.Down){
        this.y += this.sp;
    }
    if(this.x < 0){
        this.x = 0;
    }
    if(this.x > W-srPicl[0].width){
        this.x = W-srPicl[0].width;
    }
    if(this.y < 0){
        this.y = 0;
    }
    if(this.y > H-srPicl[0].height){
        this.y = H-srPicl[0].height;
    }
    ctx2.save();
    if(this.wd){
        ctx2.shadowBlur=10;
        ctx2.shadowColor=randomColor()+"1)";
        this.wdtime -= deltaTime;
        if(this.wdtime<=0){
            this.wd = false;
        }
    }
    ctx2.drawImage(this.sr[this.srCount],this.x,this.y);
    ctx2.restore();
}
srObj.prototype.moveLeft = function () {
    this.Left = true;
    this.dir  = 'left';
}

srObj.prototype.moveRight = function () {
    this.Right = true;
    this.dir   = 'right';
}
srObj.prototype.moveUp = function () {
    this.Up = true;
}

srObj.prototype.moveDown = function () {
    this.Down = true;
}
srObj.prototype.stopLeft = function () {
    this.Left = false;
}

srObj.prototype.stopRight = function () {
    this.Right = false;
}
srObj.prototype.stopUp = function () {
    this.Up = false;
}

srObj.prototype.stopDown = function () {
    this.Down = false;
}