<!--
 * @Author: sheep669
 * @Description: 布局文件
 * @Date: 2022-06-26 21:46:02
-->
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
            <!-- 插入 emo-header -->
            <emo-header />
        </el-header>
        <el-container style="background: #545c64">
            <el-aside width="200px">
                <!-- 插入 emo-menu -->
                <emo-menu />
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <!-- 插入 emo-footer -->
                <emo-footer />
            </el-container>
        </el-container>
        <span class="author">作者:sheep669</span>
    </el-container>
</template>

<script>
import EmoMenu from "@/components/menu/index";
import EmoHeader from "@/components/header/index";
import EmoFooter from "@/components/footer/index";
export default {
    name: "EmoLayout",
    components: {
        EmoMenu,
        EmoHeader,
        EmoFooter,
    },
};
</script>

<style lang="less" scoped>
.el-header {
    padding: 0;
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
    position: absolute;
    bottom: 60;
    width: calc(100% - 200px);
    height: calc(100% - 120px);
}
.author {
    display: block;
    position: absolute;
    bottom: 23px;
    left: 20px;
    color: #ffffff;
    border-top: 1px solid gray;
    padding-top: 17px;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
