import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./components/Home.vue";
import Clothing from "./components/Clothing.vue";
import Electronics from "./components/Electronics.vue";
import Groceries from "./components/Groceries.vue";
import BestSeller from "./components/BestSeller.vue";
const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    component: HomeView,
  },
  // you need to add more routes here
  {
    path: "/clothing",
    name: "clothing",
    component: Clothing,
  },
  {
    path: "/electronics",
    name: "electronics",
    component: Electronics,
  },
  {
    path: "/groceries",
    name: "groceries",
    component: Groceries,
  },
  {
    path: "/bestseller",
    name: "bestseller",
    component: BestSeller,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
