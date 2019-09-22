<template>
  <footer class="footer">
    <div class="footer__social">
      <div v-for="(social,key) in socials" :key="key">
        <a :href="social.link" target="_blank" :aria-label="social.label" rel="noopener">
          {{social.label}}
        </a>
      </div>
    </div>
    <div class="footer__copy">
      <p>Iván Albizu</p>
      <a href="https://vuejs.org/" target="_blank">Vuejs</a> + <a href="https://nuxtjs.org/" target="_blank">Nuxtjs</a>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      socials: [
        { link: "https://github.com/ivanalbizu", icon: "github", label: "Perfil en Github" },
        { link: "https://twitter.com/ivan_albizu", icon: "twitter", label: "Perfil en Twitter" },
        { link: "https://www.linkedin.com/in/ivanalbizu/", icon: "linkedin", label: "Perfil en Linkedin" },
        { link: "https://www.youtube.com/channel/UCgAVPB3yw74JP5UEEXHgccA", icon: "youtube" , label: "Canal de Youtube" },
        { link: "http://codepen.io/ivan_albizu", icon: "codepen", label: "Perfil en Codepen" }
      ]
    };
  }
};
</script>

<style lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  &__social {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
    & > div {
      padding: 0 1rem;
    }
  }
}
</style>