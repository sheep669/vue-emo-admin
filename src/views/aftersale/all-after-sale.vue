<!--
 * @Author: sheep669
 * @Description: 所有售后模块
 * @Date: 2022-7-6 20:54:36
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="all_after_sale">
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
    name: "AllAfterSale",
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
                        label: "售后单ID",
                        prop: "id",
                        fixed: "left",
                        width: 80,
                    },
                    {
                        label: "订单号",
                        prop: "orderNo",
                        width: 140,
                    },
                    { label: "订单id", prop: "orderId", width: 80 },
                    {
                        label: "商品id",
                        prop: "goodsId",
                        width: 80,
                    },
                    { label: "用户id", prop: "userId", width: 80 },
                    { label: "店铺名称", prop: "storeName", width: 180 },
                    { label: "商品名称", prop: "goodsName", width: 140 },
                    { label: "买家姓名", prop: "buyerName", width: 100 },
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
                    {
                        label: "业务类型",
                        prop: "orderAfterSaleType",
                        width: 100,
                        type: "function",
                        callback: (row, prop) => {
                            const data = this.order_after_sale_type.filter(
                                (item) => item.value == row[prop]
                            );
                            if (data && data.length > 0) {
                                return data[0].label;
                            }
                        },
                    },
                    {
                        label: "退款类型",
                        prop: "refundType",
                        width: 100,
                        type: "function",
                        callback: (row, prop) => {
                            const data = this.refund_type.filter(
                                (item) => item.value == row[prop]
                            );
                            if (data && data.length > 0) {
                                return data[0].label;
                            }
                        },
                    },
                    { label: "申请原因", prop: "reason", width: 150 },
                    {
                        label: "退货数量",
                        prop: "orderAfterSaleNumber",
                        width: 90,
                    },
                    { label: "退款金额", prop: "price", width: 90 },
                    {
                        label: "退款说明",
                        prop: "refundInstruction",
                        width: 140,
                    },
                    { label: "凭证图片", prop: "images", width: 100 },
                    { label: "申请时间", prop: "applyTime", width: 160 },
                    { label: "退货时间", prop: "deliveryTime", width: 160 },
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
        ...mapState("type", ["order_after_sale_type", "refund_type"]),
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
                constant.as.searchOrGetPageList,
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
                constant.as.searchOrGetPageList,
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
.all_after_sale {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>