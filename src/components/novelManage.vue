<template>
    <div class="container" v-if="currentPanel === 'list'">
        <div class="row mb20" v-for="item in novelList">
            <div class="col-xs-8 input-group input-group-lg pull-left" style="padding-right: 10px">
                <span class="input-group-addon">书名</span>
                <input class="form-control" v-model="item.mName"/>
            </div>
            <div class="col-xs-4 btn-group btn-group-lg">
                <button class="btn btn-warning" @click="updateNovelData(item)">保存</button>
                <button class="btn btn-danger" @click="deleteNovelData(item.mId)">删除</button>
                <button class="btn btn-info" @click="novelInfoManage(item.mId)">信息管理</button>

            </div>
        </div>
        <div class="row btn-group btn-group-lg">
            <button class="btn btn-primary" @click="addNovelData">新增</button>
        </div>
    </div>
    <div v-else-if="currentPanel === 'info'" class="text-center">
        <div class="novel-upload">
            <Upload
                    accept="image/*"
                    type="drag"
                    :max-size="2048"
                    :format="['jpg','jpeg','png']"
                    :action="url + '/server/main.php'"
                    :on-success="onUploadSuccess"
                    :on-error="onUploadFailed"
                    :show-upload-list="false"
            >
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>Click or drag files here to upload</p>
                </div>
            </Upload>
        </div>
        <Select
                v-model="postInfo.Theme"
                style="width:200px"
                :multiple="true"
                size="large"
                class="mt20 mb20"
                placeholder="题材类型"
        >
            <Option v-for="item in themeList" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <br/>
        <Select
                v-model="postInfo.isEnd"
                style="width:200px"
                size="large"
                class="mb20"
                placeholder="完成状态"
        >
            <Option v-for="item in statusList" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <br/>
        <Input v-model="postInfo.bDescribe" type="textarea" :rows="4" placeholder="简介" style="width: 400px"></Input>
        <br/>
        <button class="btn btn-primary mt20" style="width: 200px" @click="updateNovelInfo">保存</button>
        <br/>
        <button class="btn btn-primary mt20" style="width: 200px" @click="novelIndexManage(postInfo.bNo)">章节管理</button>
    </div>
    <div v-else-if="currentPanel === 'index'">
        <Button type="primary" size="large" class="ml20 mb20" v-for="item in bookIndexes" :key="item.iNo" @click.native="novelContentManage(item.iNo)">{{item.iName}}</Button>
    </div>
    <div v-else-if="currentPanel === 'content'"></div>
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
    export default class novelManage extends Vue {
        private novelList: listType[] = [];
        private currentPanel = 'list';
        private url: string = Util.ajaxUrl;
        private postInfo:any = {};
        private themeList: string[] = ['科幻','灵异','魔幻','网游','悬疑','校园','言情','都市','推理','犯罪'];
        private statusList: string[] = ['连载中', '已完结', '暂停更新'];
        private bookIndexes: any[] = [];

        created() {

        }
        /**
         * 上传成功
         */
        onUploadSuccess(response: any, file: any, fileList: any) {
            $('.novel-upload .ivu-upload-drag').css({'background':"url('/server/uploads/" + response.data + "') no-repeat",'background-size': 'cover'});
            this.postInfo.bookImg = '/server/uploads/' + response.data;
        }
        /**
         * 上传失败
         */
        onUploadFailed(error: any, file: any, fileList: any) {
            alert(error);
        }
        /**
         * 修改信息
         */
        updateNovelInfo() {
            const post = JSON.parse(JSON.stringify(this.postInfo));
            post.Theme = post.Theme.join('、');
            Util.ajax.post('server/main.php', {novelInfo: post}).then((res: any) => {
                if (res.data.code === 0) {
                    alert('保存成功');
                } else {
                    alert('保存失败');
                }
            });
        }

        /**
         *  更改书名
         * @param {listType} data
         */
        updateNovelData(data: listType) {
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
         * 新增小说
         */
        addNovelData() {
            this.novelList.push({
                mId: 0,
                mName: '',
                mType: 1,
                mUrl: ''
            });
        }

        /**
         * 删除
         */
        deleteNovelData(id: number) {
            Util.ajax.post('server/main.php', {menuId: id}).then((res: any) => {
                if (res.data.code === 0) {
                    this.$store.dispatch('getMenuList');
                } else {
                    alert('删除失败');
                }
            });
        }
        /**
         * 章节管理
         */
        novelIndexManage(id: number) {
            Util.ajax.post('server/main.php', {bNo: id}).then((res: any) => {
                if (res.data.code === 0) {
                    this.bookIndexes = res.data.data;
                    this.currentPanel = 'index';
                    this.$emit('panel', 'index');
                } else {
                    alert('保存失败');
                }
            });

        }

        /**
         * 信息管理
         */
        novelInfoManage(id: number) {
            Util.ajax.post('server/main.php', {bookId: id}).then((res: any) => {
                this.currentPanel = 'info';
                this.$emit('panel', 'info');
                if (res.data.code === 0) {
                    this.postInfo = res.data.data;
                    this.postInfo.Theme = this.postInfo.Theme.split('、');
                    this.$nextTick(() => {
                        $('.novel-upload .ivu-upload-drag').css({'background':"url('" + this.postInfo.bookImg + "') no-repeat",'background-size': 'cover'});
                    });

                } else {
                    this.postInfo = {
                        bNo: 0,
                        Theme: [],
                        bDescribe: '',
                        bookImg: '',
                        isEnd: '',
                        mId: id
                    };
                }


            });

        }

        /**
         *
         */
        changePanel(val: string) {
            this.currentPanel = val;
        }

        /**
         * 内容管理
         */
        novelContentManage(id: number) {
            this.currentPanel = 'content';
            this.$emit('panel', 'content');
        }


        /**
         * 计算属性获取vuex中的游戏列表
         * @returns {getters.listenNovelList}
         */
        get getNovelList() {
            return this.$store.getters.listenNovelList;
        }

        /**
         * watch 计算属性 赋值到data
         * @param {listType[]} val
         */
        @Watch('getNovelList')
        watchNovelList(val: listType[]) {
            this.novelList = val;
        }

    }
</script>


<style lang="less">
    .novel-upload {
        width: 200px;
        margin: auto;

        .ivu-upload-drag {
            height: 300px;
            line-height: 300px;
            background: transparent;

            .ivu-icon-ios-cloud-upload {
                opacity: 0.6;
            }
        }
    }
</style>