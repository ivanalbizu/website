---
title: 'Demo AngularJS shop - 04 Directivas'
date: Tue, 19 Aug 2014 21:04:19 +0000
published: true
tags: AngularJS,JavaScript
---

En esta ocasión para el proyecto demo sobre **AngularJS** trabajaré sobre el catálogo de productos. Los productos tendrán características como nombre, precio, descripción, en venta, stock e imágenes. Para empezar, abrimos el archivo _scripts/controllers/product.js_ y antes de la declaración del controlador añadimos el array de productos:

```
'use strict';
  var data = [
    {
      name: 'Blouse',
      price: 2.95,
      description: 'Short description about this producto. A beautiful yellow blouse. Lorem lorem lorem lorem lorem',
      onsale: true,
      newproduct: true,
      quantity: 1,
      images: [
        {
          full: '/images/blouse.jpg',
          thumb: '/images/blouse-thumb.jpg'
        },
      ],
    },
    {
      name: 'Chiffon',
      price: 3.06,
      description: 'Descripción del producto',
      onsale: false,
      newproduct: true,
      quantity: 1,
      images: [
        {
          full: '/images/chiffon.jpg',
          thumb: '/images/chiffon-thumb.jpg'
        },
      ],
    },
    {
      name: 'Short T-Shirts',
      price: 6.20,
      description: 'Descripción ',
      onsale: true,
      newproduct:false,
      quantity: 5,
      images: [
        {
          full: '/images/dress.jpg',
          thumb: '/images/dress-thumb.jpg'
        },
      ],
    },
    {
      name: 'Faded Shirts',
      price: 20.60,
      description: 'Descripción ',
      onsale: true,
      newproduct:false,
      quantity: 1,
      images: [
        {
          full: '/images/faded.jpg',
          thumb: '/images/faded-thumb.jpg'
        },
      ],
    },
    {
      name: 'Marine Shorts',
      price: 20.6,
      description: 'Descripción ',
      onsale: false,
      newproduct:true,
      quantity: 1,
      images: [
        {
          full: '/images/marine.jpg',
          thumb: '/images/marine-thumb.jpg'
        },
      ],
    },
    {
      name: 'Sport Skirt',
      price: 20.6,
      description: 'Descripción ',
      onsale: false,
      newproduct:false,
      quantity: 0,
      images: [
        {
          full: '/images/sport.jpg',
          thumb: '/images/sport-thumb.jpg'
        },
      ],
    },
    {
      name: 'Summer Yellow',
      price: 20.6,
      description: 'Descripción ',
      onsale: false,
      newproduct:false,
      quantity: 0,
      images: [
        {
          full: '/images/summer.jpg',
          thumb: '/images/summer-thumb.jpg'
        },
      ],
    }
  ];
```

Sobre el mismo archivo limpiamos el código generado por **Yeoman** quedándonos sólo con la declaración del controlador y con la carga de los datos de los productos en el **$scope**:

```
angular.module('ngdemoApp')
  .controller('ProductCtrl', function ($scope) {

    $scope.products = data;

  });
```

Cuando llamemos en la vista de producto mediante el controlador llamado "_ProductCtrl_" Para poder usar la información de los productos sólo tendremos que llamar al controlador y seleccionar el atributo de el/los producto/s que nos interesen. Dentro del controlador he creado una función para comprobar si un producto concreto dispone o no de Stock. Se comprueba si el atributo "_quantity_" es igual a "_0_", si es así, la función devuelve "_false_", caso contrario devolverá "_true_". La función dentro del controlador queda así:

```
angular.module('ngdemoApp')
  .controller('ProductCtrl', function ($scope) {

    $scope.products = data;

    $scope.inStock = function(cantidad){
      if (cantidad === 0) {
        return false;
      }
      else {
        return true;
      }
    };

  });
```

Una vez todo esto, pasamos al archivo _views/product.html_ y añadimos directivas. Copio el código y luego comento.

```
<div class="row marketing" ng-controller="ProductCtrl">
  <div ng-repeat="product in products">
    <div ng-show="inStock(product.quantity)" class="product left">
      <div ng-show="product.newproduct" class="ribbon-wrapper-green"><div class="ribbon-green">new</div></div>
      <img ng-src="{{product.images[0].full}}"/>
      
      <h2>{{product.name}} </h2>
      <span class="quick-view">Quick view</span>
      <div class="caja">
        <h3 class="left" ng-class="{'color-white': product.onsale}">{{product.price}} € </h3>
        <!-- No sería necesario en el button: ng-show="product.quantity", ya que el producto que no tenga stock no se muestra -->
        <button class="btn btn-success" ng-show="product.quantity">Add to cart</button>
      </div>
      <div ng-show="product.onsale" class="star-six"></div>
      
      <p class="block">{{product.description}}</p>
    </div>
  </div>
</div>
```

En la primera línea con la directiva _ng-controller="ProductCtrl"_ decimos que dentro de ese "_div_" usaremos dicho controlador. En la segunda creamos el bucle que iterará sobre cada uno de los productos mediante _ng-repeat="product in products"_ (en el vídeo comento otra manera de hacer la declaración de esta directiva, que también afecta un poco el código del controlador). Ha cada producto le hemos dado el alias (por así llamarlo) de "_product_", y así será como tendremos que seleccionar un producto Ahora ya nos encontramos sobre un producto concreto. Para referenciar un atributo de un producto basta con "_product.atributoTal_". En la tercera línea se emplea la directiva _ng-show_. Si el resultado de la expresión (la función definida en el controlador) es "_True_" el contenido dentro de ese "_div_" no será mostrado, es decir, el producto que no tenga stock no se muestra. La línea cuatro usa _ng-show="product.newproduct"_, en este caso no es función, es sólo rescatar un atributo, que en el caso del catálogo es booleano. Si es "True" se mostrará el ribbon verde que indicará que el producto es nuevo, en caso contrario no se muestra. En la línea cinco se inserta la imagen del producto. Cada producto contiene dos imágenes, una grande y otra pequeña, y la usada es la grande, designada por con atributo "_full_". Para realizar su llamada se emplea la directiva _ng-src="{{product.images[0].full}}"_. Esta directiva es diferente a las anterior, se usan doble llaves y devolverá una cadena con la ruta de la imagen. En la línea seis se usa una expresión _{{product.name}}_ para obtener el atributo "_name_" del producto. En la línea diez se usa la directiva ng-class tiene diferentes maneras de usarse, en este caso: _ng-class="{'color-white': product.onsale}"_ hay dos trozos, la primera parte con comillas simples es una clase que será usada y la expresión que sigue a los dos puntos se evalúa como "_True_", de lo contrario, la clase no es añadida. En esta misma se obtiene el precio del producto mediante la expresión: _{{product.price}}_. La línea catorce con la directiva _ng-show="product.onsale"_ y la clase "_star-six_" mostrará el precio bajo una estrella si el producto está en "rebajas". Finalmente, la descripción del producto se mostrará con la expresión: _{{product.description}}_. Comentar que el atributo "_description_" contiene el atributo sin limitar su extensión, ya que mediante css se muestran sólo las dos primeras líneas. Para conseguirlo, es emplea este código:

```
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
```

En el vídeo he comentado otro [recurso interesante](http://codepen.io/martinwolf/pen/qlFdp "Abre en ventana nueva recurso CodePen"). Con nuevas propiedades CSS se puede limitar o visualizar el número de líneas dentro de un elemento. Espero seguir creando nuevas entradas sobre este proyecto AngularJS, aunque de momento tendré que dejarlo un poco parado para dedicar más tiempo a otras cosas. Aquí dejo el vídeo.