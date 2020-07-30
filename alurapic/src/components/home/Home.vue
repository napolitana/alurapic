<template>
  <div>
    <h1>{{ titulo }}</h1>
    <p class="centralizado">{{ mensagem }}</p>
    <input
      type="search"
      class="filtro"
      @input="filtro = $event.target.value"
      placeholder="Digite o nome da imagem para filtrar"
    />

    <ul>
      <li v-for="foto of fotosComFiltro">
        <painel :titulo="foto.titulo">
          <imagem-responsiva
            :url="foto.url"
            :titulo="foto.titulo"
            v-transform:scale.animate="1.1"
          />
          <botao
            tipo="button"
            rotulo="Remover"
            @acao="remover(foto)"
            :confirma="true"
            estilo="perigo"
          />
        </painel>
      </li>
    </ul>
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

<style>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
