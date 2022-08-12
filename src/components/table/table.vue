<template>
    <div class="emo-table">
        <el-table
            :data="table_data"
            style="width: 95.5%"
            border
            max-width="250"
        >
            <el-table-column
                v-if="table_config.checkbox"
                type="selection"
                width="55"
            >
            </el-table-column>
            <template v-for="item in table_config.thead">
                <el-table-column
                    v-if="item.type === 'switch'"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                >
                    <template slot-scope="scope">
                        <el-switch
                            :disabled="switch_disabled == scope.row.id"
                            @change="switchChange(scope.row)"
                            v-model="scope.row.status"
                            active-value="1"
                            inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else-if="item.type === 'function'"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                >
                    <template slot-scope="scope">
                        <!-- item.callback(scope.row) 把数据传出去  scope.row == data -->
                        <span>{{
                            item.callback && item.callback(scope.row.type)
                        }}</span>
                    </template>
                </el-table-column>
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
                            :src="scope.row.imgurl"
                            fit="fit"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                    show-overflow-tooltip
                ></el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script>
import { getTableData } from "@/utils/http";
export default {
    name: "EmoTableFeng",
    data() {
        return {
            table_data: [],
            table_config: {
                thead: [],
                checkbox: "",
                url: ``,
            },
            switch_disabled: 222,
        };
    },
    props: {
        config: {
            type: Object,
            default: () => {},
        },
    },
    created() {
        let data = JSON.parse(sessionStorage.getItem("gdata"));
        if (data) {
            console.log(data);
            this.table_data = data;
        }
    },
    methods: {
        switchChange(data) {
            console.log(data);
        },
        initConfig() {
            for (let key in this.config) {
                if (Object.keys(this.table_config).includes(key)) {
                    this.table_config[key] = this.config[key];
                }
            }
            //配置完成后再去调用
            this.getData(this.table_config.url);
        },
        getData(url_param) {
            let _this = this;
            getTableData(url_param).then((res) => {
                _this.table_data = res.data;
                sessionStorage.setItem("gdata", JSON.stringify(res.data));
            });
        },
    },
    watch: {
        config: {
            handler(newValue) {
                this.initConfig();
                console.log("newValue", newValue);
            },
            immediate: true,
        },
    },
};
</script>

<style lang="css" scoped>
.emo-table {
    width: 1250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 12px;
}
.el-table {
    margin-bottom: 5px;
}
</style>
