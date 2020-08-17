<template>
  <button
    @click="disparaAcao()"
    class="botao"
    :class="estiloDoBotao"
    type="tipo"
  >
    <slot />
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
        } else {
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
  color: #a94442;
  border-radius: 3px;
  margin-left: 5px;
  padding: 8px;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.botao-perigo {
  color: firebrick;
}

.botao-padrao {
  color: #3578d5;
}
</style>
