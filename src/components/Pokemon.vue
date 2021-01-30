<template>
  <div>
    <div
      class="pokemon"
      :style="{
        background: isSelected ? '#ebf3eb' : ''
      }"
      v-on:click="selectPokemon()"
    >
      <p :style="{ background: isSelected ? '#22cc52' : '' }">
        {{ prettierName }}
      </p>
      <div v-if="ready" class="details">
        <div class="type">
          <small
            :style="{
              background:
                type == 'Grass'
                  ? '#9bcc50'
                  : type == 'Fire'
                  ? '#fd7d24'
                  : type == 'Psychic'
                  ? '#f366b9'
                  : type == 'Ice'
                  ? '#51c4e7'
                  : type == 'Poison'
                  ? '#b97fc9'
                  : type == 'Water'
                  ? '#4592c4'
                  : type == 'Bug'
                  ? '#729f3f'
                  : type == 'Normal'
                  ? '#a4acaf'
                  : type == 'Electric'
                  ? '#eed535'
                  : type == 'Fairy'
                  ? '#fdb9e9'
                  : type == 'Rock'
                  ? '#a38c21'
                  : type == 'Fighting'
                  ? '#d56723'
                  : type == 'Ghost'
                  ? '#7b62a3'
                  : type == 'Flying'
                  ? 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)'
                  : type == 'Ground'
                  ? 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)'
                  : type == 'Dragon'
                  ? 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)'
                  : '#000',
              width: types.length > 1 ? '50%' : ''
            }"
            v-for="type in types"
            :key="type + prettierName"
            >{{ type }}</small
          >
        </div>
        <img
          :src="pokemon.sprites.front_default"
          alt="pic"
          style="objectFit: cover"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    url: String,
    id: Number,
    selected: Object
  },
  data() {
    return {
      pokemon: {},
      ready: false
    };
  },

  created() {
    this.init();
  },
  computed: {
    prettierName() {
      return this.name[0].toUpperCase() + this.name.slice(1, this.name.length);
    },
    types() {
      return this.pokemon.types.map(
        type =>
          type.type.name[0].toUpperCase() +
          type.type.name.slice(1, type.type.name.length)
      );
    },
    isSelected() {
      return this.selected.id == this.pokemon.id && this.selected.select
        ? true
        : false;
    }
  },
  methods: {
    init() {
      this.$http
        .get(this.url)
        .then(response => {
          this.ready = true;
          this.pokemon = response.data;
        })
        .catch(error => {
          console.log(error);
          ready = false;
        });
    },
    selectPokemon() {
      this.$emit("select-pokemon", this.pokemon);
    }
  },
  watch: {
    name: function() {
      this.init();
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Mono:wght=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

.pokemon {
  background-color: #fbfbfb;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
  margin: 10px;
  cursor: pointer;
}
.pokemon p {
  text-align: center;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: #fff;
  font-size: 1.2rem;
  background-color: #434a54;
  border-radius: 3px 3px 0 0;
  padding: 10px 5px;
}
.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
}
.type {
  display: flex;
}
.type small {
  font-family: "DM Mono", monospace;
  border-radius: 3px;
  line-height: 18px;
  max-width: 110px;
  color: #fff;
  margin: 0 1.5625% 0 0;
  font-size: 11px;
  text-align: center;
  padding: 0 5px;
}
</style>
