/*
 * @Author: sheep669
 * @Description: 请求配置
 * @Date: 2022-06-27 18:46:39
 */
import axios from "axios";
import store from '@/store/index';

// 默认的请求地址
axios.defaults.baseURL = 'http://localhost:8080';
//请求携带凭证
axios.defaults.withCredentials = true;

// 添加请求拦截
axios.interceptors.request.use(config => {
    let accessToken = store.state.loginModule.userinfo.token;
    if (accessToken) {
        //添加token
        config.headers.Authorization = accessToken;
    }
    return config
});

// 添加响应拦截
axios.interceptors.response.use(res => {
    return res;
}, err => {
    return Promise.reject(err)
});

// 导出
export default axios;
