---
title: AngularJS y Google Keep
published: true
description: AngularJS 1 y Google Keep consumiendo de Api construida con Python  Django
tags: AngularJS,JavaScript
ctime: Sun, 15 Nov 2015 17:01:12 +0000
---

No pretendo implementar todas las funcionalidades con AngularJS que tiene Google Keep, sólo alguna de ellas. Al final de la entrada hay enlace al código en GitHub y vídeo. Se podrán crear nuevas tareas, eliminarlas, editar su título y su contenido, cambiar los colores de fondo y filtrarlas. Una tarea estará compuesta por:

*   Título
*   Descripción
*   Color de fondo
*   Fecha de creación
*   Fecha de última actualización

La API la he construido con Django Rest Framework. Al final de la entrada colocaré el código necesario. El cliente está construido con AngularJS, con el generador [yeoman.io](http://yeoman.io/).

## Cliente AngularJS - Servicios y Controladores

Las peticiones GET, POST, PUT y DELETE se hacen a Django Rest Framework, cuyda definición está en el archivo service.js. No hay mucho que explicar, sólo comentar que se usa $resource, dada la sencillez de la aplicación.

```
'use strict';

angular.module('gkeepApp')
  .factory('TaskServices', ['$resource',
    function ($resource) {
      var url_one = 'http://127.0.0.1:8000/tasks/:id';
      var url_all = 'http://127.0.0.1:8000/tasks';
      return $resource(
        url_one, {}, {
          get: {method: 'GET', cache: false, isArray: false},
          save: {method: 'POST', cache: false, isArray: false},
          upctime: {method: 'PUT', cache: false, isArray: false},
          delete: {method: 'DELETE', cache: false, isArray: false},
          get_all: {method: 'GET', url: url_all, cache: false, isArray: true},
        }
      );
  }]);
```

En el controlador me detendré un poco más. El primer método, _getAll()_, obtiene todos los registros.

```
$scope.getAll = function() {
  TaskServices.get_all({},
    function success(response) {
      $scope.tasks = response;
    },
    function error(errorResponse){
      console.log("Error: "+ JSON.stringify(errorResponse));
    }
  )
}
```

El método _save(data)_ será para crear un nuevo registro. Si algún campo falta (Título o Descripción -el resto de campos son autorellenados-) saldrá un alert. Si todo fue bien, dentro de la función "success", se actualizan los cambios llamando a getAll() y reseteando el contenido de las etiquetas y vaciando el modelo.

```
$scope.save = function(data) {
  TaskServices.save(data,
    function success(response) {
      document.getElementById('newtask').style.display = "none";
      $scope.newtask='';
      $scope.getAll();
    },
    function error(errorResponse) {
      alert("Empty fields");
    }
  )
};
```

El método _delete(id)_ toma la id de la tarea que se va a eliminar.

```
$scope.delete = function(id) {
  TaskServices.delete({id: id},
    function success(response) {
      $scope.getAll();
    },
    function error(errorResponse) {
      console.log("Error:"	+	JSON.stringify(errorResponse));
    }
  )
};
```

El método _saveColor(id, data, color)_ toma tres parámetros con los que se construirá un nuevo modelo, que será usado para actualizar la tarea seleccionada.

```
$scope.saveColor = function(id, data, color) {
  var task = {
    'id': id,
    'title': data.title,
    'description': data.description,
    'color': 'rgba('+color+',0.90);'
  };
  TaskServices.update({id: id}, task,
    function success(response) {
      $scope.getAll();
    },
    function error(errorResponse) {
      console.log("Error:"	+	JSON.stringify(errorResponse));
    }
  )
};
```

El método _update(id, data)_ actualiza el registro. La actualización se realiza cada vez que se edite o bien el título o bien la descripción de la tarea. Si algunos de los dos campos anteriores se dejan en blanco, no se actualizará su contenido.

```
$scope.update = function(id, data) {
  if (data.description !== '' && data.title !== ''){
    TaskServices.update({id: id}, data,
      function success(response) {
        $scope.getAll();
      },
      function error(errorResponse) {
        console.log("Error:"	+	JSON.stringify(errorResponse));
      }
    )
  } else {
    $scope.getAll();
    alert("Empty fields");
  }
};
```

El método _cancel()_ será llamado cuando no se quiera crear una una nueva tarea.

```
$scope.cancel = function() {
  document.getElementById('newtask').style.display = "none";
  $scope.newtask='';
};
```

## Cliente AngularJS - Vistas

En **index.html** se añade dentro de la navegación el input para buscar y el vínculo para hacer visible el formulario para crear nueva tarea. Para activar el filtro de búsqueda se llama a la directiva _ng-model="search"_ y en la directiva ng-repeat se aplica el filtro _ng-repeat="task in tasks | filter:search"_ Para abrir el formulario de creación de nueva tarea se usa el evento _onclick_ de javascript que cambia el display del contenedor del formulario. En **main.html** se pintan todas las tareas. Para ello, iniciamos todas las tareas con _ng-init="getAll()"_. Cada tarea estará dentro de una etiqueta _article_. Cada _article_ se divide en tres zonas: _header_, _div_ y _footer_. El _header_ contiene el título de la tarea dentro de un _input_ al que se resetean los estilos y se añade la directiva _ng-change_, que en caso de cambiar su contenido cuando el _input_ pierda el foco _ng-model-options_ se llama al método update(task.id, task). Otro elemento que contiene el _header_ es un submenú para el cambio de colores y la eliminación de la tarea. Con Bootstrap se habilita el menú desplegable. Cada uno de los elementos _li_ contiene un color diferente que en caso de llamarse el evento click _ng-click="saveColor(task.id, task, '132,198,100');..."_ se guardará en color que se hubiera seleccionado. También, aunque no necesario, cuando se activa el evento se guarda en una variable _selected_color _el color seleccionado, que puede ser aplicado mediante la directiva _ng-style_ al _article._ La etiqueta _div_ con clase _content_ contiene un _textarea,_ que al igual que el input para el título ha sido reseteado, y usa la directiva _ng-change_ que llama al método _update(task.id, task)_ cuando el _textarea_ pierde el foco y el contenido a cambiado, todo ello gracias a _ng-model-options="{updateOn: 'blur'}"_. En el footer se pintan las fechas de creación _{{task.created | date:"dd/MM/yyyy"}}_ y la última edición de la tarea _{{task.updated | date:"dd/MM/yyyy h:mma"}}_. Para la creación de una nueva tarea se dispone de un formulario con _input_ (para el título) y _textarea_ (para la descripción). Por defecto el formulario no está visible. No hay mucho que explicar, hay botón para guardar, que en caso de que estén los datos rellenos se guardan, se resetean y se oculta el formulario, y si se cancela se resetea el formulario y se cierra. El código completo está publicado en mi [GitHub](https://github.com/ivanalbizu/angular_gkeep). Y aquí un vídeo en el que explico todo lo anterior. 

Código Rest con Django Rest Framework:

```
##############
## settings.py
##############

INSTALLED_APPS = (
    ## ...
    'rest_framework',
    'app',
    'corsheaders',
)

MIDDLEWARE_CLASSES = (
    ## ...
    'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsMiddleware',
)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    )
}

APPEND_SLASH = False
CORS_ORIGIN_ALLOW_ALL = True


############
## models.py
############

from django.db import models

class Task(models.Model):
    title = models.TextField(max_length=100)
    description = models.TextField(max_length=1000)
    color = models.TextField(max_length=30, blank=True, default='rgba(62,75,78,0.90);')
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)


#################
## serializers.py
#################

from rest_framework.serializers import ModelSerializer
from .models import Task

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'color', 'updated', 'created')


##############
## viewsets.py
##############

from .models import Task
from .serializers import TaskSerializer
from rest_framework import viewsets

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


##########
## urls.py
##########

from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

from app.viewsets import TaskViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter(trailing_slash=False)
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
]
```