/*
 * @Author: sheep669
 * @Description: vuex状态管理器
 * @Date: 2022-06-26 21:46:01
 */
import Vue from 'vue'
import Vuex from 'vuex'
import loginModule from './modules/loginModule.js'
import status from './modules/status.js'
import type from './modules/type.js'
import saveData from 'vue-savedata'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nav: [],
    ids: []
  },
  getters: {
    navData: state => state.nav,
    delIds: state => state.ids
  },
  mutations: {
    setNav(state, data) {
      state.nav = data
    },
    setIds(state, data) {
      state.ids = data
    },
    clearIds(state) {
      state.ids = []
    }
  },
  actions: {
    SETNAV({ commit }, data) {
      commit('setNav', data)
    },
    SETIDS({ commit }, data) {
      commit('setIds', data)
    }
  },
  modules: {
    loginModule,
    status,
    type
  },
  plugins: [saveData()]
})
