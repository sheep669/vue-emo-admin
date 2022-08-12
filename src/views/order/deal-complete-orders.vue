<!--
 * @Author: sheep669
 * @Description: 交易完成模块
 * @Date: 2022-7-6 20:49:38
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="deal_complete_orders">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            deal_complete_orders page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "DealCompleteOrders",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.deal_complete_orders {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>