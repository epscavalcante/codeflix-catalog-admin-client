export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/genres',
        name: 'genres.list',
        component: () => import('../views/genres/list.vue')
    },
    {
        path: '/genres/create',
        name: 'genres.create',
        component: () => import('../views/genres/create.vue')
    },
    {
        path: '/genres/:id/edit',
        name: 'genres.edit',
        component: () => import('../views/genres/edit.vue')
    },
    {
        path: '/categories',
        name: 'categories.list',
        component: () => import('../views/categories/list.vue')
    },
    {
        path: '/categories/create',
        name: 'categories.create',
        component: () => import('../views/categories/create.vue')
    },
    {
        path: '/categories/:id/edit',
        name: 'categories.edit',
        component: () => import('../views/categories/edit.vue')
    },
    {
        path: '/cast-members',
        name: 'castMembers.list',
        component: () => import('../views/cast-members/list.vue')
    },
    {
        path: '/cast-members/create',
        name: 'castMembers.create',
        component: () => import('../views/cast-members/create.vue')
    },
    {
        path: '/cast-members/:id/edit',
        name: 'castMembers.edit',
        component: () => import('../views/cast-members/edit.vue')
    }
]