---
title: 'Animaciones CSS3 - transform: translate (x, y)   vs   left(x) top(y)'
ctime: Sun, 17 Nov 2013 22:16:22
published: true
tags: Css3,Pildoritas
---

Es cierto que hacer una animación variando por ejemplo atributos en vertical (top) y en horizontal (left) es una práctica común, pero puede mejorar la animación usando otro método. Si usamos _"transform: translate (x, y)_". Usando translate hay que dar las unidades entre paréntesis del desplazamiento en horizontal primero y vertical segundo. Aunque mejor será verlo en un ejemplo:

texto moviéndose modificando translate (X, Y)

texto moviéndose modificando atributos top y left

Quizá no sea muy notable la diferencia, pero todo lo que se pueda mejorar una animación sin costar mucho tiempo, merece la pena. Hay otras propiedades, según he ido leyendo y no probado por mi mismo, que también se mejoran usando "transform". Dejo el código de las dos animaciones (sin añadir los "vendor" para todos los navegadores).

```
@keyframes animationOne {
  0% {
    opacity:1;
    transform: translate(0,30px) rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ;
    box-shadow: 1px 1px 5px rgba(50,65,66,0.9); }
  50% {
    transform: translate(120px,110px) scaleX(1.2) scaleY(1.2) ;
    box-shadow: 0px 0px 60px rgba(50,65,66,0.5); }
  100% {
    opacity:1;
    transform: translate(300px,150px) rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ;
    box-shadow: 1px 1px 5px rgba(50,65,66,0.9); }
}

@keyframes animationTwo {
  0% {
    top:220px;
    left:30px;
    opacity:1;
    transform: rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ;
    box-shadow: 1px 1px 5px rgba(50,65,66,0.9); }
  50% {
    top:300px;
    left:150px;
    transform: scaleX(1.2) scaleY(1.2) ;
    box-shadow: 0px 0px 60px rgba(50,65,66,0.5); }
  100% {
    top:340px;
    left:330px;
    opacity:1;
    transform: rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ;
    box-shadow: 1px 1px 5px rgba(50,65,66,0.9); }
}
```

Conforme descubra mejoras en las animaciones con CSS3 y merezcan la pena, las iré publicando. <!\-\- .relativo{ position: relative; height:420px; background-color:#bbb; } .elemento1, .elemento2{ position:absolute; left:30px; padding:10px; background-color:rgba(231,175,54,1); color:rgba(253,251,208,1); box-shadow:rgba(50,65,66,1); font-size: 20px; font-family: arial; text-shadow:1px 1px 5px rgba(50,65,66,1); } .elemento1{ top:30px; animation-iteration-count: infinite; animation-direction:alternate; animation-fill-mode:forwards; /\*when the spec is finished\*/ -webkit-animation: animationOne linear 15s; -webkit-animation-iteration-count: infinite; -webkit-animation-direction:alternate; -webkit-animation-fill-mode:forwards; /\*Chrome 16+, Safari 4+\*/ -moz-animation: animationOne linear 15s; -moz-animation-iteration-count: infinite; -moz-animation-direction:alternate; -moz-animation-fill-mode:forwards; /\*FF 5+\*/ -o-animation: animationOne linear 15s; -o-animation-iteration-count: infinite; -o-animation-direction:alternate; -o-animation-fill-mode:forwards; /\*Not implemented yet\*/ -ms-animation: animationOne linear 15s; -ms-animation-iteration-count: infinite; -ms-animation-direction:alternate; -ms-animation-fill-mode:forwards; /\*IE 10+\*/ } .elemento2{ top:220px; animation-iteration-count: infinite; animation-fill-mode:forwards; /\*when the spec is finished\*/ animation-direction:alternate; -webkit-animation: animationTwo linear 15s; -webkit-animation-iteration-count: infinite; -webkit-animation-direction:alternate; -webkit-animation-fill-mode:forwards; /\*Chrome 16+, Safari 4+\*/ -moz-animation: animationTwo linear 15s; -moz-animation-iteration-count: infinite; -moz-animation-fill-mode:forwards; /\*FF 5+\*/ -moz-animation-direction:alternate; -o-animation: animationTwo linear 15s; -o-animation-iteration-count: infinite; -o-animation-fill-mode:forwards; /\*Not implemented yet\*/ -o-animation-direction:alternate; -ms-animation: animationTwo linear 15s; -ms-animation-iteration-count: infinite; -ms-animation-fill-mode:forwards; /\*IE 10+\*/ -ms-animation-direction:alternate; } @keyframes animationOne { 0% { opacity:1; transform: translate(0,30px) rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } 50% { transform: translate(120px,110px) scaleX(1.2) scaleY(1.2) ; box-shadow: 0px 0px 60px rgba(50,65,66,0.5); } 100% { opacity:1; transform: translate(300px,150px) rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } } @-webkit-keyframes animationOne { 0% { opacity:1; -webkit-transform: translate(0,30px) rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -webkit-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } 50% { -webkit-transform: translate(120px,110px) scaleX(1.2) scaleY(1.2) ; -webkit-box-shadow: 0px 0px 60px rgba(50,65,66,0.5); } 100% { opacity:1; -webkit-transform: translate(300px,150px) rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -webkit-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } } @-moz-keyframes animationOne { 0% { opacity:1; -moz-transform: translate(0,30px) rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -moz-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } 50% { -moz-transform: translate(120px,110px) scaleX(1.2) scaleY(1.2) ; -moz-box-shadow: 0px 0px 60px rgba(50,65,66,0.5); } 100% { opacity:1; -moz-transform: translate(300px,150px) rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -moz-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } } @-o-keyframes animationOne { 0% { opacity:1; -o-transform: translate(0,30px) rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -o-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } 50% { -o-transform: translate(120px,110px) scaleX(1.2) scaleY(1.2) ; -o-box-shadow: 0px 0px 60px rgba(50,65,66,0.5); } 100% { opacity:1; -o-transform: translate(300px,150px) rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -o-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } } @-ms-keyframes animationOne { 0% { opacity:1; -ms-transform: translate(0,30px) rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -ms-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } 50% { -ms-transform: translate(120px,110px) scaleX(1.2) scaleY(1.2) ; -ms-box-shadow: 0px 0px 60px rgba(50,65,66,0.5); } 100% { opacity:1; -ms-transform: translate(300px,150px) rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -ms-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } } @keyframes animationTwo { 0% { top:220px; left:30px; opacity:1; transform: rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } 50% { top:300px; left:150px; transform: scaleX(1.2) scaleY(1.2) ; box-shadow: 0px 0px 60px rgba(50,65,66,0.5); } 100% { top:340px; left:330px; opacity:1; transform: rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } } @-webkit-keyframes animationTwo { 0% { top:220px; left:30px; opacity:1; -webkit-transform: rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -webkit-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } 50% { top:300px; left:150px; -webkit-transform: scaleX(1.2) scaleY(1.2) ; -webkit-box-shadow: 0px 0px 60px rgba(50,65,66,0.5); } 100% { top:340px; left:330px; opacity:1; -webkit-transform: rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -webkit-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } } @-moz-keyframes animationTwo { 0% { top:220px; left:30px; opacity:1; -moz-transform: rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -moz-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } 50% { top:300px; left:150px; -moz-transform: scaleX(1.2) scaleY(1.2) ; -moz-box-shadow: 0px 0px 60px rgba(50,65,66,0.5); } 100% { top:340px; left:330px; opacity:1; -moz-transform: rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -moz-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } } @-o-keyframes animationTwo { 0% { top:220px; left:30px; opacity:1; -o-transform: rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -o-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } 50% { top:300px; left:150px; -o-transform: scaleX(1.2) scaleY(1.2) ; -o-box-shadow: 0px 0px 60px rgba(50,65,66,0.5); } 100% { top:340px; left:330px; opacity:1; -o-transform: rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -o-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } } @-ms-keyframes animationTwo { 0% { top:220px; left:30px; opacity:1; -ms-transform: rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -ms-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } 50% { top:300px; left:150px; -ms-transform: scaleX(1.2) scaleY(1.2) ; -ms-box-shadow: 0px 0px 60px rgba(50,65,66,0.5); } 100% { top:340px; left:330px; opacity:1; -ms-transform: rotate(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg) ; -ms-box-shadow: 1px 1px 5px rgba(50,65,66,0.9); } } -->