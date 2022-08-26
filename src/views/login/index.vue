<template>
    <div id="login-panel">
        <div class="decoration1"></div>
        <div class="decoration2"></div>
        <div class="login-box">
            <div class="login-box-left">
                <img
                    class="logo"
                    src="../../assets/images/example-29.svg"
                /><br />
                <a href="https://iradesign.io" style="font-size: 12px"
                    >Illustrations by IRA Design</a
                >
            </div>
            <div class="login-box-right">
                <h3>团购 管理系统 登录</h3>
                <el-form :model="loginForm">
                    <el-form-item label="账号:">
                        <el-input
                            prefix-icon="el-icon-user"
                            type="text"
                            v-model="loginForm.username"
                            placeholder="请输入账号"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-input
                            prefix-icon="el-icon-lock"
                            placeholder="请输入密码"
                            show-password
                            v-model="loginForm.password"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <img
                            class="yzm"
                            :src="captchaUrl"
                            alt="验证码"
                            style="width: 65px; height: 35px"
                            @click="refreshCaptcha"
                        />
                        <el-input
                            class="yzminput"
                            v-model="loginForm.verCode"
                            placeholder="验证码, 单击图片刷新"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="btn1"
                            type="primary"
                            size="small"
                            @click="login"
                            >登录</el-button
                        >
                        <el-button class="btn2" size="small" @click="reset"
                            >重置</el-button
                        >
                    </el-form-item>
                    <el-form-item>
                        <el-link type="primary" href="/#/register"
                            >还没有账号? 点击前往注册</el-link
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="footer">©CopyRight 2022 Desgined By Sheep669</div>
    </div>
</template>

<script>
import axios from "@/utils/request";
import { mapMutations } from "vuex";
import { doLogin } from "@/api/index";
import jwt from "jwt-decode";
export default {
    name: "EmoLogin",
    data() {
        return {
            loginForm: {
                username: "",
                password: "",
                verCode: "",
            },
            captchaUrl: axios.defaults.baseURL + "/captcha",
        };
    },
    methods: {
        ...mapMutations("loginModule", ["setUser"]),
        reset() {
            let obj = this.loginForm;
            Object.keys(obj).forEach((key) => {
                obj[key] = "";
            });
        },
        refreshCaptcha() {
            this.captchaUrl =
                axios.defaults.baseURL + "/captcha?t=" + new Date().getTime();
        },
        login() {
            doLogin(this.loginForm).then((res) => {
                if (res.data.code === 200) {
                    if (res.data.data.token) {
                        let obj = {
                            user: jwt(res.data.data.token).userInfo,
                            token: res.data.data.token,
                        };
                        this.setUser(obj);
                        this.$router.push("/home");
                        this.$message({
                            message: res.data.msg,
                            type: "success",
                            duration: 1500,
                        });
                    }
                    //验证码错误
                } else if (res.data.code === 1007) {
                    this.$message({
                        message: res.data.msg,
                        type: "error",
                        duration: 1500,
                    });
                    this.refreshCaptcha();
                    //账号或密码错误
                } else if (res.data.code === 2003) {
                    this.$message({
                        message: res.data.msg,
                        type: "error",
                        duration: 1500,
                    });
                    this.refreshCaptcha();
                    this.reset();
                    //其它错误 为空校验等等
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: "error",
                        duration: 1500,
                    });
                }
            });
        },
    },
};
</script>

<style scoped>
.login-box {
    padding: 4px;
    position: relative;
    top: 0;
    left: 0;
    width: 800px;
    height: 500px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.login-box-left {
    position: absolute;
    top: 70px;
    left: 0;
    width: 400px;
    text-align: center;
}

.login-box-right {
    position: absolute;
    top: 80px;
    left: 456px;
    width: 400px;
}

.login-box-right h3 {
    margin-bottom: 12px;
}

.el-input {
    width: 200px;
}

.btn1 {
    margin-left: 35px;
    margin-right: 25px;
}

.logo {
    margin-top: 8px;
    margin-left: 4px;
    margin-bottom: 27px;
    width: 400px;
}

a {
    color: blueviolet;
}

.yzm {
    margin-top: 4px;
    margin-right: 12px;
    float: left;
}

.yzminput {
    width: 165px;
}

.decoration1 {
    top: 0;
    left: 0;
    width: 650px;
    height: 440px;
    position: absolute;
    z-index: -1;
    background-color: #a377f2;
    border-radius: 0 0 50% 0;
}

.decoration2 {
    bottom: 0;
    right: 0;
    width: 420px;
    height: 420px;
    position: absolute;
    z-index: -1;
    background-color: #a377f2;
    border-radius: 0 50% 0 50%;
}

.el-link {
    margin-left: 27px;
}

.el-link--inner {
    font-size: 11px !important;
}

.footer {
    width: 400px;
    margin-top: 40px;
    margin-left: 240px;
}
</style>

