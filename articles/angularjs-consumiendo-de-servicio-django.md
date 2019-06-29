---
title: 'AngularJS consumiendo de servicio Django'
date: Mon, 09 Nov 2015 11:29:53 +0000
published: true
tags: AngularJS,JavaScript
---

En esta ocasión publico entrada sobre Angular como cliente y Django como servicio REST. Contendrá dos modelos, libro y autores. Los campos de libro son título, editorial, género y su autor. Los campos de autor serán nombre y apellidos. Las peticiones son enviadas desde angular usando **$resource** hacía **Django rest framework**.

## Cliente - Services

En la "Factory" BookServices (similar para autores) se definen los métodos GET, POST, PUT y DELETE para manipular un registro de tipo libro.

```
.factory('BookServices', \['$resource',
  function($resource) {
    return $resource(
      'http://127.0.0.1:8000/books/:id', {}, {
        get: {method: 'GET', cache: false, isArray: false},
        save: {method: 'POST', cache: false, isArray: false},
        update: {method: 'PUT', cache: false, isArray: false},
        delete: {method: 'DELETE', cache: false, isArray: false}
      });
  }\])
```

En la "Factory" BooksServices (similar para autores) se define el método GET que devolverá todos los registros de tipo libro.

```
.factory('BooksServices', \['$resource',
  function($resource) {
    return $resource(
      'http://127.0.0.1:8000/books', {}, {
        get: {method: 'GET', cache: false, isArray: true}
      });
  }\])
```

## Cliente - Controllers

Existen tres "controllers": BookCtrl, CurrentBookCtrl y NewBookCtrl.

*   Con BookCtrl se obtienen todos los registros, haciendo la llamada al método get de BooksServices.

```
.controller('BookCtrl', \['$scope', 'BooksServices',
  function ($scope, BooksServices) {
    BooksServices.get({},
      function success(response) {
        $scope.books = response;
      },
      function error(errorResponse) {
        console.log("Error:"	+	JSON.stringify(errorResponse));
      }
    )
}\])
```

*   Con CurrentBookCtrl se permite obtener un registro, borrarlo y editarlo llamando a los métodos get, delete y update respectivamente de BookServices.

```
.controller('CurrentBookCtrl', \['$scope', '$routeParams', '$location', 'BookServices',
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

}\])
```

*   Con NewBookCtrl se permite crear un nuevo registro llamando al método  save de BookServices.

```
.controller('NewBookCtrl', \['$scope', '$location', 'BookServices', '$controller',
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

}\])
```

## Servidor - Django Rest Framework

Cómo he comentado, el servidor será Django Rest Framework. En este caso no entro en detalle, sólo comentar que los archivos creados y/o editados son: settings.py, urls.py, models.py, viewsets.py, serializers.py

*   En settings.py se añaden las dependencias y configuraciones de "rest_framework" y "corsheaders" (este último para simplificar y evitar problemas con CORS).

```
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
    'DEFAULT\_AUTHENTICATION\_CLASSES': (
        # Simplicar operaciones
        'rest_framework.permissions.AllowAny',
    )
}

APPEND_SLASH = False
CORS\_ORIGIN\_ALLOW_ALL = True
```

*   En urls.py como su nombre indica se definen el tema de rutas.

```
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
    url(r'^api-auth/', include('rest\_framework.urls', namespace='rest\_framework')),

    url(r'^admin/', include(admin.site.urls)),
)
```

*   En models.py se crean los modelos y sus campos.

```
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

*   En serializers.py se serializan los modelos.

```
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

*   Los viewsets.py son necesarios para hacer la conexión de los modelos serializados con el ruteo de urls en urls.py

```
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

Hasta aquí la configuración de Django Rest Framework. Sobre el cliente he obviado cosas para no hacerlo muy extenso. En mi repositorio de [GitHub](https://github.com/ivanalbizu/django_angular) se puede encontrar todo el código de AngularJS.