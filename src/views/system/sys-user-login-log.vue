<!--
 * @Author: sheep669
 * @Description: 登录日志模块
 * @Date: 2022-7-6 20:51:10
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="sys_user_login_log">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            sys_user_login_log page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "SysUserLoginLog",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.sys_user_login_log {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>