import Vue from 'vue';
import VeeValidate, {Validator} from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import App from './App.vue';
import './assets/css/css.css';

Vue.config.productionTip = false;

Validator.localize('zh_CN', zh_CN);
Vue.use(VeeValidate,{
  events:'input|blur'
});

new Vue({
  render: h => h(App)
}).$mount('#app')
