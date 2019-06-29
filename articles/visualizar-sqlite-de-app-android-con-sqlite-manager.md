---
title: 'Visualizar SQLite de app Android con SQLite manager'
date: Wed, 14 Jan 2015 15:34:59 +0000
published: true
tags: Android,Eclipse,Pildoritas
---

En mi anterior entrada publiqué los pasos para poder [ver una base de datos SQLite](http://ivanalbizu.eu/visualizar-sqlite-de-app-android-con-eclipse/ "Ver estructura de base de datos SQLite en Eclipse") generada en un proyecto Android usando para ello un plugin en Eclipse. Otra manera de verla, y además poder realizar operaciones sobre la base de datos (tipo CRUD), es usando un plugin para Firefox llamada SQLite Manager. Los pasos para llevarlo a cabo.

1.  Ver vista DDMS en Eclipse
2.  Localizar pestaña File Explorer
3.  Localizar y seleccionar la base de datos de nuestro proyecto (**data/data/nombre\_de\_paquete/databases/nuestra\_base\_datos**)
4.  Exportar la base de datos (primer icono de la pestaña File Explorer -Pull a file from the device-)
5.  Guardar donde queramos (sin olvidar extensión .sqlite)
6.  Localizar e instalar en Firefox el complemento llamado SQLite Manager
7.  Ejecutar el complemento
8.  Abrir la base de datos. _Menú Base de datos - Conectar a base de datos_

Espero que sea útil.