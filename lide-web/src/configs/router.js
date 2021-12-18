import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home";
import Ide from "../pages/Ide";
import Login from "../pages/login";
import Page404 from "../pages/Page404"

Vue.use(VueRouter);

const routes = [
  {
    path: "/", name: "Home", component: Home, meta: {
      requiresAuth: false
    }
  },
  {
    path: "/app/", name: "Ide", component: Ide, meta: {
      requiresAuth: true
    }
  },
  {
    // (Tanguy) Redirection vers la page home
    path: "/logout/", name: "Logout", component: Home, meta: {
      requiresAuth: false
    }
  },
  {
    path: "/login/", name: "Login", component: Login, meta: {
      requiresAuth: false
    }
  },
  { path: "*", name: "Page404", component: Page404 },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
