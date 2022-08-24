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
    user_type:
        [
            { label: "普通会员", value: 1 },
            { label: "超级会员", value: 2 },
            { label: "商铺会员", value: 3 },
            { label: "团长", value: 4 },
            { label: "管理员", value: 5 },
        ],

}

export default {
    namespaced: true,
    state
}