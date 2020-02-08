---
title: Animación de clip-path con Intersection Observer
published: true
description: Animación de la propiedad CSS clip-path al hacer scroll usando la API de JavaScript Intersection Observer y cambio de color de body obteniendo el color principal de cada imagen
tags: javascript,html,css
ctime: Sat, 08 Feb 2020 20:30:00 +0000
cover_image: animacion-de-clip-path-con-intersection-observer.jpg
alt_image: Animación de clip-path con Intersection Observer
---

Siguiendo con la idea de mi anterior publicación, <a href="/blog/animacion-de-landing-con-intersection-observer">animación de una Landing usando la API Intersection Observer de Javascript</a>, esta entrada también consiste en crear animación cuando las imágenes entran dentro del <code>viewport</code> ralizando transformación de <code>clip-path</code> según el porcentaje de la imagen dentro del viewport

También se ha creado animación del color de fondo de <code>&lt;body&gt;</code>. El color dependará de la imagen que esté dentro del viewport. Para obtener el color se ha usado una librería externa, <a href="https://jariz.github.io/vibrant.js/">vibrantjs</a>, que obtiene de una imagen, su color principal y paleta de colores

Puede verse una prueba funcionando <a href="/experimentos/clip-path-io/">aquí</a>

## Obtener color principal de la imagen

Cuando todas las imágenes están completamente cargadas inicializamos la librería vibrant.js tal como indica su documentación. Nos interesa guardar el valor <code>rgb()</code> como <code>data-attribute</code>, he guardado el color principal y la paleta de colores, aunque sólo use el color principal. Al mismo tiempo asigno el <code>observer</code> que se encarga de cambiar el color de fondo de <code>body</code> en función del color principal de la imagen actualmente visible

```javascript
window.onload = () => {
  //...

  const imgs = document.querySelectorAll('.drop-shadow img');
  const ioBgcolor = new IntersectionObserver(ioBgcolorHandler, ioConfigBg);

  imgs.forEach(img => {
    const vibrant = new Vibrant(img);
    const swatches = vibrant.swatches()
    for (let swatch in swatches)
      if (swatches.hasOwnProperty(swatch) && swatches[swatch])
        img.setAttribute(`data-${swatch}`, swatches[swatch].getRgb());

    ioBgcolor.observe(img);
  });

  //...
};
```

## Asignar color principal de la imagen como fondo

En el apartado anterior he comentado se cambia el color de fondo de <code>body</code> cuando entra nueva imagen en el viewport. Además también se actualiza/modifica <code>&lt;meta name="theme-color" content="rgb()"&gt;</code> para cambiar el color de la aplicación para que en Mobile de la sensación de pantalla completa acorde a la imagen que se esté viendo

La configuración del Observer es simple. Cuando sea visible un 2% de la imagen se cambia el color de fondo con el valor guardado anteriormente <code>data-darkvibrant="rgb"</code>

```javascript
const ioBgcolorHandler = entries => {
  for (let entry of entries) {
    if (entry.intersectionRatio > 0.2) {
      document.body.style.backgroundColor = `rgb(${entry.target.dataset.darkvibrant})`;
      let metaThemeColor = document.querySelector("meta[name=theme-color]");
      if (metaThemeColor) metaThemeColor.setAttribute("content", `rgb(${entry.target.dataset.darkvibrant})`);
    }
  }
}
const ioConfigBg = {
  root: null,
  rootMargin: '0px',
  threshold: .2
};

window.onload = () => {
  //...

  const imgs = document.querySelectorAll('.drop-shadow img');
  const ioBgcolor = new IntersectionObserver(ioBgcolorHandler, ioConfigBg);

  imgs.forEach(img => {
    //...
    ioBgcolor.observe(img);
  });

  //...
};
```

## Animación de propiedad CSS clip-path

La animación será aplicada a todos los elementos que tengan la clase <code>.clip-path-trapezoid</code>. Estos elementos tienen una variable CSS que he llamado <code>--x-trapezoid</code> y su valor, en porcentaje, se modifica en función de la cantidad de imagen que se este mostrando

Se he creado la función para <code>buildThreshold(steps)</code> para generar array entre 0 y 1 con la cantidad de pasos que debe llamarse el <code>Intersection Observer</code>

```javascript
const buildThreshold = steps => Array(steps + 1)
  .fill(0)
  .map((_, index) => index / steps || 0)

const ioTrapezoidHandler = entries => {
  for (let entry of entries) {
    if (entry.isIntersecting) {
      entry.target.style.setProperty('--x-trapezoid', `${entry.intersectionRatio * 100}%`);
    }
  }
}

const ioConfigTrapezoid = {
  root: null,
  rootMargin: '0px',
  threshold: buildThreshold(150)
};
window.onload = () => {
  //...

  const trapezoids = document.querySelectorAll(".clip-path-trapezoid");
  const ioTrapezoid = new IntersectionObserver(ioTrapezoidHandler, ioConfigTrapezoid);

  //...

  [].forEach.call(trapezoids, trapezoid => ioTrapezoid.observe(trapezoid));
};
```

Un <a href="https://bennettfeely.com/clippy/">recurso interesante</a> para poder probar en que consiste <code>clip-path</code> de CSS. Viendo la web se puede ver que existen diferentes tipos de formas <code>polygon</code>, <code>circle</code>, <code>ellipse</code> e <code>inset</code> y que son pares de cordenadas en polígonos/inset y punto inicial/radios en los circle/ellipse

Con CSS asigné variables CSS (con valores iniciales) a algunos puntos. La variable CSS se irá cambiando según el elemento esté más o menos visible

La animación se realiza con <code>transition</code> CSS. Una de las animación no va Intersertion Observer y si con <code>hover</code>

No voy a copiar el código CSS, puede ver en <a href="https://github.com/ivanalbizu/clip-path-intersection-observer">GitHub</a>