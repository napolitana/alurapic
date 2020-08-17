<template>
  <div id="app">
    <nav-header>
      <meu-menu :itens="routes" />
    </nav-header>
    <transition name="pagina">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from "./components/shared/header/Header.vue";
import Menu from "./components/shared/menu/Menu.vue";
import { routes } from "./routes";

export default {
  components: {
    "nav-header": Header,
    "meu-menu": Menu
  },
  data() {
    return {
      routes: routes.filter(rota => rota.menu)
    };
  }
};
</script>

<style></style>
