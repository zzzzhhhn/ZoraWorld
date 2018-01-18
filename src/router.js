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
                component: (resolve) => require(['./views/index.vue'], resolve),
            }

        ]
    }];
export default routers;