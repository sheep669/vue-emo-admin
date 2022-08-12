<!--
 * @Author: sheep669
 * @Description: 分页组件
 * @Date: 2022-06-26 23:27:23
-->
<template>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[8]"
        :page-size="8"
        layout="total,sizes,prev, pager, next, jumper"
        :total="64"
        hide-on-single-page
    >
    </el-pagination>
</template>

<script>
export default {
    name: "EmoPagination",
    data() {
        return { currentPage: 4 };
    },
    props: {
        config: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    },
};
</script>
