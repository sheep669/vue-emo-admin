<!--
 * @Author: sheep669
 * @Description: 商品标签模块
 * @Date: 2022-7-6 20:52:20
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="goods_label">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            goods_label page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "GoodsLabel",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.goods_label {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>