<template>
    <div class="app-sign">
        <div class="input-group input-group-lg">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-user"></span>
            </span>
            <input type="text" class="form-control" v-model="signInData.userName" @focus="onClearName" placeholder="账号" aria-describedby="sizing-addon1">
        </div>
        <div class="alert alert-danger" role="alert" v-show="nameWrong">账号不存在</div>
        <div class="input-group input-group-lg">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-lock"></span>
            </span>
            <input type="password" class="form-control" v-model="signInData.passWord" @focus="onClearPwd" placeholder="密码" aria-describedby="sizing-addon1">
        </div>
        <div class="alert alert-danger" role="alert" v-show="pwdWrong">密码错误</div>
        <div class="btn-group btn-group-lg btn-sign-in" role="group" aria-label="...">
             <button type="button" class="btn btn-default" @click="onSubmit">登录</button>
        </div>
    </div>
</template>

<script lang="ts">
    import Util from '../libs/util';

    interface signInData {
        userName: string,
        passWord: string
    }

    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';

    @Component
    export default class signIN extends Vue {

        private signInData: signInData = {
            userName: 'zzzzhhhn',
            passWord: 'zhnsdsg'
        };

        private nameWrong: boolean = false;
        private  pwdWrong: boolean = false;
        private userData: any;

        onClearName() {
            this.nameWrong = false;
        }

        onClearPwd() {
            this.pwdWrong = false;
        }

        onSubmit() {
            Util.ajax.post('server/main.php', {signInData: this.signInData}).then((res: any) => {
                if (res.data.code === 0) {
                    this.userData = res.data.data;
                    this.$store.dispatch('getUserData', this.userData);
                    this.$emit('success');
                } else if(res.data.code === 1){
                    this.pwdWrong = true;
                }else if(res.data.code === -1) {
                    this.nameWrong = true;
                }

            });
        }

    }
</script>


<style lang="less">
    .app-sign {
        * {
            box-sizing: border-box;
        }

        .btn-sign-in,
        .input-group {
            width: 50%;
            margin: 50px 25% 0;

        }

        .alert {
            width: 50%;
            margin: 0px 25% -50px;
            box-sizing: border-box;
            height: 50px;
            line-height: 1;
        }

    }

    .btn-sign-in {
        button {
            width: 100%;
        }
    }
</style>