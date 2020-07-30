<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <form @submit.prevent="gravar()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" autocomplete="off" v-model.lazy="foto.titulo" />
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="foto.url" />
        <div class="oi">
          <imagem-responsiva
            v-show="foto.url"
            :url="foto.url"
            :titulo="foto.titulo"
          />
        </div>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea
          id="descricao"
          autocomplete="off"
          v-model="foto.descricao"
        ></textarea>
      </div>

      <div class="centralizado">
        <botao rotulo="GRAVAR" tipo="submit" />
        <router-link to="/"><botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Botao from "../shared/botao/Botao.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Foto from "../../domain/fotos/Foto.js";
import FotoService from "../../domain/fotos/FotoService";

export default {
  components: {
    botao: Botao,
    "imagem-responsiva": ImagemResponsiva
  },
  data() {
    return {
      foto: new Foto()
    };
  },
  methods: {
    gravar() {
      this.service.cadastra(this.foto).then(
        () => (this.foto = new Foto()),
        err => console.log(err)
      );
    }
  },
  created() {
    this.service = new FotoService(this.$resource);
  }
};
</script>

<style scoped>
.centralizado {
  text-align: center;
}

.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 60%;
  font-size: inherit;
  border-radius: 5px;
}

.oi {
  width: 300px;
}
</style>
