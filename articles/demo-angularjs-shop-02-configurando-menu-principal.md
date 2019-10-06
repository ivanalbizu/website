---
title: Demo AngularJS shop - 02 Configurando menú principal
published: true
description: Primera parte de aplicación Angular 1 para construir listado de productos. Configuración de menú principal
tags: AngularJS,Css3,JavaScript
ctime: Fri, 08 Aug 2014 20:55:43 +0000
---

En esta entrada sobre AngularJS continuaré mi anterior artículo <a href="demo-angularjs-shop-01-generando-proyecto-con-yeoman/" title="Abre en ventana nueva el artículo: Generando proyecto con yeoman">generando proyecto AngularJS con Yeoman</a>, en el que trabajaré sobre el menú de la aplicación. Limpiamos el código generado como demo al crear proyecto AngularJS usando Yeoman.

Para ello, en el archivo <code>index.html</code> eliminamos el vínculo <code>About</code> del menú, y la etiqueta script que carga el controlador <code>about.js</code>. Eliminamos el archivo del controlador <code>scripts/controllers/about.js</code>. Y la vista <code>views/about.html</code>. Añadimos controladores y vistas para product y contact, para ello, en consola:

```shell
yo angular:controller product --save
yo angular:controller contact --save
yo angular:view product --save
yo angular:view contact --save
```

Añadimos al menú los nuevos items:

```html
<li><a ng-href="#/contact">Contact</a></li>
<li><a ng-href="#/product">Product</a></li>
```

Vamos a separar el código del menú principal del archivo <code>index.html</code>. Creamos dos nuevas vista:

```shell
yo angular:view mainMenu --save
yo angular:view userMenu --save
```

Y copiamos el código en la vista creada <code>views/mainMenu.html</code>:

```html
<ul class="nav nav-pills pull-right">
 <li class="active"><a href="#">Home</a></li>
 <li><a ng-href="#/contact">Contact</a></li>
 <li><a ng-href="#/product">Product</a></li>
</ul>
<h3 class="text-muted">ngdemo</h3>
```

Para que la llamada a esa vista se haga correctamente desde el <code>index.html</code>, en la etiqueta <code>&lt;div&gt;</code> con clase header añadimos la directiva <code>ng-include</code>, quedando el código así:

```html
<div ng-include="'views/mainMenu.html'" class="header"></div>
```

Modificamos el archivo <code>scripts/app.js</code> para que funcione el menú

```javascript
...
angular
  .module('ngdemoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/product', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
```

Para añadir el menú superior fijo de color negro, de usuario y carrito de la compra, vamos al archivo <code>index.html</code>, y antes del <code>&lt;div&gt;</code> con clase <code>container</code> creamos el siguiente elemento (cambiamos la clase <code>container</code> por <code>container-fluid)</code>:

```html
<div ng-include="'views/userMenu.html'" class="header"></div>
```

De momento dejaremos comentado ya que le daremos estilos en el siguiente paso. En la vista llamada <code>views/userMenu.html</code> crearemos el código siguiente:

```html
<div class="navbar navbar-default navbar-fixed-top">
    <div class="navbar-collapse collapse navbar-inverse">
        <ul class="nav navbar-nav navbar-left">
            <li class="dropdown">
                <a href="" class="dropdowntoggle"></a>
                <ul id="user" class="dropdown-menu">
                    <li><a href="">Preferences</a></li>
                    <li class="divider"></li>
                    <li><a href="">Log out</a></li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="" class="dropdowntoggle"></a>
                <ul id="cart" class="dropdown-menu">
                    <li>
                        <a href="">
                            <img src="" alt="">
                            <div class="detalles"></div>
                            <button class="btn btn-danger btn-xs"></button>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>
```

Cómo dije, este elemento no estará visible de momento, ya que en el <code>index.html</code> la llamada (con la directiva <code>ng-include</code>) a esta vista está comentada. Para conseguir que el item del menú principal esté activo y marcado con azul vamos a crear el controlador:

```shell
yo angular:controller mainmenu --save
```

y a realizar varias modificaciones al archivo <code>scripts/controllers/mainmenu.js</code>, quedando de la siguiente manera:

```javascript
.controller('MainmenuCtrl', function ($scope, $location) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});
```

Con las líneas anteriores al controlador llamado <code>MainmenuCtrl</code> le pasamos el servicio (así denominado en AngularJS) <code>$location</code> para poder usar la información de la URL en la vista. Hemos creado el método <code>isActive(viewLocation)</code> en la que se pasa como parámetro <code>viewLocation</code>, lo que nos devolverá la ruta actual. Modificamos ahora el archivo <code>views/mainMenu.html</code> y lo dejamos con el siguiente código:

```html
<ul class="nav nav-pills pull-right">
    <li ng-class="{active : isActive('/')}"><a ng-href="#">Home</a></li>
    <li ng-class="{active : isActive('/contact')}"><a ng-href="#/contact">Contact</a></li>
    <li ng-class="{active : isActive('/product')}"><a ng-href="#/product">Product</a></li>
</ul>
<h3 class="text-muted">ngdemo</h3>
```

Con el código anterior hemos añadido la directiva <code>ng-class</code> a cada item del menú. Con ésta función <code>isActive('/product')</code> obtendremos un booleano, que devolerá true si tras examinar la ruta actual coincide con la pasada como parámetro en la vista. El funcionamiento de <code>ng-class</code> consiste en añadir la clase (trozo de código anterior a los dos puntos) si la evaluación de la condición (trozo de código posterior a los dos puntos) resulta <code>true</code>. 

Aquí el vídeo explicando el proceso:

<div class="ratio-16-9">
    <iframe title="Demo AngularJS Shop - Menú" type="text/html" src="http://www.youtube.com/embed/2yVi2YPo3pY?autoplay=0&origin=https://ivanalbizu.eu/" frameborder="0"></iframe>
</div>

En siguientes artículos continuaré con el proyecto demo de AngularJS con Yeoman.