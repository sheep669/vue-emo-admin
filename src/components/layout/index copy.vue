<template>
    <el-container
        style="
            width: 100%;
            height: 100%;
            overflow-y: hidden;
            position: relative;
        "
    >
        <el-header>
            <div
                class="logo"
                style="width: 200px; background: #1e1e1e; color: white"
            >
                社区团购
            </div>
            <div class="header">
                <el-tooltip effect="dark" content="打开全屏" placement="left">
                    <i
                        v-show="fullscreen === false"
                        class="el-icon-full-screen"
                        @click="fullOrEscScreen"
                        style="font-size: 25px; font-weight: 600"
                    ></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="退出全屏" placement="right">
                    <i
                        v-show="fullscreen === true"
                        class="el-icon-rank"
                        @click="fullOrEscScreen"
                        style="font-size: 25px; font-weight: 600"
                    ></i>
                </el-tooltip>
            </div>
        </el-header>
        <el-container style="height: 100%">
            <el-aside width="200px">
                <!-- <div
                    style="
                        background: yellow;
                        width: 200px;
                        height: 100%;
                        overflow-x: hidden;
                        overflow-y: auto;
                        box-shadow: 2px 0 2px rgb(0 0 0 / 5%);
                    "
                > -->
                <el-menu
                    default-active="/"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router
                >
                    <el-menu-item index="/">
                        <i class="el-icon-s-home"></i>
                        <span slot="title"> 首页 </span>
                    </el-menu-item>
                    <el-menu-item index="/tuanzhang">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">团长管理</span>
                    </el-menu-item>
                    <el-menu-item index="/user">
                        <i class="el-icon-user"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/order">
                        <i class="el-icon-shopping-cart-1"></i>
                        <span slot="title">订单管理</span>
                    </el-menu-item>
                    <el-menu-item index="/delivery">
                        <i class="el-icon-bicycle"></i>
                        <span slot="title">骑手管理</span>
                    </el-menu-item>
                    <el-menu-item index="/wuliu">
                        <i class="el-icon-truck"></i>
                        <span slot="title">货流管理</span>
                    </el-menu-item>
                    <el-menu-item index="/store">
                        <i class="el-icon-box"></i>
                        <span slot="title">商铺管理</span>
                    </el-menu-item>
                    <el-menu-item index="/brokerage">
                        <i class="el-icon-wallet"></i>
                        <span slot="title">佣金管理</span>
                    </el-menu-item>
                    <el-menu-item index="/statistic">
                        <i class="el-icon-pie-chart"></i>
                        <span slot="title"> 统计 </span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title"> 设置 </span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title"> 设置 </span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title"> 设置 </span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title"> 设置 </span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title"> 11 </span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title"> 11 </span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title"> 11 </span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title"> 44 </span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title"> hello a </span>
                    </el-menu-item>
                </el-menu>
                <!-- </div> -->
            </el-aside>
            <el-container>
                <el-main
                    style="
                        position: absolute;
                        bottom: 60;
                        width: calc(100% - 200px);
                        height: calc(100% - 120px);
                    "
                >
                    <slot name="main_content">
                        <div
                            class="left"
                            style="
                                width: 160px;
                                background: #ffffff;
                                height: calc(100% - 2px);
                                float: left;
                                overflow-x: hidden;
                                overflow-y: auto;
                                border-top: 2px solid rgb(0 0 0 / 5%);
                            "
                        >
                            <el-menu
                                default-active="/"
                                class="el-menu-vertical-demo"
                                router
                            >
                                <el-submenu index="/authority">
                                    <template slot="title">
                                        <span style="font-weight: bold"
                                            >权限管理</span
                                        >
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="/authority/exit"
                                            >退出权限</el-menu-item
                                        >
                                        <el-menu-item index="/authority/login"
                                            >登陆权限</el-menu-item
                                        >
                                    </el-menu-item-group>
                                    <el-menu-item-group>
                                        <el-menu-item index="/authority/edit"
                                            >编辑权限</el-menu-item
                                        >
                                        <el-menu-item index="/authority/delete"
                                            >删除权限</el-menu-item
                                        >
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-divider></el-divider>
                                <el-submenu index="/authority">
                                    <template slot="title">
                                        <span style="font-weight: bold"
                                            >权限管理</span
                                        >
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="/authority/exit"
                                            >退出权限</el-menu-item
                                        >
                                        <el-menu-item index="/authority/login"
                                            >登陆权限</el-menu-item
                                        >
                                    </el-menu-item-group>
                                    <el-menu-item-group>
                                        <el-menu-item index="/authority/edit"
                                            >编辑权限</el-menu-item
                                        >
                                        <el-menu-item index="/authority/delete"
                                            >删除权限</el-menu-item
                                        >
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-divider></el-divider>
                                <el-submenu index="/authority">
                                    <template slot="title">
                                        <span style="font-weight: bold"
                                            >权限管理</span
                                        >
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="/authority/exit"
                                            >退出权限</el-menu-item
                                        >
                                        <el-menu-item index="/authority/login"
                                            >登陆权限</el-menu-item
                                        >
                                    </el-menu-item-group>
                                    <el-menu-item-group>
                                        <el-menu-item index="/authority/edit"
                                            >编辑权限</el-menu-item
                                        >
                                        <el-menu-item index="/authority/delete"
                                            >删除权限</el-menu-item
                                        >
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-divider></el-divider>
                                <el-submenu index="/authority">
                                    <template slot="title">
                                        <span style="font-weight: bold"
                                            >权限管理</span
                                        >
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="/authority/exit"
                                            >退出权限</el-menu-item
                                        >
                                        <el-menu-item index="/authority/login"
                                            >登陆权限</el-menu-item
                                        >
                                    </el-menu-item-group>
                                    <el-menu-item-group>
                                        <el-menu-item index="/authority/edit"
                                            >编辑权限</el-menu-item
                                        >
                                        <el-menu-item index="/authority/delete"
                                            >删除权限</el-menu-item
                                        >
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-divider></el-divider>
                                <el-submenu index="/authority">
                                    <template slot="title">
                                        <span style="font-weight: bold"
                                            >权限管理</span
                                        >
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="/authority/exit"
                                            >退出权限</el-menu-item
                                        >
                                        <el-menu-item index="/authority/login"
                                            >登陆权限</el-menu-item
                                        >
                                    </el-menu-item-group>
                                    <el-menu-item-group>
                                        <el-menu-item index="/authority/edit"
                                            >编辑权限</el-menu-item
                                        >
                                        <el-menu-item index="/authority/delete"
                                            >删除2权限</el-menu-item
                                        >
                                    </el-menu-item-group>
                                    <el-menu-item-group>
                                        <el-menu-item index="/authority/edit"
                                            >编辑权限</el-menu-item
                                        >
                                        <el-menu-item index="/authority/delete"
                                            >删除25权限</el-menu-item
                                        >
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu>
                        </div>
                        <div
                            class="right"
                            style="
                                height: 100%;
                                width: calc(100% - 160px);
                                float: right;
                                overflow-y: auto;
                            "
                        >
                            <el-card
                                shadow="always"
                                body-style="0px"
                                style="margin: 8px"
                            >
                                <emo-table />
                                <emo-pagination style="margin-top: 15px" />
                            </el-card>
                        </div>
                    </slot>
                </el-main>
                <el-footer
                    style="
                        position: absolute;
                        left: 200px;
                        bottom: 0;
                        width: calc(100% - 200px);
                    "
                >
                    footer
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import EmoTable from "@/components/table/index";
import EmoPagination from "@/components/pagination/index";
export default {
    name: "EmoLayout",
    components: {
        EmoTable,
        EmoPagination,
    },
    data() {
        return {
            fullscreen: false,
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
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

<style lang="less" scoped>
.el-main .el-divider--horizontal {
    margin: 0;
}
.el-main .el-submenu {
    width: 160px;
    text-align: left;
}
.el-main .el-menu-item-group {
    width: 160px;
}
.el-aside .el-menu-item {
    text-align: left;
    width: 200px;
}
.el-main .el-menu-item {
    text-align: left;
    width: 160px;
    line-height: 40px;
    padding-left: 20px !important;
}
.el-main .el-menu .el-submenu__title {
    padding: 0 !important;
}
.el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
    box-shadow: 0 -2px 2px rgb(0 0 0 / 5%);
}
.el-header {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
    display: flex;
    justify-content: space-between;
    .header {
        flex-grow: 1;
    }
}
.el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    overflow-y: auto;
    height: calc(100% - 60px);
}
.el-aside::-webkit-scrollbar {
    display: none;
}
.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    padding: 0;
}
</style>
