<template>
    <div>
        <!--右菜单-->
        <div class="right-menu" >
            <div class="right-menu-item cursor-pointer" @click="onshowLeftMenu('novels')">小说</div>
            <div class="right-menu-item cursor-pointer" @click="onshowLeftMenu('games')">游戏</div>
            <div class="right-menu-item cursor-pointer" v-if="userData.roleId === '1'" @click="onshowLeftMenu('manage')">管理</div>
            <div class="user-name" @click.self="onshowRightMenu()">欢迎您，{{!!userData.userName ? userData.userName : '游客250'}}</div>
           
        </div>
        <div class="right-menu-sign"  @click.self="onshowRightMenu()">
            <div class="right-menu-item cursor-pointer right-menu-sign-item" @click="onshowLeftMenu('sign_in')">登录</div>
            <div class="right-menu-item cursor-pointer right-menu-sign-item" @click="onshowLeftMenu('sign_up')">注册</div>
        </div>
        <!--左菜单-->
        <div class="left-menu" :class="{'show-left-menu': showLeftMenu, 'back-left-menu': backLeftMenu, 'sign': currentType === 'sign_in' || currentType === 'sign_up'}">
            <div class="left-menu-item cursor-pointer" v-for="item in currentMenu" :key="item.mId" @click="onShowMain(item.mId, item.mName)">
                <router-link :to="item.mUrl || '/'"><span>{{item.mName}}</span></router-link>
            </div>
            <sign-in v-if="currentType === 'sign_in'" @success="onshowLeftMenu('novels')"></sign-in>
            <sign-up v-if="currentType === 'sign_up'" @success="onshowLeftMenu('sign_in')"></sign-up>
            <div class="btn-group btn-group-lg btn-manage" v-if="currentType === 'manage'" role="group" aria-label="...">
                <button type="button" class="btn btn-default" @click="onShowMain('manage', 'novel')">管理小说</button>
            </div>
            <div class="btn-group btn-group-lg btn-manage" v-if="currentType === 'manage'" role="group" aria-label="...">
                <button type="button" class="btn btn-default" @click="onShowMain('manage', 'game')">管理游戏</button>
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
                <Icon type="ios-undo" class="cursor-pointer" size="20" color="white" v-if="isReading || currentManagePanel !== 'list'" @click.native="onBackToIndex"></Icon>
                <Icon type="android-contract" class="cursor-pointer" size="20" color="white" v-if="isExpand" @click.native="onContract"></Icon>
                <Icon type="android-expand" class="cursor-pointer" size="20" color="white" v-if="!isExpand" @click.native="onExpand"></Icon>
                <Icon type="power" size="20" class="cursor-pointer" color="white" @click.native="onHideMain"></Icon>
            </div>
            <novel-panel v-if="currentType === 'novels' && !isReading" :novelData="novelData" @read="onBeginReading"></novel-panel>
            <game-manage v-show="currentType === 'manage' && manageType === 'game'"></game-manage>
            <novel-manage ref="novel_manage" v-show="currentType === 'manage' && manageType === 'novel'" @panel="getManagePanel"></novel-manage>
            <div class="novel-content" v-if="isReading">
                {{contentData.content}}
            </div>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    import novelPanel from './novelPanel';
    import signUp from './signUp';
    import signIn from './signIn';
    import Icon from "iview/src/components/icon/icon";
    import { mapGetters } from 'vuex';
    import gameManage from './gameManage';
    import novelManage from './novelManage';

    export default {
        components: {
            Icon, novelPanel, signUp, signIn, gameManage, novelManage
        },
        props: {},
        data() {
            return {
                showRightMenu: false,    //菜单面板是否显示
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
                currentManagePanel: 'list',   //是否处于管理界面
                managePanels: ['list', 'info', 'index', 'content'],
                contentData: {},        //章节内容
                indexData: {},    //章节信息
                userData: {
                    roleId: ''
                },
                manageType: '',
                right_right_menu_sign: '',      //右下菜单收起长度
                top_right_menu: '',     //右菜单收起长度
                tempType: '',
            }
        },
        created() {
            this.$store.dispatch('getMenuList');
        },
        mounted() {
            this.rightMenuResize();
            window.onresize = () => {
                this.rightMenuResize();
                this.leftMenuItemResize();
            }
        },
        methods: {
            rightMenuResize() {
                const width_right = $('.right-menu').width();
                $('.right-menu').height(width_right * 649 / 425);
                const  height_right = $('.right-menu').height();
                const width_right_sign = $('.right-menu-sign').width();
                $('.right-menu-sign').height(width_right_sign * 425 / 649);
                const height_right_sign = $('.right-menu-sign').height();
                this.top_right_menu = height_right * 0.9 * -1 + 'px';
                this.right_right_menu_sign = width_right_sign * 0.9 * -1;
                $('.right-menu').css('top', this.top_right_menu);
                $('.right-menu-sign').css('right', this.right_right_menu_sign);
            },
            leftMenuItemResize() {
                const width_left_item = $('.left-menu-item').width();
                $('.left-menu-item').height(width_left_item * 606 /107);
                $('.left-menu-item').css('font-size', width_left_item / 3 + 'px');
            },
            /**
             * 显示面板
             */
            onshowRightMenu() {
                if(!this.showRightMenu) {
                    this.showRightMenu = true;
                    $('.right-menu').css('top', 0);
                    setTimeout(() => {
                        $('.right-menu').css('top', -10 + 'px');
                        $('.right-menu-sign').css('right', 0);
                    }, 500);
                    setTimeout(() => {
                        $('.right-menu-sign').css('right', -10 + 'px');
                    }, 1000);
                } else {
                    $('.right-menu-sign').css('right', this.right_right_menu_sign);
                    setTimeout(() => {
                        $('.right-menu').css('top', this.top_right_menu);
                        this.showRightMenu = false;
                    }, 500);
                }
            },

            /**
             * 显示主体菜单
             * @param type
             */
            onshowLeftMenu(type) {
                if(type !== this.tempType && this.showLeftMenu) {
                    this.showLeftMenu = false;
                    this.backLeftMenu = false;
                    setTimeout(() => {
                        this.currentType = type;
                        this.currentMenu = this.menuLists[type];
                        this.$nextTick(() => {
                            this.leftMenuItemResize();
                            this.showLeftMenu = true;
                            setTimeout(() => {
                                this.backLeftMenu = true;
                            }, 500);
                        });
                        this.tempType = type;
                    },500);
                }else if(!this.showLeftMenu) {
                    this.currentType = type;
                    this.currentMenu = this.menuLists[type];
                    this.$nextTick(() => {
                        this.leftMenuItemResize();
                        this.showLeftMenu = true;
                        setTimeout(() => {
                            this.backLeftMenu = true;
                        }, 500);
                    });
                }else {
                    this.showLeftMenu = false;
                    this.backLeftMenu = false;
                }



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
                }else if(id === 'manage') {
                    this.manageType = name;
                    if(name === 'novel') {
                        this.currentTitle = '管理小说';
                    }else {
                        this.currentTitle = '管理游戏';
                    }
                }
                this.showLeftMenu = false;
                this.backLeftMenu = false;
                this.showRightMenu = false;
                $('.right-menu-sign').css('right', this.right_right_menu_sign);
                $('.right-menu').css('top', this.top_right_menu);

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
                if(this.currentType === 'novels') {
                    this.isReading = false;
                }else {
                    if(this.currentManagePanel !== 'list') {
                        this.currentManagePanel = this.managePanels[this.managePanels.indexOf(this.currentManagePanel) - 1];
                        this.$refs.novel_manage.changePanel(this.currentManagePanel);
                    }

                }
            },
            /**
             * 切换管理界面
             */
            getManagePanel(val) {
                this.currentManagePanel = val;
            }
        },
        computed: mapGetters({
            getUserData: 'listenUserData',
            getNovelData: 'listenNovelList',
            getBlogData: 'listenBlogList',
            getGameData: 'listenGameList'
        }),
        watch: {
            getUserData: {
                handler(val) {
                    this.userData = val;
                },
                deep: true
            },
            getNovelData: {
                handler(val) {
                    this.menuLists.novels = val;
                },
                deep: true
            },
            getGameData: {
                handler(val) {
                    this.menuLists.games = val;
                },
                deep: true
            },
            getBlogData: {
                handler(val) {
                    this.menuLists.blogs = val;
                },
                deep: true
            },

        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    @panel_color: black;
    @panel_opacity: .6;
    @panel_right_color: #333;
    @font-face {
        font-family: panel_font;
        src: url("../assets/font/2.ttf");
    }
    .zora-world {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        background: url("../assets/img/bg.jpg") no-repeat;
        background-size: cover;
        font-family: panel_font;

        .right-menu {
            width: 20%;
            position: absolute;
            right: 20px;
            transition: top .5s ease-out;
            background: url('../assets/img/right1.png') no-repeat;
            background-size: contain;
            opacity: @panel_opacity;

            color: white;

            .user-name {
                width: 100%;
                height: 10%;
                position: absolute;
                bottom: 0;
                text-align: center;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .right-menu-sign {
            width: 21%;
            position: absolute;
            bottom: 10%;
            transition: right .5s ease-out;

            background: url('../assets/img/right2.png') no-repeat;
            background-size: contain;
            opacity: @panel_opacity;

            .right-menu-item.right-menu-sign-item {
                width: 40%;
                height: 100%;
                float: left;
                writing-mode: vertical-rl;

                &:first-child {
                    margin-left: 10%;
                }
            }
        }

        .right-menu-item {
            width: 100%;
            height: 20%;
            font-size: 30px;
            color: #333;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                color: lightslategrey;
            }
        }

        .left-menu {
            width: 75%;
            height: 80%;
            padding: 20px;
            position: absolute;
            left: -74%;
            top: 10%;
            transition: left .5s ease-out;
            border-radius: 10px;
            overflow-x: auto;
            overflow-y: hidden;
            display: flex;
            flex-direction: row;

            &.sign {
                background: url("../assets/img/left1.png") no-repeat;
                background-size: contain;
            }

            &.show-left-menu {
                left: 0;
            }

            &.back-left-menu {
                transition: top .1s ease-out;
                left: -10px;
            }

            .btn-manage {
                width: 50%;
                margin: 75px 25% 0;

                button {
                    width: 100%;
                }
            }

            .left-menu-item {
                width: 9%;
                writing-mode: vertical-rl;
                opacity: .7;
                margin-right: 1%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: url('../assets/img/zhu2.png') no-repeat;
                background-size: contain;

                a {
                    color: #333;
                }

                &:hover {
                    opacity: .8;
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
            background: url("../assets/img/wood.jpg");
            opacity: @panel_opacity;
            border-radius: 0 0 50px 50px;
            padding: 1%;
            font-size: 40px;
            font-weight: bold;
            line-height: 150%;
            text-align: center;
            color: #222;
            text-shadow: 2px 2px 10px palegoldenrod;

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

            background: url("../assets/img/sc.jpg");
            background-size: contain;
            color: white;
            opacity: .9;
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