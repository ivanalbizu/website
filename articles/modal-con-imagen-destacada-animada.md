---
title: Modal con imagen destacada animada al abrir el modal
published: true
description: Animación de modal al levantar el modal, moviendo de posición inicial hasta posición final en modal
tags: Javascript, html, sass
ctime: Sun, 27 Oct 2019 19:08:00 +0000
cover_image: modal-con-imagen-destacada-animada-al-abrir-el-modal.png
alt_image: Modal con animación de imagen destacada
---

Construcción de modal con animación de la imagen. La imagen que hace levantar el modal es usada como imagen de modal. Se realiza con animación de movimiento de imagen desde la posición original hasta la posición final que ocupa dentro del modal.

Puede verse funcionando en este Pen:

<div class="ratio-16-9">
    <iframe title="Modal con imagen destacada animada al abrir el modal" src="https://codepen.io/ivan_albizu/project/full/XNpKzq"></iframe>  
</div>

## Código Html

Los modales son levantados mediante el atributo <code>data-modal</code> que están ubicadas en etiquetas <code>&lt;img&gt;</code>. El valor de <code>data-modal</code> apunta a la <code>id</code> del modal. Se crea una capa con la clase <code>md-overlay</code> para posicionarla detrás del modal y darle animación color con transparencia.

```html
<svg display="none" xmlns="http://www.w3.org/2000/svg">
    <symbol id="svg-icon-close" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" id=".5786439775930057" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6l12 12"></path>
    </symbol>
</svg>

<div class="img-wrapper">
    <img src="https://dummyimage.com/800x500/444/fff" data-modal="1" alt="">
</div>
<div class="img-wrapper">
    <img src="https://dummyimage.com/800x400/666/fff" data-modal="2" alt="">
</div>
<div class="img-wrapper">
    <img src="https://dummyimage.com/600x400/555/fff" data-modal="3" alt="">
</div>

<div class="md" id="modal-1">
    <div class="md-image"></div>
    <div class="md-content">
        <header class="md-header">
            <h2 class="md-title">Modal 01</h2>
            <button class="md-close" type="button">
                <svg class="svg-icon-close">
                    <use xlink:href="#svg-icon-close" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
                </svg>
            </button>
        </header>
        <div class="md-body">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur soluta, asperiores consequatur libero suscipit doloribus! Quidem deleniti nemo veritatis, ratione et totam maxime illo optio quaerat, perferendis, quos labore repellendus.</p>
            <p>Aspernatur soluta, asperiores consequatur libero suscipit doloribus! Quidem deleniti nemo veritatis, ratione et totam maxime illo optio.</p>
        </div>
        <footer class="md-footer">
            <a class="md-link" href="#">Go to</a>
            <a class="md-link" href="#">Go to</a>
            <button class="md-button" type="button">Action</button>
        </footer>
    </div>
</div>
<div class="md" id="modal-2">
    <div class="md-image"></div>
    <div class="md-content">
        <header class="md-header">
            <h2 class="md-title">Modal 02</h2>
            <button class="md-close" type="button">
                <svg class="svg-icon-close">
                    <use xlink:href="#svg-icon-close" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
                </svg>
            </button>
        </header>
        <div class="md-body">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur soluta, asperiores consequatur libero suscipit doloribus! Quidem deleniti nemo veritatis, ratione et totam maxime illo optio quaerat, perferendis, quos labore repellendus.</p>
        </div>
    </div>
</div>
<div class="md" id="modal-3">
    <div class="md-image"></div>
    <div class="md-content">
        <header class="md-header">
            <h2 class="md-title">Modal 03</h2>
            <button class="md-close" type="button">
                <svg class="svg-icon-close">
                    <use xlink:href="#svg-icon-close" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
                </svg>
            </button>
        </header>
        <div class="md-body">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur soluta, asperiores consequatur libero suscipit doloribus! Quidem deleniti nemo veritatis, ratione et totam maxime illo optio quaerat, perferendis, quos labore repellendus.</p>
            <p>Aspernatur soluta, asperiores consequatur libero suscipit doloribus! Quidem deleniti nemo veritatis, ratione et totam maxime illo optio.</p>
        </div>
        <footer class="md-footer">
            <a class="md-link" href="#">Go to</a>
            <button class="md-button" type="button">Action</button>
        </footer>
    </div>
</div>

<div class="md-overlay"></div>
```

## Código Javascript

Cuando el DOM está cargado se crean <code>listeners</code> para registrar acciones de levantado y cierre de modales.

Se han creado dos funciones para levantado y cierre de modal:

<ul class="list-bullets">
    <li><code>const openModal = event => {}</code></li>
    <li><code>const closeModal = () => {}</code></li>
</ul>

Con <code>const closeModal = () => {}</code> se cierra el modal actualmente activo, registrando y asociando el evento <code>click</code> tanto al botón de cierre como a la capa <code>md-overlay</code>

Con <code>const openModal = event => {}</code> se abre el modal asociado a la imgen clickeada. Dicha asociación se hace obteniendo del <code>target</code> el atributo <code>data-modal</code> y buscando la <code>id</code> del modal. Para hacer la animación se crea con JS un <code>&lt;div&gt;</code> con <code>background-image</code> correspondiente a la imagen seleccionada. A este nuevo elemento se le añade un clase CSS con posición fija y sus coordenadas son añadidas con JS con la posición de la imagen clickeada, posteriormente se cambia las coordenadas con la posición que ocupa la imagen dentro del modal. Las animaciones se realizan con CSS mediante transiciones y delays.

Existen dos funciones más como utilidad a la animación:

<ul class="list-bullets">
    <li><code>const imgPosition = el => {}</code></li>
    <li><code>const move = (el, position) => {}</code></li>
</ul>

La función <code>const imgPosition = el => {}</code> devuelve, partiendo de un elemento HTML pasado como párametro, un objeto Javascript con las coordenadas X e Y y su ancho y alto.

La funcion <code>const move = (el, position) => {}</code> asigna atributos CSS mediante JS al elemento pasado como primer parámetro y sus atributos pasado como segundo parámetro (usando la función anterior).

```javascript
document.addEventListener('DOMContentLoaded', () => {

  //Activar Listeners Modales
  var mds = document.querySelectorAll('[data-modal]');
  mds.forEach(function(md) {
    md.addEventListener('click', openModal, false);
  });

  var closes = document.querySelectorAll('.md-close');
  closes.forEach(function(close) {
    close.addEventListener('click', closeModal, false);
  });
  document.querySelector('.md-overlay').addEventListener('click', closeModal, false);

});

const imgPosition = el => {
  const rect = el.getBoundingClientRect();
  return { 
    top: rect.top+'px',
    left: rect.left+'px',
    width: rect.width+'px',
    height: rect.height+'px',
   }
}

const move = (el, position) => {
  el.style.left = position.left;
  el.style.top = position.top;
  el.style.width = position.width;
  el.style.height = position.height;
}

const openModal = event => {
  const target = event.target;
  target.style.pointerEvents = 'none';
  const srcImageClicked = target.getAttribute('src');
  const dataModalID = 'modal-'+target.getAttribute('data-modal');
  const modal = document.querySelector('#'+dataModalID);
  const mdImage = modal.querySelector('.md-image');
  modal.classList.add('md--active');
  mdImage.style.backgroundImage = 'url('+srcImageClicked+')';
  
  const bg = document.createElement('div');
  bg.classList.add('bg-animation');
  bg.style.backgroundImage = 'url('+srcImageClicked+')';
  
  //Inicio posición de la imagen
  move(bg, imgPosition(target))
  
  target.parentNode.append(bg);
  
  //Fin posición de la imagen
  move(bg, imgPosition(mdImage))

  setTimeout(() => {
    bg.remove();
    target.style.pointerEvents = '';
  }, 800);
}

const closeModal = () => {
  if (document.querySelector('.md--active')) document.querySelector('.md--active').classList.remove('md--active');
}
```

## Código CSS

Este código no lo voy a explicar, es sencillo. Tan solo comentar que las animaciones son realizadas con <code>transform</code> y <code>transition</code> a diferentes capas, controlando duraciones y delays.

```scss
* {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    color: #1a1a1a;
    line-height: 1.4;
}
html, body {height: 100%;}
body {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
}
img {max-width: 100%; display: inline-block;}
p:not(:last-of-type) {
    margin-bottom: .8rem;
}
button {
    border: 0;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
}
a {
    text-decoration: none;
}
.svg-icon-close {
    width: 24px;
    height: 24px;
}
[data-modal] {
    cursor: pointer;
}
.img-wrapper {
    text-align: center;
    img {
        max-width: 90%;
    }
}

.md {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 96%;
    max-width: 1024px;
    min-width: 320px;
    z-index: 2000;
    visibility: hidden;
    backface-visibility: hidden;
    transform: translateX(-50%) translateY(-50%);

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(100px, 200px) auto;
	
    &-overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        visibility: hidden;
        top: 0;
        left: 0;
        z-index: 1000;
        opacity: 0;
        background: rgba(0,117,60,0.95);
        transition: all .3s ease .5s;
    }

	&--active {
        visibility: visible;
        transition: all .3s ease .5s;
        & ~ .md-overlay {
            opacity: 1;
            visibility: visible;
        }
        & .md-content {
            opacity: 1;
            transform: translateY(0);
            transition: transform .5s ease-in-out .8s, opacity .8s ease .8s;
        }
    }

    &-image {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        z-index: 3000;
    }

    &-content {
        padding: 16px;
        background-color: #fff;
        opacity: 0;
        transform: translate(0, -100px);
        z-index: 2500;
    }

    &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    &-body + &-footer {
        margin-top: 20px;
    }
	
    &-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .md-button {
            margin-left: auto;
            background-color: tomato;
            color: #fff;
            padding: 5px 15px;
        }
    }

    &-title {
        font-weight: 300;
        color: #000;
    }
    &-close {
        height: 24px;
    }
    &-link {
        border-bottom: 1px solid tomato;
        &:not(:first-of-type) {
            margin-left: 1rem;
        }
    }
}

.bg-animation {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: fixed;
    transition: all .5s;
    z-index: 3000;
}

@media (min-width: 768px) {
    .md {
        grid-template-columns: minmax(350px, 2fr) 5fr;	
        grid-template-rows: 1fr;

        &-content {
            padding: 2rem 2rem 1.5rem;
            transform: translate(-100px, 0);
        }
        &-header {
            margin-bottom: 1rem;
        }
        &-body + &-footer {
            margin-top: 2rem;
        }
    }
}

@media (max-height: 420px) {
    .md {
        position: absolute;
        top: 0;
        transform: translate(-50%, 0);
    }
}
```

<a href="https://github.com/ivanalbizu/modal-image-anime" target="_blank">Código en mi GitHub</a>