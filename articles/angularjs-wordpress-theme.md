---
title: AngularJS Wordpress Theme
published: true
description: Wordpress Theme para AngularJS 1, con Wp Rest Api y Advanced Custom Fields (ACF)
tags: AngularJS,JavaScript,Php,Sass,Wordpress
ctime: Wed, 26 Oct 2016 21:09:21
---

Angular Wordpress Theme. Plantilla **Wordpress** construida con **AngularJS**, Wp Rest Api, ACF El código se encuentra en mi [GitHub](https://github.com/ivanalbizu/Angular-Wordpress-Theme/blob/master/README.md) Los pasos son los siguientes.

## Después de habilitar el tema

*   Instalar y habilitar los plugins
*   Especificar la ruta base de la instalación. En header.php la etiqueta <base href="/wordpress/">
*   Importar los custom fields con el archivo "advanced-custom-field-export.xml"
*   Editar el formulario de contacto que generar Contact Form 7 por defecto.
    *   Al campo correo electrónico añadir la siquiente ID: id:checkvalid
    *   Al campo submit añadir las siguientes clases: class:waves-effect class:waves-light class:btn class:cyan class:darken-3

## Crear contenido

*   Crear una página y añadir los campos necesarios
*   Hay dos tipo de entradas: ventas y alquileres. Crear contenido para ambos (para el tipo venta hay un campo llamado "Destacada venta", la entrada que la tenga marcada se mostrará en la Home)

Para ver la demo en funcionamiento: [http://inmo.mentiraspoliticas.es](http://inmo.mentiraspoliticas.es)