---
title: Landing usando Display Grid y Position Sticky
published: true
description: Landing ficticia tipo Single Page usando Display grid para contenedores y posicionamiento Sticky
tags: javascript,html,css
ctime: Sun, 08 Mar 2020 10:30:00 +0000
cover_image: landing-css-grid.jpg
alt_image: Landing usando display grid y position sticky
---

En esta ocasión he construido una landing con la idea de practicar con <code>display grid</code> y <code>position sticky</code> Al final he he ido metiendo más cositas, como menú lateral tipo <code>navigation drawer</code>, customización de Scroll, animación de scroll en los enlaces internos y animación de texto "spliteado".

Para la animación de menú me he basado en algo muy chulo que está publicado en <a href="https://tympanus.net/codrops/2017/10/17/dynamic-shape-overlays-with-svg/" target="_blank">Codrops</a> y para la customización de Scroll este <a href="https://codepen.io/ram1286/pen/REyxrM" target="_blank">Codepen</a>

<a href="http://ivanalbizu.eu/experimentos/grid-landing/">Aquí puede verse la Landing</a>

Comentaré brevemente:

<ul class="list-bullets">
  <li>CSS grid y sticky</li>
  <li>Animación de textos</li>
</ul>

## CSS grid y sticky

He creado cuatro secciones diferentes en las que iba colocando cajas con texto y cajas para imágenes.

La creación de filas/columnas la hice mediante <code>grid-template-columns</code> y <code>grid-template-rows</code> y cada caja dentro tomaba los tamaños en función de la cuadrícula en cada caso

El posicionamiento <code>sticky</code> lo he añadido mediante dos clases <code>txt--sticky-top</code> y <code>txt--sticky-bottom</code> que serán válidas según el tamaño de pantalla mínimo que me interese. La primera tiene el valor <code>top: 0</code> y la segunda <code>bottom: 0</code> para que se alineen dentro en la cara que interese dentro de su contenedor al hacer scroll. Existe un caso, que por defecto la caja de texto está centrado verticalmente respecto de su elemento padre, para este caso he usado ambas clases conjuntamente

El CSS del primer ejemplo sería:

```css
.container-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, minmax(300px, auto));
  &--schema-1 {
    .div1 { grid-area: 1 / 1 / 3 / 2; }
    .div2 { grid-area: 1 / 2 / 3 / 3; }
    .div3 { grid-area: 1 / 3 / 2 / 4; }
    .div4 { grid-area: 1 / 4 / 2 / 5; }
    .div5 { grid-area: 2 / 3 / 3 / 4; }
    .div6 { grid-area: 2 / 4 / 3 / 5; }
  }
}
.txt {
  &--sticky-top {
    position: sticky;
    top: 0;
  }
  &--sticky-bottom {
    position: sticky;
    bottom: 0;
  }
  //Resto de código
}
```

Para la parte de HTML he añadido las imágenes como <code>background</code>

El HTML del primer ejemplo

```html
<section class="container-grid container-grid--schema-1">
  <article class="div1 txt txt--right">
    <h4 class="title-box">Título de la caja principal</h4>
    <p class="txt-box">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea explicabo laboriosam nulla inventore quasi accusamus, obcaecati impedit natus nisi est, voluptatibus aliquid porro exercitationem maxime modi, sequi distinctio at? Totam!</p>
  </article>
  <div class="div2 bg" style="background-image: url(img/underwater.jpg);"></div>
  <div class="div3 bg" style="background-image: url(img/marigold.jpg);"></div>
  <article class="div4 txt txt--scnd txt--sticky-top">
    <h4 class="title-box">Título</h4>
    <h5 class="txt-box">Subtítulo, breve descripción con Heading 3</h5>
  </article>
  <article class="div5 txt txt--scnd txt--sticky-bottom">
    <h4 class="title-box">Titulo</h4>
    <h5 class="txt-box">Subtítulo, breve descripción con Heading 3</h5>
  </article>
  <div class="div6 bg" style="background-image: url(img/kingfisher.jpg);"></div>
</section>
```

## Animación de textos

La animación de entrada de textos en el "Slider" lo ha realizado:

<ol class="list-bullets">
  <li>Aplicando con JS split de cada letra</li>
  <li>Animación de entradas y salidas de textos con CSS keyframes</li>
  <li>Cada una de las letras tendrá un "delay", tanto en entrada como en salida</li>
</ol>

Las funciones JS para realizar el Split y añadir clases, atributos y estilos son las siguientes:

```javascript
const elFactory = (type, attributes, ...children) => {
  const el = document.createElement(type)

  for (key in attributes) {
    el.setAttribute(key, attributes[key])
  }

  children.forEach(child => {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child))
    else el.appendChild(child)
  })

  return el
}

const sliptWords = words => {
  const fragment = new DocumentFragment();
  let globalIndex = 0;

  words.split(' ').forEach((word, iWord) => {
    const fragmentLetter = new DocumentFragment();

    word.split('').forEach((letter, iLetter) => {
      globalIndex++;
      const el = elFactory(
        'span',
        {
          'data-letter': `${letter}`,
          class: `letter`,
          style: `--letter-index:${iLetter+1}; --global-index: ${globalIndex};`
        },
        `${letter}`
      )
      fragmentLetter.appendChild(el);
    })

    const space = elFactory(
      'span',
      {
        'data-space': true,
        class: `space`
      },
      ` `
    )
    fragmentLetter.appendChild(space);

    const el = elFactory(
      'span',
      {
        'data-word': `${word}`,
        class: `word`,
        style: `--word-index:${iWord+1}`
      },
      fragmentLetter
    )
    fragment.appendChild(el);
  })

  return fragment;
}
```

La animación se producirá a aquellos elementos HTML que tengan el atributo <code>[data-split-word]</code>

```javascript
let splits = document.querySelectorAll('[data-split-word]');

splits.forEach(split => {
  let splitTextContent = split.textContent;

  split.innerHTML = '';
  split.appendChild(sliptWords(splitTextContent))
})
```

Esta landing tiene más cosas como por ejemplo:

<ul class="list-bullets">
  <li>Animación de scroll usando <code>scrollIntoView</code></li>
  <li>Menú lateral con animación de SVG</li>
  <li>Uso de <code>mix-blend-mode</code> bajo el slider</li>
  <li>Customización de ScrollBar</li>
</ul>

Puede verse todo el código en mi Git

<a href="https://github.com/ivanalbizu/landing-grid" target="_blank" rel="noopener">Código en mi GitHub</a>