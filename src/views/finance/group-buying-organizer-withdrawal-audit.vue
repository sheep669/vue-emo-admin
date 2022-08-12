<!--
 * @Author: sheep669
 * @Description: 团长提现审核模块
 * @Date: 2022-7-6 20:53:47
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="group_buying_organizer_withdrawal_audit">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <!-- <emo-table /> -->
            <!-- <emo-pagination style="margin-top: 15px" /> -->
            group_buying_organizer_withdrawal_audit page
        </el-card>
    </div>
</template>
<script>
// import EmoTable from "@/components/table/index";
export default {
    name: "GroupBuyingOrganizerWithdrawalAudit",
    // components: {
    //     EmoTable,
    // },
};
</script>
<style lang='less' scoped>
.group_buying_organizer_withdrawal_audit {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>