<!--
 * @Author: sheep669
 * @Description: 会员列表模块
 * @Date: 2022-7-6 20:47:11
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="user_list">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            user_list page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "UserList",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.user_list {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>