---
title: Menú apple con css
published: true
description: Recreación de Html y Css del menú usado por Apple
tags: Css3,Sass
ctime: Sat, 15 Feb 2014 22:17:54
---

**Menú apple con css**, construido usando **Sass**. En este artículo quería compartir como he reproducido el menú de navegación de la web de Apple, sin usar imágenes, sólo con degradados de css3 y jugando con los bordes para crear los diferentes botones. Se obtiene también las sombras y los bordes redondeados. El aspecto que no he tratado de reproducir ha sido el último botón, el de la búsqueda. Para realizar el menú he usado **SASS** para ahorrar un poco de tiempo, y para que cada cambio en colores o degradados suponga cambiar menos información en la hoja de estilos, ya que con sass se pueden usar variables, funciones y otras muchas cosas. Aquí se puede ver la hoja de estilos **.scss**

```
@import "compass";
@mixin shadow_nav($left, $top, $blur, $color){
  box-shadow:$left $top $blur $color;
}
@mixin borde_interior($color,$transparencia){
  border-right:1px solid rgba($color,$color,$color,$transparencia);
  border-left:1px solid rgba($color,$color,$color,$transparencia);
}

*{
	margin:0;
	padding:0;	
}
body {
	font-family: 'Dosis', sans-serif;
	font-size:1em;
	margin:30px;
	background:rgba(249,238,223,0.1) url('../img/noise.png') repeat;
}

a, a:visited {
	color:#fff;
	text-shadow:-1px -1px 3px #333;
	text-decoration:none;
}
nav ul {
	display:inline-block;
	width:auto;
	background-color:rgba(100,100,100,0.95);
	border-top:1px solid rgba(100,100,100,0.9);
	border-bottom:1px solid rgba(100,100,100,1);
	border-radius:5px;
	@include shadow_nav(1px,1px,3px,rgba(100,100,100,.8));
}
nav ul li {
	width:104px;
	float:left;
	list-style:none;
	margin-right: 1px;
	@include borde_interior(130,0.99);
  text-align:center;
}
nav ul li:first-child, nav ul li:first-child a{
	border-left:0;
	border-top-left-radius:5px;
	border-bottom-left-radius:5px;
}
nav ul li:last-child, nav ul li:last-child a{
	border-right:0;
	border-top-right-radius:5px;
	border-bottom-right-radius:5px;
}
nav ul li a, .explorer a {
	display: block;
	padding:8px 25px;
	background-color: rgb(138,138,138);
	@include filter-gradient(#8a8a8a, #767676, vertical);
	$experimental-support-for-svg: true;
	@include background-image(linear-gradient(top,  rgb(138,138,138) 0%,rgb(138,138,138) 3%,rgb(120,120,120) 24%,rgb(111,111,111) 48%,rgb(93,93,93) 52%,rgb(97,97,97) 73%,rgb(109,109,109) 91%,rgb(118,118,118) 100%));
}
nav ul li:hover a{
	background: rgb(60,60,60);
	background: -moz-radial-gradient(center, ellipse cover,  rgb(60,60,60) 0%, rgb(60,60,60) 20%, rgb(71,71,71) 64%, rgb(102,102,102) 100%);
	background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgb(60,60,60)), color-stop(20%,rgb(60,60,60)), color-stop(64%,rgb(71,71,71)), color-stop(100%,rgb(102,102,102)));
	background: -webkit-radial-gradient(center, ellipse cover,  rgb(60,60,60) 0%,rgb(60,60,60) 20%,rgb(71,71,71) 64%,rgb(102,102,102) 100%);
	background: -o-radial-gradient(center, ellipse cover,  rgb(60,60,60) 0%,rgb(60,60,60) 20%,rgb(71,71,71) 64%,rgb(102,102,102) 100%);
	background: -ms-radial-gradient(center, ellipse cover,  rgb(60,60,60) 0%,rgb(60,60,60) 20%,rgb(71,71,71) 64%,rgb(102,102,102) 100%);
	background: radial-gradient(ellipse at center,  rgb(60,60,60) 0%,rgb(60,60,60) 20%,rgb(71,71,71) 64%,rgb(102,102,102) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3c3c3c', endColorstr='#666666',GradientType=1 );
}
nav ul li:hover {
  width:106px;
  border-left:0;
  border-right:0;
}
nav ul li:last-child:hover {
  width:105px;
  border-left:1px;
}
nav ul li:first-child:hover {
  width:105px;
  border-right:1px;
}
```

Aquí el contenido del archivo **.html**

```
<!doctype html>
<html lang="es">
<head>
	<meta charset="UTF-8" />
	<title>Menú apple con css</title>
	<link href='http://fonts.googleapis.com/css?family=Dosis:400,500' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="../css/style.css" type="text/css" media="screen" title="no title" charset="utf-8"/>
	<!--\[if gte IE 9\]>
		<style type="text/css">
			.explorer a { filter: none; }
		</style>
	<!\[endif\]-->	
</head>
<body>
<div id="contenedor">
	<nav>
		<ul class="explorer">
			<li><a href="#"><img src="img/apple.png" alt="" /></a></li>
			<li><a href="#">Store</a></li>
			<li><a href="#">Mac</a></li>
			<li><a href="#">iPod</a></li>
			<li><a href="#">iPhone</a></li>
			<li><a href="#">iPad</a></li>
			<li><a href="#">iTunes</a></li>
			<li><a href="#">Soporte</a></li>
			<li><a href="#">Search</a></li>
		</ul>
	</nav>
</div>
</body>
</html>
```

Me gustaría destacar la comprobación del navegador del usuario, para saber si usa una versión de internet explorer inferior a la 9, para que pueda visualizarse correctamente. Si quieres descargare el menú y probarlo directamente, puedes hacerlo en el siguiente enlace. [Descargar menú apple con css](https://dl.dropboxusercontent.com/u/12043780/ivanalbizu.eu/menu_apple_con_css.zip "Menú Apple con ccs")