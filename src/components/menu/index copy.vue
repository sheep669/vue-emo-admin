<!--
 * @Author: sheep669
 * @Description: 
 * @Date: 2022-06-30 09:29:29
 * @LastEditTime: 2022-07-03 16:33:55
-->
<template>
    <el-menu
        default-active="/home"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
    >
        <el-menu-item index="/home">
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
        <el-menu-item index="/goods">
            <i class="el-icon-setting"></i>
            <span slot="title"> 商品 </span>
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
        <el-menu-item index="/chatroom">
            <i class="el-icon-setting"></i>
            <span slot="title">摸鱼聊天室 </span>
        </el-menu-item>
        <el-menu-item index="/schedule">
            <i class="el-icon-setting"></i>
            <span slot="title"> 项目进度 </span>
        </el-menu-item>
    </el-menu>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "EmoMenu",
    data() {
        return {};
    },
    computed: mapGetters(["navData"]),
};
</script>
<style lang='less' scoped>
.el-menu-item {
    text-align: left;
    width: 200px;
}
</style>