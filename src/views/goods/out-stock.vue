<!--
 * @Author: sheep669
 * @Description: 出库中模块
 * @Date: 2022-7-6 20:52:20
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="out_stock">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            out_stock page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "OutStock",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.out_stock {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>