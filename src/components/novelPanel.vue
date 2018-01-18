<template>
    <div class="novel-contain">
        <div class="novel-img"><img :src="novelData.bookImg" width="200px" height="300px"/></div>
        <div class="msg-contain">
            <div class="novel-msg"><span>题材： </span>{{novelData.Theme}}</div>
            <div class="novel-msg"><span>创作状态： </span>{{novelData.isEnd}}</div>
            <div class="novel-describe"><div>简介：</div><div class="describe-content">{{novelData.bDescribe}}</div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "novel-page",
        props: {
            novelData: Object,
        },
        data() {
            return {

            }
        },

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

            .novel-msg {
                margin-top: 20px;
                height: 30px;
                line-height: 30px;
                font-size: 20px;
                color: lightgoldenrodyellow;

                span {
                    color: lightcyan;
                }
            }

            .novel-describe {
                width: 80%;
                font-size: 20px;
                color: lightcyan;
                margin-top: 20px;

                .describe-content {
                    margin-top: 10px;
                    font-size: 16px;
                    color: lightgoldenrodyellow;
                    height: 200px;
                    overflow-y: auto;
                }

            }
        }

    }



</style>