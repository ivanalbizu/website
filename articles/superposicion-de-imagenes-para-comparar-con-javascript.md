---
title: Superposción de imágenes para comparar con Javascript
published: true
description: Maquetación de componente que permite comparar dos imágenes mediante superposición de una segunda imágen encima de la anterior
tags: javascript,html,css
ctime: Sat, 02 Nov 2019 22:10:05 +0000
cover_image: superposicion-de-imagenes-para-comparar-con-javascript.png
alt_image: Superposción de imágenes para comprar con Javascript
---

Mediante Javascript se da la posibilidad de cambiar la porción a mostrar de una segunda imagen que se ha maquetado y colocado sobre otra imagen.

Puede verse funcionando en este Pen:

<div class="ratio-16-9">
    <iframe title="Modal con imagen destacada animada al abrir el modal" src="https://codepen.io/ivan_albizu/full/QWWaQWO"></iframe>  
</div>

## Código html de la superposición de imágenes

Para este ejemplo se han creado dos cajas para contener dos versiones de superposición.

La caja contenedora tiene la clase <code>viewport</code>. Dentro tendremos tres cajas

<ul class="list-bullets">
    <li><code>&lt;div class="viewport__lightbox" data-img="480,550"&gt;</code></li>
    <li><code>&lt;div class="viewport__button"&gt;</code></li>
    <li><code>&lt;ul class="viewport__gallery"&gt;</code></li>
</ul>

Al primero, <code>&lt;div class="viewport__lightbox" data-img="480,550"&gt;</code>, mediente el atributo <code>data-img="480,550"</code> se le pasa el tamaño de la imagen: ancho por alto, para luego usarlo con javascript para manipular el CSS: crear una nueva media querie en función de sus dimensiones y para calcular el ratio de la imagen y aplicarlo al <code>padding</code> de la caja. Tanto este <code>&lt;div&gt;</code> como su hijo tendrán ambos una imagen de fondo, que serán cambiadas con javascript

El segundo, <code>&lt;div class="viewport__button"&gt;</code>, será para ubicar el botón que habilita/deshablita la funcionalidad de aplicar la superposición de imágenes

El tercero, <code>&lt;ul class="viewport__gallery"&gt;</code>, contiene las imágenes en miniatura, sobre las que se habilita evento <code>click</code> para cambiar las imágenes y cuyas rutas son usadas como background del <code>lightbox</code>

```html
<div class="viewport">
    <div class="viewport__lightbox" data-img="480,550">
        <div class="comparator"></div>
    </div>
    <div class="viewport__button">
        <button class="btn-compare js-compare" type="button">Comparar colores</button>
    </div>
    <ul class="viewport__gallery">
        <li><img class="img-compare js-img-compare" src="ws02-red_main.jpg" alt=""></li>
        <li><img class="img-compare js-img-compare" src="ws02-blue_main.jpg" alt=""></li>
        <li><img class="img-compare js-img-compare" src="ws02-green_main.jpg" alt=""></li>
    </li>
</div>

<div class="viewport">
    <div class="viewport__lightbox" data-img="480,550">
        <div class="comparator"></div>
    </div>
    <div class="viewport__button">
        <button class="btn-compare js-compare" type="button">Comparar colores</button>
    </div>
    <ul class="viewport__gallery">
        <li><img class="img-compare js-img-compare" src="ws06-gray_main.jpg" alt=""></li>
        <li><img class="img-compare js-img-compare" src="ws06-purple_main.jpg" alt=""></li>
        <li><img class="img-compare js-img-compare" src="ws06-red_main.jpg" alt=""></li>
    </li>
</div>
```

## Código javascript de la superposición de imágenes

En este caso voy a poner los snippets de cada caso y comentarlo. En total son cinco funciones:

<ul class="list-bullets">
    <li><code>const handleCompare = event => {}</code></li>
    <li><code>const handleActiveCompare = event => {}</code></li>
    <li><code>const handleMove = event => {}</code></li>
    <li><code>const loadViewportImages = viewport => {}</code></li>
    <li><code>const createMediaQuerie = img => {}</code></li>
</ul>

### Comparar imágenes con javascript

La función que permite añadir imagen como background es <code>const handleCompare = event => {}</code>

Se asocia esta función al evento <code>click</code> sobre cada una de las imágenes en miniatura. Se obtiene el atributo <code>src</code> para añadirlo al elemento <code>lightbox</code> como imagen de fondo

```javascript
const handleCompare = event => {
    const currentViewport = event.target.closest('.viewport');
    const src = event.target.getAttribute('src');
    currentViewport.querySelector('.js-active-comparator').style.backgroundImage = `url(${src})`;
}
```

### Activar comparación de imágenes con javascript

Esta función <code>const handleActiveCompare = event => {}</code> hace de "toggle" para activar / desactivar la funcionalidad. Se registra o se quita <code>listener</code> del evento <code>mousemove</code> asociada a la función <code>handleMove</code>.

Se usa la clase <code>js-active-comparator</code> para añadirla al DOM y poder hacer ajustes en el front

```javascript
const handleActiveCompare = event => {
    const currentViewport = event.target.closest('.viewport');
    const lightbox = currentViewport.querySelector('.viewport__lightbox');
    const comparator = currentViewport.querySelector('.js-active-comparator');
    if (comparator) {
        comparator.querySelector('.comparator').style.width = '0px';
        comparator.removeEventListener('mousemove', handleMove, false );
        lightbox.classList.remove('js-active-comparator');
    } else {
        lightbox.classList.add('js-active-comparator');
        currentViewport.querySelector('.js-active-comparator .comparator').style.width = '0px';
        currentViewport.querySelector('.js-active-comparator').addEventListener('mousemove', handleMove, false );
    }
}
```

### Detectar la posición del cursor para comparación de imágenes con javascript

Con la función <code>const handleMove = event => {}</code> se detecta la posición X dentro del lightbox. Dicho valor es pasado mediante javascript a la propiedad css <code>width</code> de <code>&lt;div class="comparator"&gt;&lt;/div&gt;</code>. Este elemento contiene una de las imagénes de fondo, está posicionado con "absolute" por encima del otro <code>&lt;div&gt;</code> para conseguir el efecto de comparación

```javascript
const handleMove = event => {
    const currentViewport = event.target.closest('.viewport');

    let viewportX = event.clientX;
    let boxRectangle = event.target.getBoundingClientRect();
    let localX = viewportX - boxRectangle.left;
    let borderWidth = parseInt( window.getComputedStyle( event.target ).borderTopWidth, 10 );
    localX -= borderWidth;

    currentViewport.querySelector( ".js-active-comparator .comparator" ).style.width = localX + "px";
}
```

### Carga de imágenes para comparación con javascript

Con la función <code>const loadViewportImages = viewport => {}</code> se cargan dos imágenes dentro del <code>lightbox</code>, partiendo de la lista de miniaturas disponibles.

A parte de obtener el <code>src</code> de la imágen para ubicarla con background, también se hacen dos operaciones. Una para obtener el ratio de la imagen llegada mediante el atributo <code>data-img</code> y así poder aplicar la proporción del contenedor lightbox. La otra operación, también usando el mismo atributo, se trata de realizar una nueva regla css para generar una mediaquerie basada en el ancho de la imagen y poder mantener "misma posición" de las dos imágenes a comprar

```javascript
const loadViewportImages = viewport => {
    const lightbox = viewport.querySelector('.viewport__lightbox');
    const imageData = lightbox.getAttribute('data-img').split(',');
    const ratio = ( imageData[1] / imageData[0] ) * 100;

    const imagesGallery = viewport.querySelectorAll('.viewport__gallery .js-img-compare');
    for (let index = 0; index < imagesGallery.length; index++) {
        const img = imagesGallery[index];
        const src = img.getAttribute('src');
        if (index == 0) {
            lightbox.style.paddingTop = `${ratio}%`;
            lightbox.style.backgroundImage = `url(${src})`;
            createMediaQuerie(imageData);
        } else if (index == 1) {
            lightbox.querySelector('.comparator').style.backgroundImage = `url(${src})`;
        } else {
            break;
        }
    }
}
```

### Crear media querie para comparación de imágenes con javascript

Como se ha comentado más arriba, se crea una función, <code>const createMediaQuerie = img => {}</code>, para generar una media querie para la regla del comparador <code>lightbox</code>. La media querie usa como breakpoint el ancho de la imagen. Se cambia la posición X de la imágen con cálculos del ancho del viewport

```javascript
const createMediaQuerie = img => {
    let css = `
    @media screen and (max-width:${img[0]}px) {
        .viewport__lightbox .comparator {
            background-position-x: calc(calc(calc(100vw - 20px) / 2) - ${img[0]/2}px);
        }
    }`;
    let head = document.head || document.getElementsByTagName('head')[0];
    let style = document.createElement('style');

    head.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
}
```

### Registrar listener para comparación de imágenes con javascript

Ahora toca, una vez el DOM esté cargado, inicializar la aplicación  y registrar los listener

Las imágenes a comparar son cargadas con las imágenes en miniatura que existan en el front

Se registra la activación al evento <code>click</code> para la comparación de imágenes y los eventos en cada una de las imágenes

```javascript
document.addEventListener('DOMContentLoaded', () => {

    let viewports = document.querySelectorAll('.viewport');
    if (viewports) {
        viewports.forEach(viewport => {
            
            loadViewportImages(viewport);

            viewport.querySelector('.js-compare').addEventListener('click', handleActiveCompare, false);

            let compares = viewport.querySelectorAll('.js-img-compare');
            compares.forEach(compare => {
                compare.addEventListener( "click", handleCompare, false );
            });
        });
    }
    
});
```

## Código css de la superposición de imágenes

Antes de comentar el código css, rescato una parte del html. Se trata de <code>&lt;div class="viewport__lightbox" data-img="480,550"&gt;</code> que tiene una imagen de fondo y otro div dentro <code>&lt;div class="comparator"&gt;</div></code> que tendrá otra imagen dentro.

El div interior será modificado con javascript para cambiar su ancho en función de la posición del cursor, y su imagen será posicionada en el eje X al comienzo del div

```css
* {
    margin: 0;
    box-sizing: border-box;
}
html, body { height: 100%; }
body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: rgba(0,0,0,.1);
}
ul {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
}
.viewport {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    max-width: calc(100% - 20px);

    &__lightbox {
        max-width: 100%;
        width: 480px;
        background-repeat: no-repeat;
        background-position: center center;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,.2);
        margin-bottom: 16px;
        position: relative;
        padding-top: 50%;

        .comparator {
            width: 0;
            height: 100%;
            pointer-events: none;
            background-repeat: inherit;
            background-position: 0 center;
            position: absolute;
            top: 0;
            left: 0;
        }
        &.js-active-comparator {
            cursor: col-resize;
        }
    }
    &__button {
        margin-left: auto;
    }
    &__gallery {
        display: flex;
        justify-content: center;
        visibility: hidden;
        opacity: 0;
    }
}
.js-active-comparator {
    ~ .viewport__gallery {
        visibility: visible;
        opacity: 1;
        transition: all .3s ease-in;
        .js-img-compare {
            transform: translate(0,0);
            pointer-events: all;
            cursor: pointer;
        }
    }
}
.img-compare {
    width: 60px;
    margin: 10px 10px 16px;
}
.btn-compare {
    border: 0;
    color: #fff;
    background-color: #111;
    padding: 5px 10px;
    cursor: pointer;
}
.js-img-compare {
    transform: translate(15px,0);
    transition: all .3s ease-in;
    pointer-events: none;
}
```

Si se mira para tamaños de pantalla pequeños, y sin simulador de Mobile, las imágenes aparecen desalineadas (17px aproximado) por el espacio que ocupa la barra de Scroll

<a href="https://github.com/ivanalbizu/superposicion-de-imagenes-con-javascript" target="_blank">Código en mi GitHub</a>