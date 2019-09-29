---
title: AngularJS consumiendo de servicio Django
published: true
description: Aplicación Frontend construida con AngularJS de libros y autores consumiendo de servicio REST construido con Django
tags: AngularJS,JavaScript
ctime: Mon, 09 Nov 2015 11:29:53 +0000
---

En esta ocasión publico entrada sobre Angular como cliente y Django como servicio REST. Contendrá dos modelos: libro y autores. Los campos de libro son <code>título</code>, <code>editorial</code>, <code>género</code> y su <code>autor</code>. Los campos de autor serán <code>nombre</code> y <code>apellidos</code>. Las peticiones son enviadas desde angular usando **$resource** hacía **Django rest framework**.

## Cliente AngularJS - Services

En la "Factory" <code>BookServices</code> (similar para autores) se definen los métodos GET, POST, PUT y DELETE para manipular un registro de tipo libro.

```javascript
.factory('BookServices', ['$resource',
  function($resource) {
    return $resource(
      'http://127.0.0.1:8000/books/:id', {}, {
        get: {method: 'GET', cache: false, isArray: false},
        save: {method: 'POST', cache: false, isArray: false},
        upctime: {method: 'PUT', cache: false, isArray: false},
        delete: {method: 'DELETE', cache: false, isArray: false}
      });
  }])
```

Se define el método GET que devolverá todos los registros de tipo libro.

```javascript
.factory('BooksServices', ['$resource',
  function($resource) {
    return $resource(
      'http://127.0.0.1:8000/books', {}, {
        get: {method: 'GET', cache: false, isArray: true}
      });
  }])
```

## Cliente AngularJS - Controllers

Existen tres "controllers":
<ul class="list-bullets">
  <li><code>BookCtrl</code></li>
  <li><code>CurrentBookCtrl</code></li>
  <li><code>NewBookCtrl</code></li>
</ul>

Con <code>BookCtrl</code> se obtienen todos los registros, haciendo la llamada al método get de <code>BooksServices</code>.

```javascript
.controller('BookCtrl', ['$scope', 'BooksServices',
  function ($scope, BooksServices) {
    BooksServices.get({},
      function success(response) {
        $scope.books = response;
      },
      function error(errorResponse) {
        console.log("Error:"	+	JSON.stringify(errorResponse));
      }
    )
}])
```

Con <code>CurrentBookCtrl</code> se permite obtener un registro, borrarlo y editarlo llamando a los métodos get, delete y update respectivamente de <code>BookServices</code>.

```javascript
.controller('CurrentBookCtrl', ['$scope', '$routeParams', '$location', 'BookServices',
  function ($scope, $routeParams, $location, BookServices) {

    var bookId = $routeParams.id;

    BookServices.get({id: bookId},
      function success(response) {
        JSON.stringify(response);
        $scope.book = response;
      },
      function error(errorResponse) {
        console.log("Error:"	+	JSON.stringify(errorResponse));
      }
    );

    $scope.delete = function(bookId) {
      BookServices.delete({id: bookId},
        function success(response) {
          $location.path('/');
        },
        function error(errorResponse) {
          console.log("Error:"	+	JSON.stringify(errorResponse));
        }
      )
    };

    $scope.update = function(data) {
      BookServices.update({id: bookId}, data,
        function success(response) {
          $location.path('/');
        },
        function error(errorResponse) {
          console.log("Error:"	+	JSON.stringify(errorResponse));
        }
      )
    };

}])
```

Con <code>NewBookCtrl</code> se permite crear un nuevo registro llamando al método save de <code>BookServices</code>.

```javascript
.controller('NewBookCtrl', ['$scope', '$location', 'BookServices', '$controller',
  function ($scope, $location, BookServices, $controller) {
    $scope.save = function(data) {
      BookServices.save(data,
        function success(response) {
          $location.path('/');
          console.log(response);
        },
        function error(errorResponse) {
          alert("Campos incompletos");
        }
      )
    };

}])
```

## Servidor API Rest - Django Rest Framework

Cómo he comentado, el servidor será Django Rest Framework. En este caso no entro en detalle, sólo comentar que los archivos creados y/o editados son:
<ul class="list-bullets">
  <code>settings.py</code>
  <code>urls.py</code>
  <code>models.py</code>
  <code>viewsets.py</code>
  <code>serializers.py</code>
</ul>

En <code>settings.py</code> se añaden las dependencias y configuraciones de "rest_framework" y "corsheaders" (este último para simplificar y evitar problemas con CORS).

```python
INSTALLED_APPS = (
    # Otras configuraciones
    'rest_framework',
    'corsheaders',
)

MIDDLEWARE_CLASSES = (
    # Otras configuraciones
    'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsMiddleware',
)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # Simplicar operaciones
        'rest_framework.permissions.AllowAny',
    )
}

APPEND_SLASH = False
CORS_ORIGIN_ALLOW_ALL = True
```

En <code>urls.py</code> como su nombre indica se definen el tema de rutas.

```python
from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

from apprest.viewsets import LibroViewSet, AutorViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter(trailing_slash=False)
router.register(r'books', LibroViewSet)
router.register(r'authors', AutorViewSet)

urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^admin/', include(admin.site.urls)),
)
```

En <code>models.py</code> se crean los modelos y sus campos.

```python
from django.db import models

class Autor(models.Model):
    nombre = models.TextField(max_length=100)
    apellido = models.TextField(max_length=100)

class Libro(models.Model):
    nombre = models.TextField(max_length=100)
    editorial = models.TextField(max_length=100)
    genero = models.TextField(max_length=100)
    autor = models.ForeignKey(Autor)
```

En <code>serializers.py</code> se serializan los modelos.

```python
from rest_framework.serializers import ModelSerializer
from .models import Libro, Autor

class LibroSerializer(ModelSerializer):
    class Meta:
        model = Libro
        fields = ('id', 'nombre', 'editorial', 'genero', 'autor')

class AutorSerializer(ModelSerializer):
    class Meta:
        model = Autor
        fields = ('id', 'nombre', 'apellido')
```

Los <code>viewsets.py</code> son necesarios para hacer la conexión de los modelos serializados con el ruteo de urls en <code>urls.py</code>

```python
from .models import Libro, Autor
from .serializers import LibroSerializer, AutorSerializer
from rest_framework import viewsets

class LibroViewSet(viewsets.ModelViewSet):
    serializer_class = LibroSerializer
    queryset = Libro.objects.all()

class AutorViewSet(viewsets.ModelViewSet):
    serializer_class = AutorSerializer
    queryset = Autor.objects.all()
```

Hasta aquí la configuración de Django Rest Framework. Sobre el cliente he obviado cosas para no hacerlo muy extenso.

En <a href="https://github.com/ivanalbizu/django_angular" target="_blank">mi repositorio de GitHub</a> se puede encontrar todo el código de AngularJS y de Django.