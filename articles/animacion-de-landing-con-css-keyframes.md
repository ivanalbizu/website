---
title: Animación de Landing con CSS keyframes
published: true
description: Animación de Landing con CSS keyframes y controlada la aparicicón con javascript mediante la API Intersection Observer
tags: javascript,html,css
ctime: Sun, 27 Dec 2020 19:00:00 +0000
cover_image: landing-keyframes-animations.PNG
alt_image: Animación de Landing con CSS keyframes
---

He estado haciendo una landing para seguir mejorando la maquetación con <code>display grid</code>. El diseño consta de un menú de navegación y tres componentes que no son muy cuadriculados, con imágenes y textos no siempre centrados y si trasladados.

Que puedes ver en este <a href="https://codepen.io/ivan_albizu/full/bGwoKWg" target="_blank" rel="noopener">https://codepen.io/ivan_albizu/full/bGwoKWg</a>

<iframe height="800" style="width: 100%;" scrolling="no" title="Landing CSS animations" src="https://codepen.io/ivan_albizu/embed/bGwoKWg?height=619&theme-id=2608&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ivan_albizu/pen/bGwoKWg'>Landing CSS animations</a> by Iván Albizu
  (<a href='https://codepen.io/ivan_albizu'>@ivan_albizu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

<ol class="list-bullets">
  <li>Para el primer componente he usado display grid para su versión desktop y flexbox para su versión Mobile</li>
  <li>El segundo componente está todo usando display grid, con ajustes para Mobile y Desktop</li>
  <li>El tercer componente está realizado por completo con flexbox. Conforme lo estaba haciendo, me fue más interesante resolverlo con flexbox por el tema de los colores de fondo a ancho completo y con saltos de colores en vertical</li>
</ol>

En esta entrada hablaré del html, css y js sobre cada uno de los tres componentes, y sobre la animación de las letras del logo

## 1. Primer componente púrpura

### 1.1. Html del componente púrpura

Todo el componente es envuelto mediante un <code>&lt;div class="wrapper-purple"&gt;</code> para aplicarle color de fondo a ancho completo de pantalla

El bloque púrpura está compuesto de 3 elementos

<ul class="list-bullets">
  <li><code>purple__bg</code> color de fondo parcialmente debajo de la imagen</li>
  <li><code>purple__img</code> imagen del componente</li>
  <li><code>purple__txt</code> contenido del componente</li>
</ul>

```html
<div class="wrapper-purple">
  <section class="purple">
    <div class="purple__bg" data-animate="purple__bg"></div>
    <figure class="purple__img shadow" data-animate="purple__img">
      <img src="./src/img/purple__img.png" alt="">
    </figure>
    <article class="purple__txt" data-animate="purple__txt">
      <h1 class="purple-title">Lorem ipsum dolor sit.</h1>
      <p class="purple-subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempore corporis optio vitae nihil amet repellendus asperiores ipsam doloribus possimus.</p>
      <form>
        <div class="btn-subscribe">
          <label class="label" data-animate="label">
            <input type="text" class="text" placeholder="Your email">
            <span class="placeholder">Your email</span>
          </label>
          <button type="submit" class="submit" data-animate="submit">subscribe</button>
        </div>
      </form>
    </article>
  </section>
</div>
```

### 1.2. Css Desktop del componente púrpura

He aplicado <code>linear-gradient(to bottom, var(--color-purple) 88%, var(--color-gray) 88%)</code> al wrapper para que la parte inferior tenga el mismo color gris del componente siquiente, y con el mismo porcentaje para que no existe transición entre ambos colores, la ruptura de color se produce al 88% de la altura, que viene a ser entorno a 90px

Al componente le aplicamos ancho a 100% con máximo de ancho 86.252em que ya está incrementado en 2em para aplicarlo como padding lateral para obtener separación en responsive. El componente purple como dije al principio, en desktop será con display grid dividido en 15 fracciones

#### 1.2.1. Background bajo la imagen

Debajo de la imagen se coloca un rectángulo de púrpura claro <code>purple__bg</code> que se inicia en la primer columna y termina en la mitad (8) <code>grid-area: 2 / 1 / 10 / 8</code>. Ocupa todo el alto del componente, pero se usa <code>clip-path</code> para mostrar sólo una porción inferior y también para poder hacer la animación

#### 1.2.2. Imagen

Ubicada una columna más tarde que el background del componente y termina una columna antes <code>grid-area: 2 / 2 / 8 / 7</code>. Le he aplicado un borde transpatente en la cara inferior. La imagen en algunos tamaños de pantalla no será totalmente visible en sus laterales mediante <code>object-fit: cover</code> y centrada con <code>object-pisition: center</code>

#### 1.2.3. Textos

Se columna desde la mitada del contenedor hasta el final <code>grid-area: 3 / 9 / 5 / 16</code> y arranca una fila más tarde que los otros dos contenidos. Todo el contenido interno es maquetado con flexbox y con dirección columna

```css
.wrapper-purple {
  background: var(--color-purple);
  background: linear-gradient(to bottom, var(--color-purple) 88%, var(--color-gray) 88%);
}
.purple {
  width: 100%;
  max-width: var(--width-content);
  padding: var(--grid) 1em 0;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-gap: 0;
  &__bg {
    grid-area: 2 / 1 / 10 / 8;
    background-color: var(--color-purple-light);
    clip-path: polygon(0 59%, 100% 59%, 100% 100%, 0% 100%);
  }
  &__img {
    grid-area: 2 / 2 / 8 / 7;
    justify-content: center;
    overflow: hidden;
    height: 586px;
    img {
      height: 100%;
      max-height: 750px;
      object-fit: cover;
      object-position: center;
      border-bottom: var(--grid) solid transparent;
      z-index: 1;
    }
  }
  &__txt { 
    grid-area: 3 / 9 / 5 / 16;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
  }
}
```

### 1.3. Css Responsive del componente púrpura

Para Tablet cambio el <code>display grid</code> por <code>display flexbox</code> y reduciendo un poco las separaciones entre elementos. También, cambiamos la forma de posicionar la porción de color de fondo ubicado bajo la imagen, para ello hago todo el contenedor <code>relative</code> y el contenedor que contiene el background lo fijo como <code>absolute</code>

Para Mobile la imagen ocupara el 100% de su contenedor padre

```css
@media (max-width: $breakpoint-desktop) {
  .purple {
    display: flex;
    flex-wrap: wrap;
    background: var(--color-purple);
    padding-top: 2em;
    padding-bottom: 2.5em;
    position: relative;
    &__bg {
      width: calc(100% - 2em);
      height: 55%;
      position: absolute;
      top: 0;
    }
    &__img {
      img {
        width: 80%;
        margin-right: auto;
        height: auto;
        border-bottom-width: 20px;
      }
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .purple {
    &__img {
      img {
        width: 100%;
      }
    }
  }
}
```

### 1.4. Animaciones del componente púrpura

Las animaciones son realizadas mediante <code>CSS @keyframes</code>. Las definiciones de CSS las he querido mantener aisladas de su maquetación, para poder modificarlas o mantenerlas de manera más independiente, sobreescribiendo aquellos atributos que sean necesarios y creando nuevas reglas

#### 1.4.1. Javascript usado para las animaciones

Mediante <code>javascript</code> detecto aquellas etiquetas HTML que tengan el atributo <code>[data-animate]</code> y con la <code>API Intersection Observer</code> les añado el valor de dicho atributo como clase CSS (con prefijo: <i>animate-</i>) cuando el elemento entre el 20% dentro del viewport.

Algo importante es que he creado dos reglas CSS para que el elemento que se anime inicialmente no sea visible. Si el elemento contiene el atributo <code>[data-animate]</code> dicho elemento tendrá opacidad 0 y una vez que se le añada la clase (todas tienen el prefijo "animate-") mediante javascript ya será visible y se iniciará la animación que proceda en cada caso

```css
[data-animate] {
  opacity: 0;
  &[class*='animate-'] {
    opacity: 1;
  }
}
```

Las animaciones sólo se producirán una vez, ya que cuando entre la primera vez aplico el <code>unobserve</code>

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const dataAnimates = document.querySelectorAll("[data-animate]")
  const ioAnimate = new IntersectionObserver(ioHandlerAnimate, ioConfigAnimate);

  [].forEach.call(dataAnimates, dataAnimate => ioAnimate.observe(dataAnimate))
})

const ioHandlerAnimate = (entries, self) => {
  for (let entry of entries) {
    const target = entry.target
    if (entry.intersectionRatio > .2) {
      target.classList.add(`animate-${target.getAttribute("data-animate")}`)
      self.unobserve(target);
    }
  }
}

const ioConfigAnimate = {
  threshold: .2
}
```

#### 1.4.2. @keyframes para animación de background

La propiedad que he animado ha sido <code>clip-path</code>. Inicialmente la pongo ocupando todo el espacio <code>clip-path: polygon(0 0%, 100% 0%, 100% 0%, 0% 0%)</code> y finalmente será visible parcialmente <code>clip-path: polygon(0 59%, 100% 59%, 100% 100%, 0% 100%)</code>. La animación dura 1,5s y se inicia con retraso de 2s para que esté más avanzada la animación del menú. En Mobile modifico el delay a 0.2s ya que no tiene sentido encolar la animación tanto tiempo

```css
.animate-purple__bg {
  clip-path: polygon(0 0%, 100% 0%, 100% 0%, 0% 0%);
  animation: purple__bg 1.5s ease-in-out 2s forwards;
  @media (max-width: $breakpoint-desktop) {
    animation-delay: .2s;
  }
}
@keyframes purple__bg {
  0% { clip-path: polygon(0 0%, 100% 0%, 100% 0%, 0% 0%); }
  100% { clip-path: polygon(0 59%, 100% 59%, 100% 100%, 0% 100%); }
}
```

#### 1.4.3. @keyframes para animación de imagen

Muy parecida a la animación anterior, pero con más pasos. He creado pseudo-selector <code>::after</code> sobre la etiqueta <code>&lt;figure&gt;</code> colocándola sobre la imagen para acompasar más con la animación del background. Inicialmente <code>clip-path: polygon(0 0%, 100% 0%, 100% 0%, 0% 0%)</code> la imagen va mostrando la misma porción que el background, cuando el background termine <code>clip-path: polygon(0 59%, 100% 59%, 100% 100%, 0% 100%)</code> se empieza a mostrar el resto de la imagen por su cara superior <code>clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)</code>

Los cálculos de duración y delays son importantes ya que quería que fueran en paralelo. Para el responsive le aplico el mismo delay que para el background

```css
.animate-purple__img {
  position: relative;
  clip-path: polygon(0 0%, 100% 0%, 100% 0%, 0% 0%);
  animation: purple__img 3s ease-in-out 2s forwards;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 90px;
    width: 100%;
    height: calc(100% - 90px);
  }
  @media (max-width: $breakpoint-desktop) {
    animation-delay: .2s;
  }
}
@keyframes purple__img {
  0% { clip-path: polygon(0 0%, 100% 0%, 100% 0%, 0% 0%); }
  50% { clip-path: polygon(0 59%, 100% 59%, 100% 100%, 0% 100%); }
  100% { clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0% 100%); }
}
```

#### 1.4.4. @keyframes para animación de caja de texto

La aparición de título, textos y botones lo muestro paulatinamente haciendo decrecer un círculo mediante <code>clip-path</code>. Para ello, vuelvo a usar el pseudo-selector <code>::after</code> para colocarlo sobre todo el contenido. La animación se inicia después de un segundo en Desktop y 0.2s para Mobile

```css
.animate-purple__txt {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    background-color: var(--color-purple);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    animation: purple__txt 1s linear 1s forwards;
    @media (max-width: $breakpoint-desktop) {
      animation-delay: .2s;
    }
  }
}
@keyframes purple__txt {
  0% { clip-path: circle(140.9% at 100% 100%); }
  100% { clip-path: circle(0.0% at 100% 100%); }
}
```

#### 1.4.5. @keyframes para animación de label y submit

De nuevo, la animación la realizo modificando <code>clip-path</code>. En un primer momento el <code>&lt;label&gt;</code> no es visible ya que está colocado encima <code>clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%)</code> el pseudo-selector <code>::after</code>, después de 2s se inicia la animación, que es el tiempo necesario para que finalice la animación y termina por no ocupar espacio el pseudo-selector <code>clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)</code>

```css
.animate-label {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    background-color: var(--color-purple);
    left: 0;
    top: 0;
    right: 0;
    bottom: -1px;
    animation: label 1s linear 2s forwards;
    @media (max-width: $breakpoint-desktop) {
      animation-delay: 1.2s;
    }
  }
}
@keyframes label {
  0% {
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
    background-color: #fff;
  }
  100% {
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
  }
}
.animate-submit {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    background-color: var(--color-purple);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    animation: submit .5s linear 2.5s forwards;
    @media (max-width: $breakpoint-desktop) {
      animation-delay: 1.2s;
    }
  }
}
@keyframes submit {
  0% { clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%); }
  100% { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%); }
}
```

## 2. Segundo componente verde

### 2.1. Html del componente verde

Todo el componente es envuelto mediante un <code>&lt;div class="wrapper-green"&gt;</code> para aplicarle color de fondo a ancho completo de pantalla

El bloque verde está compuesto de 4 elementos

<ul class="list-bullets">
  <li><code>green__txt</code> contenido del componente</li>
  <li><code>green__bg</code> color de fondo debajo de las dos imágenes</li>
  <li><code>green__img-left / green__img-right</code> dos imágenes del componente</li>
</ul>

```html
<div class="wrapper-green" data-content-visibility="false" style="--intrinsic-size:1px 700px;">
  <section class="green">
    <article class="green__txt" data-animate="green__txt">
      <h2 class="green-title">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
      <p class="green-subtitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias, alias.</p>
      <form>
        <button type="button" class="btn-register">register</button>
      </form>
    </article>
    <div class="green__bg" data-animate="green__bg"></div>
    <figure class="green__img-left shadow" data-animate="green__img-left">
      <img src="./src/img/green__img-01.jpg" alt="">
    </figure>
    <figure class="green__img-right shadow" data-animate="green__img-right">
      <img src="./src/img/green__img-02.jpg" alt="">
    </figure>
  </section>
</div>
```

### 2.2. Css Desktop del componente verde

#### 2.2.1. Textos

El contenedor de textos está ubicada en la zona izquierda y desplazado una columna a la derecha <code>grid-area: 3 / 2 / 9 / 7</code>.

#### 2.2.2. Background bajo la imágenes

A la derecha se coloca una capa con color verde <code>grid-area: 1 / 7 / 10 / 15</code>

#### 2.2.3. Imágenes

Sobre la capa con color de fondo verde se colocan encima las dos imágenes <code>grid-area: 3 / 8 / 12 / 12</code> y <code>grid-area: 3 / 12 / 9 / 16</code>

```css
.wrapper-green {
  background-color: var(--color-gray);
}
.green {
  width: 100%;
  max-width: var(--width-content);
  padding: var(--grid) 1em;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(11, 1fr);
  grid-gap: 0;
  &__txt {
    grid-area: 3 / 2 / 9 / 7;
    padding-right: 1em;
  }
  &__bg {
    grid-area: 1 / 7 / 10 / 15;
    background-color: var(--color-green-light);
  }
  &__img-left {
    grid-area: 3 / 8 / 12 / 12;
    justify-content: flex-start;
    align-self: flex-start;
    img {
      width: 96%;
    }
  }
  &__img-right {
    grid-area: 3 / 12 / 9 / 16;
    justify-content: flex-end;
    align-self: center;
    img {
      width: 94%;
    }
  }
}
```

### 2.3. Css Responsive del componente verde

Para este componente el sistema de rejillas seguirá siendo con <code>display grid</code>, cambiando la cantidad de columnas <code>grid-template-columns: repeat(2, 5px) repeat(2, 1fr) repeat(2, 5px)</code> y filas <code>grid-template-rows: 0 auto 10px auto 10px 0</code> añadiendo separación de 1em entre columnas y filas <code>grid-gap: 1em</code>. Se puede observar que he añadido más columnas y filas que las realmente necesarias por la cantidad de elementos, pero usadas para dar separaciones entre elementos

Los elementos textos ocupará todo su ancho <code>grid-area: 2 / 1 / 3 / 7</code>. La capa con color de fondo está ubicada de manera <code>grid-area: 3 / 2 / 6 / 5</code> que ambas imágenes <code>grid-area: 4 / 1 / 5 / 4</code> y <code>grid-area: 4 / 4 / 5 / 7</code> queden encima de ellas y con un poco de separación a bordes de pantalla

```css
@media (max-width: $breakpoint-desktop) {
  .green {
    grid-template-columns: repeat(2, 5px) repeat(2, 1fr) repeat(2, 5px);
    grid-template-rows: 0 auto 10px auto 10px 0;
    grid-gap: 1em;
    padding-top: 2em;
    padding-bottom: 2em;
    &__txt {
      grid-area: 2 / 1 / 3 / 7;
      padding: 0 0 2em;
    }
    &__bg {
      grid-area: 3 / 2 / 6 / 5;
    }
    &__img-left {
      grid-area: 4 / 1 / 5 / 4;
    }
    &__img-right {
      grid-area: 4 / 4 / 5 / 7;
    }
    &__img-left,
    &__img-right {
      img {
        width: auto;
        max-width: 100%;
      }
    }
  }
}
```

### 2.4. Animaciones del componente verde

El tratamiento con javascript es el mismo que he comentado en el punto 1.4. Resumiendo: la animación se inicia cuando el elemento entre el 20% dentro del viewport y dicha animación sólo se producirá una vez

#### 2.4.1. @keyframes para animación de caja de texto

La animación es igual que para los textos del componente púrpura: mediante <code>clip-path</code> se reduce el tamaño de un círculo dejando ver paulatinamente el contenido del texto

```css
.animate-green__txt {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    background-color: var(--color-gray);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    animation: green__txt 1s linear .5s forwards;
    @media (max-width: $breakpoint-desktop) {
      animation-delay: .2s;
    }
  }
}
@keyframes green__txt {
  0% { clip-path: circle(70.7% at 50% 50%); }
  100% { clip-path: circle(0% at 50% 50%); }
}
```

#### 2.4.2. @keyframes para animación de background

También se trata de modificar el <code>clip-path</code>. Se trata de ir aumentando el <code>polygon</code> en horizontal

```css
.animate-green__bg {
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  animation: green__bg 1.5s cubic-bezier(0.51, 0.26, 0.82, 0.53) .3s forwards;
}
@keyframes green__bg {
  0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
  100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
}
```

#### 2.4.3. @keyframes para animación de las imágenes

Inicialmente fijo la opacidad a 0, ya que quiero que se produzca la animación desde opacidad 0 a opacidad 1, además de movimientos de translación

La primer de las imágenes estará desplazada 90px en vertical para finalmente quedarse en su posición normal. La segunda imagen, su movimiento será en horizontal, desde -120px a su posición natural

```css
.green__img-left,
.green__img-right {
  img {
    visibility: visible;
    opacity: 0;
  }
}
.animate-green__img-left {
  transform: translateY(-90px);
  visibility: hidden;
  animation: green__img-left 1s ease 2s forwards;
  img {
    opacity: 1;
    transition: opacity 1s linear 2s;
  }
}
@keyframes green__img-left {
  0% {
    transform: translateY(-90px);
    visibility: visible;
  }
  100% {
    transform: translateY(0);
    visibility: visible;
  }
}
.animate-green__img-right {
  transform: translateX(-120px);
  visibility: hidden;
  animation: green__img-right 1s ease 2.3s forwards;
  img {
    opacity: 1;
    transition: opacity 1s linear 2.3s;
  }
}
@keyframes green__img-right {
  0% {
    transform: translateX(-120px);
    visibility: visible;
  }
  100% {
    transform: translateX(0);
    visibility: visible;
  }
}
```

## 3. Tercer componente azul

### 3.1. Html del componente púrpuazulra

Este componente lo he maquetado por completo con <code>flexbox</code>

Visualmente, no están muy diferenciados los diferenentes elementos del componente. He optado por hacer 3 disivisiones

<ul class="list-bullets">
  <li><code>blue__header</code> título del componente</li>
  <li><code>wrapper-blue--top</code> contenedor para textos, contador e imagen de calabaza</li>
  <li><code>wrapper-blue--bottom</code> contenedor para la lista y para la imagen de sipderman</li>
</ul>

La segunda y tercera división están divididas a su vez en dos partes para pintar contenidos a izquierda y a derecha

```html
<div class="blue">
  <header class="blue__header">
    <h3 class="blue-title">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, repellendus.</h3>
  </header>
  <div class="wrapper-blue wrapper-blue--top">
    <div class="blue__content">
      <div class="blue__content-left">
        <p class="blue-subtitle">Lorem ipsum dolor sit amet consectetur.</p>
        <div class="counter">
          <div class="counter__minute"><span></span></div>
          <div class="counter__separator">:</div>
          <div class="counter__second"><span></span></div>
        </div>
      </div>
      <div class="blue__content-right">
        <figure class="blue__img-top" data-animate="blue__img-top">
          <img src="./src/img/linternas.jpg" alt="">
        </figure>
      </div>
    </div>
  </div>
  <div class="wrapper-blue wrapper-blue--bottom">
    <div class="blue__content">
      <div class="blue__content-left">
        <ul class="list" data-animate="list">
          <li class="list-item">
            <span class="list__title">First item Lorem ipsum dolor sit.</span>
            <span class="list__subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem blanditiis necessitatibus earum.</span>
          </li>
          <li class="list-item">
            <span class="list__title">Second item Lorem ipsum dolor sit more than one.</span>
            <span class="list__subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem blanditiis necessitatibus earum.</span>
          </li>
          <li class="list-item">
            <span class="list__title">Third item Lorem ipsum dolor.</span>
            <span class="list__subtitle">Lorem ipsum dolor sit amet. Rem blanditiis necessitatibus earum.</span>
          </li>
        </ul>
      </div>
      <div class="blue__content-right">
        <figure class="blue__img-bottom shadow-light">
          <img src="./src/img/spider.png" data-animate="filter" alt="">
        </figure>
      </div>
    </div>
  </div>
</div>
```

### 3.2. Css Desktop del componente púrpura

La más complicado de este componente ha sido la generación de los colores de fondo de todo el componente

Ambos colores, azul y mostaza, están a ancho completo de pantalla y terminan en la mitad de la pantalla. El color mostaza está cubriendo parcialmente el fondo de la imagen de calabaza. Para ambos componentes hago uso del pseudo-selector <code>::after</code>

### 3.2.1. Css Desktop contador + imagen calabaza

Para este elemento, contador e imagen de la calabaza, he usado linear-gradient de derecha a izquierda <code>background: linear-gradient(to right, #fff calc(50% + 1px), var(--color-mustard) calc(50% + 1px))</code> para cambiar de color azul a mostaza justo en la mitad de la pantalla. Con esto consigo dos rectángulos iguales: azul + mostaza. La parte derecha de color mostaza no es toda del mismo color, por lo que he vuelto a aplicar linear-gradient, pero hacia abajo con colores blanco y mostaza <code>background: linear-gradient(to bottom, #fff 50%, var(--color-mustard) 50%)</code>, todo esto aplicado sobre el pseudo-selector <code>::after</code>

Los contenidos de estos elementos están envueltos dentro de un <code>&lt;div&gt;</code> que está centrado, por tanto está contenido centrado con colores de fondo a ancho completo

```css
.wrapper-blue {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  &--top {
    background: linear-gradient(to right, #fff calc(50% + 1px), var(--color-mustard) calc(50% + 1px));
    &::after {
      background: linear-gradient(to bottom, #fff 50%, var(--color-mustard) 50%);
    }
  }
}
```

### 3.2.2. Css Desktop lista + imagen spiderman

Es más sencillo que el caso anterior, ya que sólo hay dos colores que cambian a la mitad de pantalla.

He aplicado color de fondo azul para todo el elemento, y con pseudo-selector <code>::after</code> aplico color de fondo mostaza mediante <code>left: 50%; right: 0</code>, teniendo en cuenta que su elemento padre tiene <code>position: relative</code>

```css
.wrapper-blue {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  &--bottom {
    background-color: var(--color-blue);
    &::after {
      background-color: var(--color-mustard);
    }
  }
}
```

### 3.3. Css Responsive del componente azul

La adaptación a Responsive se ha basado en modificar punto de pantalla (<code>left: 36%</code> para que concide con la parte más alta de la imagen spiderman) en la que se produce el cambio de color de azul a mostaza, anchos y separaciones entre elementos y a bordes de pantalla

```css
@media (max-width: $breakpoint-tablet) {
  .wrapper-blue {
    position: relative;
    &--top {
      &::after {
        left: 0;
      }
      .blue {
        &__content {
          &-right {
            padding-bottom: 1em;
          }
        }
      }
    }
    &--bottom {
      &::after {
        left: 36%;
      }
    }
  }
  .blue {
    &__content {
      &-left,
      &-right {
        width: 100%;
      }
      &-left {
        padding-right: 0;
      }
      &-right {
        img {
          padding-left: 0;
        }
      }
    }
    &__img-bottom {
      padding-top: 0;
      margin-top: -2.5em;
    }
  }
  .list {
    background-color: var(--color-blue);
    padding: 4em 2em 4em 0;
  }
}
```

## 3.4. Animaciones del componente azul

El tratamiento con javascript es el mismo que he comentado en el punto 1.4. Resumiendo: la animación se inicia cuando el elemento entre el 20% dentro del viewport y dicha animación sólo se producirá una vez

### 3.4.1. @keyframes para animación del contador atrás

Se ha realizado por completo con CSS. En principio, tal cual está, le faltaría lógica, ya que se necesita conocer el tiempo que se desea descontar. Para esto sería necesario quizá algo de javascript

El contador hacía atrás aplica a minutos y segundo </code>mm : ss</code>. Por tanto, para las unidades se necesita representar de 0 a 9 y para las decenas se necesita representar de 0 a 6. Los números son colocados como <code>content: counter(second-unit)</code> actualizando el valor de content. Sin animación de transición "como un escalón" sin existir puntos intermedios entre estado inicial y final <code>animation-timing-function: step-end</code>. Los @keyframes se repiten infinitamente

En el caso de contador de 0 a 9 se divide en 10 fracciones, y a cada paso se le resta una unidad. Cuando llega a 0 se restablecer el contador CSS <code>100% { counter-reset: second-unit 0 }</code>

El caso de 0 a 6 se divide en 6 porciones

```css
.counter {
  font-size: 3em;
  font-family: 'Open Sans Condensed';
  display: flex;
  justify-content: center;
  &__minute,
  &__second {
    width: 2ch;
    background-color: var(--color-blue);
    padding: .2em .4em;
    color: #fff;
    border-bottom: calc(var(--counter-legend-size) * 1px) solid rgba(255,255,255,1);
    box-sizing: content-box;
    position: relative;
    &::after {
      position: absolute;
      bottom: calc(var(--counter-legend-size) * -1px);
      left: 0;
      right: 0;
      color: var(--color-blue);
      font-size: calc(var(--counter-legend-size) * 1px);
      height: calc(var(--counter-legend-size) * 1px);
      line-height: 1;
      text-align: center;
    }
    span::before,
    span::after {
      text-shadow: 1px 1px 1px rgba(0,0,0,.8);
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-timing-function: step-end;
    }
  }
  &__minute {
    &::after {
      content: "min";
    }
  }
  &__second {
    &::after {
      content: "sec";
    }
  }
  &__separator {
    width: 1ch;
    color: var(--color-blue);
    padding: .2em 0;
    text-align: center;
  }
}

.counter__second span {
  &::before {
    counter-reset: second-unit-of-tens 5;
    content: counter(second-unit-of-tens);
    animation-duration: 60s;
    animation-name: counter-second-unit-of-tens;
  }
  &::after {
    counter-reset: second-unit 9;
    content: counter(second-unit);
    animation-duration: 10s;
    animation-name: counter-second-unit;
  }
}
@keyframes counter-second-unit {
  10%  { counter-increment: second-unit -1; }
  20%  { counter-increment: second-unit -2; }
  30%  { counter-increment: second-unit -3; }
  40%  { counter-increment: second-unit -4; }
  50%  { counter-increment: second-unit -5; }
  60%  { counter-increment: second-unit -6; }
  70%  { counter-increment: second-unit -7; }
  80%  { counter-increment: second-unit -8; }
  90%  { counter-increment: second-unit -9; }
  100% { counter-reset: second-unit 0; }
}
@keyframes counter-second-unit-of-tens {
  16.67% { counter-increment: second-unit-of-tens -1; }
  33.33% { counter-increment: second-unit-of-tens -2; }
  50.00% { counter-increment: second-unit-of-tens -3; }
  66.67% { counter-increment: second-unit-of-tens -4; }
  83.33% { counter-increment: second-unit-of-tens -5; }
  100%   { counter-reset: second-unit-of-tens 0; }
}

.counter__minute span {
  &::before {
    counter-reset: minute-unit-of-tens 5;
    content: counter(minute-unit-of-tens);
    animation-duration: 3600s;
    animation-name: counter-minute-unit-of-tens;
  }
  &::after {
    counter-reset: minute-unit 9;
    content: counter(minute-unit);
    animation-duration: 600s;
    animation-name: counter-minute-unit;
  }
}
@keyframes counter-minute-unit {
  10%  { counter-increment: minute-unit -1; }
  20%  { counter-increment: minute-unit -2; }
  30%  { counter-increment: minute-unit -3; }
  40%  { counter-increment: minute-unit -4; }
  50%  { counter-increment: minute-unit -5; }
  60%  { counter-increment: minute-unit -6; }
  70%  { counter-increment: minute-unit -7; }
  80%  { counter-increment: minute-unit -8; }
  90%  { counter-increment: minute-unit -9; }
  100% { counter-reset: minute-unit 0; }
}
@keyframes counter-minute-unit-of-tens {
  16.67% { counter-increment: minute-unit-of-tens -1; }
  33.33% { counter-increment: minute-unit-of-tens -2; }
  50.00% { counter-increment: minute-unit-of-tens -3; }
  66.67% { counter-increment: minute-unit-of-tens -4; }
  83.33% { counter-increment: minute-unit-of-tens -5; }
  100%   { counter-reset: minute-unit-of-tens 0; }
}
```

### 3.4.2. @keyframes para animación de la imagen calabaza

Es similar a otras animaciones anteriores. Se trata de un <code>clip-path</code> circular que empieza visible (tapando la imagen) y termina por desaparecer al ser su radio 0

También se aplica otra animación. Una vez mostrada toda la imagen, se muestra una sombra a toda la imagen <code>filter: drop-shadow(0px 0px 8px rgba(0,0,0,.4))</code>

```css
.animate-blue__img-top {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    background: linear-gradient(to bottom, #fff 50%, var(--color-mustard) 50%);
    left: 2em;
    top: 0;
    right: 0;
    bottom: 0;
    animation: blue__img-top 1s linear .5s forwards;
  }
  filter: drop-shadow(0px 0px 8px rgba(0,0,0,.4));
  transition: filter .3s linear 1.5s;
  @media (max-width: $breakpoint-tablet) {
    &::after {
      left: 0;
    }
  }
}
@keyframes blue__img-top {
  0% { clip-path: circle(70.7% at 50% 50%); }
  100% { clip-path: circle(0% at 50% 50%); }
}
```

### 3.4.3. @keyframes para animación de lista desordenada

He usado dos animaciones para la lista desordenada que están en algún tiempo solapadas.

Aparición desde invisible hasta visible

Y animación de movimiento lateral inicialmente desplazado 2em hacía derecha para moverse hasta su posición natural

```css
.list {
  .list-item {
    transform: translateX(2em);
    opacity: 0;
  }
}
.animate-list {
  .list-item {
    transform: translateX(2em);
    animation: list .5s ease .1s forwards;
    &:nth-child(2) {
      animation-delay: .6s;
    }
    &:nth-child(3) {
      animation-delay: 1.2s;
    }
  }
}
@keyframes list {
  0% {
    transform: translateX(2em);
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### 3.4.3. @keyframes para animación de imagen spiderman

Existe una primera animación que afecta a como se empieza a visualizar la imagen. Inicialmente difuminada 30px <code>filter: blur(30px)</code>

La segunda animación, que empieza cuando termina el <code>blur</code>, será repetida infinitamente. Su color va cambiando progresivamente durante 15s <code>filter: hue-rotate(360deg)</code>

```css
.animate-filter {
  animation: filter-blur 2s linear 0s forwards, filter-hue 15s linear 2s alternate infinite;
}
@keyframes filter-hue {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
@keyframes filter-blur {
  0% { filter: blur(30px); }
  100% { filter: blur(0); }
}

```

## 4. Extra: animación de "logo"

Realmente no es imagen, son textos. Los textos son tratatados con javascript para generar contenedores <code>&lt;span&gt;</code> que contienen palabras que a su vez contienen letras

### 4.1. Javascript para animación de letras

Primero, se requiere la detección del elemento que se quieres animar buscando los atributos html <code>[data-animate="split-word"]</code>

```javascript
document.addEventListener('DOMContentLoaded', () => {

  let splits = document.querySelectorAll('[data-animate="split-word"]');

  //...
})
```

Sobre el/los elemento/s detectatados hacemos uso de dos funciones auxiliares

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

Las dos funciones anteriores se encargan de generar los elementos en el DOM y añadir atributos y clases para poder usar con CSS

```javascript
document.addEventListener('DOMContentLoaded', () => {

  //...

  splits.forEach(split => {
    let splitTextContent = split.textContent;

    split.innerHTML = '';
    split.appendChild(sliptWords(splitTextContent))
  })

  //...
})
```

Aplicamos la API de javascript <code>IntersectionObserver</code> que se usó en el resto de animaciones para añadir una clase cuando el contenido está al 20% dentro del viewport

```javascript
document.addEventListener('DOMContentLoaded', () => {

  //...

  const dataAnimates = document.querySelectorAll("[data-animate]")
  const ioAnimate = new IntersectionObserver(ioHandlerAnimate, ioConfigAnimate);

  [].forEach.call(dataAnimates, dataAnimate => ioAnimate.observe(dataAnimate))
})
```

### 4.2. CSS para animación de letras

A cada una de las letras le aplicamos una opacidad de 0 a 1 y además la transformamos para aplicarle rotación en el eje Y <code>transform: rotateY(0deg)</code>. Cada letra lleva su propio delay, haciendo uso de una variable CSS que añadimos con javascript <code>calc(var(--global-index) * .2s)</code>. La variable CSS es incremental, la primera letra tendrá valor 0 y el resto se va incrementando en 1

```css
.animate-split-word {
  [data-letter] {
    display: inline-flex;
    opacity: 0;
    transform: rotateY(0deg);
    animation: data-letter 2s ease-in calc(var(--global-index) * .2s) forwards;
  }
  [data-space="true"] {
    width: .8ch;
  }
}
@keyframes data-letter {
  0% {
    transform: rotateY(0deg);
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: rotateY(1080deg);
    opacity: 1;
  }
}
```

Puede verse todo el código completo en mi Git

<a href="https://github.com/ivanalbizu/landing-animation" target="_blank" rel="noopener">Código en mi GitHub</a>