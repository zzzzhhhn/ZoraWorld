import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex'
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import store from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/less/layouts.less';

var $ = require('expose-loader?$!jquery');

import 'bootstrap';

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(iView);

Vue.prototype.$axios = Util;

// 路由配置
const RouterConfig = {
    // mode: <"history" | "hash" | "abstract" | undefined>'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to: any, from: any, next: any) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});



new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});