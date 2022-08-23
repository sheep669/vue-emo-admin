<!--
 * @Author: sheep669
 * @Description: 退款申请模块
 * @Date: 2022-7-6 20:54:36
-->
<template>
    <!-- suggest to replace '_'===> '-' -->
    <div class="drawback_apply">
        <el-card shadow="always" body-style="0px" style="margin: 8px">
            <el-tabs v-model="activeName">
                <el-tab-pane label="待审核" name="waitAudit"
                    ><wait-audit v-if="activeName == 'waitAudit'"
                /></el-tab-pane>
                <el-tab-pane label="审核中" name="underAudit"
                    ><under-audit v-if="activeName == 'underAudit'"
                /></el-tab-pane>
                <el-tab-pane label="审核通过" name="auditSuccess"
                    ><audit-success v-if="activeName == 'auditSuccess'"
                /></el-tab-pane>
                <el-tab-pane label="审核失败" name="auditError"
                    ><audit-error v-if="activeName == 'auditError'"
                /></el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
import WaitAudit from "@/views/aftersale/drawbackapply/children/wait-audit.vue";
import UnderAudit from "@/views/aftersale/drawbackapply/children/under-audit.vue";
import AuditSuccess from "@/views/aftersale/drawbackapply/children/audit-success.vue";
import AuditError from "@/views/aftersale/drawbackapply/children/audit-error.vue";
export default {
    name: "DrawbackApply",
    components: {
        WaitAudit,
        UnderAudit,
        AuditSuccess,
        AuditError,
    },
    data() {
        return {
            activeName: "waitAudit",
        };
    },
};
</script>
<style lang='less' scoped>
.drawback_apply {
    height: 100%;
    width: calc(100% - 160px);
    float: right;
    overflow-y: auto;
}
</style>