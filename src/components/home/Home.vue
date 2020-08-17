<template>
  <div class="flex-center">
    <div class="content">
      <div class="search flex-center">
        <div id="input-search" class=" flex-center">
          <p class="centralizado">{{ mensagem }}</p>
          <input
            type="search"
            class="filtro"
            @input="filtro = $event.target.value"
            @focus="setFocus('#input-search')"
            @blur="lostFocus('#input-search')"
            placeholder="Pesquisar imagem"
          />
          <font-awesome-icon icon="search" />
        </div>
      </div>

      <ul class="list">
        <li v-for="foto of fotosComFiltro">
          <painel :titulo="foto.titulo">
            <div class="img">
              <imagem-responsiva
                :url="foto.url"
                :titulo="foto.titulo"
                v-transform:scale.animate="1.1"
              />
            </div>
            <div class="buttons">
              <router-link
                :to="{ name: 'alteracao', params: { id: foto._id } }"
              >
                <botao tipo="button" rotulo="Alterar" estilo="padrao">
                  <font-awesome-icon icon="edit" />
                </botao>
              </router-link>

              <botao
                tipo="button"
                rotulo="Remover"
                @acao="remover(foto)"
                :confirma="true"
                estilo="perigo"
              >
                <font-awesome-icon icon="trash-alt" />
              </botao>
            </div>
          </painel>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import FotoService from "../../domain/fotos/FotoService";
import Foto from "../../domain/fotos/Foto";

export default {
  components: {
    painel: Painel,
    "imagem-responsiva": ImagemResponsiva,
    botao: Botao
  },
  name: "app",
  data() {
    return {
      titulo: "AluraPic",
      fotos: [],
      filtro: "",
      mensagem: ""
    };
  },
  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },
  methods: {
    remover(foto) {
      this.service.apaga(foto._id).then(
        () => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = "Foto removida com sucesso!";
        },
        err => {
          this.mensagem = `Não foi possível remover a foto.`;
        }
      );
    },
    setFocus(selector) {
      document.querySelector(selector).style.border = "1px solid #ff5f81";
    },
    lostFocus(selector) {
      document.querySelector(selector).style.border = "1px solid #252525";
    }
  },
  created() {
    this.service = new FotoService(this.$resource);

    this.service.lista().then(
      fotos => (this.fotos = fotos),
      err => console.log(err)
    );
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Walter+Turncoat&display=swap");

.flex-center {
  display: flex;
  justify-content: center;
}

h1,
input,
ul,
li {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.search,
.list {
  margin-top: 30px;
}

.list {
  max-width: 100vh;
  display: flex;
  flex-wrap: wrap;
}

#input-search {
  width: 255px;
  border: 1px solid #cec4c4;
  background-color: #fff;
  align-items: center;
}

input:focus {
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
}

input {
  border: none;
  padding: 5px 50px 5px 5px;
}

li {
  margin: 0 10px 30px;
}

.img {
  height: 150px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
</style>
