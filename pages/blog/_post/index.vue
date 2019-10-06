<template>
  <section :key="$route.params.post" class="content">
    <header>
      <h1 class="page-title">{{ attributes.title }}</h1>
      <blockquote>{{ attributes.description }}</blockquote>
      <div class="blog__details">
        <time class="time">{{ require('moment')(attributes.ctime).format("DD/MM/YYYY") }}</time>
        <div class="tags">{{ attributes.tags }}</div>
      </div>
      <figure v-if="attributes.cover_image" class="">
        <img :src="require(`~/assets/images/articles/${attributes.cover_image}`)" :alt="attributes.alt_image" loading="lazy"/>
      </figure>
    </header>
    <article>
      <div v-html="content"></div>
    </article>
    <footer class="">
      <nuxt-link to="/blog/" class="">&larr; Volver al blog</nuxt-link>
    </footer>
    <script v-if="attributes.script_url" :src="attributes.script_url"></script>
  </section>
</template>

<script>
const fm = require("front-matter");
const md = require("markdown-it")({
  html: true,
  typographer: true
}).use(require("markdown-it-highlightjs"), { auto: true });

export default {
  async asyncData({ params }) {
    const fileContent = await import(`~/articles/${params.post}.md`);
    let res = fm(fileContent.default);
    return {
      attributes: res.attributes,
      content: md.render(res.body)
    };
  },
  head() {
    return {
      title: this.attributes.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.attributes.description
        }
      ]
    };
  }
};
</script>

<style lang="scss">

</style>