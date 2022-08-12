<!--
 * @Author: sheep669
 * @Description: 所有订单模块
 * @Date: 2022-7-6 20:48:10
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="all_orders">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            all_orders page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "AllOrders",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.all_orders {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>