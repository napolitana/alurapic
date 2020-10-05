<template>
  <header>
    <div class="logo">
      AluraPic
    </div>

    <slot />
  </header>
</template>
<script></script>

<style scoped>
header {
  background-color: #252525;
  padding: 16px 0;
  display: flex;
  justify-content: space-evenly;
}
.logo {
  font-size: 2rem;
  padding-left: 5px;
  color: #fff;
  letter-spacing: -0.04rem;
  border-left: 10px solid #ff5f81;
  font-family: "Walter Turncoat", cursive;
}
</style>
