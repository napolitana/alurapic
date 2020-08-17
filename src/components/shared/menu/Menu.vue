<template>
  <nav>
    <ul>
      <li v-for="item in itens" :key="item.id">
        <router-link v-if="item.menu" :to="item.path ? item.path : '/'">
          {{ item.titulo }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    itens: {
      type: Array,
      required: true
    }
  }
};
</script>
<style scoped>
a {
  color: #ff5f81;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  letter-spacing: -0.04rem;
  font-size: 20px;
  font-weight: 600;

  padding: 24.5px;
}

a:link,
a:hover {
  text-decoration: none;
}

.router-link-active {
  background-color: #403e3e;
}

ul {
  display: flex;
  justify-content: center;
}

li {
  margin: 0 10px;
}
</style>
