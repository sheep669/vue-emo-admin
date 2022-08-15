<!--
 * @Author: sheep669
 * @Description: 布局顶部
 * @Date: 2022-07-05 21:48:57
-->
<template>
    <div id="emo-header">
        <div class="logo">线上社区团购系统</div>
        <div class="tool">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                        v-for="(item, index) in breadCrumbList"
                        :key="index"
                        >{{ item.meta.title }}</el-breadcrumb-item
                    >
                </el-breadcrumb>
            </div>
            <div class="right">
                <div class="fullscreen">
                    <el-tooltip
                        effect="dark"
                        content="打开全屏"
                        placement="left"
                    >
                        <i
                            v-show="fullscreen === false"
                            class="el-icon-full-screen"
                            @click="fullOrEscScreen"
                            style="font-size: 25px; font-weight: 400"
                        ></i>
                    </el-tooltip>
                    <el-tooltip
                        effect="dark"
                        content="退出全屏"
                        placement="left"
                    >
                        <i
                            v-show="fullscreen === true"
                            class="el-icon-rank"
                            @click="fullOrEscScreen"
                            style="font-size: 25px; font-weight: 400"
                        ></i>
                    </el-tooltip>
                </div>
                <div class="notice">
                    <el-badge value="new" class="item">
                        <el-button size="mini">通知</el-button>
                    </el-badge>
                </div>
                <div class="info">
                    <div class="avatar">
                        <el-avatar :size="50">
                            <img src="../../assets/images/tx.png" />
                        </el-avatar>
                        <el-dropdown>
                            <span class="el-dropdown-link"
                                ><i
                                    class="el-icon-arrow-down el-icon--right"
                                ></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>个人信息</el-dropdown-item>
                                <el-dropdown-item @click.native="logout"
                                    >退出登陆</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <span class="user">{{ userinfo.user }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { doLogout } from "@/api/index";
export default {
    name: "EmoHeader",
    data() {
        return {
            fullscreen: false,
        };
    },
    computed: {
        ...mapState("loginModule", ["userinfo"]),
        breadCrumbList() {
            return this.$route.matched;
        },
    },
    methods: {
        logout() {
            doLogout().then((res) => {
                console.log(res.data.msg);
                if (res.data.code === 200) {
                    localStorage.clear();
                    sessionStorage.clear();
                    this.$message({
                        message: res.data.msg,
                        type: "success",
                    });
                    setTimeout(() => {
                        window.location.reload();
                        this.$router.replace("/login");
                    }, 250);
                }
            });
        },
        fullOrEscScreen() {
            let element = document.documentElement;
            // 判断是否已经是全屏
            // 如果是全屏，退出
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                // 否则，进入全屏
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            // 改变当前全屏状态
            this.fullscreen = !this.fullscreen;
        },
    },
};
</script>
<style lang='less' scoped>
.logo {
    width: 175px;
    background: #1e1e1e;
    color: white;
    height: 60px;
    float: left;
    text-align: left;
    line-height: 60px;
    padding-left: 25px;
}
.tool {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.fullscreen {
    margin-left: 9px;
}
.right {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .user {
        line-height: 60px;
        margin-right: 24px;
    }
}
.info {
    width: 160px;
    display: flex;
    justify-content: space-around;
}
.notice {
    margin-right: 25px;
    margin-left: 12px;
}
.avatar {
    margin-top: 6px;
}
.el-breadcrumb {
    margin-left: 8px;
}
/deep/.el-breadcrumb__separator {
    margin: 0 5px;
    font-weight: 550;
    color: #7ac0ff;
}
</style>