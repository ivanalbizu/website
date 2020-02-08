---
title: Banner con animaciones SVG
published: true
description: Banner construido con SVG. Animaciones de Máscara para textos, circles, cursor
tags: javascript,html,css,svg
ctime: Sun, 17 Nov 2019 16:30:00 +0000
cover_image: banner-con-animaciones-svg.png
alt_image: Banner con animaciones SVG
---

En esta ocasión he realizado <code>Banner</code> en la que se muestra una imagen de fondo y texto transparente encima de la imagen. El cursor, con forma circular, también será transparente. Al hacer <code>click</code> sobre la imagen, se produce animación con forma de circulo transparente que termina cubriendo toda la imagen. Al volver a hacer click, se produce la animación inversa del círculo. Mientras el Banner está "activo" se muestra vínculo en la zona inferior

Puede verse funcionando en este Pen. El soporte para Edge ha sido básico:

<div class="ratio-16-9">
    <iframe title="Banner con animación SVG" src="https://codepen.io/ivan_albizu/full/zYYyrRJ"></iframe>
</div>


## Código html del Banner

Se han creado cuatro <code>banners</code>. Todo el código se ha creado mediante <code>&lt;svg&gt;</code> ubicados dentro de <code>&lt; class="box"&gt;</code>.

Cada <code>banner</code> tiene dos etiquetas SVG.

La primera etiqueta es para ubicar la imagen de fondo y sus máscaras. Máscaras para customizar el cursor y el texto principal.

La segunda etiqueta es para pintar el enlace del Banner cuando está activo.

El código del primero de los <code>banners</code> es el siguiente:

```html
<div class="box">
    <svg viewbox="0 0 1000 600" class="mask" id="svg-mujer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <mask id="mask-mujer">
                <g fill="white">
                    <rect width="100%" height="100%" fill="#555"/>
                    <circle class="mask__circle" cx="0" cy="0" r="60"/>
                    <circle class="mask__circle" cx="0" cy="0" r="60" fill="none" stroke= "#fff" stroke-width="1%">
                        <animate attributeType="SVG" attributeName="r" begin="0s" dur="1.5s" repeatCount="indefinite" from="1%" to="10%"/>
                        <animate attributeType="CSS" attributeName="stroke-width" begin="0s" dur="1.5s" repeatCount="indefinite" from="3%" to="0%"/>
                        <animate attributeType="CSS" attributeName="opacity" begin="0s" dur="1.5s" repeatCount="indefinite" from="1" to="0"/>
                    </circle>
                    <text x="50%" y="50%" class="mask__text" dominant-baseline="middle" text-anchor="middle">Mujer</text>
                </g>
            </mask>
        </defs>
        <image width="100%" class="mask__image" xlink:href="https://raw.githubusercontent.com/ivanalbizu/banner-con-animaciones-svg/master/img/mujer.jpg" style="mask: url(#mask-mujer)"/>
    </svg>
    <svg viewbox="0 0 1000 120" class="link" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <a href="#!">
            <text x="50%" y="50%" class="link__text" dominant-baseline="middle" text-anchor="middle">Mujer</text>
        </a>
    </svg>
</div>
```

## Código javascript del banner

Se han creado 5 funciones

<ul class="list-bullets">
    <li><code>const coord = el => {}</code></li>
    <li><code>const handleMove = event => {}</code></li>
    <li><code>const handleClick = event => {}</code></li>
    <li><code>const openBox = (box) => {}</code></li>
    <li><code>const closeBox = (box) => {}</code></li>
</ul>

### Coordenadas del cursor dentro del Banner

La primera de las funciones <code>const coord = el => {}</code> es una función de utilidad para ser usada en dos ocasiones. Sirve para devolver las coordenadas del cursor dentro de un elemento dado

```javascript
const coord = el => {
    let viewportX = el.clientX;
    let viewportY = el.clientY;
    let boxRectangle = el.target.getBoundingClientRect();
    let localX = viewportX - boxRectangle.left;
    let localY = viewportY - boxRectangle.top;
    
    let x = (localX / boxRectangle.width) * 100;
    let y = (localY / boxRectangle.height) * 100;
    
    return {x,y}
}
```

### Asignar posición del cursor a variables CSS

Con la función <code>const handleMove = event => {}</code> se asigna el valor de la posición del cursor a variables CSS para ser usadas mediante CSS. Esta función está asignada a <code>listener 'mousemove'</code> por lo que será constantemente actualizada cuando el cursor entre el alguno de los <code>banners</code>

```javascript
const handleMove = event => {
    let {x,y} = coord(event);
    
    let root = document.documentElement;
    root.style.setProperty('--x', `${x}%`);
    root.style.setProperty('--y', `${y}%`);
}
```

### Detectar evento Click en los Banners

Con <code>const handleClick = event => {}</code> se detecta el evento <code>click</code> sobre alguno de los <code>banners</code>, se añade o quita la clase <code>box--active</code> al <code>&lt;div class="box"&gt;</code> que contiene el <code>banner</code> y según el caso, se ejecuta la función <code>openBox(box);</code> o <code>closeBox(box);</code>

```javascript
const handleClick = event => {
    const target = event.target;
    const box = target.closest('.box');
    box.classList.toggle('box--active');
    
    if (box.classList.contains('box--active')) {
        openBox(box);
    } else {
        closeBox(box);
    }
}
```

### Abrir el Banner

En la función <code>const openBox = (box) => {}</code> se crea un nuevo elemento SVG <code>circle</code> y se añade al primer SVG. Se posiciona en la misma coordenada en la que se hizo <code>click</code> mediante variables CSS y se le añade una clase CSS para transformar su radio mediante <code>keyframes</code>. El efecto será nuevo círculo que terminará ocupando todo el <code>banner</code> sin máscara.

```javascript
const closeBox = (box) => {
    const x = getComputedStyle(document.documentElement).getPropertyValue('--x');
    const y = getComputedStyle(document.documentElement).getPropertyValue('--y');
    
    const svgns = "http://www.w3.org/2000/svg";
    let newCircle = document.createElementNS(svgns, 'circle');
    newCircle.setAttributeNS(null, 'cx', x);
    newCircle.setAttributeNS(null, 'cy', y);
    newCircle.setAttributeNS(null, 'class', 'circle-click');
    
    box.querySelector('g').appendChild(newCircle);
}
```

### Cerrar el Banner

Con la función <code>const closeBox = (box) => {}</code> se elimina el <code>circle</code> anteriormente creado. Se añade clase CSS para la animación y se le da <code>timeout</code>. Se necesita hacer comprobación para evitar posible conflicto de <code>clicks</code> muy rápidos

```javascript
const closeBox = (box) => {
    let {x,y} = coord(event);
    
    let root = document.documentElement;
    root.style.setProperty('--x-close', `${x}%`);
    root.style.setProperty('--y-close', `${y}%`);
    
    const elClose = box.querySelector('.circle-click');
    
    //Elimina el siguiente circle, en caso que fueran muy rápidos
    //los clicks y no diera tiempo con setTimeout a eliminarlos
    //Se usa nextSibling. Si se modifica DOM, habría que cambiar selector
    if (elClose.nextSibling) elClose.nextSibling.remove();
    elClose.classList.add('circle-click-closing');
    elClose.style = `
        cx: ${x};
        cy: ${x};
        r: 0
    `;
    setTimeout(() => {
        elClose.remove();
    }, 500);
}
```

### Registrar listener para mousemove y click

Ahora toca, una vez el DOM esté cargado, inicializar la aplicación  y registrar los listener

Se registran eventos <code>mousemove</code> y <code>click</code> sobre cada uno de los banners

También se añade código para que, caso de navegador Edge, se pueda ver una alternativa para este navegador. No le he dedicado tiempo. :)

```javascript
document.addEventListener('DOMContentLoaded', () => {

    let masks = document.querySelectorAll('.mask');
    masks.forEach(mask => {
        mask.addEventListener('mousemove', handleMove, false)
        mask.addEventListener('click', handleClick, false)
    });
    
    if (/Edge\/\d./i.test(navigator.userAgent)){
        let boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            box.style = `
                background-image: url(${box.querySelector('image').getAttribute('xlink:href')});
                background-size: 100%;
                background-position: center;
                cursor: pointer;
            `;
        });
    }
    
});
```

## Código css de los Banners

Lo más interesante a comentar son las variables css que son manipuladas con JS para ser usadas como coordendas <code>cx</code> <code>cy</code> de los elementos <code>circle</code> del cursor y de la capa superpuesta sobre la imagen cuando el Banner se encuentra abierto

```css
@import url('https://fonts.googleapis.com/css?family=Montserrat:700&display=swap');
:root {
    --x: -60px;
    --y: -60px;
    --x-close: -60px;
    --y-close: -60px;
}
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body {
    background-color: #000;
}
svg {
    width: 100%;
}
text {
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
}
.wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: #0c0c0c;
    max-width: 90%;
    margin: auto;
    .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: relative;
        overflow: hidden;
    }
}
.mask {
    &__image {
        cursor: none;
    }
    &__circle {
        transform: translate(-120px);
    }
    &__text {
        font-size: 120px;
        text-shadow: 3px 3px 5px #2f2b2b;
    }
    &:hover {
        .mask__circle {
            transform: translate(var(--x), var(--y));
        }
    }
}
.link {
    position: absolute;
    bottom: 0;
    background-color: rgba(0,0,0,.7);

    width: 80%;
    right: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity .3s;
    &__text {
        font-size: 40px;
        fill: #fff;
    }
}
.box--active {
    .mask__image {
        cursor: default;
    }
    .link {    
        opacity: 1;
        visibility: visible;
        transform: translate(0, 0);
        transition: opacity 1s ease-in-out .4s;
    }
}

.circle-click {
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-name: circle-click;
    pointer-events: none;
}
.circle-click-closing {
    animation-duration: .5s;
    animation-name: circle-click-closing;
}
@keyframes circle-click {
    from {
        r: 60;
    }
    to {
        r: 145%;
    }
}
@keyframes circle-click-closing {
    from {
        r: 145%;
    }
    to {
        cx: var(--x-close);
        cy: var(--y-close);
        r: 0;
    }
}


@media (min-width: 720px) {
    .wrapper {
        .box {
            width: 50%;
        }
    }
}
@media (min-width: 1420px) {
    .wrapper {
        max-width: 76%;
    }
}
```

<a href="https://github.com/ivanalbizu/banner-con-animaciones-svg" target="_blank">Código en mi GitHub</a>