---
title: 'Angular consumiendo de WordPress Rest Api – Crud'
date: Fri, 06 May 2016 15:39:14 +0000
published: true
tags: AngularJS,JavaScript,Wordpress
---

Siguiendo con la entrada anterior en la que configuraba la [Rest Api con Wordpress y Autenticación JWT con AngularJS](http://ivanalbizu.eu/angular-consumiendo-wordpress-rest-api-autenticacion/), voy a continuar ampliando el proyecto. (Al final de la entrada he publicado un vídeo y el repositorio en Git Hub). Visitando la [documentación del Plugin Wp Rest Api](http://v2.wp-api.org/)  podemos ver todo lo que se puede hacer, en concreto vamos a realizar:

*   Listaremos varias entradas: GET /wp/v2/posts
*   Obtendremos una entrada concreta: GET /wp/v2/posts/id
*   Actualizaremos una entrada: POST /wp/v2/posts/id
*   Crearemos una entrada: POST /wp/v2/posts
*   Eliminaremos una entrada: DELETE /wp/v2/posts/id

Los dos servicios, PostsServices y PostServices necesitan inyectarle varias dependencias, $http, $rootScope y URL_API:

```
.factory('PostsServices', PostsServices)
.factory('PostServices', PostServices);

PostsServices.$inject = \['$http', '$rootScope', 'URL_API'\];
function PostsServices($http, $rootScope, URL_API) {..}

PostServices.$inject = \['$http', '$rootScope', 'URL_API'\];
function PostServices($http, $rootScope, URL_API) {...}
```

En la vista (posts.html) que contiene todas las entradas podremos:

*   Ver todas las entradas.
*   Eliminar una entrada.
*   Crear nueva entrada.

En la vista (post.html) que contiene una entrada concreta podremos:

*   Obtener la entrada seleccionada.
*   Editar la entrada.

## Obtener todas las entradas

Cuando la ruta sea '/posts' cargaremos la vista 'views/posts.html' y el controlador 'PostsCtrl'. Las llamadas desde la vista hacia el controlador las haremos mediante 'vm' sin necesidad de usar el '$scope'.

```
.when('/posts', {
  templateUrl: 'views/posts.html',
  controller: 'PostsCtrl',
  controllerAs: 'vm'
})
```

El controlador 'PostsCtrl' tiene varios métodos, uno de ellos, llamado **getAll()**, que llama al método **getAllData()** del servicio 'PostsServices'. La respuesta recibida se le pasa a 'vm.posts' para que en la vista pueda ser usada. (No hay tratamiento de errores, pero se deberían tener en cuenta).

```
var vm = this;

vm.getAll = getAll;

getAll();

function getAll() {
  PostsServices.getAllData().then(function(dataResponse) {
    vm.posts = dataResponse;
  });
}
```

El servicio 'PostsServices' tiene varios métodos, uno de ellos el getAllData() realiza una petición GET a la Url de la **API de Wordpress** y devuelve el resultado que luego será capturado desde el controlador.

```
return {
  getAllData: getAllData
};

function getAllData() {
  return $http({
    method : "GET",
    url : URL\_API.BASE\_URL + '/wp/v2/posts',
  }).then(function(response) {
    return response.data;
  }, function(error) {
    console.log(error);
  });
}
```

Para pintar las entradas, cuando se llama a la vista 'views/posts.html' entra en funcionamiento el controlador PostCtrl. Dicho controlador ejecuta directamente el método getAll(). Esto nos permite obtener todas las entradas ya que está asociado a vm: vm.posts = dataResponse, (convención de nomenclatura muy usada que significa View Model, de esta manera no se abusa del $scope). La vista pinta todas las entradas tras recorrerlas con 'ng-repeat'. Ya que no usamos el $scope, tenemos que especificar sobre que elementos iteramos: ng-repeat="post in vm.posts". El plugin Wordpress Rest Api devuelve el título, el contenido y el extracto de una entrada con etiquetas Html es por eso por lo que se usa la directiva ng-bind-html.

```
<table>
  ...
  <tr ng-repeat="post in vm.posts">
    <td>{{post.date}}</td>
    <td ng-bind-html="post.title.rendered"></td>
    <td ng-bind-html="post.content.rendered"></td>
    <td ng-bind-html="post.excerpt.rendered"></td>
    ...
  </tr>
  ...
</table>
```

## Obtener una entrada

Cuando la ruta sea '/post/:id' cargaremos la vista 'views/post.html' y el controlador 'PostCtrl'. Las llamadas desde la vista hacia el controlador las haremos mediante 'vm' sin necesidad de usar el '$scope'.

```
.when('/post/:id', {
  templateUrl: 'views/post.html',
  controller: 'PostCtrl',
  controllerAs: 'vm'
})
```

El controlador 'PostCtrl' tiene dos métodos, uno de ellos, llamado **getPost(id)**, que llama al método **getPostData(id)** del servicio 'PostServices'. La respuesta recibida se le pasa a 'vm.post' para que en la vista pueda ser usada.

```
var vm = this;
//Se obtiene por parámetro la ID de la entrada seleccionada
var id = $routeParams.id;

vm.getPost = getPost;

vm.getPost(id);
vm.getPostRevissions(id);

function getPost(id) {
  PostServices.getPostData(id).then(function(dataResponse) {
    vm.post = dataResponse;
  });
}
```

Para obtener el post que usuario ha seleccionado se le envía en el vínculo la 'id' de la entrada.

```
<a href="#/post/{{post.id}}" class="btn btn-warning">
  <i class="glyphicon glyphicon-eye-open"></i>
</a>
```

Con el método getPostData(id) del servicio 'PostServices' se devuelve la entrada seleccionada por su id.

```
return {
  getPostData:  getPostData
};

function getPostData(id) {
  return $http({
    method : "GET",
    url : URL\_API.BASE\_URL + '/wp/v2/posts/' + id,
  }).then(function(response) {
    return response.data;
  }, function(error) {
    console.log(error);
  });
}
```

Para pintar una entrada llamamos a cada uno de los atributos que queramos pintar (de entre los que nos manda el plugin Wordpress Rest Api) mediante 'vm.post'.

```
<h2>Contenido del POST número {{vm.post.id}}</h2>
<h3>Título: {{vm.post.title.rendered}}</h3>
<h4>Contenido:</h4>
<div ng-bind-html="vm.post.content.rendered"></div>
<h4>Extracto:</h4>
<div ng-bind-html="vm.post.excerpt.rendered"></div>
<a href="{{vm.post.link}}" target="_blank">{{vm.post.link}}</a
```

## Editar una entrada

La edición de una entrada voy a realizarlo a través de un modal de Bootstrap. Para abrir el modal se usa el método openModal() que se encuentra en el controlador PostCtrl(). En dicho método se especifica el controlador y la template que se usará.

```
var vm = this;

vm.openModal = openModal;

function openModal() {
  console.log('Se abre modal');
  var modalInstance = $modal.open({
    controller: 'ModalPostCtrl as vmm',
    templateUrl: 'modal-post.html'
  });
}
```

Y que es llamado en la vista post.html mediante un botón.

```
<button class="btn btn-primary" ng-click="vm.openModal()">Editar post</button>
```

Se ha creado un nuevo controlador 'ModalPostCtrl' para realizar acciones con la entrada que se quiere editar.

*   Obtener la entrada por su ID con getPost(id).
*   Guardar la edición de la entrada con el método editPost(post, id). Para eso le pasamos al método editPostData(data, id) del servicio 'PostServices' los nuevos datos del post y su ID.
*   Cancelar y cerrar la ventana modal.

El código completo del controlador de la ventana modal será:

```
ModalPostCtrl.$inject = [ '$routeParams', '$modalInstance', 'PostServices', '$route' ];
function ModalPostCtrl ( $routeParams, $modalInstance, PostServices, $route ) {

  var vmm = this;
  var id = $routeParams.id;
  vmm.messageText = 'Editando Post';

  vmm.cancel = cancel;
  vmm.getPost = getPost;
  vmm.editPost = editPost;

  vmm.getPost(id);

  function cancel() {
    console.log('Se cancela guardar usando modal');
    $modalInstance.dismiss();
  }

  function getPost(id) {
    PostServices.getPostData(id).then(function(dataResponse) {
      vmm.post = dataResponse;
    });
  }

  function editPost(post, id) {
    var data = $.param({
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      slug: encodeURIComponent(post.title.rendered.replace(/\\s+/g, '-').toLowerCase()),
    });
    PostServices.editPostData(data, id).then(function(dataResponse) {
      console.log("Se guarda en el modal");
      $modalInstance.close($route.reload());
    });
  }
}
```

La edición de una entrada la representamos mediante una vista modal. En este caso se llamarán a los datos de una entrada mediante 'vmm' para evitar posibles conflictos. Se identifica mediante la ID el nombre de la template html. Para actualizar la entrada se usa un formulario que tiene la directiva ng-submit con los nuevos datos y la ID de la entrada a actualizar 'ng-submit="vmm.editPost(vmm.post, vmm.post.id)"'.

```
<script type="text/ng-template" id="modal-post.html">
  <form ng-submit="vmm.editPost(vmm.post, vmm.post.id)" method="post" role="form">
    <div class="modal-header">
      <h3 class="modal-title">{{ vmm.messageText }}</h3>
    </div>
    <div class="modal-body">
      <h4>Título: {{vmm.post.title.rendered}}</h4>
        <div class="form-group">
          <label for="title">Título:</label>
          <input type="text" ng-model="vmm.post.title.rendered" id="title" class="form-control" />
          <label for="content">Contenido:</label>
          <textarea rows="4" ng-model="vmm.post.content.rendered" ng-bind-html="vmm.post.content.rendered" id="content" class="form-control"></textarea>
          <label for="excerpt">Resumen:</label>
          <input type="text" ng-model="vmm.post.excerpt.rendered" id="excerpt" class="form-control" />
        </div>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-primary">Guardar cambios</button>
      <a href="" class="btn btn-danger" ng-click="vmm.cancel()">Cancel</a>
    </div>
  </form>
</script>
```

## Crear una nueva entrada

Cómo he comentado anteriormente, la creación de una nueva entrada la realizaremos desde la vista '/posts' con el controlador 'PostsCtrl'. En este controlador tenemos el método createPost(post), que recibe los datos dela nueva entrada que el usuario a rellenado en la vista, y se le añade el atributo 'status' como 'publish' para que no aparezca como borrador, que es su comportamiento por defecto. Los datos son enviado al método createData(data) del servicio 'PostsServices'. Se incorpora el método getAll() para actualizar todas las entradas y el método resetFields() para limpiar el formulario en la vista.

```
var vm = this;

vm.createPost = createPost;

function createPost(post) {
  var data = $.param({
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    status: 'publish',
  });
  PostsServices.createPostData(data).then(function(dataResponse) {
    resetFields();
    getAll();
  });
}

function resetFields() {
  vm.title = '';
  vm.content = '';
  vm.excerpt = '';
}
```

El servicio createPostData(data) recibe la entrada y la envía a la Rest Api de Wordpress mediante POST. Devolviendo la respuesta del servidor.

```
return {
  createPostData: createPostData
};

function createPostData(data) {
  return $http({
    method : "POST",
    url : URL\_API.BASE\_URL + '/wp/v2/posts',
    data: data,
  }).then(function(response) {
    return response.data;
  }, function(error) {
    console.log(error);
  });
}
```

Los campos para la creación de la nueva entrada está dentro de la tabla donde se pintan todas las entradas. Será enviado al controlador al activar el evento createPost(vm): ng-click="vm.createPost(vm)"

```
<table>
...
  <tr>
    <td></td>
    <td><input type="text" ng-model="vm.title" id="title" placeholder="Título" class="form-control" /></td>
    <td><input type="text" ng-model="vm.content" id="content" placeholder="Contenido" class="form-control" /></td>
    <td><input type="text" ng-model="vm.excerpt" id="excerpt" placeholder="Extracto" class="form-control" /></td>
    <td colspan="2"><a href="" ng-click="vm.createPost(vm)" type="submit" class="btn btn-primary">Crear post</a></td>
  </tr>
  ...
</table>
```

## Eliminar una entrada

Para eliminar una entrada la realizaremos desde la vista '/posts' con el controlador 'PostsCtrl'. El método deletePost(id) necesita la ID de la entrada a eliminar. Igual que hasta ahora, usamos para ello un servicio deletePostData(id) que se encarga de enviar la petición al servidor. Una vez procesado, se vuelve a solicitar todas las entradas con getAll() para actualizar la lista.

```
var vm = this;

vm.deletePost = deletePost;

function deletePost(id) {
  PostsServices.deletePostData(id).then(function(dataResponse) {
    console.log(dataResponse);
    getAll();
  });
}
```

El servicio deletePostData(id) se encarga de enviar la petición DELETE a la Rest Api de Wordpress con la ID de la entrada a eliminar.

```
return {
  deletePostData: deletePostData
};

function deletePostData(id) {
  return $http({
    method : "DELETE",
    url : URL\_API.BASE\_URL + '/wp/v2/posts/' + id,
  }).then(function(response) {
    console.log("Se ha eliminado: ", response.data);
    return response.data;
  }, function(error) {
    console.log(error);
  });
}
```

En la vista de todas las entradas aparece justo al lado de cada entrada un botón para eliminar la entrada.

```
<a ng-click="vm.deletePost(post.id)" class="btn btn-danger">
  <i class="glyphicon glyphicon-trash"></i>
</a>
```

Hasta aquí está el **crud completo con AngularJS usando Wordpress como Api Rest.** [https://github.com/ivanalbizu/angular\_wordpress\_rest_api](http://Git Hub) En siguientes entradas publicaré como obtener las revisiones de una entrada.