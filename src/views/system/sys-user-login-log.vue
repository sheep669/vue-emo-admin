<!--
 * @Author: sheep669
 * @Description: 登录日志模块
 * @Date: 2022-7-6 20:51:10
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="sys_user_login_log">
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
                    <el-col :span="12">
                        <el-form label-width="100px" class="emo-form-inline">
                            <el-form-item label="登陆用户名">
                                <el-input
                                    clearable
                                    v-model="request_config.form.username"
                                    placeholder="请输入登陆用户名"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="公司">
                                <el-input
                                    clearable
                                    v-model="request_config.form.companyName"
                                    placeholder="请输入公司"
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
                    <el-col :span="4">
                        <div class="batchBtn">
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                @click="delBatch"
                                >批量删除</el-button
                            >
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="pull-right">
                            <el-button
                                @click="handleAdd"
                                type="danger"
                                icon="el-icon-circle-plus-outline"
                                >添加登陆日志</el-button
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
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogFormVisible"
            :fullscreen="true"
            :close-on-click-modal="false"
            @close="closeDialog"
        >
            <el-form>
                <el-form-item
                    label="登录用户名 :"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        clearable
                        v-model="dialogConfig.username"
                        placeholder="请输入登录用户名"
                    ></el-input>
                </el-form-item>
                <span style="color: red; margin-left: 72px"
                    >* 个人用户 公司名默认为手机号 | 公司用户
                    公司名可以具体设置</span
                >
                <el-form-item
                    label="公司 :"
                    :label-width="formLabelWidth"
                    style="margin-top: 5px"
                >
                    <el-input
                        clearable
                        v-model="dialogConfig.companyName"
                        placeholder="请输入公司"
                    ></el-input>
                </el-form-item>
                <el-form-item label="IP地址 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.ipAddress"
                        placeholder="请输入IP地址"
                    ></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="doAdd"
                        >确认{{ dialogTitle }}</el-button
                    >
                    <el-button type="primary" @click="reset">重置</el-button>
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
    name: "SysUserLoginLog",
    components: {
        EmoTable,
    },
    data() {
        return {
            total: 16,
            page: { current: 1, size: 8 },
            table_data: [],
            isShow: true,
            dialogTitle: "",
            dialogFormVisible: false,
            formLabelWidth: "120px",
            dialogConfig: {
                companyName: "",
                ipAddress: "",
                username: "",
            },
            request_config: {
                form: {
                    username: "",
                    companyName: "",
                },
            },
            table_config: {
                thead: [
                    {
                        label: "登录日志ID",
                        prop: "id",
                        width: 100,
                    },
                    { label: "用户名", prop: "username", width: 200 },
                    { label: "登录时间", prop: "loginTime", width: 180 },
                    { label: "公司", prop: "companyName", width: 200 },
                    { label: "IP地址", prop: "ipAddress", width: 180 },
                    {
                        label: "操作",
                        width: 185,
                        type: "slot",
                        align: "center",
                        slotName: "operation",
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
        },
        doAdd() {
            //添加模式
            let url_param = constant.sll.addUrl;
            let data_param = this.dialogConfig;
            console.log("data_param", data_param);
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
        },
        handleAdd() {
            this.reset();
            this.dialogTitle = "添加系统用户登入日志";
            this.dialogFormVisible = true;
        },
        handleDelete(id) {
            console.log(id);
            doDeleteRequest(constant.sll.deleteUrl, id).then((res) => {
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
                doPostRequest(constant.sll.deleteBatchUrl, this.delIds).then(
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
                    constant.sll.searchOrGetPageList,
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
                constant.sll.searchOrGetPageList,
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
                constant.sll.searchOrGetPageList,
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
.sys_user_login_log {
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