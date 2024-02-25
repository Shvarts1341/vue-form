import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Vuelidate)
Vue.use(VueTheMask)

new Vue({
  el: '#app',
  data: {
    showModal: false
  },
  render: h => h(App)
}).$mount('#app')
