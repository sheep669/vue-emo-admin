<!--
 * @Author: sheep669
 * @Description: 
 * @Date: 2022-06-30 09:29:29
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
        <template v-for="(data, index) in navData">
            <el-menu-item v-if="!data.hidden" :key="index" :index="data.path">
                <i :class="data.icon"></i>
                <span slot="title"> {{ data.title }} </span>
            </el-menu-item>
        </template>
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