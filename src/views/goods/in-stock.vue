<!--
 * @Author: sheep669
 * @Description: 仓库中模块
 * @Date: 2022-7-6 20:52:20
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="in_stock">
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
                            <el-form-item label="商品名称">
                                <el-input
                                    clearable
                                    v-model="request_config.form.goodsName"
                                    placeholder="请输入商品名称"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品分类">
                                <el-input
                                    clearable
                                    v-model="request_config.form.goodsCategory"
                                    placeholder="请输入商品分类"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="真实销量">
                                <el-input
                                    clearable
                                    v-model="request_config.form.realSales"
                                    placeholder="请输入真实销量"
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
import { searchOrGetRequest, doPostRequest } from "@/api/index";
import EmoTable from "@/components/table/index";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
    name: "InStock",
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
                    goodsStatus: "",
                    //筛选项
                    goodsName: "",
                    goodsCategory: "",
                    realSales: "",
                },
            },
            table_config: {
                thead: [
                    {
                        label: "商品ID",
                        prop: "id",
                        fixed: "left",
                        width: 70,
                    },
                    {
                        label: "商品名称",
                        prop: "goodsName",
                        width: 100,
                    },
                    { label: "商品分类", prop: "goodsCategory", width: 120 },
                    { label: "商品价格", prop: "goodsPrice", width: 100 },
                    { label: "总库存", prop: "totalStocks", width: 100 },
                    {
                        label: "显示销量",
                        prop: "showSales",
                        width: 90,
                    },
                    { label: "真实销量", prop: "realSales", width: 90 },
                    { label: "序号", prop: "serialNumber", width: 90 },
                    {
                        label: "商品状态",
                        prop: "goodsStatus",
                        type: "function",
                        callback: (row, prop) => {
                            const data = this.goods_status.filter(
                                (item) => item.value == row[prop]
                            );
                            if (data && data.length > 0) {
                                return data[0].label;
                            }
                        },
                        width: 100,
                    },
                    { label: "产生时间", prop: "makeTime", width: 160 },
                    // {
                    //     label: "操作",
                    //     width: 150,
                    //     type: "slot",
                    //     align: "center",
                    //     slotName: "operation",
                    //     fixed: "right",
                    // },
                ],
                checkbox: true,
            },
        };
    },
    computed: {
        ...mapGetters(["delIds"]),
        ...mapState("status", ["goods_status"]),
    },
    created() {
        this.getTableData();
    },
    beforeDestroy() {
        this.clearIds();
    },
    methods: {
        ...mapMutations(["clearIds"]),
        delBatch() {
            if (this.delIds.length == 0) {
                this.$message({
                    message: "请至少选择一条数据",
                    type: "warning",
                });
            } else {
                doPostRequest(constant.goods.deleteBatchUrl, this.delIds).then(
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
                data_param.goodsStatus = "2";
                searchOrGetRequest(
                    constant.goods.searchOrGetPageList,
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
                        //恢复成未输入状态
                        data_param.goodsStatus = "";
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
            let data = { goodsStatus: "2" };
            searchOrGetRequest(
                constant.goods.searchOrGetPageList,
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
            let data = { goodsStatus: "2" };
            searchOrGetRequest(
                constant.goods.searchOrGetPageList,
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
.in_stock {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
.el-input.is-disabled /deep/ .el-input__inner {
    color: #1e2227;
}
.emo-form-inline {
    display: flex;
    justify-content: space-evenly;
}
.pull-right {
    float: right;
}
</style>