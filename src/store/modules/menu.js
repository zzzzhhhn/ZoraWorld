import * as types from './types.js';

const state = {
    gameList: {},
    novelList: {},
    blogList: {}
}

const mutations = {
    [types.GAME_LIST](state, data) {
        state.gameList = data;
    },
    [types.NOVEL_LIST](state, data) {
        state.novelList = data;
    },
    [types.BLOG_LIST](state, data) {
        state.blogList = data;
    }
}

const actions = {
    getGameList({commit}, data) {
        commit(types.GAME_LIST, data);
    },
    getNovelList({commit}, data) {
        commit(types.NOVEL_LIST, data);
    },
    getBlogList({commit}, data) {
        commit(types.BLOG_LIST, data);
    },
}

const getters = {
    listenGameList: state => state.gameList,
    listenNovelList: state => state.novelList,
    listenBlogList: state => state.blogList,
}

export default {
    state,
    getters,
    actions,
    mutations
};