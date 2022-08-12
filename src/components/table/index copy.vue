<template>
    <el-table :data="tableData" border max-width="120">
        <el-table-column fixed prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="120"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="120"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="120"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="120"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="120"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="120"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="120"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="120"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="120"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>住址: {{ scope.row.address }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.status"
                    active-value="true"
                    inactive-value="false"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                >
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                >
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                >
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import { getTableData } from "@/utils/http";
export default {
    name: "EmoTable",
    data() {
        return {
            tableData: [],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            let _this = this;
            getTableData(`/get_table_data`).then((res) => {
                // console.log(res);
                _this.tableData = res.data;
            });
        },
        handleEdit(index, row) {
            console.log("index", index);
            console.log("row", row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
    },
};
</script>