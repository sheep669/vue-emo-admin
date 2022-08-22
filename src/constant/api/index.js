/*
 * @Author: sheep669
 * @Description: 请求api的请求常量
 * @Date: 2022-08-06 20:40:43
 */

/**
 *   团长管理
 */
const gbom = {
    addUrl: '/groupBuyingOrganizer/add',
    updateUrl: '/groupBuyingOrganizer/update',
    deleteUrl: '/groupBuyingOrganizer/delete',
    searchOrGetPageList: '/groupBuyingOrganizers/page/get',
    deleteBatchUrl: '/groupBuyingOrganizers/deleteBatch',
    confirmAuditUrl: '/groupBuyingOrganizer/audit/confirm',
    approveAuditUrl: '/groupBuyingOrganizer/audit/approve',
    rejectAuditUrl: '/groupBuyingOrganizer/audit/reject',
    reAuditUrl: '/groupBuyingOrganizer/audit/reAudit'
}
/**
 *   操作商品
 */
const goods = {
    addUrl: '/goods/add',
    updateUrl: '/goods/update',
    deleteUrl: '/goods/delete',
    searchOrGetPageList: '/goods/page/get',
    deleteBatchUrl: '/goods/deleteBatch',
}
/**
 *   操作商品标签
 */
const gl = {
    addUrl: '/goodsLabel/add',
    updateUrl: '/goodsLabel/update',
    deleteUrl: '/goodsLabel/delete',
    searchOrGetPageList: '/goodsLabels/page/get',
    deleteBatchUrl: '/goodsLabels/deleteBatch',
}
/**
 *   操作商品分类
 */
const gca = {
    addUrl: '/goodsCategory/add',
    updateUrl: '/goodsCategory/update',
    deleteUrl: '/goodsCategory/delete',
    searchOrGetPageList: '/goodsCategories/page/get',
    deleteBatchUrl: '/goodsCategories/deleteBatch',
}
/**
 *   操作商品评论
 */
const gco = {
    addUrl: '/goodsComment/add',
    updateUrl: '/goodsComment/update',
    deleteUrl: '/goodsComment/delete',
    searchOrGetPageList: '/goodsComments/page/get',
    deleteBatchUrl: '/goodsComments/deleteBatch',
}
/**
 *   操作订单
 */
const orders = {
    addUrl: '/order/add',
    updateUrl: '/order/update',
    deleteUrl: '/order/delete',
    searchOrGetPageList: '/orders/page/get',
    deleteBatchUrl: '/orders/deleteBatch',
}
/**
 *   操作佣金流水
 */
const cs = {
    addUrl: '/commissionSerial/add',
    updateUrl: '/commissionSerial/update',
    deleteUrl: '/commissionSerial/delete',
    searchOrGetPageList: '/commissionSerials/page/get',
    deleteBatchUrl: '/commissionSerials/deleteBatch',
}
/**
 *   操作交易流水
 */
const ds = {
    addUrl: '/dealSerial/add',
    updateUrl: '/dealSerial/update',
    deleteUrl: '/dealSerial/delete',
    searchOrGetPageList: '/dealSerials/page/get',
    deleteBatchUrl: '/dealSerials/deleteBatch',
}
/**
 *   操作团长结算
 */
const gboc = {
    addUrl: '/groupBuyingOrganizerClear/add',
    updateUrl: '/groupBuyingOrganizerClear/update',
    deleteUrl: '/groupBuyingOrganizerClear/delete',
    searchOrGetPageList: '/groupBuyingOrganizerClears/page/get',
    deleteBatchUrl: '/groupBuyingOrganizerClears/deleteBatch',
}
/**
 *   操作团长提现信息
 */
const gbowi = {
    addUrl: '/groupBuyingOrganizerWithdrawalInformation/add',
    updateUrl: '/groupBuyingOrganizerWithdrawalInformation/update',
    deleteUrl: '/groupBuyingOrganizerWithdrawalInformation/delete',
    searchOrGetPageList: '/groupBuyingOrganizerWithdrawalInformation/page/get',
    deleteBatchUrl: '/groupBuyingOrganizerWithdrawalInformation/deleteBatch',
    confirmAuditUrl: '/groupBuyingOrganizerWithdrawalInformation/audit/confirm',
    approveAuditUrl: '/groupBuyingOrganizerWithdrawalInformation/audit/approve',
    rejectAuditUrl: '/groupBuyingOrganizerWithdrawalInformation/audit/reject',
    reAuditUrl: '/groupBuyingOrganizerWithdrawalInformation/audit/reAudit'
}
/**
 *   操作会员
 */
const member = {
    addUrl: '/member/add',
    updateUrl: '/member/update',
    deleteUrl: '/member/delete',
    searchOrGetPageList: '/members/page/get',
    deleteBatchUrl: '/members/deleteBatch',
}
/**
 *   操作会员标签
 */
const ml = {
    addUrl: '/memberLabel/add',
    updateUrl: '/memberLabel/update',
    deleteUrl: '/memberLabel/delete',
    searchOrGetPageList: '/memberLabels/page/get',
    deleteBatchUrl: '/memberLabels/deleteBatch',
}
/**
 *   操作会员优惠权限
 */
const mdp = {
    addUrl: '/memberDiscountPrivilege/add',
    updateUrl: '/memberDiscountPrivilege/update',
    deleteUrl: '/memberDiscountPrivilege/delete',
    searchOrGetPageList: '/memberDiscountPrivileges/page/get',
    deleteBatchUrl: '/memberDiscountPrivileges/deleteBatch',
}

export default {
    gbom,
    goods,
    gl,
    gco,
    gca,
    orders,
    cs,
    ds,
    gboc,
    gbowi,
    member,
    ml,
    mdp
}