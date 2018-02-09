<template>
    <div class="app-sign">
        <div class="input-group input-group-lg">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-user"></span>
            </span>
            <input type="text" class="form-control" v-model="signUpData.userName" @blur="nameChecker" placeholder="账号" aria-describedby="sizing-addon1">
        </div>
        <div class="alert alert-danger" role="alert" v-show="nameWrong">请输入字母或数字格式的昵称</div>
        <div class="input-group input-group-lg">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-lock"></span>
            </span>
            <input type="password" class="form-control" v-model="signUpData.passWord" @blur="pwdChecker" placeholder="密码" aria-describedby="sizing-addon1">
        </div>
        <div class="alert alert-danger" role="alert" v-show="pwdWrong">请输入6~12位字母或数字格式的密码</div>
        <div class="input-group input-group-lg">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-lock"></span>
            </span>
            <input type="password" class="form-control" v-model="rePassWord" @blur="rePwdChecker" placeholder="确认密码" aria-describedby="sizing-addon1">
        </div>
        <div class="alert alert-danger" role="alert" v-show="rePwdWrong">请输入与上面相同的密码</div>
        <div class="btn-group btn-group-lg btn-sign-in" role="group" aria-label="...">
            <button type="button" class="btn btn-default" :disabled="disabled" @click="onSubmit">注册</button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
    import Util from '../libs/util';
    interface signUpData {
        userName: string,
        passWord: string,
    }
    @Component
    export default class signUp extends Vue {
        private signUpData: signUpData = {
            userName: 'zzzzhhhn',
            passWord: '123456',
        };

        private rePassWord: string = '123456';
        private nameWrong: boolean = false;
        private  pwdWrong: boolean = false;
        private  rePwdWrong: boolean = false;

        nameChecker() {
            if (/^[A-Za-z0-9]+$/.test(this.signUpData.userName) && !!this.signUpData.userName) {
                this.nameWrong = false;
            }else {
                this.nameWrong = true;
            }
            return this.nameWrong;
        }

        pwdChecker() {
            if (/^[A-Za-z0-9]+$/.test(this.signUpData.passWord) && !!this.signUpData.passWord && this.signUpData.passWord.length >= 6 && this.signUpData.passWord.length <= 12) {
                this.pwdWrong = false;
            }else {
                this.pwdWrong = true;
            }
            return this.pwdWrong;
        }

        rePwdChecker() {
            if (this.signUpData.passWord === this.rePassWord) {
                this.rePwdWrong = false;
            }else {
                this.rePwdWrong = true;
            }
            return this.rePwdWrong;
        }

        get disabled() {
            return this.pwdWrong || this.nameWrong || this.rePwdWrong;
        }

        onSubmit() {
            if(this.nameChecker() || this.pwdChecker() || this.rePwdChecker()) {
                return;
            }
            Util.ajax.post('server/main.php', {signUpData: this.signUpData}).then((res: any) => {
                if (res.data.code === 0) {
                    this.$emit('success');
                } else if(res.data.code === 1){
                    alert('已被注册')
                }else if(res.data.code === 1) {
                    alert('失败')
                }

            });
        }

    }
</script>


<style lang="less">

</style>