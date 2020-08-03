<template>
  <div>
    <h1 v-if="foto._id" class="centralizado">Alterar</h1>
    <h1 v-else class="centralizado">Cadastrar</h1>

    <form @submit.prevent="gravar()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input
          name="titulo"
          data-vv-as="título"
          id="titulo"
          autocomplete="off"
          v-model="foto.titulo"
          v-validate
          data-vv-rules="required|min:3|max:30"
        />
        <span class="erro" v-show="errors.has('titulo')">{{
          errors.first("titulo")
        }}</span>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input
          name="url"
          id="url"
          autocomplete="off"
          v-model="foto.url"
          v-validate
          data-vv-rules="required"
        />
        <span class="erro" v-show="errors.has('url')">{{
          errors.first("url")
        }}</span>
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
        <router-link :to="{ name: 'home' }"
          ><botao rotulo="VOLTAR" tipo="button"
        /></router-link>
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
      foto: new Foto(),
      id: this.$route.params.id
    };
  },
  methods: {
    gravar() {
      this.$validator.validateAll().then(success => {
        if (success) {
          this.service.cadastra(this.foto).then(
            () => {
              if (this.foto._id) this.$router.push({ name: "home" });
              this.foto = new Foto();
            },
            err => console.log(err)
          );
        }
      });
    }
  },
  created() {
    this.service = new FotoService(this.$resource);
    if (this.id) {
      this.service.busca(this.id).then(foto => (this.foto = foto));
    }
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
span {
  display: block;
}
.erro {
  color: red;
}
</style>
