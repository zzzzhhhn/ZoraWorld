import * as types from './types.js';
import api from '../../api/menu.js';

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
    getMenuList({commit}, params) {
        const novels = [];
        const games = [];
        const blogs = [];
        api.getMenuData(data => {
           data.data.forEach(item => {
                if(item.mType === '1') {
                    novels.push(item);
                }else if(item.mType === '2') {
                    games.push(item);
                }else if(item.mType === '3') {
                    blogs.push(item);
                }
            });
            commit(types.GAME_LIST, games);
            commit(types.NOVEL_LIST, novels);
            commit(types.BLOG_LIST, blogs);
        }, params);

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