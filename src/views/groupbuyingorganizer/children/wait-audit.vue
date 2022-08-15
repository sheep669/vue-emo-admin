<!--
 * @Author: sheep669
 * @Description: 待审核tab
 * @Date: 2022-08-15 21:00:05
-->
<template>
    <div id="waitAudit">
        waitAudit page
        <emo-table
            :config="table_config"
            :tableData="table_data"
            :isShow="isShow"
        >
        </emo-table>
    </div>
</template>
<script>
import EmoTable from "@/components/table/index";
// import constant from "@/constant/api/index";
export default {
    name: "WaitAudit",
    components: {
        EmoTable,
    },
    data() {
        return {
            table_data: [],
            isShow: true,
            /**
             * 传递表头配置
             */
            table_config: {
                thead: [
                    {
                        label: "会员ID",
                        prop: "id",
                        fixed: "left",
                        width: 70,
                    },
                    {
                        label: "推荐团长",
                        prop: "recommendGroupBuyingOrganizer",
                        width: 100,
                    },
                    { label: "联系方式", prop: "phoneNumber", width: 120 },
                    { label: "店铺名称", prop: "storeName", width: 150 },
                    { label: "提货地址", prop: "receiverAddress", width: 230 },
                    { label: "推荐人", prop: "referrer", width: 100 },
                    {
                        label: "审核状态",
                        prop: "auditStatus",
                        type: "function",
                        callback: (row) => {
                            const data = this.audit_status.filter(
                                (item) => item.value == row.auditStatus
                            );
                            if (data && data.length > 0) {
                                return data[0].label;
                            }
                        },
                        width: 100,
                    },
                    { label: "申请时间", prop: "applyTime", width: 160 },
                    {
                        label: "操作",
                        width: 150,
                        type: "slot",
                        slotName: "operation",
                        fixed: "right",
                    },
                ],
                checkbox: true,
            },
        };
    },
};
</script>
<style lang='less' scoped>
</style>    