import Home from "./components/home/Home.vue";
import Cadastro from "./components/cadastro/Cadastro.vue";

//const Cadastro = () => System.import("./components/cadastro/Cadastro.vue");

export const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    titulo: "Home",
    menu: true,
    id: Math.random()
  },
  {
    path: "/cadastro",
    name: "cadastro",
    component: Cadastro,
    titulo: "Cadastro",
    menu: true,
    id: Math.random()
  },
  {
    path: "/cadastro/:id",
    name: "alteracao",
    component: Cadastro,
    titulo: "Cadastro",
    menu: false,
    id: Math.random()
  },
  { path: "*", component: Home, menu: false, id: Math.random() }
];
