import Home from "./components/home/Home.vue";
import Cadastro from "./components/cadastro/Cadastro.vue";

export const routes = [
  { path: "/home", name: "home", component: Home, titulo: "Home", menu: true },
  {
    path: "/cadastro",
    name: "cadastro",
    component: Cadastro,
    titulo: "Cadastro",
    menu: true
  },
  {
    path: "/cadastro/:id",
    name: "alteracao",
    component: Cadastro,
    titulo: "Cadastro",
    menu: false
  },
  { path: "*", component: Home, menu: false }
];