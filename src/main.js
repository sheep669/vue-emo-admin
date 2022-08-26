/*
 * @Author: sheep669
 * @Description: 主入口文件
 * @Date: 2022-07-31 19:58:27
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 以插件形式按需引入element-ui
import './plugins/element.js'

// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
