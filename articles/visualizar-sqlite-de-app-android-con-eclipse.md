---
title: 'Visualizar SQLite de app Android con Eclipse'
date: Tue, 13 Jan 2015 16:57:28 +0000
published: true
tags: Android,Eclipse
---

Mediante un plugin Jar y unos sencillos pasos se puede visualizar una base de datos SQLite Pasos:

*   [Descargar plugin](https://drive.google.com/uc?export=download&id=0B62RQ5qnJbU1cHNLaVRIVnZCd2M "Enlace a descarga delPlugin")
*   Ubicarlo en la carpeta de Eclipse: _eclipse/dropins_
*   Reiniciar Eclipse
*   En Eclipse pinchar en _Window - Show view - Others - Other - Questoid SQLite Manager_
*   Si no se tiene activada la vista DDMS, se habilita _Window - Open perspective - Other - DDMS_
*   Localizar la base de datos navegando por el File Explorer
*   Una vez clickeado la base de datos, localizar y pulsar el botón azul en la parte superior derecha del File Explorer
*   Se debería ver en un Frame de Eclipse (cerca del LogCat y Console) una nueva pestaña llamada Questoid SQLite Browser

Espero que sirva.