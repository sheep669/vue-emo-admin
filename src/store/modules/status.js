/*
 * @Author: sheep669
 * @Description: 类型状态统一管理
 * @Date: 2022-08-08 21:04:02
 */

const state = {
    // 审核状态   1:待审核 2:审核中 3:通过 4:不予通过
    audit_status: [
        { label: "待审核", value: 1 },
        { label: "审核中", value: 2 },
        { label: "通过", value: 3 },
        { label: "不予通过", value: 4 }
    ]
}

export default {
    namespaced: true,
    state
}