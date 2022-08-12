<!--
 * @Author: sheep669
 * @Description: 配送中模块
 * @Date: 2022-7-6 20:49:38
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="delivery_orders">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            delivery_orders page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "DeliveryOrders",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.delivery_orders {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>