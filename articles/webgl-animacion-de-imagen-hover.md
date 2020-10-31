---
title: Animación de Imágenes usando WebGL con librería curtainsJS y gsap
published: true
description: Animación Hover realizada con WebGL para transición de imágenes usando librería curtainsjs y gsap. Imágenes usadas como displacement y modificaciones de vertex y fragment shaders
tags: javascript,webgl
ctime: Sat, 31 Oct 2020 16:30:00 +0000
cover_image: webgl-hover-image.jpg
alt_image: Animación de Imágenes usando WebGL con librería curtainsJS y gsap
---

Esta animación la estaba haciendo al mismo tiempo que otra que acabo de publicar, <a href="/blog/webgl-slideshow">Animación de slideshow usando WebGL con librería curtainsJS</a>, para poder conocer que cosas se pueden llegar a realizar sobre WebGL con la librería <a href="https://www.curtainsjs.com/" target="_blank" rel="noopener">https://www.curtainsjs.com/</a>

En la anterior publicación realizaba la animación entre dos texturas con una imagen <code>displacement</code> lanzada con evento <code>click</code>

En esta publicación, los eventos que lanzan la animación son <code>mouseenter</code> y <code>mouseout</code>. Se usan tres imágenes como Texturas. La primera imagen será la mostrada en estado normal, la segunda en estado hover y la última será la fusión de ambas durante la transición.

He colocado hasta 6 animaciones diferentes, con sus respectivas imágenes. Mi idea era usarlo en una Home commerce de Grid de productos, pero veo que consumen mucha GPU y lo descarto. Con el tiempo tendré que aprender más y ver si puedo optimizar algo. En Firefox, con una imagen la animación se ve limpia, pero con las 6 se nota que no es fluida.

<iframe height="600" style="width: 100%;" scrolling="no" title="WebGL texture Hover with curtainsjs" src="https://codepen.io/ivan_albizu/embed/ZEOeWam?height=564&theme-id=2608&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ivan_albizu/pen/ZEOeWam'>WebGL texture Hover with curtainsjs</a> by Iván Albizu
  (<a href='https://codepen.io/ivan_albizu'>@ivan_albizu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Propiedades de clase

En el constructor de la clase <code>WebglHover</code> definimos atributos necesarios

```javascript
class WebglHover {
  constructor(set) {
    this.canvas = set.canvas
    this.webGLCurtain = new Curtains({
      container: this.canvas,
      watchScroll: false,
      pixelRatio: Math.min(1.5, window.devicePixelRatio)
    })
    this.planeElement = set.planeElement
    this.mouse = {
      x: 0,
      y: 0
    }
    this.params = {
      vertexShader: document.getElementById("vs").textContent,
      fragmentShader: document.getElementById("fs").textContent,
      widthSegments: 40,
      heightSegments: 40, // 40*40*6 = 9600 vertices
      uniforms: {
        time: {
          name: "uTime",
          type: "1f",
          value: 0
        },
        mousepos: {
          name: "uMouse",
          type: "2f",
          value: [0, 0]
        },
        resolution: {
          name: "uReso",
          type: "2f",
          value: [innerWidth, innerHeight]
        },
        progress: {
          name: "uProgress",
          type: "1f",
          value: 0
        }
      }
    }
    this.initPlane()
  }
}
```

La instancia de la clase nos dara el contexto WebGL y añade el canvas a nuestro envolvente. Recibirá como parámetro un objeto con los elementos del DOM:

<ol class="list-bullets">
  <li><code>&lt;div class="canvas"&gt;</code>: envolvente donde se creará el elemento <code>canvas</code> con curtainsJS</li>
  <li><code>&lt;section class="plane"&gt;</code>: donde colocaremos las tres imágenes con curtainsJS para crear las texturas, con su <code>data-sampler</code> para poder tratarlo dentro del <code>fragment shader</code></li>
</ol>

Instanciamos <code>Curtains</code>,obtenemos el elemento DOM para el plano y un objeto con la posicón del ratón.


Con <code>this.params = {}</code> definimos los shaders y sus segmentos. Dentro de <code>uniforms</code> definimos las KEYS necesarias para poder manipular los shaders:

<ul class="list-bullets">
  <li>time: <code>uTime</code></li>
  <li>mousepos: <code>uMouse</code></li>
  <li>resolution: <code>uReso</code></li>
  <li>progress: <code>uProgress</code></li>
</ul>

Finalmente llamamos al método <code>initPlane()</code> para iniciar la aplicación. Este método hace la llamada a otros dos métodos si el plano está listo.

## Iniciar el plano WebGL

```javascript
initPlane() {
  this.plane = new Plane(this.webGLCurtain, this.planeElement, this.params)

  if (this.plane) {
    this.plane.onReady(() => {
      this.update()
      this.initEvent()
    })
  }
}
```

En este método se crea el Plano, mediante la clase <code>Plane</code> de </code>curtainsjs</code>. Si el plano se ha creado correctamente, y cuando esté listo, hacemos llamada a <code>update()</code> e iniciamos los eventos <code>initEvent()</code>

## Renderizado del plano WebGL

```javascript
update() {
  this.plane.onRender(() => {
    this.plane.uniforms.time.value += 0.01

    this.plane.uniforms.resolution.value = [innerWidth, innerHeight]
  })
}
```

Se actualizan los valores de <code>time</code> y <code>resolution</code> del objeto <code>paramas</code>

## Registro de eventos para WebGL

```javascript
initEvent() {
  this.planeElement.addEventListener("mouseenter", () => {
    gsap.to(this.plane.uniforms.progress, .8, {
      value: 1
    })
  })

  this.planeElement.addEventListener("mouseout", () => {
    gsap.to(this.plane.uniforms.progress, .8, {
      value: 0
    })
  })
}
```

A los planos se registra los eventos <code>mouseenter</code> y <code>mouseout</code>. Con <code>gsap</code>, tanto cuando el ratón entra o sale de la imagen, se modifica el valor <code>progress</code>, para que se muestra una u otra imagen. Este efecto durará 800ms.

## Instanciar la clase WebglHover

```javascript
document.querySelectorAll('.slide').forEach(slide => {
  const canvas = slide.querySelector('.canvas')
  const planeElement = slide.querySelector('.plane')
  new WebglHover({
    canvas,
    planeElement
  })
})
```

Recorremos todos los elementos del DOM que tengan la clase <code>slide</code> y creamos las instancias pasando como parámetros la referencia a <code>&lt;div class="canvas"&gt;</code> y a <code>&lt;div class="plane"&gt;</code>

## Html del WebGL

```html
<main class="slides">
  <section class="slide">
    <div class="canvas"></div>
    <div class="plane">
      <img data-sampler="texture0" src="./src/img/chair-02.jpg" crossorigin="anonymous" />
      <img data-sampler="texture1" src="./src/img/chair-01.jpg" crossorigin="anonymous" />
      <img data-sampler="map" src="./src/img/displacements/01.jpg" crossorigin="anonymous" />
    </div>
    <div class="slide__content">
      <p>Lorem ipsum dolor sit.</p>
    </div>
  </section>
  <section class="slide"></section>
</main>
```

La estructura del html si es importante. La envolvente <code>slides</code> es el contenedor de todo, dentro, pondremos tantos <code>slide</code> como queramos

En <code>&lt;div class="canvas"&gt;</code> es donde la librería <code>curtainsJS</code> va a crear el elemento <code>canvas</code>

Dentro de <code>&lt;section class="plane"&gt;</code> colocaremos todas las imágenes con los atributos <code>data-sampler</code>, recordando que la última imagen será usada para la transición entre ambas.

## Código CSS del WebGL

Me ahorro la explicación, no tiene nada especial. Si se quiere ver, en el <a href="https://github.com/ivanalbizu/WEBGL-texture-Hover" target="_blank" rel="noopener">GitHub</a> está todo. ;)
