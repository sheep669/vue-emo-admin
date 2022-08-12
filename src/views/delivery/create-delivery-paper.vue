<!--
 * @Author: sheep669
 * @Description: 生成配送单模块
 * @Date: 2022-7-6 20:54:01
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="create_delivery_paper">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            create_delivery_paper page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "CreateDeliveryPaper",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.create_delivery_paper {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>