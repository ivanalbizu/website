<template>
  <ArticleList :isPaginated="true" :postsPerPage="10" /> 
</template>

<script>
import ArticleList from "~/components/ArticleList";

export default {
  components: {
    ArticleList
  },
  head() {
    return {
      title: 'Publicaciones sobre html, js, css',
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Publicaciones sobre html, js, css, sass. Ejemplos de modales, slides y mucho más"
        }
      ]
    };
  }
};
</script>

<style>

</style>