<!--
 * @Author: sheep669
 * @Description: 待提货模块
 * @Date: 2022-7-6 20:49:38
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="wait_receive_orders">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <div class="filter-form">
                <el-row>
                    <el-col :span="1">
                        <el-tooltip
                            effect="dark"
                            content="刷新表格"
                            placement="left-start"
                        >
                            <el-button
                                @click="refreshTable"
                                icon="el-icon-refresh-right"
                                circle
                                size="medium"
                            ></el-button>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="16">
                        <el-form label-width="100px" class="emo-form-inline">
                            <el-form-item label="团长店铺">
                                <el-input
                                    clearable
                                    v-model="
                                        request_config.form
                                            .groupBuyingOrganizerStore
                                    "
                                    placeholder="请输入"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="团长姓名">
                                <el-input
                                    clearable
                                    v-model="
                                        request_config.form
                                            .groupBuyingOrganizerName
                                    "
                                    placeholder="请输入"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品名称">
                                <el-input
                                    clearable
                                    v-model="request_config.form.goodsName"
                                    placeholder="请输入"
                                ></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="3" class="serachBtn">
                        <div>
                            <el-button
                                type="primary"
                                icon="el-icon-search"
                                @click="serachData"
                                >查询</el-button
                            >
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="pull-right">
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                @click="delBatch"
                                >批量删除</el-button
                            >
                        </div>
                    </el-col>
                </el-row>
            </div>
            <emo-table
                :config="table_config"
                :tableData="table_data"
                :isShow="isShow"
            >
                <!-- 操作 -->
                <template v-slot:operation="slotData">
                    <el-popconfirm
                        @confirm="handleDelete(slotData.data.id)"
                        confirm-button-text="确认"
                        cancel-button-text="取消"
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定删除吗?"
                    >
                        <el-button
                            style="margin-left: 4px"
                            slot="reference"
                            size="mini"
                            type="danger"
                            >删除</el-button
                        >
                    </el-popconfirm>
                </template>
            </emo-table>
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
import {
    searchOrGetRequest,
    doPostRequest,
    doDeleteRequest,
} from "@/api/index";
import EmoTable from "@/components/table/index";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
    name: "WaitReceiveOrders",
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
                    //默认
                    orderStatus: "",
                    //筛选项
                    groupBuyingOrganizerStore: "",
                    groupBuyingOrganizerName: "",
                    goodsName: "",
                },
            },
            table_config: {
                thead: [
                    {
                        label: "订单ID",
                        prop: "id",
                        fixed: "left",
                        width: 70,
                    },
                    {
                        label: "团长店铺",
                        prop: "groupBuyingOrganizerStore",
                        width: 100,
                    },
                    {
                        label: "团长姓名",
                        prop: "groupBuyingOrganizerName",
                        width: 120,
                    },
                    { label: "商品名称", prop: "goodsName", width: 100 },
                    {
                        label: "收货信息",
                        prop: "goodsReceivingInformation",
                        width: 180,
                    },
                    {
                        label: "订单金额",
                        prop: "orderAmount",
                        width: 100,
                    },
                    {
                        label: "下单时间",
                        prop: "purchasingTime",
                        width: 160,
                    },
                    {
                        label: "订单状态",
                        prop: "orderStatus",
                        type: "function",
                        callback: (row, prop) => {
                            const data = this.orders_status.filter(
                                (item) => item.value == row[prop]
                            );
                            if (data && data.length > 0) {
                                return data[0].label;
                            }
                        },
                        width: 150,
                    },
                    {
                        label: "操作",
                        width: 150,
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
        ...mapState("status", ["orders_status"]),
    },
    created() {
        this.getTableData();
    },
    beforeDestroy() {
        this.clearIds();
    },
    methods: {
        ...mapMutations(["clearIds"]),
        handleDelete(id) {
            console.log(id);
            doDeleteRequest(constant.orders.deleteUrl, id).then((res) => {
                console.log(res);
                if (res.data.code === 200) {
                    this.$message({
                        message: "删除成功",
                        type: "success",
                    });
                    this.refreshTable();
                }
            });
        },
        delBatch() {
            if (this.delIds.length == 0) {
                this.$message({
                    message: "请至少选择一条数据",
                    type: "warning",
                });
            } else {
                doPostRequest(constant.orders.deleteBatchUrl, this.delIds).then(
                    (res) => {
                        console.log(res);
                        if (res.data.code === 200) {
                            this.$message({
                                message: "批量删除成功",
                                type: "success",
                            });
                        }
                    }
                );
                this.refreshTable();
                this.clearIds();
            }
        },
        serachData() {
            let isInput = false;
            let page_parm = { current: 1, size: this.page.size };
            let data_param = this.request_config.form;
            Object.keys(data_param).forEach((v) => {
                if (!data_param[v] == null || !data_param[v] == "") {
                    isInput = true;
                }
            });
            if (isInput) {
                data_param.orderStatus = "5";
                searchOrGetRequest(
                    constant.orders.searchOrGetPageList,
                    page_parm,
                    data_param
                ).then((res) => {
                    if (res.data.code == 200) {
                        let records = res.data.data.records;
                        if (records.length == 0) {
                            this.$message({
                                message: "没有符合条件的数据",
                                duration: 1600,
                                type: "error",
                            });
                        }
                        this.table_data = records;
                        this.total = res.data.data.total;
                        data_param.orderStatus = "";
                    } else if (res.data.code == 400) {
                        this.$message({
                            message: res.data.data.msg,
                            type: "warning",
                            duration: 1600,
                        });
                    } else {
                        this.$message({
                            message: "请求失败了,请检查网络或者服务器",
                            duration: 1600,
                            type: "error",
                        });
                    }
                });
            } else {
                this.$message({
                    message: "亲,你还没有输入任何搜索条件",
                    duration: 1600,
                    type: "warning",
                });
            }
        },
        resetSearch() {
            let obj = this.request_config.form;
            Object.keys(obj).forEach((key) => {
                obj[key] = "";
            });
        },
        //刷新表
        refreshTable() {
            //刷新dom
            this.isShow = false;
            this.$nextTick(() => {
                this.isShow = true;
            });
            //重新获取数据加载
            this.getTableData();
            //清空过滤条件
            this.resetSearch();
        },
        getTableData() {
            let data = { orderStatus: "5" };
            searchOrGetRequest(
                constant.orders.searchOrGetPageList,
                this.page,
                data
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
            let data = { orderStatus: "5" };
            searchOrGetRequest(
                constant.orders.searchOrGetPageList,
                page_parm,
                data
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
.wait_receive_orders {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
.emo-form-inline {
    display: flex;
    justify-content: space-evenly;
}
.pull-right {
    float: right;
}
</style>