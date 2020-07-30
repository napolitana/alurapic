<template>
  <button
    @click="disparaAcao()"
    class="botao"
    :class="estiloDoBotao"
    type="tipo"
  >
    {{ rotulo }}
  </button>
</template>

<script>
export default {
  props: {
    tipo: {
      required: true,
      type: String
    },
    rotulo: {
      required: true,
      type: String
    },
    confirma: Boolean,
    estilo: String
  },
  computed: {
    estiloDoBotao() {
      if (this.estilo == "padrao") return "botao-padrao";
      if (this.estilo == "perigo") return "botao-perigo";
    }
  },
  methods: {
    disparaAcao() {
      if (this.confirma) {
        if (confirm("Deseja remover a foto?")) {
          this.$emit("acao");
          return;
        }
      }
      this.$emit("acao");
    }
  }
};
</script>

<style scoped>
.botao {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2em;
}

.botao-perigo {
  background: firebrick;
  color: white;
}

.botao-padrao {
  background: darkcyan;
  color: white;
}
</style>
