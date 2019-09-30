---
title: Visualizar SQLite de app Android con SQLite manager
published: true
description: Visualizar base de datos SQLite en aplicación Android con plugin para Firefox llamado SQLite manager
tags: Android,Eclipse,Pildoritas
ctime: Wed, 14 Jan 2015 15:34:59 +0000
---

En mi anterior entrada publiqué los pasos para poder <a href="visualizar-sqlite-de-app-android-con-eclipse">ver una base de datos SQLite</a> "Ver estructura de base de datos SQLite en Eclipse") generada en un proyecto Android usando para ello un plugin en Eclipse.

Otra manera de verla, y además poder realizar operaciones sobre la base de datos (tipo CRUD), es usando un plugin para Firefox llamada SQLite Manager. Los pasos para llevarlo a cabo.

<ol class="list-bullets">
    <li>Ver vista DDMS en Eclipse</li>
    <li>Localizar pestaña File Explorer</li>
    <li>Localizar y seleccionar la base de datos de nuestro proyecto (<code>data/data/nombre_de_paquete/databases/nuestra_base_datos</code>)</li>
    <li>Exportar la base de datos (primer icono de la pestaña File Explorer -Pull a file from the device-)</li>
    <li>Guardar donde queramos (sin olvidar extensión <code>.sqlite</code>)</li>
    <li>Localizar e instalar en Firefox el complemento llamado SQLite Manager</li>
    <li>Ejecutar el complemento</li>
    <li>Abrir la base de datos. Menú Base de datos - Conectar a base de datos</li>
</ol>

Espero que sea útil.