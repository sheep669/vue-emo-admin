/*
 * @Author: sheep669
 * @Description: 登录状态
 * @Date: 2022-07-20 22:16:48
 */
export default {
    namespaced: true,
    state: {
        userinfo: {
            user: {},
            token: ''
        }
    },
    getters: {
    },
    mutations: {
        //设置用户信息
        setUser(state, data) {
            state.userinfo = data;
        },
        //设置用户信息
        clearUser(state) {
            state.userinfo.user = {};
            state.userinfo.token = '';
        },
    },
    actions: {
    },
}