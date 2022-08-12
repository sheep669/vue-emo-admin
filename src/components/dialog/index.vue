<!--
 * @Author: sheep669
 * @Description: EmoDialog 
 * @Date: 2022-08-10 15:55:09
-->
<template>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-row>
            <el-col :span="24">
                <el-form :model="form">
                    <el-form-item
                        label="活动名称"
                        :label-width="formLabelWidth"
                    >
                        <el-input
                            v-model="form.name"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="活动区域"
                        :label-width="formLabelWidth"
                    >
                        <el-select
                            v-model="form.region"
                            placeholder="请选择活动区域"
                        >
                            <el-option
                                label="区域一"
                                value="shanghai"
                            ></el-option>
                            <el-option
                                label="区域二"
                                value="beijing"
                            ></el-option>
                        </el-select>
                    </el-form-item> </el-form
            ></el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
                >确 定</el-button
            >
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: "EmoDialog",
    data() {
        return {
            dialogFormVisible: false,
            title: "",
            form: {
                name: "",
                region: "",
            },
            formLabelWidth: "120px",
        };
    },
    props: {
        dialogConfig: {
            type: Array,
            default: () => [],
        },
        visible: {
            type: Boolean,
            default: false,
        },
        dialogTitle: {
            type: String,
            default: "操作",
        },
    },
    watch: {
        visible: {
            handler() {
                this.dialogFormVisible = this.visible;
            },
        },
        dialogTitle: {
            handler() {
                this.title = this.dialogTitle;
            },
        },
    },
};
</script>
<style lang='less' scoped>
</style>