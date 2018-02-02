import * as types from './types.js';

const state = {
    userData: {}
}

const mutations = {
    [types.USER_DATA](state, data) {console.log(data)
        state.userData = data;
    }
}

const actions = {
    getUserData({commit}, data) {
        console.log(data)
        commit(types.USER_DATA, data);
    }
}

const getters = {
    listenUserData: state => state.userData
}

export default {
    state,
    getters,
    actions,
    mutations
};