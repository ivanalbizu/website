import NavBar from '~/components/NavBar';
<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar__title">
      <nuxt-link to="/">ivan albizu</nuxt-link>
    </div>
    <div class="navbar__menu">
      <nuxt-link class="button" to="/curriculum/">Currículum</nuxt-link>
      <nuxt-link class="button" to="/blog/">Blog</nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
  font-size: 2.4rem;
  font-size: 5vw;
  .button:not(:first-of-type) {
    margin-left: 1rem;
  }
}
@media(min-width: 20rem) {
  .navbar {
    font-size: 5vw;
  }
}
@media(min-width: 40rem) {
  .navbar {
    font-size: 3vw;
  }
}
@media(min-width: 60rem) {
  .navbar {
    font-size: 2.4rem;
  }
}
</style>