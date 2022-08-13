<!--
 * @Author: sheep669
 * @Description: 团长管理模块
 * @Date: 2022-7-5 12:02:45
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="group_buying_organizer_manage">
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
                    <el-col :span="14">
                        <el-form label-width="100px" class="emo-form-inline">
                            <el-form-item label="推荐团长姓名">
                                <el-input
                                    clearable
                                    v-model="
                                        request_config.form
                                            .recommendGroupBuyingOrganizer
                                    "
                                    placeholder="请输入"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="提货地址">
                                <el-input
                                    clearable
                                    v-model="
                                        request_config.form.receiverAddress
                                    "
                                    placeholder="请输入"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式">
                                <el-input
                                    clearable
                                    v-model="request_config.form.phoneNumber"
                                    placeholder="请输入(全)"
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
                                >添加团长信息</el-button
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
                            switchChange(
                                slotData.data.id,
                                slotData.data.groupBuyingOrganizerStatus
                            )
                        "
                        :disabled="slotData.data.id == switch_disabled"
                        v-model="slotData.data.groupBuyingOrganizerStatus"
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
                    label="会员ID :"
                    :label-width="formLabelWidth"
                    v-if="eidtModel"
                >
                    <span style="color: #f56c6c">{{ dialogConfig.id }}</span>
                </el-form-item>
                <el-form-item
                    label="推荐团长名称 :"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        clearable
                        v-model="dialogConfig.recommendGroupBuyingOrganizer"
                        placeholder="请输入推荐团长名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="团长状态 :" :label-width="formLabelWidth">
                    <el-switch
                        v-model="dialogConfig.groupBuyingOrganizerStatus"
                        active-value="1"
                        inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    >
                    </el-switch>
                </el-form-item>
                <el-form-item label="联系方式 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.phoneNumber"
                        placeholder="请输入合法联系方式"
                    ></el-input>
                </el-form-item>
                <el-form-item label="店铺名称 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.storeName"
                        placeholder="请输入店铺名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="提货地址 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.receiverAddress"
                        placeholder="请输入提货地址"
                    ></el-input>
                </el-form-item>
                <el-form-item label="佣金余额 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.commissionBalance"
                        placeholder="请输入佣金余额(.00可省略)"
                    ></el-input>
                </el-form-item>
                <el-form-item label="收益总额 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.earningsBalance"
                        placeholder="请输入收益总额(.00可省略)"
                    ></el-input>
                </el-form-item>
                <el-form-item label="现金余额 :" :label-width="formLabelWidth">
                    <el-input
                        v-model="dialogConfig.cashBalance"
                        placeholder="请输入现金余额(.00可省略)"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注 :" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入备注"
                        v-model="dialogConfig.remark"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="推荐人 :" :label-width="formLabelWidth">
                    <el-input
                        clearable
                        v-model="dialogConfig.referrer"
                        placeholder="请输入推荐人"
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
import EmoTable from "@/components/table/index";
import constant from "@/constant/api/index";
import { mapState, mapGetters, mapMutations } from "vuex";
import {
    searchOrGetRequest,
    doPostRequest,
    doDeleteRequest,
} from "@/api/index";
export default {
    name: "GroupBuyingOrganizerManage",
    components: {
        EmoTable,
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
        doAddOrEdit() {
            //编辑模式
            if (this.eidtModel) {
                let url_param = constant.gbom.updateUrl;
                let data_param = this.dialogConfig;
                console.log(data_param.id);
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
                let url_param = constant.gbom.addUrl;
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
                if (!data_param[v] == null || !data_param[v] == "") {
                    isInput = true;
                }
            });
            if (isInput) {
                searchOrGetRequest(
                    constant.gbom.searchOrGetPageList,
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
            obj.groupBuyingOrganizerStatus = "1";
        },
        closeDialog() {
            this.dialogFormVisible = false;
            if (this.eidtModel) {
                this.refreshTable();
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
        delBatch() {
            if (this.delIds.length == 0) {
                this.$message({
                    message: "请至少选择一条数据",
                    type: "warning",
                });
            } else {
                doPostRequest(constant.gbom.deleteBatchUrl, this.delIds).then(
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
            this.value = 1;
            this.dialogFormVisible = true;
            this.dialogTitle = "添加团长信息";
        },
        getTableData() {
            searchOrGetRequest(
                constant.gbom.searchOrGetPageList,
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
                constant.gbom.searchOrGetPageList,
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
        handleEdit(id, data) {
            console.log(id, data);
            this.eidtModel = true;
            this.dialogConfig = data;
            this.value = parseInt(data.auditStatus);
            this.dialogFormVisible = true;
            this.dialogTitle = "编辑团长信息";
        },
        handleDelete(id) {
            console.log(id);
            doDeleteRequest(constant.gbom.deleteUrl, id).then((res) => {
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
        switchChange(id, status) {
            let updateParam = {
                id: id,
                groupBuyingOrganizerStatus: status,
            };
            console.log("updateParam", updateParam);
            //禁用 防止重复点击
            this.switch_disabled = id;
            /**
             * update 通过user_id更新数据库的 recommend_group_buying_organizer_status
             */
            let url = constant.gbom.updateUrl;
            doPostRequest(url, updateParam).then((res) => {
                if (res.data.code == 200) {
                    this.$message({
                        message: "修改成功",
                        duration: 1600,
                        type: "success",
                    });
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
    data() {
        return {
            value: 1,
            eidtModel: false,
            auditStatus: [
                { label: "待审核", value: 1 },
                { label: "审核中", value: 2 },
                { label: "通过", value: 3 },
                { label: "不予通过", value: 4 },
            ],
            dialogConfig: {
                applyTime: null,
                auditStatus: "3",
                cashBalance: "",
                commissionBalance: "",
                earningsBalance: null,
                groupBuyingOrganizerStatus: "1",
                id: 0,
                phoneNumber: null,
                receiverAddress: null,
                recommendGroupBuyingOrganizer: null,
                referrer: null,
                remark: null,
                storeName: null,
            },
            dialogTitle: "",
            dialogFormVisible: false,
            formLabelWidth: "120px",
            table_data: [],
            isShow: true,
            switch_disabled: "",
            total: 16,
            page: { current: 1, size: 8 },
            request_config: {
                form: {
                    recommendGroupBuyingOrganizer: null,
                    receiverAddress: null,
                    phoneNumber: null,
                },
            },
            table_config: {
                thead: [
                    {
                        label: "会员ID",
                        prop: "id",
                        fixed: "left",
                        width: 70,
                    },
                    {
                        label: "推荐团长",
                        prop: "recommendGroupBuyingOrganizer",
                        width: 100,
                    },
                    { label: "联系方式", prop: "phoneNumber", width: 120 },
                    { label: "店铺名称", prop: "storeName", width: 150 },
                    { label: "提货地址", prop: "receiverAddress", width: 230 },
                    {
                        label: "佣金余额",
                        prop: "commissionBalance",
                        width: 90,
                    },
                    { label: "收益总额", prop: "earningsBalance", width: 90 },
                    { label: "现金余额", prop: "cashBalance", width: 90 },
                    {
                        label: "团长状态",
                        prop: "groupBuyingOrganizerStatus",
                        type: "slot",
                        slotName: "status",
                        width: 100,
                    },
                    { label: "备注", prop: "remark", width: 200 },
                    { label: "推荐人", prop: "referrer", width: 100 },
                    {
                        label: "审核状态",
                        prop: "auditStatus",
                        type: "function",
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
                    { label: "申请时间", prop: "applyTime", width: 160 },
                    {
                        label: "操作",
                        width: 150,
                        type: "slot",
                        slotName: "operation",
                        fixed: "right",
                    },
                ],
                checkbox: true,
            },
        };
    },
};
</script>
<style lang='less' scoped>
.el-input.is-disabled /deep/ .el-input__inner {
    color: #1e2227;
}
.group_buying_organizer_manage {
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
.serachBtn {
    margin-left: 10px;
}
.batchBtn {
    margin-left: 20px;
}
/deep/.el-dialog {
    text-align: left !important;
}

.tag {
    text-align: center;
    width: 200px;
}
</style>