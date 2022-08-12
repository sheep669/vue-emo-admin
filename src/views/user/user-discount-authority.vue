<!--
 * @Author: sheep669
 * @Description: 优惠权限模块
 * @Date: 2022-7-6 20:43:17
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="user_discount_authority">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            user_discount_authority page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "UserDiscountAuthority",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.user_discount_authority {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>