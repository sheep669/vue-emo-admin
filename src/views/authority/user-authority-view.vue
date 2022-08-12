<!--
 * @Author: sheep669
 * @Description: 用户权限查看模块
 * @Date: 2022-7-6 20:54:15
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="user_authority_view">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            user_authority_view page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "UserAuthorityView",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.user_authority_view {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>