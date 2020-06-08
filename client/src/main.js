import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { ValidationProvider } from 'vee-validate';
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

Vue.component('ValidationProvider', ValidationProvider);
extend('required', {
  ...required,
  message: 'Podaj login'
})

extend('password', {
  ...required,
  message: 'Podaj haslo'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
