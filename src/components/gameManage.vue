<template>
    <div class="container">
        <div class="row mb20" v-for="item in gameList">
            <div class="col-xs-5 input-group input-group-lg pull-left" style="padding-right: 10px">
                <span class="input-group-addon">名称</span>
                <input class="form-control" v-model="item.mName"/>
            </div>
            <div class="col-xs-5 input-group input-group-lg pull-left" style="padding-left: 10px">
                <span class="input-group-addon">路径</span>
                <input class="form-control" v-model="item.mUrl"/>
            </div>
            <div class="col-xs-2 btn-group btn-group-lg">
                <button class="btn btn-warning" @click="updateGameData(item)">保存</button>
                <button class="btn btn-danger" @click="deleteGameData(item.mId)">删除</button>
            </div>
        </div>
        <div class="row btn-group btn-group-lg">
            <button class="btn btn-primary" @click="addGameData">新增</button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
    import Util from '../libs/util';

    interface listType {
        mId: number,
        mName: string,
        mType: number,
        mUrl: string
    }

    @Component
    export default class gameManage extends Vue {
        private gameList: listType[] = [];

        created() {

        }

        /**
         *  更改数据
         * @param {listType} data
         */
        updateGameData(data: listType) {
            Util.ajax.post('server/main.php', {menuData: data}).then((res: any) => {
                if (res.data.code === 0) {
                    alert('保存成功');
                    this.$store.dispatch('getMenuList');
                } else {
                    alert('保存失败');
                }
            });
        }

        /**
         * 新增游戏
         */
        addGameData() {
            this.gameList.push({
                mId: 0,
                mName: '',
                mType: 2,
                mUrl: ''
            });
        }

        /**
         * 删除
         */
        deleteGameData(id: number) {
            Util.ajax.post('server/main.php', {menuId: id}).then((res: any) => {
                if (res.data.code === 0) {
                    this.$store.dispatch('getMenuList');
                } else {
                    alert('删除失败');
                }
            });
        }
        /**
         * 计算属性获取vuex中的游戏列表
         * @returns {getters.listenGameList}
         */
        get getGameList() {
            return this.$store.getters.listenGameList;
        }

        /**
         * watch 计算属性 赋值到data
         * @param {listType[]} val
         */
        @Watch('getGameList')
        watchGameList(val: listType[]) {
            this.gameList = val;
        }

    }
</script>


<style lang="less">

</style>