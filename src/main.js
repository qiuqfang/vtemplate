import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/permission.js";

import "normalize.css/normalize.css"; // CSS重置的现代替代方案
import "@/styles/index.scss"; // 全局CSS

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI, { size: "mini", zIndex: 2000 });

Vue.config.productionTip = false;

import EasyTable from "@/components/EasyTable";
import EasyPagination from "@/components/EasyPagination";
import EasyForm from "@/components/EasyForm";
Vue.component("EasyTable", EasyTable);
Vue.component("EasyPagination", EasyPagination);
Vue.component("EasyForm", EasyForm);

Vue.prototype.title = process.env.VUE_APP_TITLE;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
