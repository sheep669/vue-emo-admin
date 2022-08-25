/*
 * @Author: sheep669
 * @Description: api统一接口
 * @Date: 2022-08-06 19:50:56
 */
import axios from "../utils/request";

/**
 *   通用get请求
 * @param {*} url_param 请求的url参数
 * @returns {*} res 后端返回的响应数据
 */
export function doGetRequest(url_param) {
    return axios({
        method: "get",
        url: url_param
    })
}

/**
 *   通用post请求
 * @param {*} url_param  请求的url参数
 * @param {*} data_param 需要提交的数据
 * @returns {*} res 后端返回的响应数据
 */
export function doPostRequest(url_param, data_param) {
    return axios({
        method: "post",
        url: url_param,
        data: data_param
    })
}

/**
 *   通用删除数据请求
 * @param {*} url_param 请求的url参数
 * @param {*} id        需要删除的id
 * @returns {*} res 后端返回的响应数据
 */
export function doDeleteRequest(url_param, id) {
    return axios({
        method: "get",
        url: url_param + "/" + id,
    })
}

/**
 *   通用审核功能请求(清算、黑名单(加/移)也可用)
 * @param {*} url_param 请求的url参数
 * @param {*} id        需要审核的id
 * @returns {*} res 后端返回的响应数据
 */
export function doAuditRequest(url_param, id) {
    return axios({
        method: "post",
        url: url_param + "/" + id,
    })
}

/**
 *   通用查询或分页请求
 * @param {*} url_param  请求的url参数 必须参数
 * @param {*} page_param 请求分页参数 current,size 必须参数
 * @param {*} data_param 需要提交的查询数据 非必须参数
 * @returns {*} res 后端返回的响应数据
 */
export function searchOrGetRequest(url_param, page_param, data_param) {
    return axios({
        method: "post",
        url: url_param + "/" + page_param.current + "/" + page_param.size,
        data: data_param,
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
}



/**
 *   获取菜单数据
 * @param {*} url_param 请求的url参数
 * @returns {*} res 后端返回的响应数据
 */
export function getMenuData(url_param) {
    return axios({
        method: "get",
        url: url_param
    })
}
/**
 *   登录请求
 * @param {*} data 需要提交的数据
 * @returns {*} res 后端返回的响应数据
 */
export function doLogin(data) {
    return axios({
        method: "post",
        url: "/login",
        data: data,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i)
                    + "="
                    + encodeURIComponent(data[i])
                    + '&'
            }
            return ret;
        }],
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

/**
 *   注册请求
 * @param {*} data 需要提交的数据
 * @returns {*} res 后端返回的响应数据
 */
export function doRegister(data) {
    return axios({
        method: "post",
        url: "/register",
        data: data,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i)
                    + "="
                    + encodeURIComponent(data[i])
                    + '&'
            }
            return ret;
        }],
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}
/**
 *   退出登录请求
 * @returns {*} res 后端返回的响应数据
 */
export function doLogout() {
    return axios({
        method: "get",
        url: "/logout"
    })
}
