<!--
 * @Author: sheep669
 * @Description: 审核失败tab
 * @Date: 2022-08-15 21:04:04
-->
<template>
    <div id="auditError">
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
    </div>
</template>
<script>
import EmoTable from "@/components/table/index";
import constant from "@/constant/api/index";
import { searchOrGetRequest, doDeleteRequest } from "@/api/index";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
    name: "AuditError",
    components: {
        EmoTable,
    },
    created() {
        this.getTableData();
    },
    computed: {
        ...mapGetters(["delIds"]),
        ...mapState("status", ["audit_status"]),
    },
    methods: {
        ...mapMutations(["clearIds"]),
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
        getTableData() {
            let data = { auditStatus: "4" };
            searchOrGetRequest(
                constant.gbom.searchOrGetPageList,
                this.page,
                data
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
            let data = { auditStatus: "4" };
            searchOrGetRequest(
                constant.gbom.searchOrGetPageList,
                page_parm,
                data
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
    data() {
        return {
            total: 16,
            page: { current: 1, size: 8 },
            table_data: [],
            isShow: true,
            /**
             * 传递表头配置
             */
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
                        width: 90,
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
};
</script>
<style lang='less' scoped>
</style>