<!--
 * @Author: sheep669
 * @Description: 配送路线模块
 * @Date: 2022-7-6 20:54:01
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="delivery_routes">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            delivery_routes page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "DeliveryRoutes",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.delivery_routes {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>