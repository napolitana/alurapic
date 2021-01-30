<template>
  <div id="app">
    <Header />
    <!-- <section>
      <svg
        id="curve"
        data-name="curve"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1400 189"
      >
        <path
          class="cls-1"
          d="M.5,300.5v-35c170.83-95.72,309.23-114.59,402-115,26.59-.12,45.49,1.3,361,58,228.31,41,290.09,53.17,379,35,104.2-21.3,182.47-71.32,232-110l26-22v189Z"
          transform="translate(-0.5 -111.5)"
        />
      </svg>
    </section> -->
    <Pokedex
      class="animate__animated animate__bounce"
      :modal="selected"
      v-on:select-pokemon="selectPokemon"
    />
    <transition name="fade">
      <PokemonDetails
        v-if="selected"
        :pokemon="pokemon"
        :loading="loading"
        v-on:change-pokemon="changePokemon"
        v-on:close-modal="closeModal"
      />
    </transition>

    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Pokedex from "./components/Pokedex";
import PokemonDetails from "./components/PokemonDetails";

import Animations from "./mixins/Animations";

export default {
  components: {
    Pokedex,
    PokemonDetails,
    Header,
    Footer
  },

  mixins: [Animations],

  data() {
    return {
      selected: false,
      pokemon: {},
      loading: false
    };
  },

  methods: {
    async selectPokemon(pokemon) {
      this.selected = true;
      this.pokemon = pokemon;

      await this.callCharacteristcs(pokemon.id);
    },

    callCharacteristcs(id) {
      this.loading = true;
      this.$http
        .get(`https://pokeapi.co/api/v2/characteristic/${id}/`)
        .then(response => {
          this.$set(
            this.pokemon,
            "description",
            response.data.descriptions.find(item => item.language.name == "en")
              .description
          );

          this.$set(
            this.pokemon,
            "highestStat",
            response.data.highest_stat.name
          );
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },

    async changePokemon(args) {
      this.loading = true;

      await this.$http
        .get(`https://pokeapi.co/api/v2/pokemon/${args}`)
        .then(response => {
          this.pokemon = response.data;
          this.callCharacteristcs(args);
        })
        .catch(error => {
          console.log(error);

          this.loading = false;
        });
    },

    closeModal() {
      this.selected = false;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#app {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  position: relative;
}

section {
  position: relative;
  width: 100%;
  height: 100vh;
  background: aliceblue;
}

#curve {
  position: absolute;
  top: 0;
  width: 100%;
  transform: scaleY(-1);
}

#curve path {
  fill: #fff;
}
</style>
