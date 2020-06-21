---
title: Comparación de imágenes con clip-path y javascript
published: true
description: Superposición de imágenes una sobre otra en la que en función de la posición del cursor será mostrada diferentes porciones de las imágenes
tags: javascript,css
ctime: Sun, 15 Mar 2020 12:30:00 +0000
cover_image: comparacion-de-imagenes-con-clip-path-y-javascript.jpg
alt_image: Comparación de imágenes con clip-path y javascript
---

En una publicación anterior realicé <a href="/blog/superposicion-de-imagenes-para-comparar-con-javascript">superposición de imágenes para comparar diferentes imágenes</a> en la que se podía elegir dos imágenes dadas para compararlas

En esta ocasión he realizado lo mismo pero con muchísimo menos código y para mi gusto más customizable. Para ello he usado la propiedad CSS <code>clip-path</code>. Aunque <strong>si se quisiera usar habría que ajustar con algún <code>polyfill</code> o alguna otra alternativa para navegador Edge</strong>

<a href="/experimentos/clip-path-images-compare/" title="Enlace para ver Comparación de imágenes con clip-path y javascript">Puede verse en este enlace externo</a> o en este Pen

<iframe height="1200" style="width: 100%;" scrolling="no" title="clip-path images compare" src="https://codepen.io/ivan_albizu/embed/wvajBXE?height=300&theme-id=2608&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ivan_albizu/pen/wvajBXE'>clip-path images compare</a> by Iván Albizu
  (<a href='https://codepen.io/ivan_albizu'>@ivan_albizu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Código HTML para la superposición y comparación de imágenes

Consiste en un contenedor con imágenes dentro añadidas como <code>background</code>, cada una de ellas superpuestas sobre la anterior

```html
<div class="container js-comparator">
  <div class="bg bg--2-left" style="background-image: url(img/ws06-gray_main.jpg);"></div>
  <div class="bg bg--2-right" style="background-image: url(img/ws06-purple_main.jpg);"></div>
</div>
```

## Código CSS para la superposición y comparación de imágenes

Consiste en superponer las diferentes imágenes una encima de otra y en detectar las coordenadas relativas X e Y del cursor dentro del contenedor de las imágenes. Los valores X e Y actualiza el valor de variables CSS en el evento <code>mousemove</code>. (Esto puede ser mejorado para hacerlo "touch friendly")

La superposición de imágenes lo hago usando <code>display grid</code> y cada una de las imágenes usando el mismo <code>grid-area</code>

La parte interesante aquí es la definición de <code>clip-path</code> de cada contenedor de imagen mediante polígono de puntos. Los <strong>puntos "extremos" son referencias fijas y algunos puntos internos mediante posición variable con variables de CSS y actualizados mediante javascript</strong> con el evento <code>mousemove</code>

Pongo el código del primer ejemplo, el resto sería jugar con diferentes puntos y con mayor cantidad de imágenes

```css
body {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  background-color: #f1f1f1;
}
.container {
  width: 480px;
  max-width: 96%;
  margin: 10px auto 40px;
  filter: drop-shadow(0px 0px 3px #ccc);
  cursor: pointer;
  display: grid;
  grid-template-areas: "img";
  &.active {
    cursor: move;
  }
}
.js-comparator {
  &--2 {
    --x: 50%;
  }
  //resto css
}
.bg {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: inherit;
  max-width: inherit;
  grid-area: img;
  padding-top: 110%;
  margin: auto;
  &--small {
    padding-top: 90%;
  }

  &--2-left {
    clip-path: polygon(0 0, var(--x) 0, var(--x) 100%, 0 100%);
  }
  &--2-right {
    clip-path: polygon(var(--x) 0, 100% 0, 100% 100%, var(--x) 100%);
  }
  //resto css
}
```

## Código JAVASCRIPT para la superposición y comparación de imágenes

### Actualización de variables CSS

El método <code>const coord = () => {}</code> detecta la posición del "ratón" y actualiza las variables CSS <code>--x</code> e <code>--y</code> con el valor relativo a su contenedor

```javascript
const coord = () => {
  const viewportX = event.clientX;
  const viewportY = event.clientY;

  const boxRectangle = event.target.getBoundingClientRect();
  const localX = viewportX - boxRectangle.left;
  const localY = viewportY - boxRectangle.top;

  const container = event.target.closest('.js-comparator');
  container.style.setProperty('--x', `${localX}px`);
  container.style.setProperty('--y', `${localY}px`);
}
```

### Manejador del comparador

El método <code>const handleComparator = () => {}</code> registra o elimina el <code>listener</code> del <code>evento mousemove</code> del ratón sobre cada uno de los "comparadores"

```javascript
const handleComparator = () => {
  const container = event.target.closest('.js-comparator');
  if (!container.classList.contains('active')) {
    container.classList.add('active')
    container.addEventListener('mousemove', coord, false);
  } else {
    container.classList.remove('active')
    container.removeEventListener('mousemove', coord, false);
  }
}
```

### Activar el comparador

Se selecionan todos los nodos del DOM con clase <code>js-comparator</code> y a cada uno de ellos se registra el <code>listener</code> del <code>evento click</code> del ratón para activar el manejador del comparador

```javascript
document.addEventListener('DOMContentLoaded', () => {

  const boxes = document.querySelectorAll('.js-comparator');
  boxes.forEach(box => box.addEventListener('click', handleComparator, false) );

});
```

Puede verse todo el código en mi Git

<a href="https://github.com/ivanalbizu/clip-path-images-compare" target="_blank" rel="noopener">Código en mi GitHub</a>