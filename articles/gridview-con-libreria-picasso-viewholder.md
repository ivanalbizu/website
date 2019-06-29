---
title: 'GridView con librería Picasso ViewHolder'
date: Sat, 27 Dec 2014 18:09:17 +0000
published: true
tags: Android,Java
---

En esta entrada voy a realizar una variante del primer post sobre [librería Picasso.](http://ivanalbizu.eu/gridview-con-libreria-picasso/ "Artículo uso librería Picasso") En este caso mostraré una información adicional. Se trata de ubicar un TextView que muestre cual es el dominio extraído de la URL de la imagen. Voy a crear para ello nuevos archivos:

*   La clase Pojo se llama **Imagen.java** con un atributo String para imagen
*   La clase **Imagenes.java** donde estarán las imágenes a cargar
*   La vista de las imágenes y textos en **molde.xml**. ImageView y TextView dentro de un RelativeLayout.

Voy a modificar los siguientes archivos:

*   GridviewAdapter.java
*   MainActivity.java

## 1. Modificación de GridviewAdapter.java:

*   Se usa un método, getDomainName(String url), al que se le pasa una URL y devuelve el dominio
*   Se crea clase ViewHolder con dos variables de tipos ImageView y TextView
*   Método getView(...):
    *   Las primeras líneas capturan el ancho de pantalla y para luego, con Picasso redimensionarlas mediante **resize(imageWidth, imageWidth)**
    *   Se declara el objeto patrón de tipo ViewHolder
    *   Dentro de claúsula "if" se instancia el patrón, se guarda dentro de convertView el layout de la vista, se obtienen las referencias de la imagen y el texto. Al convertView se le asigna un Tag con **setTag(...)** para después poder llamarla
    *   En la claúsula "else" se le pasa al patrón las referencias del convertView mediante **getTag()**
    *   Al TextView se le asigna el texto mediante **patron.texto.setText(getDomainName(items[position].getImagen()))**
    *   La imagen se introduce especificando el ítem sobre el que se itera **load(items[position])** y se establece al ImageView mediante **into(patron.imagen)**

## 2. Creación del layout

Se crea el archivo molde.xml. Se usa un RelativeLayout para contener el ImageView y el TextView

## 3. Clase Pojo

Sólo tiene un atributo la clase Imagen.java, que será de tipo String. Con su constructor y sus Getters y Setters.

## 4. Clase que contiene las URL de las imágenes.

Se trata de construir con un array de imágenes y la clase Pojo todas las imágenes a usar.

## 5. MainActivity.java

Se instancia el Adaptador del GridgenyView y el GridView del layout. En onCreate(...) se le pasa al adaptador el array de imágenes dela clase Imagenes.java. Descargar [GridView con Picasso](https://db.tt/VbNEyPFs "GridView con Picasso ViewHolder")