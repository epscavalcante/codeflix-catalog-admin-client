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
        name: 'categories',
        component: () => import('../views/Categories.vue')
    },
    {
        path: '/cast-members',
        name: 'castMembers',
        component: () => import('../views/CastMembers.vue')
    }
]