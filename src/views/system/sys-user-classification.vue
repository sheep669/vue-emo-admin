<!--
 * @Author: sheep669
 * @Description: 用户分类模块
 * @Date: 2022-7-6 20:51:10
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="sys_user_classification">
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
                            <el-form-item label="用户类型名称">
                                <el-input
                                    style="width: 520px"
                                    clearable
                                    v-model="request_config.form.userTypeName"
                                    placeholder="请输入用户类型名称"
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
                                >添加用户类型</el-button
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
                    label="用户类型ID :"
                    :label-width="formLabelWidth"
                    v-if="eidtModel"
                >
                    <span style="color: #f56c6c">{{ dialogConfig.id }}</span>
                </el-form-item>
                <el-form-item
                    label="用户类型名称 :"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        clearable
                        v-model="dialogConfig.userTypeName"
                        placeholder="请输入用户类型名称"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="用户类型所属id :"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        clearable
                        v-model="dialogConfig.userId"
                        placeholder="请输入用户类型所属id"
                    ></el-input>
                </el-form-item>
                <el-form-item label="用户总数 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.userNumber"
                        placeholder="请输入用户总数"
                    ></el-input>
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
    doDeleteRequest,
    doPostRequest,
} from "@/api/index";
import EmoTable from "@/components/table/index";
import { mapGetters, mapMutations } from "vuex";
export default {
    name: "SysUserClassification",
    components: {
        EmoTable,
    },
    data() {
        return {
            total: 16,
            page: { current: 1, size: 8 },
            table_data: [],
            isShow: true,
            eidtModel: false,
            dialogTitle: "",
            dialogFormVisible: false,
            formLabelWidth: "120px",
            dialogConfig: {
                id: 0,
                userId: 0,
                userNumber: 0,
                userTypeName: "",
            },
            request_config: {
                form: {
                    userTypeName: "",
                },
            },
            table_config: {
                thead: [
                    {
                        label: "用户类型ID",
                        prop: "id",
                        fixed: "left",
                        width: 200,
                    },
                    {
                        label: "用户类型",
                        prop: "userTypeName",
                        width: 200,
                        type: "function",
                        callback: (row, prop) => {
                            return row[prop];
                        },
                    },
                    { label: "用户类型所属id", prop: "userId", width: 200 },
                    { label: "用户总数", prop: "userNumber", width: 100 },
                    {
                        label: "操作",
                        width: 200,
                        type: "slot",
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
                let url_param = constant.ut.updateUrl;
                let data_param = this.dialogConfig;
                console.log(data_param);
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
                let url_param = constant.ut.addUrl;
                let data_param = this.dialogConfig;
                console.log(data_param.id);
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
            this.dialogTitle = "添加用户类型";
        },
        handleEdit(id, data) {
            console.log(id, data);
            this.eidtModel = true;
            this.dialogConfig = data;
            this.dialogFormVisible = true;
            this.dialogTitle = "编辑用户类型";
        },
        handleDelete(id) {
            console.log(id);
            doDeleteRequest(constant.ut.deleteUrl, id).then((res) => {
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
                doPostRequest(constant.ut.deleteBatchUrl, this.delIds).then(
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
                    constant.ut.searchOrGetPageList,
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
                constant.ut.searchOrGetPageList,
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
                constant.ut.searchOrGetPageList,
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
.sys_user_classification {
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