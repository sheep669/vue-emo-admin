<!--
 * @Author: sheep669
 * @Description: 仓库中模块
 * @Date: 2022-7-6 20:52:20
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="in_stock">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <emo-table
                :config="table_config"
                :tableData="table_data"
                :isShow="isShow"
            ></emo-table>
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
import { searchOrGetRequest } from "@/api/index";
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
            let data = { goodsStatus: "2" };
            searchOrGetRequest(
                constant.goods.searchOrGetPageList,
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
            let data = { goodsStatus: "2" };
            searchOrGetRequest(
                constant.goods.searchOrGetPageList,
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
};
</script>
<style lang='less' scoped>
.in_stock {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>