import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/books",
    name: "books",
    component: () => import("@/views/BookListView.vue"),
  },
  {
    path: "/books/:bookName",
    name: "book",
    component: () => import("@/views/BookView.vue"),
  },
  {
    path: "/admin/books",
    name: "books-admin",
    component: () => import("@/views/BookListAdminView.vue"),
  },
  {
    path: "/admin/books/:bookId",
    name: "book-admin",
    component: () => import("@/views/BookAdminView.vue"),
  },
  {
    path: "/admin/users",
    name: "users-admin",
    component: () => import("@/views/UserListAdminView.vue"),
  },
  {
    path: "/admin/users/:userId",
    name: "user-admin",
    component: () => import("@/views/UserAdminView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
