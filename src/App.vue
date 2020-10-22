<template>
  <div id="app">
    <Header />

    <Pokedex class=" animate__animated animate__bounce" />

    <Footer />
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Pokedex from "./components/Pokedex";
export default {
  components: {
    Pokedex,
    Header,
    Footer
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
#app {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  position: relative;
}
</style>
