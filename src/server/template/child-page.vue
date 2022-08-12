<!--
 * @Author: sheep669
 * @Description: replaceDesc模块
 * @Date: replaceTime
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="replace1">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <div class="filter-form">
                <el-row>
                    <el-col :span="18">
                        <el-form
                            ref="form"
                            :model="form"
                            label-width="100px"
                            class="emo-form-inline"
                        >
                            <el-form-item label="xx姓名">
                                <el-input
                                    v-model="form.group_buying_organizer_name"
                                    placeholder="请输入姓名"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="xx地址">
                                <el-input
                                    v-model="form.receiver_address"
                                    placeholder="请输入地址"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="xx联系方式">
                                <el-input
                                    v-model="form.phone_number"
                                    placeholder="请输入手机号"
                                ></el-input>
                            </el-form-item>
                            <el-button type="danger" class="serach"
                                >搜索</el-button
                            >
                        </el-form>
                    </el-col>
                    <el-col :span="6">
                        <div class="pull-right">
                            <el-button type="danger">添加xx信息</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <emo-table :config="table_config" />
            <emo-pagination style="margin-top: 15px" />
            replace1 page
        </el-card>
    </div>
</template>
<script>
import EmoTable from "@/components/table/index";
import EmoPagination from "@/components/pagination/index";
export default {
    name: "replace2",
    components: {
        EmoTable,
        EmoPagination,
    },
    data() {
        return {
            form: {
                group_buying_organizer_name: "",
                receiver_address: "",
                phone_number: "",
            },
            /**
             * 传递表头配置
             */
            table_config: {
                thead: [
                    // {label: "会员ID",prop: "user_id",fixed: "left", width: 70},
                ],
                checkbox: true,
                // replace url_param for you need
                url: `url_param`,
            },
        };
    },
};
</script>
<style lang='less' scoped>
.replace1 {
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
.serach {
    height: 40px;
    margin-left: 12px;
}
</style>