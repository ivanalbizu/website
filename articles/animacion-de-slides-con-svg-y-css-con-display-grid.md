---
title: Animación de Slides con SVG y Css con display GRID
published: true
description: Animación de  con Imágenes en formato SVG y maquetación de cada Slides con display Grid dentro de la misma cuadrícula. Cambio de Slide visible con Api Javascript IntersectionObserver
tags: css,javascript,svg
ctime: Sun, 21 Jun 2020 18:30:00 +0000
cover_image: animacion-de-slides-con-svg-y-css-con-display-grid.png
alt_image: Animación de Slides con SVG y Css con display GRID
---

Quería seguir practicando con animaciones css mediante <code>keyframes</code> aplicado a <code>SVG</code>. Consiste en 4 contenedores para imágenes y textos colocados uno encima de otro que comparten la misma rejilla con <code>display grid</code>. He usado API javascript <code>Intersection Observer</code> aunque no hubiera sido necesario, ya que con cambiar las clases con el evento <code>click</code> hubiera sido suficiente

Puede verse en este Pen

<iframe height="600" style="width: 100%;" scrolling="no" title="Slides Animation with SVG transitions" src="https://codepen.io/ivan_albizu/embed/QWypMNv?height=492&theme-id=2608&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ivan_albizu/pen/QWypMNv'>Slides Animation with SVG transitions</a> by Iván Albizu
  (<a href='https://codepen.io/ivan_albizu'>@ivan_albizu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Código HTML animación Slide SVG

Las animaciones serán inicilizadas con javascript para la sección que tenga el atributo <code>data-animation="nombre-animacion"</code>

Existen las siguientes animaciones:

<ul class="list-bullets">
  <li>Título de slide con <code>data-title data-split-word</code></li>
  <li>Párrafo con <code>data-translate-x</code></li>
  <li>Navegación entre Slides con <code>data-fade-in</code></li>
  <li>Animación de mágenes SVG con <code>data-image</code></li>
  <li>Animación de cada ítem de la lista con <code>data-translate-y</code></li>
</ul>

Las animación será realizada con CSS y controladas con javascript para el cambio entre secciones

```html
<body>
  <div class="enable-js">Please enable javascript and refresh page to navigate</div>

  <main class="main">

    <section class="section" id="beethowen" data-animation="beethowen">
      <div class="section__title">
        <h1 class="title" data-title data-split-word>Beethowen</h1>
      </div>
      <div class="section__content" data-translate-x>
        <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quis, qui rerum est eum blanditiis id quia natus voluptatum distinctio ad aspernatur repudiandae illum sit tempora expedita beatae vero amet.</p>
      </div>
      <div class="section__pagination" data-fade-in>
        <button data-href="#elvis" class="btn btn--left" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#242424" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M 15 12 l -6 0 l 6 0"/></svg>
        </button>
        <button data-href="#chopin" class="btn btn--right" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#242424" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M 9 12 l 6 0 l -6 0"/></svg>
        </button>
      </div>
      <div class="section__img" data-image>
        <svg class="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 307.1 446.1">
          <!-- Path de la imagen SVG -->
        </svg>
      </div>
      <ul class="section__list">
        <li class="list-item" data-translate-y style="--kf-delay: 2100">
          <p class="list-item-title">Author</p>
          <p class="list-item-subtitle">John Doe</p>
        </li>
        <li class="list-item" data-translate-y style="--kf-delay: 2300">
          <p class="list-item-title">Category</p>
          <p class="list-item-subtitle">Art, Illustration</p>
        </li>
        <li class="list-item" data-translate-y style="--kf-delay: 2500">
          <p class="list-item-title">Source</p>
          <a href="https://pixabay.com/vectors/beethoven-classics-composer-europe-1295440/" class="list-item-subtitle" target="_blank" rel="noopener noreferrer">Pixabay</a>
        </li>
      </ul>
    </section>

    <!-- Resto de secciones -->

  </main>
</body>
```

## Código CSS para rejillas

El contenedor general contiene los 4 slides en la que cada sección se coloca en la misma rejilla y sólo una estará visible

```css
.main {
  display: grid;
  grid-template-columns: 10px 1fr 10px;
  grid-gap: 0px;
  max-width: 1380px;
  margin: auto;
  height: 100%;
  overflow: hidden;
}
.section {
  grid-area: 2 / 2 / 3 / 3;

  display: grid;
  grid-template-columns: 5fr 5fr 3fr;
  grid-gap: 15px;
  height: 100%;
  .img {
    width: 100%;
    max-height: 100%;
    display: block;
  }
  &__title {
    z-index: 1;
    grid-area: 1 / 1 / 3 / 4;
    align-self: center;
  }
  &__content {
    grid-area: 2 / 1 / 6 / 2;
    align-self: center;
  }
  &__pagination {
    grid-area: 4 / 1 / 6 / 2;
    align-self: flex-end;
    display: flex;
    justify-content: space-around;
    justify-content: space-evenly;
  }
  &__img {
    grid-area: 1 / 2 / 6 / 3;
    align-self: flex-end;
    max-height: calc(100vh - 20px);
    overflow: hidden;
  }
  &__list {
    grid-area: 1 / 3 / 6 / 4;
    align-self: flex-end;
  }
  &:not(:last-of-type) {
    display: none;
    visibility: hidden;
  }
  
  @media (max-width: 814px) and (orientation: portrait) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    &__title {
      grid-area: 1 / 1 / 2 / 3;
    }
    &__content {
      grid-area: 2 / 1 / 3 / 2;
    }
    &__pagination {
      grid-area: 4 / 1 / 5 / 3;
    }
    &__img {
      grid-area: 1 / 2 / 3 / 3;
    }
    &__list {
      grid-area: 3 / 1 / 4 / 3;
      display: flex;
      justify-content: space-between;
    }
    
  }
}
```

## Código CSS animación Slide SVG

Los 4 slides van a compartir los mismos efectos en las transiciones excepto la transición llamada <code>bean</code> y <code>beethowen</code>

La animación común será:

```css
.active {
  [data-split-word] {
    .char {
      display: inline-block;
      color: transparent;
      transform: translateY(-20px);
      animation: words 200ms ease-out calc(var(--char-index) * 100ms) forwards;
    }
  }
  [data-translate-y] {
    animation: translateY .2s ease-in-out 0s forwards;
  }
  [data-translate-x] {
    transform: translateX(-20px);
    animation: translateX .6s ease-in-out 1.4s forwards;
  }
  [data-fade-in] {
    animation: fadeIn .2s ease-in-out 3.3s forwards;
    .btn {
      path {
        transition: d .4s ease-in-out 3.3s;
      }
      &--right path {
        d: path("M 9 18 l 6 -6 l -6 -6");
      }
      &--left path {
        d: path("M 15 18 l -6 -6 l 6 -6");
      }
    }
  }
  &.reverse {
    [data-split-word] {
      .char {
        color: #242424;
        transform: translateY(0);
        animation: wordsReverse 200ms ease-out calc(var(--char-index-reverse) * 100ms) forwards;
      }
    }
    [data-translate-y] {
      opacity: 1;
      transform: translateY(0);
      animation: translateYReverse .2s ease-in-out 1.2s forwards;
    }
    [data-translate-x] {
      opacity: 1;
      transform: translateX(0);
      animation: translateXReverse .4s ease-in-out 1.2s forwards;
    }
    [data-fade-in] {
      animation: fadeIn .2s ease-in-out 0s reverse;
    }
  }
}
```

La animación de la imagen aplicada al slide <code>bean</code> será:

```css
.bean.active {
  [data-image] {
    background-color: #333333;
    visibility: hidden;
    animation: fillBox .5s cubic-bezier(0.85, 0.3, 0.37, 0.94) 0s forwards;
    .img {
      visibility: visible;
    }
  }

  &.reverse {
    [data-image] {
      background-color: #333333;
      visibility: visible;
      animation: fillBoxReverse .7s cubic-bezier(0.85, 0.3, 0.37, 0.94) .5s forwards;
      .img {
        visibility: visible;
        animation: fillBoxReverse .5s cubic-bezier(0.85, 0.3, 0.37, 0.94) 0s forwards;
      }
    }
  }
}
```

La animación aplicada a los <code>path</code> de los SVG es demasiado extensa, <a href="https://github.com/ivanalbizu/slides-svg/blob/master/css/_animation.scss" target="_blank" rel="noopener">puede verse en el GitHub</a>

## Código Javascript animación Slide SVG

Buena parte del código para iniciar y controlar la animación ha sido reutilizando fragmentos que ya tenia creado para otra <a href="/blog/animacion-de-landing-con-intersection-observer">publicación sobre animación de Landing</a>

Se detecta el botón que pulsó el usuario para proceder con el quitado/añadido de clases para slide activo y slide siguiente

```javascript
//Código omitido de funciones

document.addEventListener('DOMContentLoaded', () => {

  //Código omitido para animación de títulos

  const blocks = document.querySelectorAll("[data-animation]");

  const io = new IntersectionObserver(ioHandler, ioConfig);

  [].forEach.call(blocks, block => io.observe(block));

  const goto = document.querySelectorAll('.btn');
  goto.forEach(frame => {
    frame.addEventListener('click', () => {
      event.preventDefault();
      const sectionCurrent = frame.closest('.section');
      sectionCurrent.classList.add('reverse');
      const sectionTo = document.querySelector(frame.getAttribute('data-href'));
      setTimeout(() => {
        document.querySelectorAll('.section').forEach(article => {
          article.style.display = 'none';
          article.style.visibility = 'hidden';
        });
        sectionTo.style.display = 'grid';
        sectionTo.style.visibility = 'visible';
        sectionCurrent.classList.remove('active', 'reverse', sectionCurrent.getAttribute('data-animation'));
      }, 1800);
    });
  });

});

```

Puede verse todo el código completo en mi Git

<a href="https://github.com/ivanalbizu/slides-svg" target="_blank" rel="noopener">Código en mi GitHub</a>