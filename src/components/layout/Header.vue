<template>
  <div class="header">
    <nav class="menu-items">
      <div>Pokémon Academy</div>
      <div class="logo">
        <img src="./../../assets/img/pokeball.png" alt="logo-pokebola" />
      </div>

      <ul>
        <li>Menu 1</li>
        <li>Menu 2</li>
        <li>Menu 3</li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

.header {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  height: 64px;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease 0s;
  backdrop-filter: saturate(180%) blur(5px);
  background-color: hsla(0, 0%, 100%, 0.8);
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  z-index: 101;
}

.logo {
  display: flex;
  align-items: center;
}

.logo div,
.menu-items ul li {
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  text-transform: capitalize;
  color: #666;
  border: 0;
  font-size: 14px;
  padding: 10px;
}

.logo img {
  margin-top: 10px;
  width: 64px;
  height: 64px;
  margin-right: 10px;
}

.menu-items {
  display: flex;
  width: 1048px;
  align-items: center;
  height: 64px;
  margin: auto;
  padding: 0 24px;
  justify-content: space-between;
}

.menu-items ul li {
  display: inline;
}
</style>
