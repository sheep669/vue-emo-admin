<!--
 * @Author: sheep669
 * @Description: 用户查看模块
 * @Date: 2022-7-6 20:51:10
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="sys_user_view">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
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
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
    name: "SysUserView",
    components: {
        EmoTable,
    },
    data() {
        return {
            total: 16,
            page: { current: 1, size: 8 },
            switch_disabled: "",
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
                        label: "状态(禁/启用)",
                        prop: "status",
                        width: 120,
                        type: "slot",
                        align: "center",
                        slotName: "status",
                        fixed: "right",
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
        ...mapState("type", ["user_type"]),
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
</style>