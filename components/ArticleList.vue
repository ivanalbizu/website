<template>
  <section class="section">
    <header class="">
      <h1>Últimas publicaciones</h1>
    </header>
    <article v-for="(post,key) in bloglist" :key="key" class="columns is-centered">
      <div v-if="post.cover_image" class="column is-3-desktop">
        <nuxt-link :to="`/blog/${post.slug}`">
          <figure class="image">
            <img
              :src="require(`~/assets/images/articles/${post.cover_image}?size=640`)"
              :alt="post.cover_image_cp"
              loading="lazy"
            >
          </figure>
        </nuxt-link>
      </div>
      <div class="">
        <p class="">
          <nuxt-link :to="`/blog/${post.slug}`">{{ post.title }}</nuxt-link>
        </p>
        <p class="">{{ post.description }}</p>
        <div class="">
          <p class="">Publicado {{ post.ctime }}</p>
          <p class="">
            <nuxt-link :to="`/blog/${post.slug}`">Leer m&aacute;s &rarr;</nuxt-link>
          </p>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  computed: {
    bloglist() {
      if ( ! this.isPaginated ) {
        return this.$store.state.bloglist.slice(0,this.postsPerPage);
      } else {
        return this.$store.state.bloglist;
      }
    },
    totalPages() {
      return this.isPaginated ? Math.ceil(this.$store.state.bloglist.length / this.postsPerPage) : 1
    }
  },
  props: {
    isPaginated: Boolean,
    postsPerPage: Number
  }
};
</script>

<style scoped></style>