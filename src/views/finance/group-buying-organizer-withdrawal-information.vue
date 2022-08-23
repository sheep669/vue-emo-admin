<!--
 * @Author: sheep669
 * @Description: 团长提现信息模块
 * @Date: 2022-7-6 20:53:47
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="group_buying_organizer_withdrawal_information">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <emo-table
                :config="table_config"
                :tableData="table_data"
                :isShow="isShow"
            ></emo-table>
            <div style="margin-top: 10px">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.current"
                    :page-sizes="[8]"
                    :page-size.sync="page.size"
                    layout="total,sizes,prev, pager, next, jumper"
                    :total="total"
                    hide-on-single-page
                >
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
import constant from "@/constant/api/index";
import { searchOrGetRequest } from "@/api/index";
import EmoTable from "@/components/table/index";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
    name: "GroupBuyingOrganizerWithdrawalInformation",
    components: {
        EmoTable,
    },
    data() {
        return {
            total: 16,
            page: { current: 1, size: 8 },
            table_data: [],
            isShow: true,
            request_config: {
                form: {
                    goodsName: null,
                    totalStocks: null,
                    serialNumber: null,
                },
            },
            table_config: {
                thead: [
                    {
                        label: "团长提现信息ID",
                        prop: "id",
                        fixed: "left",
                        width: 130,
                    },
                    {
                        label: "团长姓名",
                        prop: "groupBuyingOrganizerName",
                        width: 150,
                    },
                    { label: "联系方式", prop: "phoneNumber", width: 120 },
                    {
                        label: "店铺名称",
                        prop: "storeName",
                        width: 100,
                    },
                    { label: "店铺地址", prop: "storeAddress", width: 160 },
                    { label: "现金余额", prop: "cashBalance", width: 100 },
                    {
                        label: "佣金余额",
                        prop: "commissionBalance",
                        width: 100,
                    },
                    { label: "已提现金额", prop: "drawnMoney", width: 100 },
                    {
                        label: "到账类型",
                        prop: "arrivalAmountType",
                        width: 100,
                    },
                    {
                        label: "账号信息",
                        prop: "accountInformation",
                        width: 120,
                    },
                    {
                        label: "审核状态",
                        prop: "auditStatus",
                        type: "aduit",
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
                    { label: "申请日期", prop: "applyTime", width: 160 },
                    {
                        label: "操作",
                        width: 200,
                        type: "slot",
                        align: "center",
                        slotName: "operation",
                        fixed: "right",
                    },
                ],
                checkbox: true,
            },
        };
    },
    computed: {
        ...mapGetters(["delIds"]),
        ...mapState("status", ["audit_status"]),
    },
    created() {
        this.getTableData();
    },
    methods: {
        ...mapMutations(["clearIds"]),
        refreshTable() {
            this.reload();
        },
        reload() {
            //刷新表
            this.isShow = false;
            this.$nextTick(() => {
                this.isShow = true;
            });
            this.getTableData();
        },
        getTableData() {
            searchOrGetRequest(
                constant.gbowi.searchOrGetPageList,
                this.page,
                null
            ).then((res) => {
                if (res.data.code == 200) {
                    this.table_data = res.data.data.records;
                    this.total = res.data.data.total;
                } else {
                    this.$message({
                        message: "请求失败了,请检查网络或者服务器",
                        duration: 1600,
                        type: "error",
                    });
                }
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.page.size = val;
        },
        handleCurrentChange(val) {
            let page_parm = { current: val, size: this.page.size };
            let data_param = this.request_config.form;
            searchOrGetRequest(
                constant.gbowi.searchOrGetPageList,
                page_parm,
                data_param
            ).then((res) => {
                if (res.data.code == 200) {
                    this.table_data = res.data.data.records;
                    this.total = res.data.data.total;
                } else {
                    this.$message({
                        message: "请求失败了,请检查网络或者服务器",
                        duration: 1600,
                        type: "error",
                    });
                }
            });
            console.log(`当前页: ${val}`);
        },
    },
};
</script>
<style lang='less' scoped>
.group_buying_organizer_withdrawal_information {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>