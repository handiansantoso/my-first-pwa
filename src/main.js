import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import moment from 'moment-timezone';

Vue.config.productionTip = false
Vue.prototype.moment = moment
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
