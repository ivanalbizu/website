---
title: AngularJS Wordpress Theme
published: true
description: Construcción de Theme Wordpress con AngularJS 1, usando plugins de Wordpress Wp Rest Api para generar JSON de las entradas y Advanced Custom Fields (ACF) para añadir nuevos campos
tags: AngularJS,JavaScript,Php,Sass,Wordpress
ctime: Wed, 26 Oct 2016 21:09:21 +0000
---

## Instalación
Instalar el tema que se encuentra en mi <a href="https://github.com/ivanalbizu/Angular-Wordpress-Theme/" target="_blank">GitHub</a>.

## Después de habilitar el tema

<ul class="list-bullets">
    <li>Instalar y habilitar los plugins</li>
    <li>Especificar la ruta base de la instalación. En header.php la etiqueta <base href="/wordpress/"></li>
    <li>Importar los custom fields con el archivo "advanced-custom-field-export.xml"</li>
    <li>Editar el formulario de contacto que generar Contact Form 7 por defecto.</li>
    <ul class="list-bullets">
        <li>Al campo correo electrónico añadir la siquiente ID: id:checkvalid</li>
        <li>Al campo submit añadir las siguientes clases: waves-effect waves-light btn cyan darken-3</li>
    </ul>
</ul>

## Crear contenido

<ul class="list-bullets">
    <li>Crear una página y añadir los campos necesarios</li>
    <li>Hay dos tipo de entradas: ventas y alquileres. Crear contenido para ambos (para el tipo venta hay un campo llamado "Destacada venta", la entrada que la tenga marcada se mostrará en la Home)</li>
</ul>

Para ver la demo en funcionamiento: [http://inmo.mentiraspoliticas.es](http://inmo.mentiraspoliticas.es)