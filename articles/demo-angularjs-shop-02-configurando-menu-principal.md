---
title: 'Demo AngularJS shop - 02 Configurando menú principal'
ctime: Fri, 08 Aug 2014 20:55:43
published: true
tags: AngularJS,Css3,JavaScript
---

En esta entrada sobre AngularJS continuaré mi anterior artículo [generando proyecto AngularJS con Yeoman](http://ivanalbizu.eu/demo-angularjs-shop-01-generando-proyecto-con-yeoman/ "Abre en ventana nueva el artículo: Generando proyecto con yeoman"), en el que trabajaré sobre el menú de la aplicación. Limpiamos el código generado como demo al crear proyecto AngularJS usando Yeoman. Para ello, en el archivo index.html eliminamos el vínculo "About" del menú, y la etiqueta script que carga el controlador about.js. Eliminamos el archivo del controlador scripts/controllers/about.js. Y la vista views/about.html. Añadimos controladores y vistas para product y contact, para ello, en consola:

```
yo angular:controller product --save
yo angular:controller contact --save
yo angular:view product --save
yo angular:view contact --save
```

Añadimos al menú los nuevos items:

```
<li><a ng-href="#/contact">Contact</a></li>
<li><a ng-href="#/product">Product</a></li>
```

Vamos a separar el código del menú principal del archivo index.html. Creamos dos nuevas vista:

```
yo angular:view mainMenu --save
yo angular:view userMenu --save
```

Y copiamos el código en la vista creada views/mainMenu.html,

```
<ul class="nav nav-pills pull-right">
 <li class="active"><a href="#">Home</a></li>
 <li><a ng-href="#/contact">Contact</a></li>
 <li><a ng-href="#/product">Product</a></li>
</ul>
<h3 class="text-muted">ngdemo</h3>
```

Para que la llamada a esa vista se haga correctamente desde el index.html, en la etiqueta div con clase header añadimos la directiva ng-include, quedando el código así:

```
<div ng-include="'views/mainMenu.html'" class="header"></div>
```

Modificamos el archivo scripts/app.js para que funcione el menú

```
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

Para añadir el menú superior fijo de color negro, de usuario y carrito de la compra, vamos al archivo index.html, y antes del div con clase container creamos el siguiente elemento (cambiamos la clase container por container-fluid):

```
<div ng-include="'views/userMenu.html'" class="header"></div>
```

De momento dejaremos comentado ya que le daremos estilos en el siguiente paso. En la vista llamada views/userMenu.html crearemos el código siguiente:

```
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

Cómo dije, este elemento no estará visible de momento, ya que en el index.html la llamada (con la directiva ng-include) a esta vista está comentada. Para conseguir que el item del menú principal esté activo y marcado con azul vamos a crear el controlador:

```
yo angular:controller mainmenu --save
```

y a realizar varias modificaciones al archivo scripts/controllers/mainmenu.js, quedando de la siguiente manera:

```
.controller('MainmenuCtrl', function ($scope, $location) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});
```

Con las líneas anteriores al controlador llamado MainmenuCtrl le pasamos el servicio (así denominado en AngularJS) $location para poder usar la información de la URL en la vista. Hemos creado el método isActive(viewLocation) en la que se pasa como parámetro viewLocation, lo que nos devolverá la ruta actual. Modificamos ahora el archivo views/mainMenu.html y lo dejamos con el siguiente código:

```
<ul class="nav nav-pills pull-right">
    <li ng-class="{active : isActive('/')}"><a ng-href="#">Home</a></li>
    <li ng-class="{active : isActive('/contact')}"><a ng-href="#/contact">Contact</a></li>
    <li ng-class="{active : isActive('/product')}"><a ng-href="#/product">Product</a></li>
</ul>
<h3 class="text-muted">ngdemo</h3>
```

Con el código anterior hemos añadido la directiva ng-class a cada item del menú. Con ésta función: _isActive('/product')_ obtendremos un booleano, que devolerá true si tras examinar la ruta actual coincide con la pasada como parámetro en la vista. El funcionamiento de ng-class consiste en añadir la clase (trozo de código anterior a los dos puntos) si la evaluación de la condición (trozo de código posterior a los dos puntos) resulta true. Aquí el vídeo explicando el proceso: En siguientes artículos continuaré con el proyecto demo de AngularJS con Yeoman.