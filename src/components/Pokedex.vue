<template>
  <div>
    <div class="content">
      <div class="title"><h1>Pokédex - First generation</h1></div>
      <div class="loader loader-pokeball is-active" v-if="loading"></div>
      <div class="pokedex" v-else>
        <font-awesome-icon
          icon="angle-left"
          style="cursor: pointer"
          v-on:click="changePage(pagination.page - 1)"
          v-if="pagination.page > 1"
        />
        <div>
          <section class="pokemons">
            <div v-for="(pokemon, index) in pokemons" :key="index" :id="index">
              <Pokemon
                :name="pokemon.name"
                :url="pokemon.url"
                :id="index"
                :selected="selected"
                v-on:select-pokemon="selectPokemon"
              />
            </div>
          </section>

          <div class="pagination">
            <div class="total">Total: {{ pagination.total }}</div>
            <div class="page">
              Page

              {{ pagination.page }} of {{ pagination.pages }}
            </div>
          </div>
        </div>
        <font-awesome-icon
          icon="angle-right"
          style="cursor: pointer"
          v-on:click="changePage(pagination.page + 1)"
          v-if="pagination.page < pagination.total"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pokemon from "./Pokemon";
import PokemonDetails from "./PokemonDetails";

import Animations from "./../mixins/Animations";

export default {
  components: {
    Pokemon,
    PokemonDetails
  },
  mixins: [Animations],
  props: {
    modal: Boolean
  },
  data() {
    return {
      allPokemons: [],
      pokemons: [],
      selected: {
        id: null,
        select: false
      },
      loading: true,
      pagination: {
        total: 0,
        page: 1,
        pages: 0,
        perPage: 12,
        optionPerPage: [12, 24, 48, 60]
      },
      pokemon: {}
    };
  },
  async created() {
    await setTimeout(
      () =>
        this.$http
          .get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
          .then(response => {
            this.allPokemons = response.data.results;
            this.pagination.total = this.allPokemons.length;
            this.pagination.pages = Math.ceil(
              this.pagination.total / this.pagination.perPage
            );
            this.loading = false;
          }),
      2000
    );
  },

  methods: {
    selectPokemon(pokemon) {
      this.selected.id = pokemon.id;
      this.selected.select = true;
      this.pokemon = pokemon;

      this.$emit("select-pokemon", this.pokemon);

      // let element = document.querySelector(".details");
      // element.scrollIntoView({ behavior: "smooth" });
    },
    changePage(numberPage) {
      // if (numberPage > this.pagination.page) {
      //   this.animateCSS(".pokemons", "backOutRight");
      // } else {
      //   this.animateCSS(".pokemons", "backOutLeft");
      // }
      this.animateCSS(".pokemons", "fadeIn");

      this.pagination.page = numberPage;

      this.paginationFunction();
    },
    changePerPage(numberPerPage) {
      this.pagination.perPage = numberPerPage;
      this.paginatioFunction();
    },
    paginationFunction() {
      if (this.page == 1) {
        this.pokemons = this.allPokemons.slice(0, this.pagination.perPage);
      } else {
        this.pokemons = this.allPokemons
          .slice(this.pagination.perPage * (this.pagination.page - 1))
          .slice(0, this.pagination.perPage);
      }
    }
  },
  watch: {
    allPokemons: function() {
      this.pokemons =
        this.page == 1
          ? this.allPokemons.slice(0, this.pagination.perPage)
          : this.allPokemons
              .slice(this.pagination.perPage * (this.pagination.page - 1))
              .slice(0, this.pagination.perPage);
    },
    modal: function() {
      if (!this.modal) {
        this.selected.select = false;
        this.selected.id = "";
      }
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap");
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.content {
  margin-top: 3.5rem;
  max-width: 100%;
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  width: 1048px;
  padding: 0 24px;
}

h1 {
  font-size: 3.75rem;
  text-align: center;
  letter-spacing: -0.05em;
  font-weight: 700;
  margin-bottom: 30px;
  margin: 0 0 24px;
  padding-bottom: 12px;
  color: #434a54;
}

.pokedex {
  display: flex;
  align-items: center;
  padding-bottom: 24px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.pokedex > div {
  width: 100%;
}

.search {
  height: 50px;
  background-color: #ed5564;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}

.search input {
}

.pokemons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.pagination {
  width: 90%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.total {
  margin-right: 20px;
}
</style>
