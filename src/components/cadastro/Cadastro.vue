<template>
  <div>
    <div class="titulo">
      <h1 v-if="foto._id" class="centralizado">Alterar</h1>
      <h1 v-else class="centralizado">Cadastrar</h1>
    </div>

    <div class="cadastro">
      <form class="form" @submit.prevent="gravar()">
        <div class="campos">
          <label for="titulo">Título</label>
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

        <div class="campos">
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
        </div>

        <div class="campos">
          <label for="descricao">Descrição</label>
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
      <div v-if="foto.url" class="preview-img">
        <imagem-responsiva
          v-show="foto.url"
          :url="foto.url"
          :titulo="foto.titulo"
        />
      </div>
    </div>
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
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.titulo {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ff5f81;
  letter-spacing: -0.04rem;
  margin: 30px 0;
}

.centralizado {
  text-align: center;
}

.cadastro {
  display: flex;
  justify-content: center;
}
.form {
  width: 100vh;
  margin: auto;
  margin: 0 4rem;
  padding: 0 15px;
}
.form .campos {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form .campos label {
  display: inline-block;
  margin-bottom: 0.5rem;
}

.form .campos input,
.form .campos textarea {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form .campos input:focus,
.form .campos textarea:focus {
  outline: none;
  border-color: #ff5f81;
}

.form .campos textarea {
  height: auto;
}

.preview-img {
  width: 300px;
  height: 300px;
}

.preview-img img {
  max-width: 100%;
  height: auto;
}

.erro {
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
</style>
