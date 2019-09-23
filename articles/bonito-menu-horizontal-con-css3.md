---
title: Bonito menú horizontal con Css3
description: Menú horizontal con css3
published: true
tags: Css3
ctime: Thu, 13 Feb 2014 18:58:52 +0000
---

Menú horizontal construido con CSS3. Con pocas líneas de código se consigue este menú. Lo he adaptado para que se vea bien en la entrada de mi blog. Si se quiere se puede adaptar perfectamente para una web de ancho corriente (980px). Cambiando el ancho de contenedor de 700px a 980px y añadiendo dos ítem más de menú, la apariencia del **menú con Css3** queda muy bonita. Tiene una pequeña animación a situar el ratón sobre uno de los elementos del menú. Se trata de  cambiar el color y la dimensión e del ítem en cuestión. Para este último punto, la opción que me ha parecido más fácil de implementar ha sido aumentar (del selector "a") el **line-height 4px** y un **margin-top  -2px** para conseguir la apariencia de centrado en vertical. Aquí se puede ver el código fuente del archivo _css_.

```
body {
	font-family:'Verdana', sans-serif;
	background:#D8D8D8 url('../img/noise.png') repeat;
}
#contenedor {
	width:700px;
	margin:0 auto;
}
nav {
	font-size:1.2em;
	width:100%;
	height:80px;
	display: block;
	background-color: rgba(51, 51, 51, 1);
	-webkit-box-shadow: 2px 2px 3px #aaa, -2px 2px 3px #aaa;
	-moz-box-shadow:    2px 2px 3px #aaa, -2px 2px 3px #aaa;
	-ms-box-shadow:     2px 2px 3px #aaa, -2px 2px 3px #aaa;
	-o-box-shadow:      2px 2px 3px #aaa, -2px 2px 3px #aaa;
	box-shadow:         2px 2px 3px #aaa, -2px 2px 3px #aaa;
}
ul {
	margin:0;
	padding:0;
	height: 100%;
}
ul li {
	list-style:none;
	float:left;
	text-align:center;
	margin:0 10px;
}
ul li a {
	width:120px;
	text-decoration:none;
	display:block;
	color:white;
	line-height:80px;

	-webkit-transition: all 0.1s ease;
	-moz-transition:    all 0.1s ease;
	-ms-transition:     all 0.1s ease;
	-o-transition:      all 0.1s ease;
	transition:         all 0.1s ease;
}
ul li a:hover, ul li a.activo {
	background-color:rgba(155, 28, 38, 1);
	margin-top:-2px;
	line-height:84px;
	-webkit-box-shadow: 0px 3px 10px 1px rgba(50, 50, 50, 0.90);
	-moz-box-shadow:    0px 3px 10px 1px rgba(50, 50, 50, 0.90);
	-ms-box-shadow:     0px 3px 10px 1px rgba(50, 50, 50, 0.90);
	-o-box-shadow:      0px 3px 10px 1px rgba(50, 50, 50, 0.90);
	box-shadow:         0px 3px 10px 1px rgba(50, 50, 50, 0.90);

	text-shadow:1px 1px 2px rgba(0, 0, 0, .9);
	-webkit-transition: all 0.2s ease;
	-moz-transition:    all 0.2s ease;
	-ms-transition:     all 0.2s ease;
	-o-transition:      all 0.2s ease;
	transition:         all 0.2s ease;
}

article {
	clear:both;
	height:100%;
	margin:30px 0;
	padding:30px;
	line-height:1.3em;

	background-color:white;
	-webkit-box-shadow: 0px 3px 10px 1px rgba(50, 50, 50, 0.30);
	-moz-box-shadow:    0px 3px 10px 1px rgba(50, 50, 50, 0.30);
	-ms-box-shadow:     0px 3px 10px 1px rgba(50, 50, 50, 0.30);
	-o-box-shadow:      0px 3px 10px 1px rgba(50, 50, 50, 0.30);
	box-shadow:         0px 3px 10px 1px rgba(50, 50, 50, 0.30);
}
```

Y el código del archivo html, es sencillo, con un poco de texto de relleno, cortesía: [http://www.quijotipsum.com/](Quijotipsum "Texto de relleno")

<!doctype html>
<html lang="es">
<head>
	<meta charset="UTF-8" />
	<title>Bonito menú horizontal con Css3</title>
	<link rel="stylesheet" href="css/style.css" type="text/css" media="screen" title="no title" charset="utf-8"/>
</head>
<body>
	<div id="contenedor">
		<nav>
			<ul>
				<li><a href="#">Inicio</a></li>
				<li><a href="#">Sobre</a></li>
				<li><a href="#" class="activo">Servicios</a></li>
				<li><a href="#">Productos</a></li>
				<li><a href="#">Contacto</a></li>
			</ul>
		</nav>
		<article>
			<h4>Bonito menú horizontal con Css3</h4>
			<p>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún renombre de Quijada, o Quesada, que en esto hay alguna diferencia en los autores que deste caso escriben; aunque, por conjeturas verosímiles, se deja entender que se llamaba Quejana. Pero esto importa poco a nuestro cuento; basta que en la narración dél no se salga un punto de la verdad.</p>
			<p>Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. El resto della concluían sayo de velarte, calzas de velludo para las fiestas, con sus pantuflos de lo mesmo, y los días de entresemana se honraba con su vellorí de lo más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, a, o Quesada, que en esto hay alguna diferencia en los autores que deste caso escriben; aunque, por conjeturas verosímiles, se deja entender que se llamaba Quejana. Pero esto importa poco a nuestro cuento; basta que en la narración dél no se salga un punto de la verdad. </p>
			<p>En un lugar  Quieren decir que tenía el sobrenombre de Quijada, o Quesada, que en esto hay alguna diferencia en los autores que deste caso escriben; aunque, por conjeturas verosímiles, se deja entender que se llamaba Quejana. Pero esto importa poco a nuestro cuento; basta que en la narración dél no se salga un punto de la verdad.</p>
			<p>EQuieren decir que tenía el sobrenombre de Quijada, o Quesada, que en esto hay alguna diferencia en los autores que deste caso escriben; aunque, por conjeturas verosímiles, se deja entender que se llamaba Quejana. Pero esto importa poco a nuestro cuento; basta que en la narración dél no se salga un punto de la verdad. </p>

		</article>

	</div>
</body>
</html>

Si te ha gustado el menú, puedes descargarlo desde este enlace: [menu horizontal css3](https://dl.dropboxusercontent.com/u/12043780/ivanalbizu.eu/bonito-menu-horizontal-css3.zip)