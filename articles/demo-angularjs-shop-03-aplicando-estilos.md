---
title: 'Demo AngularJS shop – 03 Aplicando estilos'
date: Mon, 18 Aug 2014 07:32:15 +0000
published: true
tags: AngularJS,Css3,JavaScript
---

En esta entrada explicaré los principales estilos aplicados (alguno puede que lo aplique a posteriori sobre la marcha). Para no hacer muy extensa esta entrada (y el vídeo correspondiente) no explicaré todo, sobre todo de CSS, ya que viendo el código y sus comentarios sobran.

## Modificaciones previas sobre archivo index.html.

Descomentamos la línea que carga el menú superior y quitamos la clase header que pusimos provisionalmente para añadir clases de bootstrap, quedando así:

```
<div ng-include="'views/userMenu.html'" class="navbar navbar-default navbar-fixed-top"></div>
```

## Modificaciones sobre views/userMenu.html

Eliminamos el primer div, ya que ahora tenemos las clases necesarias dentro del archivo index.html. Y modificamos algunas líneas: El primer vínculo quedará así:

```
<a href="" class="dropdown-toggle" data-toggle="dropdown">User</a>
```

y el segundo así:

```
<a href="" class="dropdown-toggle" data-toggle="dropdown">Cart (1 product)</a>
```

Y a los "ul" le añadimos el atributo role="menu" Para no extenderme mucho, el archivo views/userMenu.html quedará así:

```
<div class="navbar-collapse collapse navbar-inverse">
  <ul class="nav navbar-nav navbar-left">
    <li class="dropdown">
      <a href="" class="dropdown-toggle" data-toggle="dropdown">User</a>
      <ul id="user" class="dropdown-menu" role="menu">
        <li><a href="">Preferences</a></li>
        <li class="divider"></li>
        <li><a href="">Log out</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a href="" class="dropdown-toggle" data-toggle="dropdown">Cart (1 product)</a>
      <ul id="cart" class="dropdown-menu" role="menu">
        <li>
          <a href="">
            <img src="" alt="">
            <div class="detalles">Producto</div>
            <button class="btn btn-danger btn-xs"></button>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</div>
```

A la hoja de estilos styles/main.css le añadimos al final de el último estilo que ya venía incluido el siguiente código:

```
/*Estilos generales*/
body{
  font-family: Helvetica;
}
.container-fluid{
  max-width: 1020px;
  margin-top:40px;
}
h1{font-size:1.5em;line-height:1.5*2em;}
h2{font-size:1.4em;line-height:1.4*2em;}
h3{font-size:1.2em;line-height:1.2*2em;}
h4{font-size:1.1em;line-height:1.1*2em;}
h5{font-size:1.0em;line-height:1.0*2em;}
p{font-size:0.95em;}

.block{display:block;clear:both;}

.header .columns {
  margin-top: 20px;
}

/*Creación de estrella para precio en oferta*/
.star-six {
  top:-20px;
  margin-bottom:-70px;
  left:6px;
  width:0;
  height:0;
  border-left:44px solid transparent;
  border-right:44px solid transparent;
  border-bottom:88px solid rgba(227,100,95,1);
  position:relative;
  -webkit-transform: rotate(5deg) scale(1,.6) skew(1deg) translate(0px);
  z-index:-9;
}
.star-six:after {
  width:0;
  height:0;
  border-left:44px solid transparent;
  border-right:44px solid transparent;
  border-top:88px solid rgba(227,100,95,1);
  position:absolute;
  content:"";
  top:20px;
  left:-40px;
}

/*Items de productos*/
.product {
  width: 31.33%;
  margin:1%;
  /*height: auto;*/
  background: white;
  border:1px solid #ccc;
  position: relative;
  z-index: 90;
  float:left;
  box-sizing:border-box;
  -webkit-transition: all .1s;
}
.product h2{
  text-align: center;
  color: white;
  background-color:rgba(50,50,50,.8);
}
.product .caja{
  margin:1em;
}
.product .caja h3{
  text-indent:1em;
  float:left;
}
.product .caja button{
  float:right;
}
.product p{
  padding: 1.5em;
  letter-spacing: 0.09em;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 4.5em;
  min-height: 4.5em;
  line-height: 1.5em;
  white-space: wrap;  
}

/*Efecto hover sobre cada item de producto*/
span.quick-view {
  display: none;
  top:-20px;
  width:50%;
  margin:30% 25%;
  font-size:1.2em;
  line-height:1.3em;
  padding:1em .2em;
  background-color:rgba(255,255,255,.8);
  box-shadow:0 0 5px gray;
  color:rgba(50,50,50,.9);
  cursor:pointer;
}
span.quick-view:before {
  content: url('/images/search.png');
  padding-right:.5em;
}
span.cart:before {
  content: url('/images/cart.png');
  padding-right:.5em; 
}
.product:hover{
  box-shadow:0 0 10px gray;
  -webkit-transition: all .3s;
}
.product:hover span.quick-view {
  display:inline-block;
  position: absolute;
  top:30px;
  text-align: center;
  -webkit-transition: all .3s;
}

/*Efecto ribbon sobre cada producto 'nuevo'*/
.ribbon-wrapper-green {
  width: 85px;
  height: 88px;
  overflow: hidden;
  position: absolute;
  top: -4px;
  right: -4px;
}
.ribbon-green {
  font: bold 15px Sans-Serif;
  color: #333;
  letter-spacing:.3em;
  text-align: center;
  text-shadow: rgba(255,255,255,0.5) 0px 1px 0px;
  -webkit-transform: rotate(45deg);
  -moz-transform:    rotate(45deg);
  -ms-transform:     rotate(45deg);
  -o-transform:      rotate(45deg);
  position: relative;
  padding: 7px 0;
  left: -5px;
  top: 15px;
  width: 120px;
  background-color: #BFDC7A;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#BFDC7A), to(#8EBF45)); 
  background-image: -webkit-linear-gradient(top, #BFDC7A, #8EBF45); 
  background-image:    -moz-linear-gradient(top, #BFDC7A, #8EBF45); 
  background-image:     -ms-linear-gradient(top, #BFDC7A, #8EBF45); 
  background-image:      -o-linear-gradient(top, #BFDC7A, #8EBF45); 
  color: #6a6340;
  -webkit-box-shadow: 0px 0px 3px rgba(0,0,0,0.3);
  -moz-box-shadow:    0px 0px 3px rgba(0,0,0,0.3);
  box-shadow:         0px 0px 3px rgba(0,0,0,0.3);
}
.ribbon-green:before, .ribbon-green:after {
  content: "";
  border-top:   3px solid #6e8900;   
  border-left:  3px solid transparent;
  border-right: 3px solid transparent;
  position:absolute;
  bottom: -3px;
}
.ribbon-green:before {
  left: 0;
}
.ribbon-green:after {
  right: 0;
}

/*Menú superior*/
ul#cart{width: 300px;}
ul#user{width: 100px;}
ul#cart li a {
  padding:1px;
  display:inline-block;
  width:100%;
}
ul#cart li a > *{
  position:relative;
  float:left;
}
ul#cart li a > button{
  float:right;
}
.color-white{
  color:white;
}
```

Y para dejar preparada la siguiente entrada, modificamos el archivo views/product.html con el siguiente código:

```
<div class="row marketing">
  <div>
    <div class="product left">
      <div class="ribbon-wrapper-green"><div class="ribbon-green">new</div></div>
      <img src="../images/blouse.jpg"/>
      
      <h2>Product name</h2>
      <span class="quick-view">Quick view</span>
      <div class="caja">
        <h3 class="left">20 € </h3>
        <button class="btn btn-success">Add to cart</button>
      </div>
      <div class="star-six"></div>
      
      <p class="block">Product description</p>
    </div>
  </div>
</div>
```

En la siguiente entrada empezaremos con lo más chulo. Será trabajar con directivas de AngularJS sobre el archivo views/product.html