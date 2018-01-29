<template>
    <div>
        <div class="content">
            <canvas id="canvas1" width="1000px" height="600px"></canvas>
            <canvas id="canvas2" width="1000px" height="600px"></canvas>
        </div>
        <div class="text-center mt10">
            <button class="btn btn-warning btn-lg btn-orcish" @click="start">重新开始</button>
        </div>
        <audio AUTOPLAY LOOP>
            <source src="../assets/mp3/monster.mp3" type="audio/mpeg">
            当前浏览器不支持背景音乐。
        </audio>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';

    @Component
    export default class MyComponent extends Vue {


    }
</script>


<style lang="less">

</style>