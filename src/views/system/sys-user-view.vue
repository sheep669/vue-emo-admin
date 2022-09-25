<!--
 * @Author: sheep669
 * @Description: 用户查看模块
 * @Date: 2022-7-6 20:51:10
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="sys_user_view">
        <el-card
            shadow="always"
            body-style="0px"
            style="margin: 8px"
            class="main"
        >
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
                            <el-form-item label="用户名">
                                <el-input
                                    clearable
                                    v-model="request_config.form.username"
                                    placeholder="请输入用户名"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码">
                                <el-input
                                    clearable
                                    v-model="request_config.form.phoneNumber"
                                    placeholder="请输入手机号码"
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
                                >添加系统用户</el-button
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
                <!-- 团长状态 -->
                <template v-slot:status="slotData">
                    <el-switch
                        @change="
                            switchChange(slotData.data.id, slotData.data.status)
                        "
                        :disabled="slotData.data.id == switch_disabled"
                        v-model="slotData.data.status"
                        active-value="1"
                        inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    >
                    </el-switch>
                </template>
                <!-- 操作 -->
                <template v-slot:operation="slotData">
                    <el-button
                        v-show="slotData.data.userType != 5"
                        style="margin-left: 4px"
                        slot="reference"
                        size="mini"
                        type="primary"
                        @click="grantAdmin(slotData.data.id)"
                        >设为管理员</el-button
                    >
                    <el-button
                        v-show="slotData.data.userType != 4"
                        style="margin-left: 4px"
                        slot="reference"
                        size="mini"
                        type="warning"
                        @click="grantGroupBuyingOrganizer(slotData.data.id)"
                        >设为团长</el-button
                    >
                    <el-button
                        v-show="slotData.data.userType != 3"
                        style="margin-left: 4px"
                        slot="reference"
                        size="mini"
                        type="danger"
                        @click="grantShopOwners(slotData.data.id)"
                        >设为商铺会员</el-button
                    >
                    <el-button
                        v-show="slotData.data.userType != 1"
                        style="margin-left: 4px"
                        slot="reference"
                        size="mini"
                        type="info"
                        @click="grantVip(slotData.data.id)"
                        >设为普通会员</el-button
                    >
                    <el-button
                        v-show="slotData.data.userType != 2"
                        style="margin-left: 4px"
                        slot="reference"
                        size="mini"
                        type="danger"
                        @click="grantSVip(slotData.data.id)"
                        >设为超级会员</el-button
                    >

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
                    label="系统用户ID :"
                    :label-width="formLabelWidth"
                    v-if="eidtModel"
                >
                    <span style="color: #f56c6c">{{ dialogConfig.id }}</span>
                </el-form-item>
                <el-form-item label="用户名 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.username"
                        placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <span style="color: red; margin-left: 72px"
                    >* 输入明文即可 后台自动加密</span
                >
                <el-form-item
                    label="密码 :"
                    :label-width="formLabelWidth"
                    style="margin-top: 5px"
                >
                    <el-input
                        show-password
                        clearable
                        v-model="dialogConfig.password"
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="角色 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.role"
                        placeholder="请输入角色"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="系统用户状态 :"
                    :label-width="formLabelWidth"
                >
                    <el-switch
                        v-model="dialogConfig.status"
                        active-value="1"
                        inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    >
                    </el-switch>
                </el-form-item>
                <el-form-item label="用户类型 :" :label-width="formLabelWidth">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in user_type"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="头像 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.avatar"
                        placeholder="请输入头像地址"
                    ></el-input>
                </el-form-item>
                <el-form-item label="手机号码 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.phoneNumber"
                        placeholder="请输入手机号码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="账户余额 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.accountBalance"
                        placeholder="请输入账户余额(.00可省略) 保留两位小数 示例数据: 12 等同于 12.00"
                    ></el-input>
                </el-form-item>
                <el-form-item label="居住地 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.location"
                        placeholder="请输入居住地"
                    ></el-input>
                </el-form-item>
                <el-form-item label="联系地址 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.address"
                        placeholder="请输入联系地址"
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
    doPostRequest,
    doDeleteRequest,
    doAuditRequest,
} from "@/api/index";
import EmoTable from "@/components/table/index";
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
    name: "SysUserView",
    components: {
        EmoTable,
    },
    data() {
        return {
            value: 5,
            dialogConfig: {
                accountBalance: 0,
                address: "",
                avatar: "",
                id: 0,
                location: "",
                password: "",
                phoneNumber: "",
                role: "",
                status: "",
                userType: "",
                username: "",
            },
            dialogTitle: "",
            dialogFormVisible: false,
            formLabelWidth: "120px",
            eidtModel: false,
            table_data: [],
            isShow: true,
            switch_disabled: "",
            total: 16,
            page: { current: 1, size: 8 },
            request_config: {
                form: {
                    username: "",
                    phoneNumber: "",
                },
            },
            table_config: {
                thead: [
                    {
                        label: "用户ID",
                        prop: "id",
                        fixed: "left",
                        width: 80,
                    },
                    {
                        label: "用户名",
                        prop: "username",
                        width: 160,
                        fixed: "left",
                    },
                    { label: "密码", prop: "password", width: 200 },
                    { label: "角色", prop: "role", width: 200 },
                    {
                        label: "状态(禁/启用)",
                        prop: "status",
                        width: 120,
                        type: "slot",
                        align: "center",
                        slotName: "status",
                    },
                    {
                        label: "用户类型",
                        prop: "userType",
                        width: 100,
                        type: "function",
                        callback: (row, prop) => {
                            const data = this.user_type.filter(
                                (item) => item.value == row[prop]
                            );
                            if (data && data.length > 0) {
                                return data[0].label;
                            }
                        },
                    },
                    { label: "头像", prop: "avatar", width: 150 },
                    { label: "手机号码", prop: "phoneNumber", width: 120 },
                    { label: "账户余额", prop: "accountBalance", width: 120 },
                    { label: "居住地", prop: "location", width: 150 },
                    { label: "联系地址", prop: "address", width: 200 },
                    { label: "注册时间", prop: "registerTime", width: 180 },
                    {
                        label: "操作",
                        width: 570,
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
        ...mapState("type", ["user_type"]),
    },
    created() {
        this.getTableData();
    },
    beforeDestroy() {
        this.clearIds();
    },
    methods: {
        ...mapMutations(["clearIds"]),
        grantVip(id) {
            doAuditRequest(constant.user.grantVipUrl, id).then((res) => {
                if (res.data.code == 200) {
                    this.$message({
                        message: "授权成功",
                        type: "success",
                    });
                    this.refreshTable();
                } else {
                    this.$message({
                        message: "操作有误,请检查网络或服务器",
                        type: "error",
                    });
                }
            });
        },
        grantSVip(id) {
            doAuditRequest(constant.user.grantSVipUrl, id).then((res) => {
                if (res.data.code == 200) {
                    this.$message({
                        message: "授权成功",
                        type: "success",
                    });
                    this.refreshTable();
                } else {
                    this.$message({
                        message: "操作有误,请检查网络或服务器",
                        type: "error",
                    });
                }
            });
        },
        grantAdmin(id) {
            doAuditRequest(constant.user.grantAdminUrl, id).then((res) => {
                if (res.data.code == 200) {
                    this.$message({
                        message: "授权成功",
                        type: "success",
                    });
                    this.refreshTable();
                } else {
                    this.$message({
                        message: "操作有误,请检查网络或服务器",
                        type: "error",
                    });
                }
            });
        },
        grantGroupBuyingOrganizer(id) {
            doAuditRequest(constant.user.grantGroupBuyingOrganizerUrl, id).then(
                (res) => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: "授权成功",
                            type: "success",
                        });
                        this.refreshTable();
                    } else {
                        this.$message({
                            message: "操作有误,请检查网络或服务器",
                            type: "error",
                        });
                    }
                }
            );
        },
        grantShopOwners(id) {
            doAuditRequest(constant.user.grantShopOwnersUrl, id).then((res) => {
                if (res.data.code == 200) {
                    this.$message({
                        message: "授权成功",
                        type: "success",
                    });
                    this.refreshTable();
                } else {
                    this.$message({
                        message: "操作有误,请检查网络或服务器",
                        type: "error",
                    });
                }
            });
        },
        doAddOrEdit() {
            //编辑模式
            if (this.eidtModel) {
                let url_param = constant.user.updateUrl;
                let data_param = this.dialogConfig;
                console.log(data_param.id);
                data_param.userType = this.value;
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
                let url_param = constant.user.addUrl;
                let data_param = this.dialogConfig;
                console.log(data_param.id);
                data_param.userType = this.value;
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
        serachData() {
            let isInput = false;
            let page_parm = { current: 1, size: this.page.size };
            let data_param = this.request_config.form;
            Object.keys(data_param).forEach((v) => {
                if (!data_param[v] == "" || !data_param[v] == null) {
                    isInput = true;
                }
            });
            if (isInput) {
                searchOrGetRequest(
                    constant.user.searchOrGetPageList,
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
        reset() {
            let obj = this.dialogConfig;
            Object.keys(obj).forEach((key) => {
                obj[key] = "";
            });
            //恢复复选框默认项
            this.value = 5;
            //恢复switch默认状态
            obj.status = "1";
        },
        closeDialog() {
            this.dialogFormVisible = false;
            if (this.eidtModel) {
                this.refreshTable();
            }
        },
        //重置查询框
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
        delBatch() {
            if (this.delIds.length == 0) {
                this.$message({
                    message: "请至少选择一条数据",
                    type: "warning",
                });
            } else {
                doPostRequest(constant.user.deleteBatchUrl, this.delIds).then(
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
        handleAdd() {
            this.eidtModel = false;
            this.reset();
            this.dialogFormVisible = true;
            this.dialogTitle = "添加系统用户";
        },
        handleEdit(id, data) {
            console.log(id, data);
            this.eidtModel = true;
            this.dialogConfig = data;
            this.value = parseInt(data.userType);
            this.dialogFormVisible = true;
            this.dialogTitle = "编辑系统用户信息";
        },
        handleDelete(id) {
            console.log(id);
            doDeleteRequest(constant.user.deleteUrl, id).then((res) => {
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
        getTableData() {
            searchOrGetRequest(
                constant.user.searchOrGetPageList,
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
                constant.user.searchOrGetPageList,
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
        switchChange(id, status) {
            let updateParam = {
                id: id,
                status: status,
            };
            console.log("updateParam", updateParam);
            //禁用 防止重复点击
            this.switch_disabled = id;
            /**
             * update 通过user_id更新数据库的 status
             */
            let url = constant.user.updateUrl;
            doPostRequest(url, updateParam).then((res) => {
                if (res.data.code == 200) {
                    if (status == 0) {
                        this.$message({
                            message: "该用户已禁用",
                            duration: 1600,
                            type: "success",
                        });
                    } else if (status == 1) {
                        this.$message({
                            message: "该用户已启用",
                            duration: 1600,
                            type: "success",
                        });
                    }
                } else {
                    this.$message({
                        message: "修改失败,请检查网络或者服务器",
                        duration: 1600,
                        type: "error",
                    });
                }
            });
            //处理完成后,恢复可选状态
            this.switch_disabled = "";
            console.log(id, status);
        },
    },
};
</script>
<style lang='less' scoped>
.sys_user_view {
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