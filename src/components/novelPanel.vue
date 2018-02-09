<template>
    <div>
        <div class="novel-contain">
            <div class="novel-img"><img :src="novelData.bookImg" width="200px" height="300px"/></div>
            <div class="msg-contain">
                <div class="novel-msg"><span>题材： </span>{{novelData.Theme}}</div>
                <div class="novel-msg"><span>创作状态： </span>{{novelData.isEnd}}</div>
                <div class="novel-describe"><div>简介：</div><div class="describe-content">{{novelData.bDescribe}}</div></div>
                <button type="button" class="btn btn-warning" @click="onBeginReading(novelData.indexes[0])">开始阅读</button>
                <button type="button" class="btn btn-warning">继续阅读</button>
            </div>
        </div>

        <div class="novel-indexes container-fluid">
            <h3>目录</h3>
            <div class="indexes-item col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="item in novelData.indexes" :key="item.iNo" @click="onBeginReading(item)">
                {{item.iName}}
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "novel-page",
        props: {
            novelData: Object,
        },
        methods: {
            /**
             * 开始阅读
             * @param id
             */
            onBeginReading(indexObj) {
                this.$emit('read', indexObj);
            }
        }

    }
</script>

<style scoped lang="less">
    .novel-contain {
        display: flex;
        padding-left: 10%;

        .novel-img {
            width: 200px;
            height: 300px;
            flex: none;
            margin-top: 20px;

        }
        .msg-contain {
            flex: auto;
            padding-left: 30px;

            button {
                font-size: 20px;
                text-shadow: 0 0 10px gray;
            }

            .novel-msg {
                margin-top: 20px;
                height: 30px;
                line-height: 30px;
                font-size: 20px;
                color: lightyellow;
                text-shadow: 0 0 10px gray;
                span {
                    color: lightcyan;
                }
            }

            .novel-describe {
                width: 80%;
                font-size: 20px;
                color: lightcyan;
                margin: 20px 0;
                text-shadow: 0 0 10px gray;

                .describe-content {
                    margin-top: 10px;
                    font-size: 16px;
                    color: lightyellow;
                    height: 100px;
                    overflow-y: auto;
                }

            }
        }

    }

    .novel-indexes {
        padding: 0 10%;
        color: lightcyan;
        text-shadow: 0 0 10px gray;

        .indexes-item {
            color: lightyellow;
            cursor: pointer;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 10px;
            font-size: 20px;

            &:hover {
                color: lightgoldenrodyellow;
            }
        }
    }

</style>