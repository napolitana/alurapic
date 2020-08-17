<template>
  <div class="painel">
    <h2 class="painel-titulo" @dblclick="visivel = !visivel">{{ titulo }}</h2>
    <transition name="painel-fade">
      <div class="painel-conteudo" v-show="visivel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["titulo"],
  data() {
    return {
      visivel: true
    };
  }
};
</script>

<style>
slot {
  height: 100px;
}
.painel {
  background-color: #fff;
  margin: 0 5px;
  width: 200px;
  height: 100%;
  box-shadow: 1px 2px 4px 0px #c3c3c3;
  text-align: center;
}

.painel .painel-titulo {
  text-align: center;
  font-weight: 500;
  color: #fff;
  background: #ff5f81;
  margin: 0 0 15px 0;
  padding: 10px;
}

.painel-fade-enter,
.painel-fade-leave-active {
  opacity: 0;
}

.painel-fade-enter-active,
.painel-fade-leave-active {
  transition: opacity 0.4s;
}
</style>
