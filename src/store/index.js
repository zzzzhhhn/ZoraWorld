import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import UserData from './modules/user.js';
import MenuList from './modules/menu.js';

export default new Vuex.Store({
    modules: [
        UserData, MenuList
    ]
})