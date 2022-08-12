<!--
 * @Author: sheep669
 * @Description: 佣金流水模块
 * @Date: 2022-7-6 20:53:47
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="brokerage_serial">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            brokerage_serial page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "BrokerageSerial",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.brokerage_serial {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>