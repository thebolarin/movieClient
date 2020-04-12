import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './routes'
import moment from 'moment';

Vue.config.productionTip = false
Vue.prototype.moment = moment;
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
