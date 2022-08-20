<template>
    <div id="register-panel">
        <div class="decoration1"></div>
        <div class="decoration2"></div>
        <div class="register-box">
            <div class="register-box-left">
                <img
                    class="logo"
                    src="../../assets/images/example-8.svg"
                /><br />
                <a href="https://iradesign.io" style="font-size: 12px"
                    >Illustrations by IRA Design</a
                >
            </div>
            <div class="register-box-right">
                <h3>团购 管理系统 注册</h3>
                <el-form :model="registerForm">
                    <el-form-item label="账号:">
                        <el-input
                            prefix-icon="el-icon-user"
                            type="text"
                            v-model="registerForm.uName"
                            placeholder="请输入账号"
                            style="width: 200px"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-input
                            prefix-icon="el-icon-lock"
                            placeholder="请输入密码"
                            show-password
                            v-model="registerForm.uPwd1"
                            style="width: 200px"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="确认密码:">
                        <el-input
                            class="checkinput"
                            prefix-icon="el-icon-key"
                            placeholder="请再次输入密码"
                            show-password
                            v-model="registerForm.uPwd2"
                            style="width: 170px"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="btn1"
                            type="primary"
                            size="small"
                            @click="register"
                            >注册</el-button
                        >
                        <el-button class="btn2" size="small" @click="reset"
                            >重置</el-button
                        >
                    </el-form-item>
                    <el-form-item>
                        <el-link type="primary" href="/#/login"
                            >已有账号！点击前往登陆</el-link
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="footer">©CopyRight 2022 Desgined By Sheep669</div>
    </div>
</template>
<script>
import { doRegister } from "@/api/index";
export default {
    name: "EmoRegister",
    data() {
        return {
            registerForm: {
                uName: "",
                uPwd1: "",
                upwd2: "",
            },
        };
    },
    methods: {
        register() {
            doRegister(this.registerForm).then((res) => {
                console.log(res);
                if (res.data.code === 200) {
                    this.$message({
                        showClose: true,
                        message: "注册成功",
                        type: "success",
                        duration: 1000,
                    });
                    this.$router.push("/login");
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: "error",
                        duration: 1000,
                    });
                }
            });
        },
        reset() {
            let obj = this.registerForm;
            Object.keys(obj).forEach((key) => {
                obj[key] = "";
            });
        },
    },
};
</script>

<style scoped>
.register-box {
    padding: 4px;
    position: relative;
    top: 0;
    left: 0;
    width: 800px;
    height: 500px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.register-box-left {
    position: absolute;
    top: 70px;
    left: 0;
    width: 400px;
    text-align: center;
}

.register-box-right {
    position: absolute;
    top: 95px;
    left: 456px;
    width: 400px;
}

.el-input {
    width: 200px;
}

.btn1 {
    margin-left: 35px;
    margin-right: 25px;
}
h3 {
    margin-bottom: 12px;
}

.logo {
    margin-top: 2px;
    margin-left: 4px;
    margin-bottom: 20px;
    width: 400px;
}

a {
    color: blueviolet;
}

.checkinput {
    width: 170px;
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
    margin-left: 32px;
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
