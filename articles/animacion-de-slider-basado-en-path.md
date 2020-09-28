---
title: Animación de slider cambiando el Path de elemento SVG
published: true
description: Animación realizada con etiqueta Animation de SVG, usando Clipath aplicada a la imagen actual y a la siguiente imagen
tags: javascript,svg
ctime: Sun, 27 Sep 2020 18:00:00 +0000
cover_image: animacion-de-slider-basado-en-path.png
alt_image: Animación de slider cambiando el Path de elemento SVG
---

En esta ocasión quería hacer animaciones basadas en modificaciones del <code>path</code>. Desde CSS se pueden hacer dichas modificaciones junto con <code>keyframes</code>. El problema que hasta la fecha sólo Firefox es compatible: <a href="https://caniuse.com/css-clip-path" target="_blank" rel="noopener">caniuse</a>

<iframe height="522" style="width: 100%;" scrolling="no" title="Slider  SVG Animate Path" src="https://codepen.io/ivan_albizu/embed/GRZeVew?height=522&theme-id=2608&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ivan_albizu/pen/GRZeVew'>Slider  SVG Animate Path</a> by Iván Albizu
  (<a href='https://codepen.io/ivan_albizu'>@ivan_albizu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Para resolver este problema he optado por hacerlo con etiquetas <code>SVG</code>. Consiste en usar <code>clip-path</code> sobre la imagen actual y la imagen que se desea mostrar

## Elementos SVG:

<ul class="list-bullets">
  <li><code>clipPath</code>: contenedor del path y la animación</li>
  <li><code>path</code>: diferentes estados de path, desde primer frame hasta el último</li>
  <li><code>animate</code>: definición de la animación. Elemento al que aplica, duración, repeticiones...</li>
  <li><code>image</code>: imagen a la que se aplica clip-path</li>
</ul>

Se puede apreciar que hay 3 atributos de <code>animate</code> que no están rellenos y uno de <code>path</code>. Serán rellenados con javascript

<ul class="list-bullets">
  <li><code>d</code>: primer punto de la animación</li>
  <li><code>dur</code>: tiempo que dura la animación</li>
  <li><code>values</code>: cada uno de los puntos por los que pasa la animación</li>
  <li><code>keySplines</code>: timing functions entre cada punto de la animación</li>
</ul>

```html
<!-- Animación mediante SVG -->
<article data-slide="0" class="slide slide--beauty slide--active">
  <svg class="svg" viewBox="0 0 1500 750">
    <clipPath id="clip-00">
      <path d="">
        <animate
          dur=""
          repeatCount=".5"
          attributeName="d"
          restart="whenNotActive"
          values=""
          keySplines=""
          calcMode="spline"
          fill="freeze">
      </path>
    </clipPath>
    <image clip-path="url(#clip-00)" height="100%" width="100%" xlink:href="./src/img/beauty.jpg" />
  </svg>
</article>

<!-- Imagen colocada debajo de la animación. Una vez que se inicie la animación, esta imagen irá perdiendo visibilidad.
Se podría considerar como la imagen actual -->
<div class="bg-slide bg-slide--beauty bg-slide--active"></div>
```

## Código javascript:

Como he comentado, consiste en mostrar la imagen actual como <code>background</code> y la imagen que se desea mostrar dentro de animación SVG. Para ello hay que quitar y añadir clases y registrar eventos <code>click</code> y <code>touch</code>

```javascript

class Slides {
  constructor(el, setting) {
    this.DOM = { el: el }
    this.DOM.left = this.DOM.el.querySelector('.slide__left')
    this.DOM.right = this.DOM.el.querySelector('.slide__right')
    this.DOM.slides = this.DOM.el.querySelectorAll('.slide')
    this.DOM.slidesCount = this.DOM.slides.length
    this.DOM.slidesBg = this.DOM.el.querySelectorAll('.bg-slide')
    this.DOM.slidesNavBtns = this.DOM.el.querySelectorAll('.slide__nav .js-nav')
    this.DOM.gotoBtns = this.DOM.el.querySelectorAll('[data-goto]')
    this.isAnimating = false
    this.touchStartX = 0
    this.init(setting)
    this._addEventListeners()
  }

  init(setting) {
    this.DOM.slides.forEach(slide => {
      const path = slide.querySelector('clipPath path')    
      const animate = path.querySelector('animate')

      path.setAttributeNS(null, 'd', setting.paths[0])
      animate.setAttributeNS(null, 'values', arrayMirrorToString(setting.paths))
      animate.setAttributeNS(null, 'keySplines', arrayMirrorToString(setting.keySplines))
      animate.setAttributeNS(null, 'dur', `${setting.dur}ms`)
    })
  }

  _addEventListeners() {
    this.DOM.gotoBtns.forEach(nav => {
      nav.addEventListener('click', event => {
        if (this.isAnimating) return

        const goto = event.target.getAttribute('data-goto')
        const current = this.DOM.el.querySelector('.slide--active').getAttribute('data-slide')

        this.navigate(current, goto)
      })
    })
    this.DOM.slides.forEach(slide => {
      slide.nextElementSibling.addEventListener('touchstart', this.handleTouchStart.bind(this), false)
      slide.nextElementSibling.addEventListener('touchend', this.handleTouchEnd.bind(this), false)
    })
  }

  navigate(from, to) {
    this.isAnimating = true

    this.DOM.slidesNavBtns.forEach(nav => nav.classList.remove('btn--active'))

    this.DOM.left.setAttribute('data-goto', `${to == 0 ? this.DOM.slidesCount - 1 : +to-1}`)
    this.DOM.right.setAttribute('data-goto', `${to == this.DOM.slidesCount - 1 ? 0 : +to+1}`)

    const currentSlide = this.DOM.slides[from]
    const nextSlide = this.DOM.slides[to]
    const currentBg = this.DOM.slidesBg[from]
    const nextBg = this.DOM.slidesBg[to]

    const animate = nextSlide.querySelector('animate')

    animate.beginElement()
    setTimeout(() => {
      nextSlide.style.zIndex = 1
      nextSlide.classList.add('slide--active')

      animate.addEventListener('endEvent', () => {
        this.DOM.slidesNavBtns[to].classList.add('btn--active')
        nextSlide.style.zIndex = -1
        currentSlide.classList.remove('slide--active')
        currentBg.classList.remove('bg-slide--active')
        nextBg.classList.add('bg-slide--active')

        this.isAnimating = false
      })
    }, 1)

  }

  handleTouchStart(event) {
    this.touchStartX = event.touches[0].pageX
  }

  handleTouchEnd(event) {
    const moveX = event.changedTouches[event.changedTouches.length-1].pageX - this.touchStartX
    if (moveX < -10) this.DOM.right.click()
    else if (moveX > 10) this.DOM.left.click()
  }

}
```


No he puesto todo el código, puede verse todo el código completo en mi <a href="https://github.com/ivanalbizu/Slider-SVG-Animate-Path" target="_blank" rel="noopener">GitHub</a>

Caso de clonar y arrancar el proyecto, recomiendo instalar <a href="https://parceljs.org/" target="_blank" rel="noopener">parcel</a> globalmente, luego será tan fácil ejecutar <code>parcel index.html</a>