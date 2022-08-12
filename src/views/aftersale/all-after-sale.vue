<!--
 * @Author: sheep669
 * @Description: 所有售后模块
 * @Date: 2022-7-6 20:54:36
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="all_after_sale">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            all_after_sale page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "AllAfterSale",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.all_after_sale {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>