---
title: Animación de Landing con Intersection Observer
published: true
description: Animación con CSS aplicando la API de JavaScript Intersection Observer para iniciar la animación cuando el elemento a Animar entra dentro del Viewport
tags: javascript,html,css
ctime: Mond, 27 Jan 2020 22:30:00 +0000
cover_image: animacion-de-landing-con-intersection-observer.png
alt_image: Slides usando Blend Mode y Document Fragment
---

He creado una Landing a la que he añadido animación mediante <code>keyframes</code> de CSS. La animación se inicia cuando el elemento entra dentro del viewport

En este Pen se puede ver funcionando. El inicio de la animación no es del todo fino por estar dentro de Codepen. Recomiendo descargar del GitHub (link más abajo) y probarlo

<iframe height="693" style="width: 100%;" scrolling="no" title="Animación de Landing con Intersection Observer" src="https://codepen.io/ivan_albizu/embed/OJPGjVP?height=693&theme-id=2608&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ivan_albizu/pen/OJPGjVP'>Animación de Landing con Intersection Observer</a> by Iván Albizu
  (<a href='https://codepen.io/ivan_albizu'>@ivan_albizu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

No voy a comentar todo el código, sólo algunas de las cosas que me parecen más interesantes

## Intersection Observer

Cuando el DOM está cargado, se seleccionan todos los nodos que tengan el atributo <code>[data-animation]</code> para aplicarles IntersectionObserver

El valor que tengamos de dicho atributo será usado para añadirlo con clase y así iniciar la animación cuando el elemento sea visible un 70%. La animación la queremos aplicar sólo una vez y por eso aplicamos el <code>unobserve</code> sobre el elemento.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  //...

  const blocks = document.querySelectorAll("[data-animation]");

  const io = new IntersectionObserver(ioHandler, ioConfig);

  [].forEach.call(blocks, block => io.observe(block));

});

const ioHandler = (entries, self) => {
  for (let entry of entries) {
    const target = entry.target;

    if (entry.intersectionRatio > 0.7) {
      target.classList.add(target.getAttribute("data-animation"))
      self.unobserve(target);
    }
  }
}

const ioConfig = {
  threshold: 0.7
};
```

## Animación en entrada de letras

La animación, tipo máquina de escribir, se realiza transformando mediante JS el contenido de un <code>&lt;div&gt;</code> para tener cada letra envuelta con un <code>&lt;span&gt;</code> al que se le aplica variable CSS para aplicar delays al <code>keyframes</code>

Para usarlo, sólo tenemos que añadir el atributo <code>[data-split-word]</code> allá donde queramos aplicar la animación

```javascript

document.addEventListener('DOMContentLoaded', () => {
  
  let splits = document.querySelectorAll('[data-split-word]');

  splits.forEach(split => {
    let splitTextContent = split.textContent;
  
    split.innerHTML = '';
    split.appendChild(createFrameSlides(splitTextContent))
  })

  //...

});

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

const createFrameSlides = chars => {
  const fragment = new DocumentFragment();
  chars = chars.split('');
  chars.forEach((char, index) => {
    const el = elFactory(
      'span',
      { 
        'data-char': `${char}`,
        class: `char`,
        style: `--char-index:${index}`
      },
      `${char}`
    )
    fragment.appendChild(el);
  })
  
  return fragment;
}
```

```css
[data-animation="kf-words"] {
  span {
    color: transparent;
  }
  &.kf-words {
    span {
      animation: words 200ms ease calc(var(--char-index) * 50ms) forwards;
    }
  }
}

@keyframes words {
	0% {
    color: transparent;
	}
	100% {
    color: #fff;
	}
}
```

## Aplicar Delays a las animaciones que se deseen

Consiste en añadir variables CSS expresados en milisegundos, que luego será usado en el CSS

```html
<ul class="nav__menu">
  <li data-animation="kf-left-to-right" style="--kf-delay: 150"><a href="#!">Works</a></li>
  <li data-animation="kf-left-to-right" style="--kf-delay: 300"><a href="#!">Features</a></li>
  <li data-animation="kf-left-to-right" style="--kf-delay: 450"><a href="#!">Security</a></li>
  <li data-animation="kf-left-to-right" style="--kf-delay: 600"><a href="#!">Contact</a></li> 
</ul>
```

Quería que sólo fuera válido para pantallas superiores a 576px. Pero se podrían haber creado más variables CSS para cada viewport que interese

```css
@media (min-width: 576px) {
  [data-animation][style*="--kf-delay"] {
    animation-delay: calc(var(--kf-delay) * 1ms);
  }
}
```

<a href="https://github.com/ivanalbizu/animacion-landing-con-intersercion-observer" target="_blank">Código en mi GitHub</a>