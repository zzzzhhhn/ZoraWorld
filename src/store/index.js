import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import UserData from './modules/user.js';

export default new Vuex.Store({
    modules: [
        UserData
    ]
})