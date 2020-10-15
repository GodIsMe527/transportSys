<template>
    <div class="login">
        <div class="loginBox">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.pwd" show-password placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="funcBox">
                        <div @click="rememberPwd" :class="{'checked':checked}">记住密码</div>
                        <el-button type="primary" @click="login">登录</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import api from '../utils/api'

    export default {
        name: "login",
        data() {
            return {
                form: {
                    name: "",
                    pwd: ""
                },
                checked: true,     //记住密码勾选
            }
        },
        methods: {
            //记住密码勾选框
            rememberPwd() {
                this.checked = !this.checked;
            },
            //登录框
            login() {
                console.log("denglu");
                if (this.form.name && this.form.pwd) {
                    let data = {
                        name: this.form.name,
                        pwd: this.$md5(this.$md5(this.form.pwd))
                    };
                    api.login(data).then(res => {
                        let data = res.data;
                        console.log(data);
                        if (data && data.code == 0) {
                            if (this.checked) {
                                localStorage.setItem("name", this.form.name);
                                localStorage.setItem("pwd", this.form.pwd);
                            }
                            localStorage.setItem("token", data.token);
                            this.$router.push("/");
                        } else {
                            this.$message.error(data.message || "登陆失败");
                        }
                    })
                } else {
                    this.$message.error('请输入用户名和密码');
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .login {
        width: 100%;
        height: 100%;
        background: url("../assets/images/BG.jpg");
        background-size: cover;
        position: relative;
        .loginBox {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 360px;
            background-color: #fff;
            border-radius: 5px;
            padding: 30px 30px 25px 0;
            .el-form-item:last-child {
                margin-bottom: 0;
            }
            .funcBox {
                display: flex;
                justify-content: space-between;
                div {
                    padding-left: 24px;
                    margin-right: 50px;
                    position: relative;
                }
                div:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 51%;
                    transform: translateY(-50%);
                    width: 15px;
                    height: 15px;
                    border: 1px solid #ececec;
                    border-radius: 2px;
                }
                .checked:before {
                    background: url("../assets/images/checked.png");
                    background-size: 100%;
                    background-color: #FF4B44;
                }
            }
        }
        .el-button--primary {
            background-color: #FF4B44;
            border: 1px solid #FF4B44;
        }
        .el-input__suffix {
            display: none;
        }
    }
</style>