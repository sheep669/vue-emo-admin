/*
 * @Author: sheep669
 * @Description: 类型统一管理
 * @Date: 2022-08-08 21:04:02
 */

const state = {
    member_type:
        [
            { label: "vip", value: 1 },
            { label: "svip", value: 2 },
        ],
    order_after_sale_type:
        [
            { label: "退款", value: 0 },
            { label: "退货", value: 1 },
        ],
    refund_type:
        [
            { label: "原路退回", value: 0 },
            { label: "退至钱包", value: 1 },
            { label: "手动处理", value: 2 },
        ],

}

export default {
    namespaced: true,
    state
}