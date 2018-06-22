import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import Editor from 'vue-quill-editor'
// import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
Vue.use(Editor);
Vue.use(ElementUI);
Vue.config.silent = true
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

const url ='http://localhost:8088/v1/'


Vue.prototype.$urlbase = url
Vue.prototype.$imgbase = 'http://localhost:8088/'


new Vue({
    router,
    render: h => h(App)
}).$mount('#app');