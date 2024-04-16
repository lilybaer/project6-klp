import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./components/Home.vue";
const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    component: HomeView,
  },
  // you need to add more routes here
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
