---
title: GridView con librería Picasso ViewHolder
published: true
description: Construcción de GridView de Android usando la viewHolder sin usar librerias como Picasso
tags: Android,Java
ctime: Sat, 27 Dec 2014 18:09:17 +0000
---

En esta entrada voy a realizar una variante del primer post sobre <a href="gridview-con-libreria-picasso/">Artículo uso librería Picasso</a>.

En este caso mostraré una información adicional. Se trata de ubicar un <code>TextView</code> que muestre cual es el dominio extraído de la URL de la imagen. Voy a crear para ello nuevos archivos:

<ul class="list-bullets">
    <li>La clase Pojo se llama <code>Imagen.java</code> con un atributo <code>String</code> para imagen</li>
    <li>La clase <code>Imagenes.java</code> donde estarán las imágenes a cargar</li>
    <li>La vista de las imágenes y textos en <code>molde.xml</code>. <code>ImageView</code> y <code>TextView</code> dentro de un <code>RelativeLayout</code>.</li>
</ul>

Voy a modificar los siguientes archivos:

<ul class="list-bullets">
    <li><code>GridviewAdapter.java</code></li>
    <li><code>MainActivity.java</code></li>
</ul>

## Modificación de GridviewAdapter.java

<ul class="list-bullets">
    <li>Se usa un método, <code>getDomainName(String url)</code>, al que se le pasa una URL y devuelve el dominio</li>
    <li>Se crea clase <code>ViewHolder</code> con dos variables de tipos <code>ImageView</code> y <code>TextView</code></li>
    <li>Método <code>getView(...):</code>
        <ul class="list-bullets">
            <li>Las primeras líneas capturan el ancho de pantalla y para luego, con Picasso redimensionarlas mediante <code>resize(imageWidth, imageWidth)</code></li>
            <li>Se declara el objeto patrón de tipo <code>ViewHolder</code></li>
            <li>Dentro de claúsula <code>if</code> se instancia el patrón, se guarda dentro de <code>convertView</code> el layout de la vista, se obtienen las referencias de la imagen y el texto. Al <code>convertView</code> se le asigna un Tag con <code>setTag(...)</code> para después poder llamarla</li>
            <li>En la claúsula <code>else</code> se le pasa al patrón las referencias del <code>convertView</code> mediante <code>getTag()</code></li>
            <li>Al <code>TextView</code> se le asigna el texto mediante <code>patron.texto.setText(getDomainName(items[position].getImagen()))</code></li>
            <li>La imagen se introduce especificando el ítem sobre el que se itera <code>load(items[position])</code> y se establece al <code>ImageView</code> mediante <code>into(patron.imagen)</code></li>
        </ul>
    </li>
</ul>

## Creación del layout

Se crea el archivo <code>molde.xml</code>. Se usa un RelativeLayout para contener el <code>ImageView</code> y el <code>TextView</code>

## Clase Pojo

Sólo tiene un atributo la clase <code>Imagen.java</code>, que será de tipo <code>String</code>. Con su constructor y sus Getters y Setters.

## Clase que contiene las URL de las imágenes

Se trata de construir con un array de imágenes y la clase Pojo todas las imágenes a usar.

## MainActivity.java

Se instancia el Adaptador del <code>GridgenyView</code> y el <code>GridView</code> del layout. En <code>onCreate(...)</code> se le pasa al adaptador el array de imágenes de la clase Imagenes.java.

Y el vídeo del paso a paso

<div class="ratio-16-9">
    <iframe title="Android Gridview usando ViewHolder con libreria Picaso" type="text/html" src="http://www.youtube.com/embed/KRIBZyP1hd8?autoplay=0&origin=https://ivanalbizu.eu/" frameborder="0"></iframe>
</div>

Descargar [GridView con Picasso](https://db.tt/VbNEyPFs "GridView con Picasso ViewHolder")