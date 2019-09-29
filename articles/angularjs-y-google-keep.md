---
title: AngularJS y Google Keep
published: true
description: AngularJS 1 y Google Keep consumiendo de Api construida con Python  Django
tags: AngularJS,JavaScript
ctime: Sun, 15 Nov 2015 17:01:12 +0000
---

No pretendo implementar todas las funcionalidades con AngularJS que tiene Google Keep, sólo alguna de ellas. Al final de la entrada hay enlace al código en GitHub y vídeo. Se podrán crear nuevas tareas, eliminarlas, editar su título y su contenido, cambiar los colores de fondo y filtrarlas. Una tarea estará compuesta por:

<ul class="list-bullets">
  <li>Título</li>
  <li>Descripción</li>
  <li>Color de fondo</li>
  <li>Fecha de creación</li>
  <li>Fecha de última actualización</li>
</ul>

La API la he construido con Django Rest Framework. Al final de la entrada colocaré el código necesario. El cliente está construido con AngularJS, con el <a href="http://yeoman.io/" target="_blank">generador yeoman.io</a>

## Cliente AngularJS - Servicios y Controladores

Las peticiones GET, POST, PUT y DELETE se hacen a Django Rest Framework, cuya definición está en el archivo <code>service.js</code>. No hay mucho que explicar, sólo comentar que se usa <code>$resource</code>, dada la sencillez de la aplicación.

```javascript
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

En el controlador me detendré un poco más. El primer método, <code>getAll()</code>, obtiene todos los registros.

```javascript
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

El método <code>save(data)</code> será para crear un nuevo registro. Si algún campo falta (Título o Descripción -el resto de campos son autorellenados-) saldrá un alert. Si todo fue bien, dentro de la función <code>success</code>, se actualizan los cambios llamando a <code>getAll()</code> y reseteando el contenido de las etiquetas y vaciando el modelo.

```javascript
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

El método <code>delete(id)</code> toma la id de la tarea que se va a eliminar.

```javascript
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

El método <code>saveColor(id, data, color)</code> toma tres parámetros con los que se construirá un nuevo modelo, que será usado para actualizar la tarea seleccionada.

```javascript
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

El método <ocde>update(id, data)</code> actualiza el registro. La actualización se realiza cada vez que se edite o bien el título o bien la descripción de la tarea. Si algunos de los dos campos anteriores se dejan en blanco, no se actualizará su contenido.

```javascript
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

El método <code>cancel()</code> será llamado cuando no se quiera crear una una nueva tarea.

```javascript
$scope.cancel = function() {
  document.getElementById('newtask').style.display = "none";
  $scope.newtask='';
};
```

## Cliente AngularJS - Vistas

En <code>**index.html**</code> se añade dentro de la navegación el input para buscar y el vínculo para hacer visible el formulario para crear nueva tarea. Para activar el filtro de búsqueda se llama a la directiva <code>ng-model="search"</code> y en la directiva <code>ng-repeat</code> se aplica el filtro <code>ng-repeat="task in tasks | filter:search"</code>. Para abrir el formulario de creación de nueva tarea se usa el evento <code>onclick</code> de javascript que cambia el display del contenedor del formulario.

En <code>**main.html**</code> se pintan todas las tareas. Para ello, iniciamos todas las tareas con <code>ng-init="getAll()"</code>. Cada tarea estará dentro de una etiqueta <code>&lt;article&gt;</code>. Cada <code>&lt;article&gt;</code> se divide en tres zonas: <code>&lt;header&gt;</code>, <code>&lt;div&gt;</code> y <code>&lt;footer&gt;</code>.

<ul class="list-bullets">
  <li>El <code>&lt;header&gt;</code> contiene el título de la tarea dentro de un <code>&lt;input&gt;</code> al que se resetean los estilos y se añade la directiva <code>ng-change</code>, que en caso de cambiar su contenido cuando el <code>&lt;input&gt;</code> pierda el foco <code>ng-model-options</code> se llama al método <code>update(task.id, task)</code>. Otro elemento que contiene el <code>&lt;header&gt;</code> es un submenú para el cambio de colores y la eliminación de la tarea. Con Bootstrap se habilita el menú desplegable. Cada uno de los elementos <code>&lt;li&gt;</code> contiene un color diferente que en caso de llamarse el evento click <code>ng-click="saveColor(task.id, task, '132,198,100');"</code> se guardará en color que se hubiera seleccionado. También, aunque no necesario, cuando se activa el evento se guarda en una variable <code>selected_color</code> el color seleccionado, que puede ser aplicado mediante la directiva <code>ng-style</code> al <code>&lt;article&gt;</code></li>
  <li>La etiqueta <code>&lt;div&gt;</code> con clase <code>content</code> contiene un <code>&lt;textarea&gt;</code> que al igual que el input para el título ha sido reseteado, y usa la directiva <code>ng-change</code> que llama al método <code>update(task.id, task)</code> cuando el <code>&lt;textarea&gt;</code> pierde el foco y el contenido a cambiado, todo ello gracias a <code>ng-model-options="{updateOn: 'blur'}"</code></li>
  <li>En <code>&lt;footer&gt;</code> se pintan las fechas de creación <code>{{task.created | date:"dd/MM/yyyy"}}</code> y la última edición de la tarea <code>{{task.updated | date:"dd/MM/yyyy h:mma"}}</code>. Para la creación de una nueva tarea se dispone de un formulario con <code>&lt;input&gt;</code> (para el título) y <code>&lt;textarea&gt;</code> (para la descripción). Por defecto el formulario no está visible. No hay mucho que explicar, hay botón para guardar, que en caso de que estén los datos rellenos se guardan, se resetean y se oculta el formulario, y si se cancela se resetea el formulario y se cierra</li>
</ul>

Código Rest con Django Rest Framework:

```python
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

El código completo está publicado <a href="https://github.com/ivanalbizu/angular_gkeep" target="_blank">en mi GitHub</a>.

Y aquí un vídeo en el que explico todo lo anterior. 