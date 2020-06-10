import Vue from 'vue'
import Vuex from 'vuex'

import Login from './modules/login.module'
import Home from './modules/home.module'

console.log('zaktualizowano')

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Home,
    Login
  }
})
