<template>
  <section class="hero">
    <header class="hero__header">
      <h1 class="hero__title">Iván Albizu</h1>
      <h2 class="hero__subtitle">Maquetador web</h2>
    </header>
    <article class="hero__content">
      <p class="hero__txt">Maquetador web que le gusta trastear e investigar diferentes "cacharros"</p>
      <p class="hero__txt">He estudiado FP Superior Aplicaciones móviles Android, desarrollado diferentes sitios con temas propios en Wordpress. Actualmente desarrollando una App Web con nodejs para integrar la Api de Mailjet en el diseño de Newsletter con MJML, usando Autenticación con JWT, base de datos Mongo para Login, Pug para las vistas de la aplicación, expressjs para manejar las rutas, gulp para tareas de la App y alguna otra cosa más</p>
      <p class="hero__txt">Recienteme estaba en departamento de Commerce maquetando diseños a medida de tiendas online construidas mediante Prestashop</p>
      <p class="hero__txt">También cambiando mi Web antigua construida en Wordpress para usar NUXT + VUE. Poco a iré trayendo viejos contenidos a mi nuevo sitio, al tiempo que aprendo :)</p>
    </article>
  </section>
</template>

<style lang="scss">
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 5rem;
  padding: 3rem 1rem;
  background-color: $primary;
  color: #FFF;
  &__header {
    margin-bottom: 1.5rem;
  }
  &__title {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  &__subtitle {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  &__txt {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    line-height: 1.3;
    letter-spacing: .08rem;
  }
}
</style>