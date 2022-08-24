/*
 * @Author: sheep669
 * @Description: 状态统一管理
 * @Date: 2022-08-08 21:04:02
 */

const state = {
    // 审核状态   1:待审核 2:审核中 3:通过 4:不予通过
    audit_status: [
        { label: "待审核", value: 1 },
        { label: "审核中", value: 2 },
        { label: "通过", value: 3 },
        { label: "不予通过", value: 4 }
    ],
    goods_status: [
        { label: "出库中", value: 1 },
        { label: "仓库中", value: 2 },
        { label: "已售罄", value: 0 },
    ],
    orders_status: [
        { label: "待付款", value: 1 },
        { label: "待备货", value: 2 },
        { label: "备货中", value: 3 },
        { label: "配送中", value: 4 },
        { label: "待提货", value: 5 },
        { label: "已提货(交易完成)", value: 6 },
        { label: "已关闭", value: 0 },
    ],
    member_status: [
        { label: "白名单", value: 1 },
        { label: "黑名单", value: 0 },
    ],
    member_valid_status: [
        { label: "生效", value: 1 },
        { label: "失效", value: 2 },
        { label: "已结束", value: 3 },
    ],
    operate_result: [
        { label: "成功", value: 1 },
        { label: "失败", value: 2 },
    ],
}

export default {
    namespaced: true,
    state
}