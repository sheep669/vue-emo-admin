/*
 * @Author: sheep669
 * @Description: 请求api的请求常量
 * @Date: 2022-08-06 20:40:43
 */


/**
 *   首页
 */
const index = {
    getPieChartDataUrl: '/getPieChartData',
    getOrderData: '/getOrderData',
    getInventoryData: '/getInventoryData',
    getGroupOrganizerData: '/getGroupOrganizerData',
    getAfterSaleData: '/getAfterSaleData',
    getGroupBuyingOrganizerRank: '/getGroupBuyingOrganizerRank',
    getBuyerRank: '/getBuyerRank'
}

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
    confirmAuditUrl: '/goodsComment/audit/confirm',
    approveAuditUrl: '/goodsComment/audit/approve',
    rejectAuditUrl: '/goodsComment/audit/reject',
    reAuditUrl: '/goodsComment/audit/reAudit'
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
    payCalcutionUrl: '/groupBuyingOrganizer/doPayCalculation',
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
    addBlacklistUrl: '/member/addBlacklist',
    removeBlacklistUrl: '/member/removeBlacklist',
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
/**
 *   操作配送单管理
 */
const dpm = {
    addUrl: '/deliveryPaper/add',
    updateUrl: '/deliveryPaper/update',
    deleteUrl: '/deliveryPaper/delete',
    searchOrGetPageList: '/deliveryPapers/page/get',
    deleteBatchUrl: '/deliveryPapers/deleteBatch',
}
/**
 *   操作配送路线
 */
const dr = {
    addUrl: '/deliveryRoutes/add',
    updateUrl: '/deliveryRoutes/update',
    deleteUrl: '/deliveryRoutes/delete',
    searchOrGetPageList: '/deliveryRoutes/page/get',
    deleteBatchUrl: '/deliveryRoutes/deleteBatch',
}
/**
 *   操作售后表
 */
const as = {
    addUrl: '/afterSale/add',
    updateUrl: '/afterSale/update',
    deleteUrl: '/afterSale/delete',
    searchOrGetPageList: '/afterSales/page/get',
    deleteBatchUrl: '/afterSales/deleteBatch',
    confirmAuditUrl: '/afterSale/audit/confirm',
    approveAuditUrl: '/afterSale/audit/approve',
    rejectAuditUrl: '/afterSale/audit/reject',
    reAuditUrl: '/afterSale/audit/reAudit'
}

/**
 *   操作用户
 */
const user = {
    addUrl: '/user/add',
    updateUrl: '/user/update',
    deleteUrl: '/user/delete',
    searchOrGetPageList: '/users/page/get',
    deleteBatchUrl: '/users/deleteBatch',
}
/**
 *   操作用户类型
 */
const ut = {
    addUrl: '/userType/add',
    updateUrl: '/userType/update',
    deleteUrl: '/userType/delete',
    searchOrGetPageList: '/userTypes/page/get',
    deleteBatchUrl: '/userTypes/deleteBatch',
}
/**
 *   操作登录日志
 */
const sll = {
    addUrl: '/systemLoginLog/add',
    updateUrl: '/systemLoginLog/update',
    deleteUrl: '/systemLoginLog/delete',
    searchOrGetPageList: '/systemLoginLogs/page/get',
    deleteBatchUrl: '/systemLoginLogs/deleteBatch',
}
/**
 *   操作操作日志
 */
const sol = {
    addUrl: '/systemOperateLog/add',
    updateUrl: '/systemOperateLog/update',
    deleteUrl: '/systemOperateLog/delete',
    searchOrGetPageList: '/systemOperateLogs/page/get',
    deleteBatchUrl: '/systemOperateLogs/deleteBatch',
}

export default {
    index,
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
    mdp,
    dpm,
    dr,
    as,
    user,
    ut,
    sll,
    sol
}