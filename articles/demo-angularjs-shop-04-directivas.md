---
title: Demo AngularJS shop - 04 Directivas
published: true
description: Primera parte de aplicación Angular 1 para construir listado de productos. Aplicando Directivas
tags: AngularJS,JavaScript
ctime: Tue, 19 Aug 2014 21:04:19 +0000
---

En esta ocasión para el proyecto demo sobre **AngularJS** trabajaré sobre el catálogo de productos. Los productos tendrán características como nombre, precio, descripción, en venta, stock e imágenes. Para empezar, abrimos el archivo <code>scripts/controllers/product.js</code> y antes de la declaración del controlador añadimos el array de productos:

```javascript
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

Sobre el mismo archivo limpiamos el código generado por **Yeoman** quedándonos sólo con la declaración del controlador y con la carga de los datos de los productos en el <code>$scope</code>:

```javascript
angular.module('ngdemoApp')
  .controller('ProductCtrl', function ($scope) {

    $scope.products = data;

  });
```

Cuando llamemos en la vista de producto mediante el controlador llamado <code>ProductCtrl</code> para poder usar la información de los productos sólo tendremos que llamar al controlador y seleccionar el atributo de el/los producto/s que nos interesen. Dentro del controlador he creado una función para comprobar si un producto concreto dispone o no de Stock. Se comprueba si el atributo <code>quantity</code> es igual a <code>0</code>, si es así, la función devuelve <code>false</code>, caso contrario devolverá <code>true</code>.

La función dentro del controlador queda así:

```javascript
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

Una vez todo esto, pasamos al archivo <code>views/product.html</code> y añadimos directivas.

Copio el código y luego comento.

```html
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

En la primera línea con la directiva <code>ng-controller="ProductCtrl"</code> decimos que dentro de ese <code>&lt;div&gt;</code> usaremos dicho controlador.

En la segunda creamos el bucle que iterará sobre cada uno de los productos mediante <code>ng-repeat="product in products"</code> (en el vídeo comento otra manera de hacer la declaración de esta directiva, que también afecta un poco el código del controlador). A cada producto le hemos dado el alias (por así llamarlo) de <code>product</code>, y así será como tendremos que seleccionar un producto. Ahora ya nos encontramos sobre un producto concreto. Para referenciar un atributo de un producto basta con <code>product.atributoTal</code>.

En la tercera línea se emplea la directiva <code>ng-show</code>. Si el resultado de la expresión (la función definida en el controlador) es <code>True</code> el contenido dentro de ese <code>div</code> no será mostrado, es decir, el producto que no tenga stock no se muestra.

La línea cuatro usa <code>ng-show="product.newproduct<code>, en este caso no es función, es sólo rescatar un atributo, que en el caso del catálogo es booleano. Si es <code>True</code> se mostrará el ribbon verde que indicará que el producto es nuevo, en caso contrario no se muestra.

En la línea cinco se inserta la imagen del producto. Cada producto contiene dos imágenes, una grande y otra pequeña, y la usada es la grande, designada por con atributo <code>full</code>. Para realizar su llamada se emplea la directiva <code>ng-src="{{product.images[0].full}}</code>. Esta directiva es diferente a las anterior, se usan doble llaves y devolverá una cadena con la ruta de la imagen.

En la línea seis se usa una expresión <code>{{product.name}}</code> para obtener el atributo <code>name</code> del producto.

En la línea diez se usa la directiva <code>ng-class</code> tiene diferentes maneras de usarse, en este caso: <code>ng-class="{'color-white': product.onsale}"</code> hay dos trozos, la primera parte con comillas simples es una clase que será usada y la expresión que sigue a los dos puntos se evalúa como <code>True</code>, de lo contrario, la clase no es añadida. En esta misma se obtiene el precio del producto mediante la expresión: <code>{{product.price}}</code>.

La línea catorce con la directiva <code>ng-show="product.onsale"</code> y la clase <code>star-six</code> mostrará el precio bajo una estrella si el producto está en <code>rebajas</code>. Finalmente, la descripción del producto se mostrará con la expresión: <code>{{product.description}}</code>. Comentar que el atributo <code>description</code> contiene el atributo sin limitar su extensión, ya que mediante css se muestran sólo las dos primeras líneas.

Para conseguirlo, es emplea este código:

```css
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

Vídeo del paso a paso

<div class="ratio-16-9">
    <iframe title="Demo AngularJS Shop - Directivas" type="text/html" src="http://www.youtube.com/embed/GmWn2JhN94c?autoplay=0&origin=https://ivanalbizu.eu/" frameborder="0"></iframe>
</div>