<!--
 * @Author: sheep669
 * @Description: 黑名单模块
 * @Date: 2022-7-6 20:45:35
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="black_list">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            black_list page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "BlackList",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.black_list {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>