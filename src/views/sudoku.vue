<template>
    <div class="sudoku">
        <!--九宫格-->
        <div class="container-sudoku grid" id="container"></div>
        <!--按钮组-->
        <div class="dashboard" id="dashboard">
            <div class="buttons">
                <button id="check" title="点击查看结果，错误位置会标记为粉色">检查</button>
                <button id="reset" title="点击重置本局游戏">重置</button>
                <button id="clear" title="点击清理错误标记">清理</button>
                <button id="rebuild" title="点击重建一局新游戏">重建</button>
            </div>
        </div>
        <!--弹出面板-->
        <div id="popupNumbers" class="grid popup-num hidden">
            <div class="row-sudoku">
                <span>1</span><span>2</span><span>3</span>
            </div>
            <div class="row-sudoku">
                <span>4</span><span>5</span><span>6</span>
            </div>
            <div class="row-sudoku">
                <span>7</span><span>8</span><span>9</span>
            </div>
            <div class="row-sudoku">
                <span class="mark1"></span><span class="empty"> </span><span class="mark2"></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
    import SudokuGame from '../gameClasses/sudoku/index.ts';

    @Component
    export default class MyComponent extends Vue {

        mounted() {
            const sudokuGame = new SudokuGame();
            sudokuGame.start();
        }
    }
</script>

<style lang="less">
    @shadowBottom: 0 0.2rem 0.3rem rgba(48,48,48,192);
    @shadowTop: 0 -0.1rem 0.2rem rgba(48,48,48,192);
    .sudoku {
        margin: auto;
        padding: 0;
        background: #eee;
        font-family: 'Consolas','微软雅黑';
        user-select:none;
        max-width: 450px;
        position: relative;

    >* {
        max-width: 450px;
    }

        .container-sudoku {
            padding: 5%;

            .row-sudoku {
                width: 100%;
                margin-left: 5%;

                >span {
                    display: inline-block;
                    cursor: pointer;
                    text-align: center;
                    width: 10%;
                    height: 24px;
                    line-height: 24px;
                    border: 1px solid #ccc;
                    border-bottom-width: 0;
                    border-right-width: 0;
                    background: white;
                    color: black;

                    &.empty {
                        color: white;
                    }

                    &.fixed {
                        background: #eee;
                    }

                    &.mark1 {
                        background: lightblue;

                        &.empty {
                            color: lightblue;
                        }
                    }

                    &.mark2 {
                        background: lightgreen;

                        &.empty {
                            color: lightgreen;
                        }
                    }

                    &.error {
                        background: lightpink;
                        &.empty {
                            color: lightpink;
                        }
                    }

                    &.col_g_left {
                        border-left-width: 0;
                    }
                    &.col_g_right {
                        border-right-width: 2px;
                    }

                    &:first-child {
                        border-left-width: 2px;
                    }
                    &:last-child {
                        border-right-width: 2px;
                    }

                }

                &.row_g_top {
                    >span {
                        border-top-width: 0;
                    }
                }
                &.row_g_bottom {
                    >span {
                        border-bottom-width: 2px;
                    }
                }

                &:first-child {
                    >span {
                        border-top-width: 2px;
                    }
                }

                &:last-child {
                    >span {
                        border-bottom-width: 2px;
                    }
                }


            }
        }

        .hidden {
            display: none;
        }

        @popupCellSize: 40px;
        .popup-num {
            .container-sudoku();

            position: absolute;
            padding-left: 0;

            > .row-sudoku >span {
                width: @popupCellSize;
                height: @popupCellSize;
                line-height: @popupCellSize;
            }
        }

        .dashboard {
            width: 100%;
            background: steelblue;
            box-sizing: border-box;
            box-shadow: @shadowTop;
            height: 3rem;

            .buttons {

                button {
                    float: left;
                    width: 25%;
                    height: 3rem;
                    font-size: 1.3rem;
                    color: white;
                    border: 1px solid #ccc;
                    background: transparent;
                    border-right-width: 0;
                    font-family: 'Consolas', '微软雅黑';
                    &:last-child {
                        border-right-width: 1px;
                    }
                }
            }
        }
    }

</style>