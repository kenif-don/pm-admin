import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/css/common.scss';
import {createApp} from "vue";
import jfUtils from "@/utils/jf-utils";
import HljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import JfQuerys from "@/components/jf/JfQuerys.vue";
import JfQueryItem from "@/components/jf/JfQueryItem.vue";
const app = createApp(App)
app.config.globalProperties.$jfUtils = jfUtils
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus).use(store).use(router).use(HljsVuePlugin)
    .component("JfQuerys", JfQuerys)
    .component("JfQueryItem", JfQueryItem)
    .mount("#app")
export default app
// Vue.config.productionTip = false;
// var queryPageFn;//临时存储queryPage的回调函数
// Vue.prototype.findObjByArr = function (arr, key, value) {
// 	return arr.find(item => item[key] === value);
// }
// Vue.prototype.formatStr = function (str,length) {
// 	return str&&str.length>length?str.substring(0,length):str;
// }
