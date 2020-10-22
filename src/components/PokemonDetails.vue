<template>
  <div class="details">
    <div class=" ">
      <h3 class="title">Habilidades:</h3>
      <span v-for="(ability, index) in abilities" :key="index">
        {{ ability.ability.name }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: Number,
    abilities: Array,
    height: Number,
    weight: Number,
    stats: Array
  },
  data() {
    return {
      evolution: {},
      genders: {}
    };
  }
};
</script>
<style scoped>
.details {
  width: 400px;
  margin-top: 72px;
  border-radius: 3px;
  height: 400px;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
}
.title {
  color: #ed5564;
  line-height: 2;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: -0.05em;
}
</style>
