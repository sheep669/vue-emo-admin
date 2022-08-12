<!--
 * @Author: sheep669
 * @Description: 退货申请模块
 * @Date: 2022-7-6 20:54:36
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="refund_apply">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            refund_apply page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "RefundApply",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.refund_apply {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>