<template>
    <div class="app-sign">
        <div class="input-group input-group-lg">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-user"></span>
            </span>
            <input type="text" class="form-control" v-model="signInData.userName" @blur="nameChecker" placeholder="账号" aria-describedby="sizing-addon1">
        </div>
        <div class="alert alert-danger" role="alert" v-show="nameWrong">请输入字母或数字格式的昵称</div>
        <div class="input-group input-group-lg">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-lock"></span>
            </span>
            <input type="text" class="form-control" v-model="signInData.passWord" @blur="pwdChecker" placeholder="密码" aria-describedby="sizing-addon1">
        </div>
        <div class="alert alert-danger" role="alert" v-show="pwdWrong">请输入6~12位字母或数字格式的密码</div>
        <div class="btn-group btn-group-lg btn-sign-in" role="group" aria-label="...">
             <button type="button" class="btn btn-default" :disabled="disabled" @click="onSubmit">登录</button>
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
    export default class MyComponent extends Vue {

        private signInData: signInData = {
            userName: '',
            passWord: ''
        };

        private nameWrong: boolean = false;
        private  pwdWrong: boolean = false;

        nameChecker() {
            if (/^[A-Za-z0-9]+$/.test(this.signInData.userName) && !!this.signInData.userName) {
                this.nameWrong = false;
            }else {
                this.nameWrong = true;
            }
            return this.nameWrong;
        }

        pwdChecker() {
            if (/^[A-Za-z0-9]+$/.test(this.signInData.passWord) && !!this.signInData.passWord && this.signInData.passWord.length > 6 && this.signInData.passWord.length < 12) {
                this.pwdWrong = false;
            }else {
                this.pwdWrong = true;
            }
            return this.pwdWrong;
        }

        get disabled() {
            return this.pwdWrong || this.nameWrong;
        }

        onSubmit() {
            if(this.nameChecker() || this.pwdChecker()) {
                return;
            }
            Util.ajax.post('server/main.php', {signInData: this.signInData}).then((res: any) => {
                if (res.data.code === 0) {

                } else {
                    console.error('couldn`t get user data');
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
            margin: 75px 25% 0;

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