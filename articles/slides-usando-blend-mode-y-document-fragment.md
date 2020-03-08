---
title: Slides usando Blend Mode y DocumentFragment
published: true
description: Animación de Slides con transición entre imágenes y propiedad Blend Mode de CSS para manipular la apariencia de las imágenes
tags: javascript,html,css
ctime: Sun, 05 Jan 2020 11:30:00 +0000
cover_image: slides-blend-mode.png
alt_image: Slides usando Blend Mode y Document Fragment
---

He estado trasteando con una propiedad CSS llamada <code>mix-blend-mode</code> y su similar <code>background-blend-mode</code>. Despues de jugar con colores sobre imágenes y fondos he decido crear un slide que contenga algunas de las pruebas.

El Slide consiste en imágenes superpuestas como <code>background</code> una encima de otra. Sólo una será vsibible. La transición se realiza cambiando su opacidad de manera que durante un tiempo determinado ambas imágenes serán visibles e invisibles gradualmente.

Las dos propiedades, <code>mix-blend-mode</code> y <code>background-blend-mode</code>, necesitan que al mismo nivel o por debajo exista definido algún color de fondo para que tenga efecto de "fusión".

También quería usar <code>DocumentFragment</code> para añadir algo más a la animación. Consiste en crear grid de rectángulos sobre toda la capa que contiene las imágenes que durante la transición se modifica la opacidad y su tamaño.

En el siguiente Pen se puede ver el ejemplo:

<iframe height="700" style="width: 100%;" scrolling="no" title="Slides + Blend Mode" src="https://codepen.io/ivan_albizu/embed/preview/WNbXqQo?height=300&theme-id=2608&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ivan_albizu/pen/WNbXqQo'>Slides + Blend Mode</a> by Iván Albizu
  (<a href='https://codepen.io/ivan_albizu'>@ivan_albizu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Código Html del Slide

Existen tres capas:

<ul class="list-bullets">
  <li><code>&lt;div class="viewport"&gt;</code></li>
  <li><code>&lt;div class="thumbs"&gt;</code></li>
  <li><code>&lt;div class="options"&gt;</code></li>
</ul>

La primera capa contiene HTML para pintar las flechas de navegación. Mediante JS se añadirán las imágenes de fondo. Se ha creado una capa <code>&lt;div class="js-container"&gt;</code> para añadir los rectángulos con <code>DocumentFragment</code>

La segunda capa será para añadir <code>thumbs</code> de imágenes con sus identificadores mediante <code>data-atributos</code>. Estas imágenes serán usadas para pintar las imágenes del Slide mediane JS

La tercera capa es sólo para poder cambiar, desde el front, el <code>background-color</code> del viewport y el <code>mix-blend-mode</code> de las imágenes

```html
<div class="viewport">
  <div class="js-container"></div>
  <div class="nav">
    <button class="nav__control" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" class="js-navigation js-prev" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>
    </button>
    <button class="nav__control" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" class="js-navigation js-next" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
    </button>
  </div>
</div>
<div class="thumbs">
  <img data-slide="slide-0" class="thumb js-thumb thumb--active" src="img/beauty.jpg" alt="">
  <img data-slide="slide-1" class="thumb js-thumb" src="img/girl.jpg" alt="">
  <img data-slide="slide-2" class="thumb js-thumb" src="img/model.jpg" alt="">
  <img data-slide="slide-3" class="thumb js-thumb" src="img/snow.jpg" alt="">
  <img data-slide="slide-4" class="thumb js-thumb" src="img/woman.jpg" alt="">
</div>
<div class="options">
  <select name="blend-mode" id="blend-mode">
    <option value="unset">unset</option>
    <option value="normal">normal</option>
    <option value="multiply">multiply</option>
    <option value="screen">screen</option>
    [...]
  </select>
  <input name="bg-mode" id="bg-mode" type="color">
</div>
```

## Código JS del Slide

Las funciones usadas son las siguientes:

<ul class="list-bullets">
  <li>Insertar Frames de imágenes: <code>const createFrameSlides = thumbs => {}</code></li>
  <li>Función de utilidad para crear nodos en el DOM: <code>const elFactory = (type, attributes, ...children) => {}</code></li>
  <li>Función de utilidad para insertar nodos en el DOM: <code>const insertBefore = (el, referenceNode) => {};</code></li>
  <li>Crear rectángulos Fragment: <code>const createFragment = (row, col) => {}</code></li>
  <li>Tiempo para la animación: <code>const setDelay = timeout => {}</code></li>
  <li>Para habilitar/deshabilitar botones de navegación: <code>const statusNavigation = el => {}</code></li>
  <li>Registrar evento "click" en el Thumb: <code>const handlerThumbs = (timeout) => {}</code></li>
  <li>Registrar evento "click" en el Botones de Navegación: <code>const handlerNavigation = (nav, timeout) => {}</code></li>
  <li>Para aplicar transición, llamada tanto para Botones de navegación como Thumb: <code>const transitionTo = (to, timeout) => {}</code></li>
  <li>Para que el usuario pueda cambiar tanto colores de fondo como Blend Mode: <code>const handlerCustomBackground = () => {}</code></li>
</ul>

No explicaré todas las funciones una por una, ya que algunas son de utilidad y serán llamadas desde diferentes funciones

### Creación de imágenes de fondo partiendo de Thumbs

La función <code>const createFrameSlides = thumbs => {}</code> recibe un parámetro que será un array de todas las imágenes añadidas en la galería de Thumbs y devolverá un objeto <code>DocumentFragment</code> con cada una de las imágenes como <code>background</code> y atributos ID, CLASS y STYLE. Para este propósito se ha creado una función <code>const elFactory = (type, attributes, ...children) => {}</code> para realizar la creación de nodos

```javascript
const createFrameSlides = thumbs => {
  const fragment = new DocumentFragment();
  thumbs.forEach((thumb, index) => {
    const el = elFactory(
      'div',
      {
        id: `slide-${index}`,
        class: `slide${(index == 0 ? " slide--active" : "")}`,
        style: `background-image: url(${thumb.getAttribute('src')})`
      }
    )
    fragment.appendChild(el);
  })

  return fragment;
}
```

Con la función <code>const insertBefore = (el, referenceNode)</code>, partiendo de la devolución de la función anterior, ahora será necesario añadirlo al DOM html. El sitio elegido ha sido como primeros hijos de la capa <code>&lt;div class="viewport"&gt;</code>. Se pasan dos parámetros: el elemento (fragment) a insertar y el nodo de referencia

```javascript
const insertBefore = (el, referenceNode) => referenceNode.parentNode.insertBefore(el, referenceNode);
```

Esta función será usada con la anterior una vez el DOM esté cargado. "container" es <code>const container = document.querySelector('.js-container')</code>

```javascript
insertBefore(createFrameSlides(thumbs), container);
```

### Creación de rectángulos para la animación

La función <code>const createFragment = (row, col) => {}</code> genera etiquetas <code>span</code> y se añaden a un <code>DocumentFragment</code> que luego será añadido al DOM.

Se quería que los rectángulos fueran apareciendo de fuera hacía el centro, para eso se han añadido clases que cumplan esa "numeración" para después poder aplicar estilos CSS en función de su posición

```javascript
const createFragment = (row, col) => {
  let fragment = new DocumentFragment();

  let step;
  let items = -1;
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if ((row / 2) > r) {
        if ((col / 2) > c) step = r + c;
        else step--;
        if (items < step) items = step;
      } else {
        if ((col / 2) > c) step = row - r - 1 + c;
        else step--;
      }

      fragment.appendChild(elFactory('span', { class: `item item--${step}`}));
    }
  }
  document.documentElement.style.setProperty('--items', items);

  return fragment;
}
```

### Tiempo de animación y delay de los rectángulos

La función <code>const setDelay = timeout => {}</code> es usada para insertar estilos a los <code>keyframes</code> que animan los rectángulos. Recibe un parámetro tiempo que es leído de una variable CSS (que es usada en el resto de animaciones). Dentro de la función se obtiene otra variable CSS para poder conocer cuantos "tipos" de rectángulos existen

```javascript
const setDelay = timeout => {
  let style = document.createElement('style');
  document.head.appendChild(style);

  const items = getComputedStyle(document.documentElement).getPropertyValue('--items');

  for (let index = 0; index <= items; index++) {
    const item = `.item--${index} {
      animation-delay: ${index*100}ms;
      animation-duration: ${timeout-index*100}ms;
    }`;
    style.sheet.insertRule(item);
  }
}
```

### Habilitar/Deshabilitar botones de navegación

Para poder anular la navegación Next o Prev se ha creado la función <code>const statusNavigation = el => {}</code> que es llamada dentro de la función <code>const transitionTo = (to, timeout) => {}</code>.

Cada cambio de Slide se comprueba si se ha llegado al Final o al Principio de los Slides y en tal caso se anula si procede

```javascript
const statusNavigation = el => {
  if (!el.nextElementSibling) document.querySelector('.js-next').style.display = 'none';
  else document.querySelector('.js-next').style.display = 'flex';

  if (!el.previousElementSibling) document.querySelector('.js-prev').style.display = 'none';
  else document.querySelector('.js-prev').style.display = 'flex';
}
```

### Evento click en Thumb

Con la función <code>const handlerThumbs = (timeout) => {}</code> se manejan eventos <code>click</code> sobre las miniaturas del Slide. Esta función, al igual que la siguiente función, realiza la llamada a la función <code>transitionTo(event.target, timeout)</code> que es la encargada de realizar la animación

```javascript
const handlerThumbs = (timeout) => transitionTo(event.target, timeout);
```

### Evento click en Navigation

Con la función <code>const handlerNavigation = (nav, timeout) => {}</code> se manejan eventos <code>click</code> sobre botones Prev/Next del Slide. Igual que antes, se llama a la función <code>transitionTo(event.target, timeout)</code> encargada de la animación

```javascript
const handlerNavigation = (nav, timeout) => {
  let active = null;
  if (nav.classList.contains('js-next')) {
    active = document.querySelector('.thumb--active').nextElementSibling;
  } else {
    active = document.querySelector('.thumb--active').previousElementSibling;
  }

  transitionTo(active, timeout)
}
```

### Cambiar imagen de los Slides

Una de las funciones principales para el Slide es <code>const transitionTo = (to, timeout) => {}</code>. Es la que realiza el cambio de imágenes, tanto al cambiar imágenes con "click" en Thumb como en Botones de Navegación.

La función recibe dos parámetros.

El primer parámetro "to" es el slide que se debe mostrar. Para el caso de pulsación sobre algún Thumbs se pasará el <code>target</code> y para el caso de pulsación sobre flechas de navegación se pasará el nodo siguiente o previo que esté marcado como <code>.thumb--active</code>

Dentro se añaden y quitan clases para realizar la transición

```javascript
const transitionTo = (to, timeout) => {
  document.body.classList.add('js-animating');
  document.querySelector('.thumb--active').classList.remove('thumb--active');

  const particles = document.querySelectorAll('.js-container .item');
  particles.forEach(item => item.classList.add('particles'))

  to.classList.add('thumb--active');
  statusNavigation(to);

  const current = document.querySelector('.slide--active');
  current.classList.add('fade-out');

  const slide = document.querySelector('#'+to.getAttribute('data-slide'));
  slide.classList.add('fade-in');

  setTimeout(() => {
    document.body.classList.remove('js-animating');
    current.classList.remove(...['fade-out', 'slide--active']);
    slide.classList.remove('fade-in');
    slide.classList.add('slide--active');
    particles.forEach(item => item.classList.remove('particles'));
  }, timeout);
}
```

### Personalización de colores de fondo

Se ha habilitado que se pueda cambiar desde el front:

<ul class="list-bullets">
  <li>Color de fondo durante la transición</li>
  <li>Blend Mode de las imágenes del Slide</li>
</ul>

Con la función <code>const handlerCustomBackground = () => {}</code> se manejan eventos de cambio sobre <code>&lt;select name="blend-mode" id="blend-mode"&gt;</code> y sobre <code>&lt;input name="bg-mode" id="bg-mode" type="color"&gt;</code>

```javascript
const handlerCustomBackground = () => {
  if (event.target.id === 'blend-mode') {
    document.querySelectorAll('.viewport .slide').forEach(slide => {
      slide.style.mixBlendMode = `${event.target.value}`;
    });
  } else if (event.target.id === 'bg-mode') {
    document.querySelector('.viewport').style.backgroundColor = `${event.target.value}`;
  } else {
    return;
  }
}
```

### Registro de eventos con DOM cargado

Con todas las funciones necesarias, ahora necesitamos usarlas una vez el DOM está cargado

```javascript
document.addEventListener('DOMContentLoaded', () => {

  const viewport = document.querySelector('.viewport');

  const container = document.querySelector('.js-container');
  const thumbs = document.querySelectorAll('.thumbs .thumb');
  const navs = document.querySelectorAll('.js-navigation');

  const row = getComputedStyle(document.documentElement).getPropertyValue('--row');
  const col = getComputedStyle(document.documentElement).getPropertyValue('--col');
  const timeout = getComputedStyle(document.documentElement).getPropertyValue('--timeout');

  if (container && viewport && thumbs) {
    insertBefore(createFrameSlides(thumbs), container);
    container.appendChild(createFragment(row, col));
    setDelay(timeout);
    thumbs.forEach(anime => {
      anime.addEventListener('click', handlerThumbs.bind(this, timeout), false);
    });
    document.addEventListener('input', handlerCustomBackground, false);
    navs.forEach(nav => {
      nav.addEventListener('click', handlerNavigation.bind(this, nav, timeout), false);
    });
  }

});
```

Hacemos <code>querySelector</code> y <code>querySelectorAll</code> del <code>viewport</code>, <code>js-container</code>, <code>thumb</code> y <code>js-navigation</code>.

También obtenemos tres variables CSS:

<ul class="list-bullets">
  <li><code>--row</code>: cantidad de filas de rectángulos</li>
  <li><code>--col</code>: cantidad de columnas de rectángulos</li>
  <li><code>--timeout</code>: tiempo en las transiciones</li>
</ul>

Con esto podemos definir desde CSS este tipo de cambios en la animación.

El código dentro del <code>if</code> es para, primero crear los rectángulos y añadirlos al DOM, segundo añadir <code>timeout</code> y registrar todos los eventos del Slide.


## Código CSS del Slide

Se han creado variables CSS para ser obtenidas desde JS y poder personalizarlo desde CSS

```css
$base-color: rgba(84, 17, 17, .2);
$row: 7;
$col: 11;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
html, body {height: 100%;}
button {
  background-color: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
}
:root {
  --col: #{$col};
  --row: #{$row};
  --items: 0;
  --timeout: 2000;
}
.js-container {
  display: grid;
  grid-template-columns: repeat(var(--col), minmax(calc(100% / var(--col)), 1fr));
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  .item {
    z-index: 4;
    transform: scale(0);
    opacity: 0;
  }
}
.viewport {
  position: relative;
  width: 100%;
  height: 550px;
  max-height: 100vh;
  .slide {
    width: inherit;
    height: inherit;
    max-height: inherit;
    position: absolute;
    opacity: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    &--active {
      opacity: 1;
    }
  }
}

.nav {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__control {
    display: flex;
    opacity: 0;
    transition: opacity .3s ease;
  }
  &:hover {
    .nav__control {
      background-color: #242424;
      opacity: 1;
      transition: opacity .9s ease, background-color 2s ease;
    }
  }
}

.thumbs {
  display: flex;
  justify-content: center;
  margin: 10px 5px;
  .thumb {
    margin: 0 5px;
  }
}

.options {
  display: flex;
  justify-content: center;
  margin: 15px 15px 20px;
  > * {
    height: 28px;
    border: 1px solid #6f6f6f;
    margin: 1px 5px;
  }
}

.js-animating {
  .thumbs {
    cursor: wait;
  }
  .js-thumb {
    pointer-events: none;
  }
  [class^="js-"] {
    pointer-events: none;
  }
  .item {
    animation-name: particles;
    animation-timing-function: ease-in-out;
  }
}

.thumb {
  cursor: pointer;
  width: 100px;
  max-width: calc(20% - 10px);
  box-shadow: 0 0 7px #000;
  &:hover {
    box-shadow: 0 0 2px #000;
  }
  &--active {
    pointer-events: none;
    box-shadow: 0 0 2px #000;
  }
}

.fade-in {
  animation: fadeIn calc(var(--timeout) * 1ms) ease-in-out 0s forwards;
}
.fade-out {
  animation: fadeOut calc(var(--timeout) * 1ms) ease-in-out 0s forwards;
}


@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes particles {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  30% {
    opacity: 1;
    background-color: $base-color;
    transform: scale(.95);
  }
  70% {
    transform: scale(.7);
    opacity: .4;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
```

<a href="https://github.com/ivanalbizu/slides-blend-mode" target="_blank" rel="noopener">Código en mi GitHub</a>