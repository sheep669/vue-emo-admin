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

export default {
    gbom,
    goods,
    gl,
    gco,
    gca,
    orders
}