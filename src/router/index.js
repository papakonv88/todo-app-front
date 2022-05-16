import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../components/Dashboard.vue";
import Todos from "../components/Todos.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: '/dashboard/:user',
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: '/todos/:user',
    name: "Todos",
    component: Todos
  },
  {
    path: '*',
    redirect: "/",
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
