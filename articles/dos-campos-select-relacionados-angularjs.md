---
title: Dos campos Select relacionados en AngularJS
published: true
description: Construir Selects en el que uno de los Selects carga su contenido en función del option seleccionado en el Select anterior
tags: AngularJS,JavaScript,Pildoritas
ctime: Mon, 10 Oct 2016 09:58:28
---

He construido sistema de filtros con etiquetas &lt;select&gt;. Uno de ellos será el filtro inferior y el otro el filtro superior. Ambos estarán relacionados entre sí para que no se pisen los valores, y así el valor tomado por el filtro inferior sea uno de los límites del filtro superior, y viceversa. Para darle valores a los &lt;select&gt; he construido un filtro que recibe tres parámetros. Los dos primeros parámetros, "min" y "max", son los límites inferiores y superiores. El tercer parámetro, "step", será la separación entre cada uno de los valores, que caso de no especificarse este valor tomará el valor 30000.

```
(function() {
  'use strict';

  angular
    .module('app')
    .filter('filterRange', function () {
      return function (input, min, max, step) {
        step = parseInt(step) || 30000;
        min = parseInt(min);
        max = parseInt(max);
        for (var i = min; i < max; i += step)
          input.push(i);
        return input;
      };
    });

})();
```

La forma de usarla es sencilla. Se usará la directiva "ng-options" de AngularJS que genera los diferentes valores seleccionables. Le pasamos un array vacío y le aplicamos el filtro. (Ojo, el uso de la directiva ng-options requiere también la definición de ng-model. En este trozo de código no lo puse)

```
<select ng-options="n for n in [] | filterRange:0:120000:30000"></select>
```

En el controlador definimos una variable para usarlo en la vista como modelo. Con valores mínimos y máximos definidos con valor para que se carguen los valores por defecto.

```
(function() {
  'use strict';

  angular
    .module('app', [])
    .controller('ListHouseCtrl', ListHouseCtrl);

    ListHouseCtrl.$inject = [];
    function ListHouseCtrl() {

      var vm = this;

      vm.selectPrice = {
        min: 30000,
        max: 120000
      }

      vm.log = function() {
        console.log(vm.selectPrice);
      }

    }

})();
```

A ambos &lt;select&gt; le asignamos su modelo para obtener el valor seleccionado, que en su primera carga será el valor por defecto.

```
<select ng-model="vm.selectPrice.min" ng-options="n for n in [] | filterRange:0:120000:30000"></select>
<select ng-model="vm.selectPrice.max" ng-options="n for n in [] | filterRange:150000:250000:30000"></select>
```

Ahora mismo se rellenan ambos &lt;select&gt;, el primero termina en 120000 y el segundo empieza en 150000. Pero podemos aprovechar los valores que hemos guardado en _ng-model="vm.selectPrice.min"_ y en _ng-model="vm.selectPrice.max"_ para los límites de los filtros.

```
<select ng-model="vm.selectPrice.min" ng-options="n for n in [] | filterRange:0:vm.selectPrice.max:30000"></select>
<select ng-model="vm.selectPrice.max" ng-options="n for n in [] | filterRange:vm.selectPrice.min+30000:250000:30000"></select>
```

El código se encuentra en mi [repositorio de GitHub.](https://github.com/ivanalbizu/select_angular) El vídeo: