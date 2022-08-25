<!--
 * @Author: sheep669
 * @Description: 商品评论模块
 * @Date: 2022-7-6 20:52:20
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="goods_comment">
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
                    <el-col :span="13">
                        <el-form label-width="100px" class="emo-form-inline">
                            <el-form-item label="商品名称">
                                <el-input
                                    style="width: 520px"
                                    clearable
                                    v-model="request_config.form.goodsName"
                                    placeholder="请输入商品名称"
                                ></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="4">
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
                    <el-col :span="4">
                        <div class="pull-right">
                            <el-button
                                @click="handleAdd"
                                type="danger"
                                icon="el-icon-circle-plus-outline"
                                >添加商品评论</el-button
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
            <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogFormVisible"
                :fullscreen="true"
                :close-on-click-modal="false"
                @close="closeDialog"
            >
                <el-form>
                    <el-form-item
                        label="商品评论ID :"
                        :label-width="formLabelWidth"
                        v-if="eidtModel"
                    >
                        <span style="color: #f56c6c">{{
                            dialogConfig.id
                        }}</span>
                    </el-form-item>
                    <el-form-item
                        label="买家信息 :"
                        :label-width="formLabelWidth"
                    >
                        <el-input
                            clearable
                            v-model="dialogConfig.buyerInformation"
                            placeholder="请输入买家信息"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="商品名称 :"
                        :label-width="formLabelWidth"
                    >
                        <el-input
                            clearable
                            v-model="dialogConfig.goodsName"
                            placeholder="请输入商品名称"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="商品规格 :"
                        :label-width="formLabelWidth"
                    >
                        <el-input
                            clearable
                            v-model="dialogConfig.goodsSpecification"
                            placeholder="请输入商品规格"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="评论内容 :"
                        :label-width="formLabelWidth"
                    >
                        <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入评论内容"
                            v-model="dialogConfig.commentContent"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="更换图片 :"
                        :label-width="formLabelWidth"
                    >
                        <el-input
                            clearable
                            v-model="dialogConfig.commentImage"
                            placeholder="请输入图片地址"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="审核状态 :"
                        :label-width="formLabelWidth"
                    >
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
                    <el-form-item style="text-align: center">
                        <el-button type="primary" @click="doAddOrEdit"
                            >确认{{ dialogTitle }}</el-button
                        >
                        <el-button
                            v-if="!eidtModel"
                            type="primary"
                            @click="reset"
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
    name: "GoodsComment",
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
            eidtModel: false,
            dialogConfig: {
                auditStatus: "",
                buyerInformation: "",
                commentContent: "",
                commentImage: "",
                goodsName: "",
                goodsSpecification: "",
                id: 0,
            },
            dialogTitle: "",
            dialogFormVisible: false,
            formLabelWidth: "120px",
            request_config: {
                form: {
                    //筛选项
                    goodsName: "",
                },
            },
            table_config: {
                thead: [
                    {
                        label: "商品评论ID",
                        prop: "id",
                        fixed: "left",
                        width: 100,
                    },
                    {
                        label: "买家信息",
                        prop: "buyerInformation",
                        width: 250,
                    },
                    { label: "商品名称", prop: "goodsName", width: 200 },
                    {
                        label: "商品规格",
                        prop: "goodsSpecification",
                        width: 200,
                    },
                    { label: "评论内容", prop: "commentContent", width: 200 },
                    { label: "评论图片", prop: "commentImage", width: 200 },
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
                let url_param = constant.gco.updateUrl;
                let data_param = this.dialogConfig;
                console.log(data_param);
                data_param.auditStatus = this.value;
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
                let url_param = constant.gco.addUrl;
                let data_param = this.dialogConfig;
                console.log(data_param.id);
                data_param.auditStatus = this.value;
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
            this.dialogTitle = "添加产品(商品)评论";
        },
        handleEdit(id, data) {
            console.log(id, data);
            this.eidtModel = true;
            this.dialogConfig = data;
            this.value = parseInt(data.auditStatus);
            this.dialogFormVisible = true;
            this.dialogTitle = "编辑产品(商品)评论信息";
        },
        handleDelete(id) {
            console.log(id);
            doDeleteRequest(constant.gco.deleteUrl, id).then((res) => {
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
                doPostRequest(constant.gco.deleteBatchUrl, this.delIds).then(
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
                    constant.gco.searchOrGetPageList,
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
                constant.gco.searchOrGetPageList,
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
                constant.gco.searchOrGetPageList,
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
.goods_comment {
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
/deep/.el-dialog {
    text-align: left !important;
}
</style>