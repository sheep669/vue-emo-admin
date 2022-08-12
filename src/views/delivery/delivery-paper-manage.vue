<!--
 * @Author: sheep669
 * @Description: 配送单管理模块
 * @Date: 2022-7-6 20:54:01
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="delivery_paper_manage">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            delivery_paper_manage page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "DeliveryPaperManage",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.delivery_paper_manage {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>