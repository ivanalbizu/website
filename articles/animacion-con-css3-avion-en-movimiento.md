---
title: Animación con css3 - Avión en movimiento
published: true
description: Animación con css3 para crear efecto de movimiento
tags: Css3,JavaScript
ctime: Fri, 21 Feb 2014 09:47:56 +0000
---

**Animación con css3** para crear movimiento de un avión y de su fondo. Se crean controles, mediante simples **funciones javascript**, que permitan aumentar o disminuir la velocidad, parar y reanudar la animación css3. Para esta animación he necesitado:

*   Una **imagen de fondo** simétrica .
*   **Imagen de un avión**.

<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<title>Animación css3</title>
	<script type="text/javascript" src="js/script.js"></script>
	<link rel="stylesheet" href="css/style.css" type="text/css" />
</head>
<body>

<div id="visor">
	<!-- Se usan dos imágenes como paisaje para que el comienzo de una -->
	<!-- seel fin de la otra y viceversa -->
	<img src="img/paisaje.jpg" alt="paisaje" id="paisaje">
	<img src="img/paisaje.jpg" alt="paisaje" id="paisaje2">
	<img src="img/plane.png" alt="avión volando" id="avion">
</div>
<button id="parar" type="button" onclick="parar()">parar</button>
<button id="reanudar" type="button" onclick="reanudar()">reanudar</button>
<form name="formulario">
	<!-- El valor contenido en value es el usado para cambiar la duración de la animación -->
	<select name="velocidad" onchange="cambiar_velocidad()">
		<option value="10s" selected="selected">Normal</option>
		<option value="5s">Rápido</option>
		<option value="2s">Extra Rápido</option>
		<option value="15s">Lento</option>
		<option value="25s">Extra Lento</option>
	</select>
</form>

</body>
</html>

La imagen de fondo es simétrica y de ancho es el doble a la zona visible de la animación. En mi caso la imagen es de 1200px y el visor (#visor) de 600px. La imagen de fondo la he usado en dos cajas: #paisaje y #paisaje2. El movimiento lo he realizado con **keyframes**, y aplicado sobre las dos capas anteriores modificando el valor de "left", y cada capa moviéndose una justo al lado de la otra. El avión también recibe movimiento variando su posicionamiento con top y left. Ambas animaciones css3 se repiten infinítamente. Para el paisaje un ciclo de la animación dura 10 segundos y para el avión 13 segundos.

```
#visor {
	position:absolute;
	overflow:hidden;
	width:600px;
	height:400px;
}
#paisaje, #paisaje2 {
	position:absolute;
	width:1200px;
	height:400px;
}
#avion {
	position:absolute;
	width:50px;
	top:30px;
	left:140px;
}
@keyframes paisaje {
	from	{left:1200px;}
	to		{left:0px;}	}
@-webkit-keyframes paisaje {
	from	{left:1200px;}
	to		{left:0px;}	}
@-moz-keyframes paisaje {
	from	{left:1200px;}
	to		{left:0px;}	}
@keyframes paisaje2 {
	from	{left:0px;}
	to		{left:-1200px;}	}
@-webkit-keyframes paisaje2 {
	from	{left:0px;}
	to		{left:-1200px;}	}
@-moz-keyframes paisaje2 {
	from	{left:0px;}
	to		{left:-1200px;}	}
@keyframes avion {
	0% {left:30px; top: 20px;}
	20% {left:60px; top: 30px;}
	70% {left:35px; top: 60px;}
	100% {left:30px; top: 20px;} }
@-webkit-keyframes avion {
	0% {left:30px; top: 20px;}
	20% {left:60px; top: 30px;}
	70% {left:35px; top: 60px;}
	100% {left:30px; top: 20px;} }
#avion {
	animation:avion 13s infinite linear;
	-webkit-animation:avion 13s infinite linear;
}
#paisaje {
	animation:paisaje 10s infinite linear;
	-webkit-animation:paisaje 10s infinite linear; }
#paisaje2 {
	animation:paisaje2 10s infinite linear;
	-webkit-animation:paisaje2 10s infinite linear; }

button#parar, button#reanudar {
	position: absolute;
	top:420px;
}
button#reanudar {left:60px;}
form {
	position: absolute;
	top:450px;
}
```

Para crear las funcionalidades de parar, reanudar, incrementar o disminuir la velocidad se han creado tres funciones.

*   parar();
*   reanudar();
*   cambiar_velocidad();

Para las tres funciones lo que se hace es rescatar con javascript los elementos por su identificador (#ID - #paisaje, #paisaje2, #avion) y cambiando su estilo según se trate. El caso de cambiar la velocidad he usado una lista desplegable (select) en el que tienen unos valores (values) concretos. Estos valores serán los capturados en el script y luego se pasan al css.

```
// Función para parar la animación
function parar() {
	//Se obtiene por el ID el elemento, y se modifica el estilo de la animación
	//El segundo elementno hace referencia a la duración, se establece en 0 segundos
	//animation:nombre tiempo repetición función_de_la_animación;
	document.getElementById("paisaje").style.animation="paisaje 0s infinite linear";
	document.getElementById("paisaje").style.webkitAnimation="paisaje 0s infinite linear";
	document.getElementById("paisaje2").style.animation="paisaje2 0s infinite linear";
	document.getElementById("paisaje2").style.webkitAnimation="paisaje2 0s infinite linear";
	document.getElementById("avion").style.animation="avion 0s infinite linear";
	document.getElementById("avion").style.webkitAnimation="avion 0s infinite linear";
}
// Función para reanudar la animación
function reanudar() {
	//idem parar
	document.getElementById("paisaje").style.animation="paisaje 10s infinite linear";
	document.getElementById("paisaje").style.webkitAnimation="paisaje 10s infinite linear";
	document.getElementById("paisaje2").style.animation="paisaje2 10s infinite linear";
	document.getElementById("paisaje2").style.webkitAnimation="paisaje2 10s infinite linear";
	document.getElementById("avion").style.animation="avion 10s infinite linear";
	document.getElementById("avion").style.webkitAnimation="avion 10s infinite linear";
}
// Función para cambiar la velocidad de la animación
function cambiar_velocidad() {
	//Se selecciona la lista
	seleccion = document.formulario.velocidad.selectedIndex;
	//Se obtiene el value del item seleccionado
	j = document.formulario.velocidad.options[seleccion].value;
	//Se establece la duración de la animación, a menos tiempo, más rápido, y viceversa
	document.getElementById("paisaje").style.animation="paisaje "+j+" infinite linear";
	document.getElementById("paisaje").style.webkitAnimation="paisaje "+j+" infinite linear";
	document.getElementById("paisaje2").style.animation="paisaje2 "+j+" infinite linear";
	document.getElementById("paisaje2").style.webkitAnimation="paisaje2 "+j+" infinite linear";
}
```

Si quieres puedes descargar la animación pulsando en el enlace [Animación css3 y controles javascript](https://drive.google.com/open?id=0BzQS5pOyF_HjbzZoY3U1eDJNMTQ "Animación css3 y javascript")