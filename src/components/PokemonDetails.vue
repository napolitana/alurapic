<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" v-on:click="closeModal">&times;</span>
      <div v-if="loading">
        <div class="loader loader-pokeball is-active" v-if="loading"></div>
      </div>
      <div v-if="!loading">
        <div class="header">
          <h2>Pokémon details</h2>
          <p>{{ '"' + pokemon.description + '"' }}</p>
        </div>

        <div class="content">
          <font-awesome-icon
            v-if="pokemon.id > 1"
            icon="angle-left"
            style="cursor: pointer"
            v-on:click="changePokemon(pokemon.id - 1)"
          />
          <div>
            <div class="info">
              <div>
                <h3>Abilities:</h3>
                <span
                  v-for="(ability, index) in prettierAbilities"
                  :key="index"
                  :style="{
                    marginRight:
                      index + 1 < prettierAbilities.length ? '5px' : '0'
                  }"
                >
                  {{
                    ability +
                      (index + 1 < prettierAbilities.length ? ", " : " ")
                  }}
                </span>
              </div>
              <div>
                <h3>Highest Stat:</h3>
                <span>
                  {{ pokemon.highestStat }}
                </span>
              </div>
              <div>
                <h3>Weight:</h3>
                <span>
                  {{ pokemon.weight }}
                </span>
              </div>
              <div>
                <h3>Height:</h3>
                <span>
                  {{ pokemon.height }}
                </span>
              </div>
            </div>
            <div class="status">
              <h3>Pokémon status:</h3>
              <GChart
                type="ColumnChart"
                :data="chartData"
                :options="chartOptions"
              />
            </div>
          </div>
          <div class="sprites">
            <img :src="officialArtwork.front_default" alt="pic" />
          </div>
          <font-awesome-icon
            v-if="pokemon.id < 151"
            icon="angle-right"
            style="cursor: pointer"
            v-on:click="changePokemon(pokemon.id + 1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GChart } from "vue-google-charts";
import _collection from "lodash/collection";

import Animations from "./../mixins/Animations";

export default {
  components: {
    GChart
  },
  mixins: [Animations],
  props: {
    pokemon: Object,
    loading: Boolean
  },

  data() {
    return {
      evolution: {},
      genders: {},
      chartOptions: {
        chart: {
          title: "Status do pokémon"
        },
        legend: { position: "none" },
        animation: {
          duration: 1000,
          startup: true,
          easing: "out"
        },
        chartArea: { width: "80%" }
      },
      encounters: {
        location_area: [],
        version_details: []
      }
    };
  },

  async created() {
    await this.loadEncounters(this.pokemon.id);
  },

  methods: {
    closeModal() {
      // this.animateCSS(".modal", "fadeOut");
      this.$emit("close-modal");
    },
    async changePokemon(id) {
      this.reset();

      await this.loadEncounters(id);
      this.$emit("change-pokemon", id);
    },
    async loadEncounters(id) {
      let methods = [];
      let distinctMethods = [];
      await this.$http
        .get(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
        .then(response => {
          console.log(response.data);
          if (response.data.length > 0) {
            response.data.forEach((encounter, index) => {
              this.encounters.location_area[
                index
              ] = encounter.location_area.name.replace(
                /\-(\w)/g,
                x => " " + x[1].toUpperCase()
              );
              // encounter.location_area.name.replace(
              //   /\-(\w)/g,
              //   x => " " + x[1].toUpperCase()
              // );
              if (Array.isArray(encounter.version_details)) {
                encounter.version_details.forEach((version_detail, index) => {
                  version_detail.encounter_details.forEach(item =>
                    methods.push(item.method.name)
                  );
                });
                distinctMethods = [...new Set(methods)];
                this.encounters.version_details[index] = distinctMethods;
              }
            });
          }
        });
    },
    reset() {
      this.encounters.location_area = [];
      this.encounters.version_details = [];
    }
  },

  computed: {
    prettierAbilities() {
      let arr = [];
      this.pokemon.abilities.forEach(item => {
        arr.push(
          item.ability.name[0].toUpperCase() +
            item.ability.name.slice(1, item.ability.name.length)
        );
      });
      return arr;
    },
    officialArtwork() {
      let myObject = this.pokemon.sprites.other;
      return myObject["official-artwork"];
    },
    orderedStats() {
      let array = _collection.orderBy(this.pokemon.stats, "base_stat");
      return array;
    },
    statColors() {
      let colors = [
        "#edb2b8",
        "#f38e98",
        "#f97280",
        "#ED5564",
        "#cc303f",
        "#c41a2a"
      ];

      let color;

      let statColors = [];

      this.orderedStats.forEach((item, index) => {
        if (index == 0) {
          color = colors[0];
        } else {
          color = colors[index];
          if (item.base_stat == this.orderedStats[index - 1].base_stat) {
            color = colors[index - 1];
          }
        }

        statColors.push([
          item.stat.name,
          item.base_stat,
          item.base_stat,
          color
        ]);
      });

      return statColors;
    },

    chartData() {
      let chartData = [
        [
          { label: "Status", type: "string" },
          { label: "Valor", type: "number" },
          { role: "annotation" },
          { role: "style" }
        ]
      ];

      let color;

      this.pokemon.stats.forEach((item, index) => {
        color = this.statColors.find(stat => stat[0] == item.stat.name)[3];
        chartData.push([item.stat.name, item.base_stat, item.base_stat, color]);
      });

      return chartData;
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&display=swap");
.modal {
  position: fixed;
  z-index: 102;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  padding: 25px;
  margin: 10% auto;
  border: 1px solid #888;
  width: 80%;
  min-height: 577px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.header h2 {
  color: #ed5564;
  text-align: center;
  line-height: 2;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: -0.05em;
}

.header p {
  font-family: "Sue Ellen Francisco", cursive;
  color: #434a54;
  font-weight: 600;
  font-size: 1.6rem;
  text-align: center;
}
.sprites {
  min-width: 475px;
}
.info {
  margin-top: 20px;
  display: grid;
  border-radius: 5px;
  gap: 20px;
  padding: 20px;
  border: 1px dashed #ed5564;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
.info div {
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
.info h3 {
  color: #ed5564;
  line-height: 2;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: -0.05em;
  margin-right: 10px;
}

.status {
  margin-top: 20px;
}
</style>
