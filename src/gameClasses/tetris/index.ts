import Game from './ui/game';

export default class TetrisGame {
    private _game: Game;

    constructor() {
        this._game = new Game('local');
        this.bindEvent();
    }

    start() {
        this._game.init();
        this._game.loop();
        this._game.start = true;
    }

    reStart() {
        this._game.stop();
        this.start();
    }
    /**
     * 绑定键盘事件
     */
    bindEvent() {
        $(document).on('keydown', e => {
            if(this._game.gameover) {
                return;
            }
            if(e.keyCode === 38) {
                this._game.currentSquare.turn(this._game);
            }else if(e.keyCode === 37) {
                this._game.currentSquare.left();
            }else if(e.keyCode === 39) {
                this._game.currentSquare.right();
            }else if(e.keyCode === 40) {
                this._game.currentSquare.down();
            }else if(e.keyCode === 32) {
                this._game.currentSquare.drop(this._game);
            }else {
                return;
            }
            this._game.refreshGame();
        });
    }
}


