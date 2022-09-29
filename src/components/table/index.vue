<template>
    <div class="emo-table">
        <el-table
            v-if="isShow"
            :data="tableData"
            style="width: 100%"
            border
            max-width="250"
            height="520"
            empty-text="暂无数据"
            @selection-change="handleSelectionChange"
        >
            <!-- 表头checkbox选框默认设置 -->
            <el-table-column
                v-if="table_config.checkbox"
                type="selection"
                width="55"
                fixed
            >
            </el-table-column>
            <template v-for="item in table_config.thead">
                <!-- 插槽类型 slot  -->
                <el-table-column
                    v-if="item.type === 'slot'"
                    :align="item.align"
                    :fixed="item.fixed"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                >
                    <template slot-scope="scope">
                        <slot :name="item.slotName" :data="scope.row"></slot>
                    </template>
                </el-table-column>
                <!-- 功能型默认 function  -->
                <el-table-column
                    v-else-if="item.type === 'function'"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                >
                    <template slot-scope="scope">
                        <!-- item.callback(scope.row,item.prop) 把数据传出去  scope.row 传出去 -->
                        <el-tag>
                            {{
                                item.callback &&
                                item.callback(scope.row, item.prop)
                            }}</el-tag
                        >
                    </template>
                </el-table-column>
                <!-- 功能型 aduit  -->
                <el-table-column
                    v-else-if="item.type === 'aduit'"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                >
                    <template slot-scope="scope">
                        <!-- item.callback(scope.row) 把数据传出去  scope.row 传出去 -->
                        <el-tag
                            type="info"
                            v-if="scope.row.auditStatus === '1'"
                        >
                            {{
                                item.callback && item.callback(scope.row)
                            }}</el-tag
                        >
                        <el-tag
                            type="warning"
                            v-if="scope.row.auditStatus === '2'"
                        >
                            {{
                                item.callback && item.callback(scope.row)
                            }}</el-tag
                        >
                        <el-tag
                            type="success"
                            v-if="scope.row.auditStatus === '3'"
                        >
                            {{
                                item.callback && item.callback(scope.row)
                            }}</el-tag
                        >
                        <el-tag
                            type="danger"
                            v-if="scope.row.auditStatus === '4'"
                        >
                            {{
                                item.callback && item.callback(scope.row)
                            }}</el-tag
                        >
                    </template>
                </el-table-column>
                <!-- 数据类型 image  -->
                <el-table-column
                    v-else-if="item.type === 'image'"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                >
                    <template slot-scope="scope">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="
                                axios.defaults.baseURL + '/' + scope.row.avatar
                            "
                            fit="fit"
                        ></el-image>
                    </template>
                </el-table-column>
                <!-- 普通类型 -->
                <el-table-column
                    v-else
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                    :fixed="item.fixed"
                    show-overflow-tooltip
                ></el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "EmoTable",
    data() {
        return {
            table_config: {
                thead: [],
                checkbox: "",
            },
        };
    },
    props: {
        config: {
            type: Object,
            default: () => {},
        },
        tableData: {
            type: Array,
            default: () => [],
        },
        isShow: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        handleSelectionChange(row) {
            console.log("复选框", row);
            let ids = [];
            if (row) {
                row.forEach((v) => {
                    ids.push(v.id);
                });
                // console.log("ids", ids);
            }
            this.$store.dispatch("SETIDS", ids);
        },
        initConfig() {
            for (let key in this.config) {
                if (Object.keys(this.table_config).includes(key)) {
                    this.table_config[key] = this.config[key];
                }
            }
        },
    },
    watch: {
        /**
         * 有值新值进来，进行初始化配置
         */
        config: {
            handler() {
                this.initConfig();
            },
            immediate: true,
        },
    },
};
</script>

<style lang="less" scoped>
/deep/.el-table__empty-text {
    display: flex;
}
</style>
