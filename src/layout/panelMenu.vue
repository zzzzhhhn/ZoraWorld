<template>
    <div>
        <!--右菜单-->
        <div class="right-menu" :class="{'show-right-menu': showRightMenu, 'back-right-menu': backRightMenu}" @click.self="onshowRightMenu()">
            <div class="right-menu-item" @click="onshowLeftMenu('novels')">小说</div>
            <div class="right-menu-item" @click="onshowLeftMenu('games')">游戏</div>
        </div>
        <div class="right-menu-sign" :class="{'show-right-menu-sign': showRightMenuSign, 'back-right-menu-sign': backRightMenuSign}" @click.self="onshowRightMenu()">
            <div class="right-menu-item">退出游戏</div>
        </div>
        <!--左菜单-->
        <div class="left-menu" :class="{'show-left-menu': showLeftMenu, 'back-left-menu': backLeftMenu}">
            <div class="left-menu-item" v-for="item in currentMenu" :key="item.mId" @click="onShowMain(item.mId, item.mName)">
                <router-link :to="item.mUrl || '/'"><span>{{item.mName}}</span></router-link>
            </div>
        </div>
        <!--上标题-->
        <div class="top-title" :class="{'show-title': showTitle, 'back-title': backTitle}">
            <span v-if="!isReading">{{currentTitle}}</span>
            <div class="novel-msg container-fluid" v-if="isReading">
                <div class="col-xs-12 text-center index-title">{{indexData.iName}}</div>
                <div class="col-xs-6 text-center index-msg">字数： {{indexData.count}}</div>
                <div class="col-xs-6 text-center index-msg">上传时间： {{indexData.createTime}}</div>
            </div>
        </div>
        <!--下主体-->
        <div class="main" :class="{'show-main': showMain, 'back-main': backMain, 'expand': isExpand}">
            <div class="main-title">
                <Icon type="ios-undo" size="20" color="white" v-if="isReading" @click.native="onBackToIndex"></Icon>
                <Icon type="android-contract" size="20" color="white" v-if="isExpand" @click.native="onContract"></Icon>
                <Icon type="android-expand" size="20" color="white" v-if="!isExpand" @click.native="onExpand"></Icon>
                <Icon type="power" size="20" color="white" @click.native="onHideMain"></Icon>
            </div>
            <novel-panel v-if="currentType === 'novels' && !isReading" :novelData="novelData" @read="onBeginReading"></novel-panel>
            <div class="novel-content" v-if="isReading">
                {{contentData.content}}
            </div>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    import novelPanel from '../components/novelPanel';
    export default {
        components: {
            novelPanel
        },
        props: {},
        data() {
            return {
                showRightMenu: false,    //菜单面板是否显示
                backRightMenu: false,
                showRightMenuSign: false,
                backRightMenuSign: false,
                showLeftMenu: false,
                backLeftMenu: false,
                currentType: '',     //当前显示菜单类型
                currentMenu: [],    //当前渲染列表
                menuLists: {
                    novels: [],
                    games: [],
                    blogs: []
                },
                showTitle: false,
                backTitle: false,
                showMain: false,
                backMain: false,
                novelData: {},
                isExpand: false,
                currentTitle: '',
                isReading: false,    //是否阅读状态
                contentData: {},        //章节内容
                indexData: {},    //章节信息
            }
        },
        created() {
            this.$axios.ajax.post('server/main.php', {menu: true}).then(res => {
                if (res.data.code === 0) {
                   res.data.data.forEach(item => {
                       if(item.mType === '1') {
                           this.menuLists.novels.push(item);
                       }else if(item.mType === '2') {
                           this.menuLists.games.push(item);
                       }else if(item.mType === '3') {
                           this.menuLists.blogs.push(item);
                       }
                   });
                } else {
                    console.error('couldn`t get menu data');
                }

            });
        },
        mounted() {

        },
        methods: {
            /**
             * 显示面板
             */
            onshowRightMenu() {
                if(!this.showRightMenu) {
                    this.showRightMenu = true;
                    setTimeout(() => {
                        this.backRightMenu = true;
                        this.showRightMenuSign = true;
                    }, 500);
                    setTimeout(() => {
                        this.backRightMenuSign = true;
                    }, 1000);
                } else {
                    this.backRightMenuSign = false;
                    this.showRightMenuSign = false;
                    setTimeout(() => {
                        this.backRightMenu = false;
                        this.showRightMenu = false;
                    }, 500);
                }
            },

            /**
             * 显示主体菜单
             * @param type
             */
            onshowLeftMenu(type) {
                if(type !== this.currentType && this.showLeftMenu) {
                    this.backLeftMenu = false;
                    setTimeout(() => {
                        this.backLeftMenu = true;
                    }, 100);
                }else if(!this.showLeftMenu) {
                    this.showLeftMenu = true;
                    setTimeout(() => {
                        this.backLeftMenu = true;
                    }, 500);
                }else {
                    this.showLeftMenu = false;
                    this.backLeftMenu = false;
                }

                this.currentType = type;
                this.currentMenu = this.menuLists[type];
            },
            /**
             * 显示标题和主体
             * @param id
             */
            onShowMain(id, name) {
                this.currentTitle = name;
                if(this.currentType === 'novels') {
                    this.$axios.ajax.post('server/main.php', {novels: id}).then(res => {
                        if (res.data.code === 0) {
                            this.novelData = res.data.data;
                        } else {
                            console.error('couldn`t get novels data');
                        }

                    });
                }
                this.showLeftMenu = false;
                this.backLeftMenu = false;
                this.backRightMenu = false;
                this.showRightMenu = false;
                this.backRightMenuSign = false;
                this.showRightMenuSign = false;
                setTimeout(() => {
                    this.showMain = true;
                    this.showTitle = true;
                    setTimeout(() => {
                        this.backMain = true;
                        this.backTitle = true;
                    }, 500);
                },500);
            },
            onHideMain() {
                this.showMain = false;
                this.showTitle = false;
                this.backMain = false;
                this.backTitle = false;
                this.isExpand = false;
                this.isReading = false;
                setTimeout(() => {
                    this.showLeftMenu = true;
                    this.showRightMenu = true;
                    this.showRightMenuSign = true;
                    setTimeout(() => {
                        this.backLeftMenu = true;
                        this.backRightMenu = true;
                        this.backRightMenuSign = true;
                    }, 500);
                },500);
            },
            /**
             * 全屏
             */
            onExpand() {
                this.isExpand = true;
            },
            /**
             * 收缩
             */
            onContract() {
                this.isExpand = false;
            },
            /**
             * 开始阅读
             * @param obj
             */
            onBeginReading(obj) {
                this.isReading = true;
                this.indexData = obj;
                this.$axios.ajax.post('server/main.php', {index: obj.iNo}).then(res => {
                    if (res.data.code === 0) {
                        this.contentData = res.data.data;
                    } else {
                        console.error('couldn`t get content data');
                    }

                });
            },
            /**
             * 回到目录页
             */
            onBackToIndex() {
                this.isReading = false;
            }
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
        overflow: hidden;
        background: url("../assets/img/bg.jpg") no-repeat;
        background-size: cover;

        .right-menu {
            width: 20%;
            height: 50%;
            position: absolute;
            right: 20px;
            top: -47%;
            transition: top .5s ease-out;
            background: lightgray;
            background-size: contain;
            opacity: 0.7;
            border-radius: 10px;

            color: white;

            &.show-right-menu {
                 top: 0;
             }

            &.back-right-menu {
                transition: top .1s ease-out;
                top: -10px;
            }
        }

        .right-menu-sign {
            width: 20%;
            height: 30%;
            position: absolute;
            right: -19%;
            top: 51%;
            transition: right .5s ease-out;

            background: lightgray;
            background-size: contain;
            opacity: 0.7;
            border-radius: 10px;

            color: white;

            &.show-right-menu-sign {
                right: 30px;
            }

            &.back-right-menu-sign {
                transition: right .1s ease-out;
                right: 20px;
            }
        }

        .right-menu-item {
            width: 100%;
            text-align: center;
            height: 80px;
            line-height: 80px;
            font-size: 30px;
        }

        .left-menu {
            width: 75%;
            height: 80%;
            padding: 20px;
            position: absolute;
            left: -74%;
            top: 10%;
            transition: left .5s ease-out;
            background: lightgray;
            background-size: cover;
            opacity: 0.7;
            border-radius: 10px;
            overflow-y: auto;

            &.show-left-menu {
                left: 0;
            }

            &.back-left-menu {
                transition: top .1s ease-out;
                left: -10px;
            }

            .left-menu-item {
                width: 100%;
                text-align: center;
                height: 50px;
                line-height: 50px;
                font-size: 20px;

                &:hover {
                    background: lavender;
                }

                a:hover {
                    text-decoration: none;
                }
            }
        }

        .top-title {
            width: 50%;
            height: 10%;
            position: absolute;
            left: 25%;
            top: -9%;
            transition: top .5s ease-out;
            background: lightgray;
            background-size: cover;
            opacity: 0.9;
            border-radius: 10px;
            padding: 1%;
            font-size: 30px;
            line-height: 180%;
            text-align: center;
            color: lightsalmon;

            .novel-msg {

                .index-title {
                    height: 10%;
                    font-size: 25px;
                    line-height: 200%;
                }

                .index-msg {
                    height: 3%;
                    font-size: 15px;
                    line-height: 34%;
                    color: #ffffe0;
                }
            }

            &.show-title {
                top: 0;
            }

            &.back-title {
                transition: top .1s ease-out;
                top: -10px;
            }
        }

        .main {
            width: 90%;
            height: 89%;
            position: absolute;
            left: 5%;
            bottom: -88%;
            transition: all .5s ease-out;
            overflow-y: auto;

            background: lightgray;
            background-size: cover;
            color: white;
            opacity: 0.9;
            border-radius: 10px;

            &.show-main {
                bottom: 0;
            }

            &.back-main {
                transition: all .1s ease-out;
                bottom: -10px;
            }

            &.expand {
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                opacity: 1;
            }

            .main-title {
                width: 100%;
                height: auto;
                text-align: right;
                padding: 10px 20px;
            }

            .novel-content {
                padding: 20px;
                font-size: 16px;
                font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
                color: olivedrab;
            }
        }
    }
</style>