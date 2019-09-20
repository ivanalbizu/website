<template>
  <footer class="footer">
    <div class="columns is-centered">
      <div class="column is-one-fifth">
        <div class="columns fa-lg has-text-centered is-narrow">
          <div class="column" v-for="(social,key) in socials" :key="key">
            <a :href="social.link" target="_blank" :aria-label="social.label" rel="noopener">
              {{social.label}}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="content has-text-centered">
      <p>Iván Albizu</p>
      <p><a href="https://vuejs.org/">Vuejs</a> + <a href="https://nuxtjs.org/">Nuxtjs</a></p>
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