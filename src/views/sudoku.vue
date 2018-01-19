<template>
    <div>
        <!--标题-->
        <div class="title">
            <h1>数独游戏</h1>
        </div>
        <!--九宫格-->
        <div class="container grid" id="container"></div>
        <!--按钮组-->
        <div class="dashboard" id="dashboard">
            <div class="buttons">
                <button id="check">检查</button>
                <button id="reset">重置</button>
                <button id="clear">清理</button>
                <button id="rebuild">重建</button>
            </div>
        </div>
        <!--弹出面板-->
        <div id="popupNumbers" class="grid popup-num hidden">
            <div class="row">
                <span>1</span><span>2</span><span>3</span>
            </div>
            <div class="row">
                <span>4</span><span>5</span><span>6</span>
            </div>
            <div class="row">
                <span>7</span><span>8</span><span>9</span>
            </div>
            <div class="row">
                <span class="mark1"></span><span class="empty"> </span><span class="mark2"></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import '../gameClasses/sudoku/index.ts';

    export default {
        components: {},
        props: {},
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {},
        computed: {},
        watch: {},
        updated() {
        },
        destroyed() {
        },
    }
</script>

<style scoped>

</style>