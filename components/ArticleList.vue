<template>
  <section class="content">
    <header class="">
      <h1 class="page-title">Últimas publicaciones</h1>
    </header>
    <article v-for="(post,key) in bloglist" :key="key" class="blog">
      <nuxt-link :to="`/blog/${post.slug}`" class="post-title">{{ post.title }}</nuxt-link>
      <figure v-if="post.cover_image" class="blog__img">
        <img
          :src="require(`~/assets/images/articles/${post.cover_image}`)"
          :alt="post.cover_image_cp"
          loading="lazy"
        >
      </figure>
      <p class="blog__excerpt">{{ post.description }}</p>
      <div class="blog__details">
        <time class="time">{{ require('moment')(post.ctime).format("DD/MM/YYYY") }}</time>
        <div class="tags">{{ post.tags }}</div>
      </div>
      <p class="">
        <nuxt-link :to="`/blog/${post.slug}`">Leer m&aacute;s &rarr;</nuxt-link>
      </p>
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

<style lang="scss">
.blog {
  margin-bottom: 3rem;
  &__img {
    margin-bottom: 1.5rem;
  }
  &__excerpt {
    margin-bottom: 1rem;
  }
  &__details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>