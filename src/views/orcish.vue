<template>
    <div class="orcish">
        <div class="content">
            <canvas id="canvas1" width="1200px" height="800px"></canvas>
            <canvas id="canvas2" width="1200px" height="800px"></canvas>
        </div>
        <div style="position: relative;width: 100%">
            <button class="btn btn-warning btn-lg" id="btn">重新开始</button>
        </div>
        <div class="rule">
            <p>1、方向键操作： 方向键控制移动，空格键发射魔法飞弹；</p>
            <p>2、被僵尸碰到生命值会下降，所以你的走位要比僵尸更骚；</p>
            <p>3、Boss倒计时结束会出现强大的Boss；</p>
            <p>4、杀死僵尸将会随机掉落物品(5秒后自动消失)：</p>
            <p> <img src="../assets/img/orcish/ypr.png" width="30px" height="50px">  回复兽人生命值</p>
            <p><img src="../assets/img/orcish/fz.png" width="30px" height="50px">    增加魔弹攻击力</p>
            <p><img src="../assets/img/orcish/sz.png" width="30px" height="50px">    增加魔弹大小和速度</p>
            <p><img src="../assets/img/orcish/xz.png" width="30px" height="50px">    增加兽人移动速度</p>
            <p><img src="../assets/img/orcish/zb.png" width="30px" height="50px">    增加兽人生命值上限</p>
            <p><img src="../assets/img/orcish/ypy.png" width="30px" height="50px">   获得5秒钟伤害免疫</p>
            <p>5、兽人生命值为零或僵尸数量增长到50则游戏结束；</p>
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
   .content {
           width: 1200px;
           height: 800px;
           position: relative;
           margin: 10px auto;
       }
       #canvas1,#canvas2 {
           position: absolute;
           left: 0px;
           bottom: 0px;
           z-index: 0;
       }
       #canvas2 {
           z-index: 1;
       }
       #btn {
           display: block;
           margin:20px auto;
       }
       .rule {
           position: absolute;
           left: 10px;
           top: 55px;
           width: 300px;
           height: 800px;
           background-color: yellow;
           padding: 10px 10px;
           font-size: 20px;
           font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
           color: #67b168;
       }
</style>