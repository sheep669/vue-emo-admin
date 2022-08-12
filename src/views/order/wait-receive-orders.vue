<!--
 * @Author: sheep669
 * @Description: 待提货模块
 * @Date: 2022-7-6 20:49:38
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="wait_receive_orders">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            wait_receive_orders page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "WaitReceiveOrders",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.wait_receive_orders {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>