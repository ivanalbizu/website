---
title: Animación de slideshow usando WebGL con librería curtainsJS
published: true
description: Animación realizada con WebGL para transición de imágenes usando librería curtainsjs. Imagen como displacement entre transición y modificaciones de vertex y fragment shaders
tags: javascript,webgl
ctime: Fri, 30 Oct 2020 09:00:00 +0000
cover_image: slideshow-webgl-curtainsjs.jpg
alt_image: Animación de slideshow usando WebGL con librería curtainsJS
---

Ha sido mi primera toma de contacto con WebGL, algo que siempre quise mirarme ya que por ahí veía animaciones y transiciones bastante chulas. Aún sigo toqueteando, es un mundo. Mi idea era hacerlo sin ningún framework tipo ThreeJS o PixiJS, pero a la vez que veía que era muy trabajoso y requería de mucho esfuerzo, descubrí una librería muy simple y fácil de usar: <a href="https://www.curtainsjs.com/" target="_blank" rel="noopener">https://www.curtainsjs.com/</a>. Recomiendo ojearla, trastearla y empezar a usar los ejemplos que tienen creada en la Doc.

Si decides clonar mi repo, que tengo en el footer, te recomiendo que lo arranques con <a href="https://parceljs.org/" target="_blank" rel="noopener">https://parceljs.org/</a>

<iframe height="615" style="width: 100%;" scrolling="no" title="WebGL texture Slideshow with curtainsjs" src="https://codepen.io/ivan_albizu/embed/OJXXbxd?height=615&theme-id=2608&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ivan_albizu/pen/OJXXbxd'>WebGL texture Slideshow with curtainsjs</a> by Iván Albizu
  (<a href='https://codepen.io/ivan_albizu'>@ivan_albizu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Recursos interesantes, al menos para un novato como yo en WebGL

<ul class="list-bullets">
  <li>Si no tienes idea de que es WebGL, como yo, esta presentación fue las primeras que ví: <a href="https://www.youtube.com/watch?v=jkOnDTAFmD4" target="_blank" rel="noopener">https://www.youtube.com/watch?v=jkOnDTAFmD4</a></li>
  <li>Tutorial paso a paso para trabajar con WebGL 2: <a href="https://webgl2fundamentals.org/" target="_blank" rel="noopener">https://webgl2fundamentals.org/</a>
	<li>De un crack, Yuri Artyukh
		<ul>
			<li>Canal de youtube: <a href="https://www.youtube.com/user/flintyara" target="_blank" rel="noopener">https://www.youtube.com/user/flintyara</a></li>
			<li>Su Github: <a href="https://github.com/akella" target="_blank" rel="noopener">https://github.com/akella</a></li>
		</ul>
	</li>
	<li>Ejemplos muy PRO: <a href="https://webgl2fundamentals.org/" target="_blank" rel="noopener">http://acko.net/</a></li>
	<li>Ejemplos en Codrops: <a href="https://tympanus.net/codrops/tag/webgl/" target="_blank" rel="noopener">https://tympanus.net/codrops/tag/webgl/</a></li>
</ul>

## Propiedades de clase

En el constructor de la clase <code>WebglSlides</code> definimos atributos necesarios

```javascript
class WebglSlides {
	constructor(set) {
		this.canvas = set.canvas

		this.planeElement = set.planeElement
		this.multiTexturesPlane = null
		this.slidesState = {
			activeTextureIndex: 1,
			nextTextureIndex: null,
			maxTextures: set.planeElement.querySelectorAll("img").length - 1, // -1 to displacement
			navs: set.navs,

			isChanging: false,
			transitionTimer: 0,
		}
		this.params = {
			vertexShader: document.getElementById("vs")?.textContent || vertex,
			fragmentShader: document.getElementById("fs")?.textContent || fragment,
			uniforms: {
				transitionTimer: {
					name: "uTransitionTimer",
					type: "1f",
					value: 0,
				},
			},
		}

		this.init()
	}

}
```

La instancia de la clase nos dara el contexto WebGL y añade el canvas a nuestro envolvente. Recibirá como parámetro un objeto con los elementos del DOM:

<ol class="list-bullets">
  <li><code>&lt;div class="canvas"&gt;</code>: envolvente donde se creará el elemento <code>canvas</code> con curtainsJS</li>
  <li><code>&lt;section class="slides multi-textures"&gt;</code>: donde colocaremos las imágenes del slideshow y que serán usadas con curtainsJS para crear las texturas</li>
  <li><code>&lt;button class="btn" data-goto="prev o next" type="button"&gt;</code>: botones para controlar la paginación de los slides</li>
</ol>

Los tres primeros atributos son las referencias al canvas, planos y texturas.

Con <code>this.slidesState = {}</code> definimos la textura activa, la paginación, el estado de la transición y controlar los tiempos en la transformacion de los <code>shaders</code>.

Con <code>this.params = {}</code> definimos los shaders. Los ficheros que contienen los shaders son importados con ES6, también se pueden incluir como etiquetas <code>script</code>. Para poder acceder y realizar las modificaciones sobre los vertex lo haremos accediendo con <code>this.params.uniforms.transitionTimer.name = uTransitionTimer</code>

Finalmente llamamos al método <code>init()</code> para iniciar el slideshow. Este método hace la llamada a otros tres métodos.

## Iniciar curtains

```javascript
setupCurtains() {
	this.curtains = new Curtains({
		container: this.canvas,
		watchScroll: false,
		pixelRatio: Math.min(1.5, window.devicePixelRatio)
	})
	this.curtains.onError(() => this.error());
	this.curtains.onContextLost(() => this.restoreContext());
}
```

Instanciamos Curtains con tres parámetros

El primera parámetro, <code>container</code> será la referencia el elemento del DOM

El segundo parámetro, <code>watchScroll</code> lo fijamos a <code>false</code> ya que no necesitamos hacer escuchas de scroll para el slideshow

El tercero, <code>pixelRatio</code> optimiza la animación al dispositivo del usuario

## Iniciar planos y texturas

```javascript
initPlane() {
  this.multiTexturesPlane = new Plane(this.curtains, this.planeElement, this.params)

  this.multiTexturesPlane
    .onLoading(texture => {
      texture.setMinFilter(this.curtains.gl.LINEAR_MIPMAP_NEAREST)
    })
    .onReady(() => {
      const activeTexture = this.multiTexturesPlane.createTexture({
        sampler: "activeTexture",
        fromTexture: this.multiTexturesPlane.textures[this.slidesState.activeTextureIndex]
      })
      const nextTexture = this.multiTexturesPlane.createTexture({
        sampler: "nextTexture",
        fromTexture: this.multiTexturesPlane.textures[this.slidesState.nextTextureIndex]
      })

      this.initEvent(activeTexture, nextTexture)

    })
}
```

Se guarda la instancia del Plano en <code>multiTexturesPlane</code>. Al instanciarlo, le pasamos tres parámetros: instancia de curtains, las imágenes y los shaders

Usamos dos métodos de curtainjs para los Planos

En la carga le especificamos <code>LINEAR_MIPMAP_NEAREST</code> para que el "rellenado" de pixel sea más perfecta

Cuando ha cargado, creamos dos texturas, una será la textura actual y la otra será la siguiente. Al crear las dos texturas, en la key <code>sampler</code> apuntamos a sus nombres en los fragments y vertex shaders <code>activeTexture</code> y <code>nextTexture</code>

## Actualizar texturas

```javascript
update() {
	this.multiTexturesPlane.onRender(() => {
		if (this.slidesState.isChanging) {
			this.slidesState.transitionTimer += (90 - this.slidesState.transitionTimer) * 0.04;

			if (this.slidesState.transitionTimer >= 88.5 && this.slidesState.transitionTimer !== 90) {
				this.slidesState.transitionTimer = 90;
			}
		}

		this.multiTexturesPlane.uniforms.transitionTimer.value = this.slidesState.transitionTimer;
	});
}
```

Una vez que ya tenemos las texturas, llamamos al método <code>onRender()</code> para hacer modificaciones en función del tiempo sobre la textura activa

## Registrar eventos click

```javascript
initEvent(activeTexture, nextTexture) {
  this.slidesState.navs.forEach(nav => {
    nav.addEventListener('click', event => {

      if (!this.slidesState.isChanging) {
        this.curtains.enableDrawing()

        this.slidesState.isChanging = true;

        const to = event.target.getAttribute('data-goto');
        this.navigationDirection(to);

        nextTexture.setSource(this.multiTexturesPlane.images[this.slidesState.nextTextureIndex]);

        setTimeout(() => {

          this.curtains.disableDrawing();

          this.slidesState.isChanging = false;
          this.slidesState.activeTextureIndex = this.slidesState.nextTextureIndex;

          activeTexture.setSource(this.multiTexturesPlane.images[this.slidesState.activeTextureIndex]);

          this.slidesState.transitionTimer = 0;

        }, 1700);
      }
    })
  })
}
```

Se registra evento a los botones con atributos <code>data-goto</code> y se detecta el valor <code>next o prev</code> para decidir si será la textura prevía o siguiente. Esta lógica es realizada con el método <code>navigationDirection(to)</code>

Al animación se inicia si detectamos que actualmente no se está produciendo la animación <code>if (!this.slidesState.isChanging)</code>. Cambiamos la textura siguiente mediente <code>nextTexture.setSource(this.multiTexturesPlane.images[this.slidesState.nextTextureIndex])</code> y dentro de <code>timeOut</code> actualizamos la textura siguiente <code>activeTexture.setSource(this.multiTexturesPlane.images[this.slidesState.activeTextureIndex])</code>. Finalmente, reseteamos los tiempos <code>this.slidesState.transitionTimer = 0</code> que fueron modificados en otro método

## Detectar la textura a cargar

```javascript
navigationDirection(to) {
  if (to == 'next') {
    if (this.slidesState.activeTextureIndex < this.slidesState.maxTextures) {
      this.slidesState.nextTextureIndex = this.slidesState.activeTextureIndex + 1
    } else {
      this.slidesState.nextTextureIndex = 1
    }
  } else {
    if (this.slidesState.activeTextureIndex <= 1) {
      this.slidesState.nextTextureIndex = this.slidesState.maxTextures
    } else {
      this.slidesState.nextTextureIndex = this.slidesState.activeTextureIndex - 1
    }
  }
}
```

Este método sólo es para detectar la Textura que se debe cargar, y actualizar los índices. Este método es llamda en dos ocasiones, para la actualización de textura o para cargar una alternativa de slider caso de que fallase en algún momento curtainsjs

## Html del WebGL slideshow

```html
<main class="wrapper">
  <div class="canvas"></div>
  <section class="slides multi-textures">
    <img src="./src/img/displacement4.jpg" data-sampler="displacement">
    <img src="./src/img/city/amsterdam.jpg">
    <img src="./src/img/city/bilbao.jpg">
    <img src="./src/img/city/golden-gate-bridge.jpg">
    <img src="./src/img/city/valencia.jpg">
    <img src="./src/img/city/water.jpg">
    <img src="./src/img/city/peine.jpg">
    <nav class="nav">
      <button class="btn" data-goto="prev" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
      </button>
      <button class="btn" data-goto="next" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
      </button>
    </nav>
  </section>
</main>
```

La estructura del html si es importante. La envolvente <code>wrapper</code> es el contenedor de todo, incluso podremos usar más de un slideshow creando más instancias.

En <code>&lt;div class="canvas"&gt;</code> es donde la librería <code>curtainsJS</code> va a crear el elemento <code>canvas</code>

Dentro de <code>&lt;section class="slides multi-textures"&gt;</code> colocaremos todas las imágenes. En este caso, usamos una imagen <code>displacement</code> para las transiciones, la primera imagen debe contener el atributo <code>data-sampler="displacement"</code> para que curtains pueda interpretarlo

## Código CSS del WebGL slideshow

Me ahorro la explicación, no tiene nada especial. Si se quiere ver, en el <a href="https://github.com/ivanalbizu/WEBGL-texture-Slideshow" target="_blank" rel="noopener">GitHub</a> está todo. ;)
