<template>
    <div>
        <div class="panel-menu" :class="{'show-menu': showMenu, 'back-menu': backMenu}" @click.self="onShowMenu($event)">
            <div class="menu-item" @click="onShowMain(1)">单人游戏</div>
            <div class="menu-item" @click="onShowMain(2)">局域网</div>
        </div>
        <div class="panel-sign" :class="{'show-sign': showSign, 'back-sign': backSign}" @click.self="onShowMenu($event)">
            <div class="menu-item">退出游戏</div>
        </div>

        <div class="panel-main" :class="{'show-main': showMain, 'back-main': backMain}">
            <div class="menu-item">fafa</div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {},
        data() {
            return {
                showMenu: false,    //菜单面板是否显示
                backMenu: false,
                showSign: false,
                backSign: false,
                showMain: false,
                backMain: false,
                currentType: 0
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            /**
             * 显示面板
             */
            onShowMenu() {
                if(!this.showMenu) {
                    this.showMenu = true;
                    setTimeout(() => {
                        this.backMenu = true;
                        this.showSign = true;
                    }, 500);
                    setTimeout(() => {
                        this.backSign = true;
                    }, 1000);
                } else {
                    this.backSign = false;
                    this.showSign = false;
                    setTimeout(() => {
                        this.backMenu = false;
                        this.showMenu = false;
                    }, 500);
                }
            },

            /**
             * 显示主体菜单
             * @param type
             */
            onShowMain(type) {
                if(type !== this.currentType) {
                    return this.currentType = type;
                }
                this.showMain = !this.showMain;
                setTimeout(() => {
                    this.backMain = !this.backMain;
                }, 500);
            },
        },
        computed: {},
        watch: {},
        destroyed() {

        }
    }
</script>

<style lang="less">
    .zora-world {
        width: 100%;
        height: 100%;
        position: relative;
        overflow-x: hidden;
        background: lightyellow;

        .panel-menu {
            width: 200px;
            height: 300px;
            position: absolute;
            right: 20px;
            top: -280px;
            transition: top .5s ease-out;

            background: rgba(200, 200, 200, 0.6);

            &.show-menu {
                 top: 5px;
             }

            &.back-menu {
                transition: top .1s ease-out;
                top: 0;
            }
        }

        .panel-sign {
            width: 200px;
            height: 200px;
            position: absolute;
            right: -190px;
            top: 350px;
            transition: right .5s ease-out;

            background: rgba(200, 200, 200, 0.6);

            &.show-sign {
                right: 25px;
            }

            &.back-sign {
                transition: right .1s ease-out;
                right: 20px;
            }
        }

        .menu-item {
            width: 100%;
            text-align: center;
            height: 80px;
            line-height: 80px;
            font-size: 30px;
        }

        .panel-main {
            width: 800px;
            height: 600px;
            position: absolute;
            left: -790px;
            top: 50px;
            transition: left .5s ease-out;

            background: rgba(200, 200, 200, 0.6);

            &.show-main {
                left: 5px;
            }

            &.back-main {
                transition: top .1s ease-out;
                left: 0;
            }
        }
    }
</style>