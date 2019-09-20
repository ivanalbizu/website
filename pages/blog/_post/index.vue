<template>
  <section :key="$route.params.post" class="section">
    <header>
      <h1>{{ attributes.title }}</h1>
      <blockquote>{{ attributes.description }}</blockquote>
      <p class="">
        Publicado <time>{{require('moment')(attributes.ctime).format("DD/MM/YYYY")}}</time>
      </p>
      <figure v-if="attributes.cover_image" class="">
        <img :src="require(`~/assets/images/articles/${attributes.cover_image}`)" :alt="attributes.cover_image_cp" loading="lazy"/>
      </figure>
    </header>
    <article>
      <div v-html="content"></div>
    </article>
    <footer class="">
      <nuxt-link to="/blog/" class="">&larr; Back to blog</nuxt-link>
    </footer>
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

<style scoped>
.blog {
  padding: 1em;
}

.blog header {
  margin-bottom: 1em;
}

.blog .subtitle {
  font-size: 1rem;
}

.blog-content >>> h1 {
  font-size: 1.5rem;
}

blockquote {
  margin-bottom: 1em;
}
</style>