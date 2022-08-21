<!--
 * @Author: sheep669
 * @Description: 佣金流水模块
 * @Date: 2022-7-6 20:53:47
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="brokerage_serial">
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
    name: "BrokerageSerial",
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
                        label: "佣金流水ID",
                        prop: "id",
                        fixed: "left",
                        width: 100,
                    },
                    {
                        label: "团长名称",
                        prop: "groupBuyingOrganizerName",
                        width: 150,
                    },
                    { label: "店铺名称", prop: "storeName", width: 200 },
                    {
                        label: "佣金",
                        prop: "commission",
                        width: 100,
                    },
                    { label: "产生时间", prop: "makeTime", width: 200 },
                    { label: "备注", prop: "remark", width: 200 },
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
                constant.cs.searchOrGetPageList,
                this.page,
                null
            ).then((res) => {
                if (res.data.code == 200) {
                    let records = res.data.data.records;
                    if (records.length == 0) {
                        this.$message({
                            message: "数据库里空荡荡的,要不您添加几条",
                            duration: 1600,
                            type: "warning",
                        });
                    }
                    this.table_data = records;
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
                constant.cs.searchOrGetPageList,
                page_parm,
                data_param
            ).then((res) => {
                if (res.data.code == 200) {
                    let records = res.data.data.records;
                    if (records.length == 0) {
                        this.$message({
                            message: "数据库里空荡荡的,要不您添加几条",
                            duration: 1600,
                            type: "warning",
                        });
                    }
                    this.table_data = records;
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
.brokerage_serial {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>