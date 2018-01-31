const routers = [{
    path: '/',
    redirect: '/home/',
    },
    {
        path: '/home/',
        meta: {
            title: '左拉大世界欢迎您！'
        },
        component: (resolve) => require(['./views/index.vue'], resolve),
        children: [
            {
                path: 'sudoku',
                meta: {
                    title: '数独'
                },
                component: (resolve) => require(['./views/sudoku.vue'], resolve),
            },
            {
                path: 'tetris',
                meta: {
                    title: '俄罗斯方块（单机版）'
                },
                component: (resolve) => require(['./views/tetris.vue'], resolve),
            },
            {
                path: 'orcish',
                meta: {
                    title: '兽人大战僵尸'
                },
                component: (resolve) => require(['./views/orcish.vue'], resolve),
            },
            {
                path: 'monster',
                meta: {
                    title: '怪物农场'
                },
                component: (resolve) => require(['./views/monster.vue'], resolve),
            },
        ]
    }];
export default routers;