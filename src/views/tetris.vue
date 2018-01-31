<template>
    <div class="game">
        <!--我的游戏区-->
        <div class="contain panel panel-success">

            <!--信息区-->
            <div class="panel-msg">
                <span class="label label-info">下一个：</span>
                <div class="next well" id="next-local"></div>
                <div class="msg">
                    <span class="score-label">得分：</span>
                    <span class="score-value" id="score-local"></span>
                </div>
            </div>
            <!--游戏区-->
            <div class="panel-game" id="panel-local"></div>
        </div>
        <div class="text-center mt10">
            <button class="btn btn-warning btn-lg btn-tetris" @click="reStart">重新开始</button>
        </div>
        <h5><a href="https://github.com/zzzzhhhn/tetris.git">基于nodeJS + socket.io + typescript + gulp + webpack 的联机版俄罗斯方块在这里！</a></h5>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator'
    import TetrisGame from '../gameClasses/tetris/index.ts';

    @Component
    export default class Tetris extends Vue {
        private _tetrisGame: TetrisGame;
        mounted() {
            this._tetrisGame = new TetrisGame();
            this._tetrisGame.start();
        }

        reStart() {
            this._tetrisGame.reStart();
            $(".btn-tetris").blur();
        }

    }
</script>


<style lang="less">
    @fs1: 20px ;
    @qs: 30px; //方块大小
    .game {
        width: 100%;
        height: auto;

        &:after {
            content: '';
            display: block;
            clear: left;
        }

        * {
            box-sizing: border-box;
        }
        .contain {
            width: 442px;
            background: lightblue;
            margin: auto;

            .name {
                width: 100%;
                text-align: center;
                height: 80px;
                line-height: 50px;
                font-size: @fs1;
                background: lightcyan;
            }

            .panel-msg {
                width: 140px;
                height: 600px;
                float: left;
                background: lightgoldenrodyellow;
                padding-top: 10px;
                color: #333;

                .next {
                    width: 120px;
                    height: 120px;
                    margin: 10px;
                    position: relative;
                }

                .msg {
                    width: 100%;
                    text-align: center;
                    font-size: @fs1;
                }
            }

            .panel-game {
                width: 300px;
                height: 600px;
                float: left;
                background: aliceblue;
                position: relative;
            }

            .square {
                width: 30px;
                height: 30px;
                border: 1px solid currentColor;
                background: currentColor;
                position: absolute;

                &.none {
                    color: transparent;
                }

                &.done {
                    color: darkgray;
                }

                &.current {
                    color: lightpink;
                    box-shadow: inset 0 0 10px lightgrey;
                }

            }

            &:after {
                content: '';
                display: block;
                clear: left;
            }
        }

        h5 {
            color: #333;
            text-align: center;
        }
    }
</style>