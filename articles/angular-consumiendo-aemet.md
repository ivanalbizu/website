---
title: Angular consumiendo de AEMET
published: true
description: Angular consumiendo datos de la AEMET en formato Xml.
tags: AngularJS,JavaScript,Php
ctime: Wed, 07 Dec 2016
cover_image: angular-consumiendo-aemet.jpg
---

Angular consumiendo datos de la AEMET en formato Xml. Los datos que proporciona la [AEMET](http://www.aemet.es/es/datos_abiertos) son en formato Xml. Para consumirlos he transformado los datos a Json mediante Php. En varios archivos tengo la lista de provincias y localidades con formato Json, por lo que la única petición a la web de la AEMET es para obtener los datos de la localidad seleccionada. La petición es tratada con con Php para las transformaciones y con [SlimPHP](https://www.slimframework.com/) para obtener el identificador de la localidad. La maquetación está con Bootstrap y [Bootstrap Material](http://fezvrasta.github.io/bootstrap-material-design/), y los iconos usados [Weather icons](https://erikflowers.github.io/weather-icons/). El código completo se encuentra en mi [GitHub](https://github.com/ivanalbizu/angular-consuming-aemet). Y el [ejemplo funcionando](http://mentiraspoliticas.es/projects/aemet/app/#/).