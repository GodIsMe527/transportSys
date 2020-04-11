<template>
    <div class="loginPage">
        <div class="content">
            <!--<img src="../assets/images/logo.jpg" alt="logo">-->
            <img src="../assets/images/logo.jpg" alt="logo">
            <h1>账号登陆</h1>
            <input type="text" placeholder="手机号" v-model="phone">
            <input type="text" placeholder="密码" v-model="pwd">
            <div class="feedbackRadio">
                <div>
                    <input type="checkbox" name="fbResult" id="agree" class="gcs-checkbox" v-model="rememberPwd">
                    <label for="agree"></label> <span> 记住密码</span>
                </div>
            </div>
            <div class="loginBtn" @click="login">登录</div>
        </div>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui';
    import api from '../utils/api';
    export default {
        name: "login",
        data() {
            return {
                phone: "",
                pwd: "",
                rememberPwd: ""
            }
        },
        created() {
            let phone = localStorage.getItem("phone")
            let pwd = localStorage.getItem("pwd")
            if (phone && pwd) {
                this.phone = phone
                this.pwd = pwd
                this.rememberPwd = true
            }
        },
        methods: {
            login() {
                let data = {phone: this.phone, pwd: this.pwd}
                api.login(data).then((res) => {
                    if (res.data.code == 0) {
                        if (this.rememberPwd) {
                            localStorage.setItem("phone", res.data.phone)
                            localStorage.setItem("pwd", res.data.pwd)
                            console.log("token="+res.data.token);
                            localStorage.setItem("token", res.data.token)
                            localStorage.setItem("userId", res.data.id)
                        } else {
                            localStorage.setItem("phone", "")
                            localStorage.setItem("pwd", "")
                            localStorage.setItem("token", "")
                            localStorage.setItem("userId", "")
                        }
                        if(res.data.status==1){
                            this.$router.push('/driver')
                        }else if(res.data.status==2){
                            this.$router.push('/admin')
                        }
                    } else {
                        MessageBox('提示', '账号或密码输入错误');
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .loginPage {
        width: 100%;
        height: 100%;
        .content {
            position: absolute;
            left: 50%;
            top: 30%;
            transform: translate(-50%, -50%);
            width: 80%;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 70%;
                margin: 0 auto;
            }
            h1 {
                color: #BBBBBB;
                width: 100%;
                margin: 1rem 0 2rem 0;
            }
            input {
                margin-bottom: 2rem;
                background-color: #f2f2f2;
                border-radius: 5px;
                border: 0;
                padding: 1rem;
                width: 100%;
                box-sizing: border-box;
                font-size: 1.8rem;
                outline: none;
            }
            .loginBtn {
                background-color: #fdf087;
                color: #fff;
                width: 100%;
                text-align: center;
                padding: 1rem;
                box-sizing: border-box;
                border-radius: 5px;
                font-size: 1.8rem;
            }
        }
    }

    .feedbackRadio {
        width: 100%;
        margin-bottom: 2rem;
        line-height: 20px;
        font-size: 1.6rem;
    }

    .gcs-checkbox {
        display: none;
    }

    .gcs-checkbox + label {
        background-color: white;
        border-radius: 0px;
        border: 1px solid #fdf087;
        width: 20px;
        height: 20px;
        display: inline-block;
        text-align: center;
        vertical-align: bottom;
        line-height: 20px;
        margin-left: 0.15rem;
        box-sizing: border-box;
    }

    .gcs-checkbox + label:hover {
        cursor: pointer;
        border: 1px solid #fdf087;
    }

    .gcs-checkbox:checked + label {
        background: #fdf087;
        position: relative;
    }

    .gcs-checkbox:checked + label:after {
        content: "\2714";
        color: white;
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        margin-top: -1px;
        margin-left: -1px;
    }
</style>