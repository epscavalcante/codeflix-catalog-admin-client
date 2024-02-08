export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/genres',
        name: 'genres',
        component: () => import('../views/Genres.vue')
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
        path: '/cast-members',
        name: 'castMembers',
        component: () => import('../views/CastMembers.vue')
    }
]