import {
  createRouter,
  createWebHistory,
} from "vue-router";

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  linkActiveClass: "bg-gray-900 text-white",
  linkExactActiveClass: "bg-gray-900 text-white",
  routes: [
    {
      path: "/",
      meta: {
        auth: true,
      },
      component: () => import("../views/layouts/dashboard.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("../views/Home.vue"),
        },
        {
          path: "/videos",
          name: "videos.list",
          component: () => import("../views/videos/list.vue"),
        },
        {
          path: "/videos/create",
          name: "videos.create",
          component: () => import("../views/videos/create.vue"),
        },
        {
          path: "/videos/:id/edit",
          name: "videos.edit",
          component: () => import("../views/videos/edit.vue"),
        },
        {
          path: "/genres",
          name: "genres.list",
          component: () => import("../views/genres/list.vue"),
        },
        {
          path: "/genres/create",
          name: "genres.create",
          component: () => import("../views/genres/create.vue"),
        },
        {
          path: "/genres/:id/edit",
          name: "genres.edit",
          component: () => import("../views/genres/edit.vue"),
        },
        {
          path: "/categories",
          name: "categories.list",
          component: () => import("../views/categories/list.vue"),
        },
        {
          path: "/categories/create",
          name: "categories.create",
          component: () => import("../views/categories/create.vue"),
        },
        {
          path: "/categories/:id/edit",
          name: "categories.edit",
          component: () => import("../views/categories/edit.vue"),
        },
        {
          path: "/cast-members",
          name: "castMembers.list",
          component: () => import("../views/cast-members/list.vue"),
        },
        {
          path: "/cast-members/create",
          name: "castMembers.create",
          component: () => import("../views/cast-members/create.vue"),
        },
        {
          path: "/cast-members/:id/edit",
          name: "castMembers.edit",
          component: () => import("../views/cast-members/edit.vue"),
        },
      ],
    },
  ],
});
/*
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.meta?.auth) {
      if (useAuth().isAuthenticated) {
        next();
      } else {
        next({ name: "auth.login" });
      }
    } else {
      if (to.name === "auth.login" && useAuth().isAuthenticated) next({ name: "home" });
      else next();
    }
  }
);
*/
