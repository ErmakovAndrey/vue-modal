import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'

// Plugins
Vue.use(Vuelidate)

import './assets/scss/main.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app1')
