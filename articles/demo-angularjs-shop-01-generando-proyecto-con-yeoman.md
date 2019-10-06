---
title: Demo AngularJS shop - 01 Generando proyecto con Yeoman
description: Primera parte de aplicación Angular 1 para construir listado de productos. Generando proyecto con Yeoman
published: true
tags: AngularJS,Css3,JavaScript
ctime: Thu, 07 Aug 2014 14:04:43 +0000
---

Primer vídeo del proyecto construido con **AngularJS** en el que voy a simular una aplicación de una tienda que contiene un catálogo de productos. No pretendo abarcar todas las funcionalidades de una tienda en sí.

Los productos poseen características como: <code>nombre</code>, <code>descripcion</code>, <code>imagenes</code>, <code>precio</code>, <code>stock</code> y <code>novedad</code>. El fin de la aplicación será aprovechar la potencia de AngularJS para construir un catálogo de productos que muestre u oculte productos o añada aspectos gráficos, usando directivas, controladores, vistas y quizá algo más según avance.

Para construir el proyecto **AngularJS** usaré **Yeoman**: <a href="http://yeoman.io/" title="Abre en ventana nueva la web Yeoman" target="_blank">Yeoman</a>, utilidad muy interesante para empezar a trabajar proyectos variados (Wordpress, Foundation Zurb, Phone Gap...). Se necesita tener instalado <a href="http://nodejs.org/" title="Abre en ventana nueva web NodeJS" target="_blank">NodeJS</a>. En el repositiorio GitHub de Yeoman para AngularJS se muestran los comandos necesarios para crear el proyecto: <a href="https://github.com/yeoman/generator-angular" title="Abre en ventana nueva proyecto GitHub de AngularJS y Yeoman" target="_blank">Proyecto en GitHub de Yeoman - AngularJS</a>  

## Proyecto Angular 1 con Yeoman

Creación de el directorio contenedor de la aplicación:

```shell
mkdir ngdemo
```

Acceso al directorio:

```shell
cd ngdemo
```

Crear proyecto con Yeoman:

```shell
yo angular ngdemo
```

Para arrancar el servidor y probar que corre bien:

```shell
grunt serve
```

Aquí el vídeo explicando el proceso:

<div class="ratio-16-9">
    <iframe title="Demo AngularJS Shop - Yeoman Generator" type="text/html" src="http://www.youtube.com/embed/SRBe_1FBSMg?autoplay=0&origin=https://ivanalbizu.eu/" frameborder="0"></iframe>
</div>

En siguientes vídeos comenzaré a trabajar con AngularJS.