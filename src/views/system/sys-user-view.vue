<!--
 * @Author: sheep669
 * @Description: 用户查看模块
 * @Date: 2022-7-6 20:51:10
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="sys_user_view">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            sys_user_view page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "SysUserView",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.sys_user_view {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>