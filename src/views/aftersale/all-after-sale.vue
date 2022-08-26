<!--
 * @Author: sheep669
 * @Description: 所有售后模块
 * @Date: 2022-7-6 20:54:36
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="all_after_sale">
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
                    <el-col :span="14">
                        <el-form label-width="100px" class="emo-form-inline">
                            <el-form-item label="店铺名称">
                                <el-input
                                    clearable
                                    v-model="request_config.form.storeName"
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
                            <el-form-item label="买家姓名">
                                <el-input
                                    clearable
                                    v-model="request_config.form.buyerName"
                                    placeholder="请输入"
                                ></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="2">
                        <div class="serachBtn">
                            <el-button
                                type="primary"
                                icon="el-icon-search"
                                @click="serachData"
                                >查询</el-button
                            >
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="batchBtn">
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                @click="delBatch"
                                >批量删除</el-button
                            >
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="pull-right">
                            <el-button
                                @click="handleAdd"
                                type="danger"
                                icon="el-icon-circle-plus-outline"
                                >添加售后订单</el-button
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
                    <el-button
                        size="mini"
                        @click="handleEdit(slotData.data.id, slotData.data)"
                        >编辑</el-button
                    >
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
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogFormVisible"
            :fullscreen="true"
            :close-on-click-modal="false"
            @close="closeDialog"
        >
            <el-form>
                <el-form-item
                    label="售后ID :"
                    :label-width="formLabelWidth"
                    v-if="eidtModel"
                >
                    <span style="color: #f56c6c">{{ dialogConfig.id }}</span>
                </el-form-item>
                <el-form-item label="订单号 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.orderNo"
                        placeholder="请输入订单号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="订单id :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.orderId"
                        placeholder="请输入订单id"
                    ></el-input>
                </el-form-item>
                <el-form-item label="商品id :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.goodsId"
                        placeholder="请输入商品id"
                    ></el-input>
                </el-form-item>
                <el-form-item label="用户id :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.userId"
                        placeholder="请输入用户id"
                    ></el-input>
                </el-form-item>
                <el-form-item label="店铺名称 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.storeName"
                        placeholder="请输入店铺名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="商品名称 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.goodsName"
                        placeholder="请输入商品名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="买家姓名 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.buyerName"
                        placeholder="请输入买家姓名"
                    ></el-input>
                </el-form-item>
                <el-form-item label="审核状态 :" :label-width="formLabelWidth">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in audit_status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务类型 :" :label-width="formLabelWidth">
                    <el-select v-model="type1" placeholder="请选择">
                        <el-option
                            v-for="item in order_after_sale_type"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="退款类型 :" :label-width="formLabelWidth">
                    <el-select v-model="type2" placeholder="请选择">
                        <el-option
                            v-for="item in refund_type"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请原因 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.reason"
                        placeholder="请输入申请原因"
                    ></el-input>
                </el-form-item>
                <el-form-item label="退货数量 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.orderAfterSaleNumber"
                        placeholder="请输入退货数量"
                    ></el-input>
                </el-form-item>
                <el-form-item label="退款金额 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.price"
                        placeholder="请输入退款金额(.00可省略) 保留两位小数 示例数据: 12 等同于 12.00"
                    ></el-input>
                </el-form-item>
                <el-form-item label="退款说明 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.refundInstruction"
                        placeholder="请输入退款说明"
                    ></el-input>
                </el-form-item>
                <el-form-item label="凭证图片 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.images"
                        placeholder="请输入凭证图片"
                    ></el-input>
                </el-form-item>
                <el-form-item label="退货时间 :" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="dialogConfig.deliveryTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="doAddOrEdit"
                        >确认{{ dialogTitle }}</el-button
                    >
                    <el-button v-if="!eidtModel" type="primary" @click="reset"
                        >重置</el-button
                    >
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" size="small" @click="closeDialog()"
                    >关闭弹窗</el-button
                >
            </div>
        </el-dialog>
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
            value: 1,
            type1: 1,
            type2: 0,
            eidtModel: false,
            dialogConfig: {
                auditStatus: "",
                buyerName: "",
                deliveryTime: "",
                goodsId: 0,
                goodsName: "",
                id: 0,
                images: "",
                orderAfterSaleNumber: 0,
                orderAfterSaleType: "",
                orderId: 0,
                orderNo: "",
                price: 0,
                reason: "",
                refundInstruction: "",
                refundType: "",
                storeName: "",
                userId: 0,
            },
            dialogTitle: "",
            dialogFormVisible: false,
            formLabelWidth: "120px",
            request_config: {
                form: {
                    //筛选项
                    storeName: "",
                    goodsName: "",
                    buyerName: "",
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
    beforeDestroy() {
        this.clearIds();
    },
    methods: {
        ...mapMutations(["clearIds"]),
        reset() {
            let obj = this.dialogConfig;
            Object.keys(obj).forEach((key) => {
                obj[key] = "";
            });
            //恢复复选框默认项
            this.value = 1;
            this.type1 = 1;
            this.type2 = 0;
        },
        closeDialog() {
            this.dialogFormVisible = false;
            if (this.eidtModel) {
                this.refreshTable();
            }
        },
        doAddOrEdit() {
            //编辑模式
            if (this.eidtModel) {
                let url_param = constant.as.updateUrl;
                let data_param = this.dialogConfig;
                console.log(data_param);
                data_param.auditStatus = this.value;
                data_param.orderAfterSaleType = this.type1;
                data_param.refundType = this.type2;
                doPostRequest(url_param, data_param).then((res) => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            message: "修改成功",
                            type: "success",
                            duration: 1600,
                        });
                        this.dialogFormVisible = false;
                    }
                    if (res.data.code == 400) {
                        this.$message({
                            message: res.data.data.msg,
                            type: "warning",
                            duration: 1600,
                        });
                    }
                });
            } else {
                //添加模式
                let url_param = constant.as.addUrl;
                let data_param = this.dialogConfig;
                console.log(data_param.id);
                data_param.auditStatus = this.value;
                data_param.orderAfterSaleType = this.type1;
                data_param.refundType = this.type2;
                doPostRequest(url_param, data_param).then((res) => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: "添加成功",
                            type: "success",
                            duration: 1600,
                        });
                        this.dialogFormVisible = false;
                        this.refreshTable();
                    }
                    if (res.data.code == 400) {
                        this.$message({
                            message: res.data.data.msg,
                            type: "warning",
                            duration: 1600,
                        });
                    }
                });
            }
        },
        handleAdd() {
            this.eidtModel = false;
            this.reset();
            this.dialogFormVisible = true;
            this.dialogTitle = "添加售后订单";
        },
        handleEdit(id, data) {
            console.log(id, data);
            this.eidtModel = true;
            this.dialogConfig = data;
            this.value = parseInt(data.auditStatus);
            this.type1 = parseInt(data.orderAfterSaleType);
            this.type2 = parseInt(data.refundType);
            this.dialogFormVisible = true;
            this.dialogTitle = "编辑售后订单";
        },
        handleDelete(id) {
            console.log(id);
            doDeleteRequest(constant.as.deleteUrl, id).then((res) => {
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
                doPostRequest(constant.as.deleteBatchUrl, this.delIds).then(
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
                searchOrGetRequest(
                    constant.as.searchOrGetPageList,
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
.emo-form-inline {
    display: flex;
}
.pull-right {
    float: right;
}
.serachBtn {
    margin-left: 10px;
}
.batchBtn {
    margin-left: 20px;
}
/deep/.el-dialog {
    text-align: left !important;
}
</style>