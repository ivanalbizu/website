---
title: Angular consumiendo de WordPress Rest Api – Crud
published: true
description: Publicación de sobre Angular 1 consumiendo de WordPress Rest Api – Crud
tags: AngularJS,JavaScript,Wordpress
ctime: Fri, 06 May 2016 15:39:14 +0000
---

Siguiendo con la entrada anterior en la que configuraba la <a href="http://ivanalbizu.eu/blog/angular-consumiendo-wordpress-rest-api-autenticacion/">Rest Api con Wordpress y Autenticación JWT con AngularJS, voy a continuar ampliando el proyecto. (Al final de la entrada he publicado un vídeo y el repositorio en Git Hub). Visitando la <a href="http://v2.wp-api.org/" target="_blank">documentación del Plugin Wp Rest Api</a> podemos ver todo lo que se puede hacer, en concreto vamos a realizar:

<ul class="list-bullets">
  <li>Listaremos varias entradas: GET /wp/v2/posts</li>
  <li>Obtendremos una entrada concreta: GET /wp/v2/posts/id</li>
  <li>Actualizaremos una entrada: POST /wp/v2/posts/id</li>
  <li>Crearemos una entrada: POST /wp/v2/posts</li>
  <li>Eliminaremos una entrada: DELETE /wp/v2/posts/id</li>
</ul>

Los dos servicios, <code>PostsServices</code> y <code>PostServices</code> necesitan inyectarle varias dependencias, <code>$http</code>, <code>$rootScope</code> y <code>URL_API</code>:

```javascript
.factory('PostsServices', PostsServices)
.factory('PostServices', PostServices);

PostsServices.$inject = ['$http', '$rootScope', 'URL_API'];
function PostsServices($http, $rootScope, URL_API) {..}

PostServices.$inject = ['$http', '$rootScope', 'URL_API'];
function PostServices($http, $rootScope, URL_API) {...}
```

En la vista (posts.html) que contiene todas las entradas podremos:

<ul class="list-bullets">
  <li>Ver todas las entradas.</li>
  <li>Eliminar una entrada.</li>
  <li>Crear nueva entrada.</li>
</ul>

En la vista <code>post.html</code> que contiene una entrada concreta podremos:

<ul class="list-bullets">
  <li>Obtener la entrada seleccionada.</li>
  <li>Editar la entrada.</li>
</ul>

## Obtener todas las entradas

Cuando la ruta sea <code>/posts</code> cargaremos la vista <code>views/posts.html</code> y el controlador <code>PostsCtrl</code>. Las llamadas desde la vista hacia el controlador las haremos mediante <code>vm</code> sin necesidad de usar el <code>$scope</code>.

```javascript
.when('/posts', {
  templateUrl: 'views/posts.html',
  controller: 'PostsCtrl',
  controllerAs: 'vm'
})
```

El controlador <code>PostsCtrl</code> tiene varios métodos, uno de ellos, llamado <code>**getAll()**</code>, que llama al método <code>**getAllData()**</code> del servicio <code>PostsServices</code>. La respuesta recibida se le pasa a <code>vm.posts</code> para que en la vista pueda ser usada. (No hay tratamiento de errores, pero se deberían tener en cuenta).

```javascript
var vm = this;

vm.getAll = getAll;

getAll();

function getAll() {
  PostsServices.getAllData().then(function(dataResponse) {
    vm.posts = dataResponse;
  });
}
```

El servicio <code>PostsServices</code> tiene varios métodos, uno de ellos el <code>getAllData()</code> realiza una petición GET a la Url de la <code>**API de Wordpress**</code> y devuelve el resultado que luego será capturado desde el controlador.

```javascript
return {
  getAllData: getAllData
};

function getAllData() {
  return $http({
    method : "GET",
    url : URL_API.BASE_URL + '/wp/v2/posts',
  }).then(function(response) {
    return response.data;
  }, function(error) {
    console.log(error);
  });
}
```

Para pintar las entradas, cuando se llama a la vista <code>views/posts.html</code> entra en funcionamiento el controlador <code>PostCtrl</code>. Dicho controlador ejecuta directamente el método <code>getAll()</code>. Esto nos permite obtener todas las entradas ya que está asociado a <code>vm: vm.posts = dataResponse</code>, (convención de nomenclatura muy usada que significa View Model, de esta manera no se abusa del <code>$scope</code>). La vista pinta todas las entradas tras recorrerlas con <code>ng-repeat</code>.

Ya que no usamos el <code>$scope</code>, tenemos que especificar sobre que elementos iteramos: <code>ng-repeat="post in vm.posts"</code>. El plugin Wordpress Rest Api devuelve el título, el contenido y el extracto de una entrada con etiquetas Html es por eso por lo que se usa la directiva <code>ng-bind-html</code>.

```html
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

Cuando la ruta sea <code>/post/:id</code> cargaremos la vista <code>views/post.html</code> y el controlador <code>PostCtrl</code>. Las llamadas desde la vista hacia el controlador las haremos mediante <code>vm</code> sin necesidad de usar el <code>$scope</code>.

```javascript
.when('/post/:id', {
  templateUrl: 'views/post.html',
  controller: 'PostCtrl',
  controllerAs: 'vm'
})
```

El controlador <code>PostCtrl</code> tiene dos métodos, uno de ellos, llamado <code>**getPost(id)**</code>, que llama al método <code>**getPostData(id)**</code> del servicio <code>PostServices</code>. La respuesta recibida se le pasa a <code>vm.post</code> para que en la vista pueda ser usada.

```javascript
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

Para obtener el post que usuario ha seleccionado se le envía en el vínculo la <code>id</code> de la entrada.

```javascript
<a href="#/post/{{post.id}}" class="btn btn-warning">
  <i class="glyphicon glyphicon-eye-open"></i>
</a>
```

Con el método <code>getPostData(id)</code> del servicio <code>PostServices</code> se devuelve la entrada seleccionada por su <code>id</code>.

```javascript
return {
  getPostData:  getPostData
};

function getPostData(id) {
  return $http({
    method : "GET",
    url : URL_API.BASE_URL + '/wp/v2/posts/' + id,
  }).then(function(response) {
    return response.data;
  }, function(error) {
    console.log(error);
  });
}
```

Para pintar una entrada llamamos a cada uno de los atributos que queramos pintar (de entre los que nos manda el plugin Wordpress Rest Api) mediante <code>vm.post</code>.

```html
<h2>Contenido del POST número {{vm.post.id}}</h2>
<h3>Título: {{vm.post.title.rendered}}</h3>
<h4>Contenido:</h4>
<div ng-bind-html="vm.post.content.rendered"></div>
<h4>Extracto:</h4>
<div ng-bind-html="vm.post.excerpt.rendered"></div>
<a href="{{vm.post.link}}" target="_blank">{{vm.post.link}}</a
```

## Editar una entrada

La edición de una entrada voy a realizarlo a través de un modal de Bootstrap. Para abrir el modal se usa el método <code>openModal()</code> que se encuentra en el controlador <code>PostCtrl()</code>. En dicho método se especifica el controlador y la template que se usará.

```javascript
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

```html
<button class="btn btn-primary" ng-click="vm.openModal()">Editar post</button>
```

Se ha creado un nuevo controlador <code>ModalPostCtrl</code> para realizar acciones con la entrada que se quiere editar.

<ul class="list-bullets">
  <li>Obtener la entrada por su ID con getPost(id).</li>
  <li>Guardar la edición de la entrada con el método editPost(post, id). Para eso le pasamos al método editPostData(data, id) del servicio 'PostServices' los nuevos datos del post y su ID.</li>
  <li>Cancelar y cerrar la ventana modal.</li>
</ul>

El código completo del controlador de la ventana modal será:

```javascript
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

La edición de una entrada la representamos mediante una vista modal. En este caso se llamarán a los datos de una entrada mediante <code>vmm</code> para evitar posibles conflictos. Se identifica mediante la ID el nombre de la template html. Para actualizar la entrada se usa un formulario que tiene la directiva <code>ng-submit</code> con los nuevos datos y la ID de la entrada a actualizar <code>ng-submit="vmm.editPost(vmm.post, vmm.post.id)"</code>.

```javascript
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

Cómo he comentado anteriormente, la creación de una nueva entrada la realizaremos desde la vista <code>/posts</code> con el controlador <code>PostsCtrl</code>. En este controlador tenemos el método <code>createPost(post)</code>, que recibe los datos dela nueva entrada que el usuario a rellenado en la vista, y se le añade el atributo <code>status</code> como <code>publish</code> para que no aparezca como borrador, que es su comportamiento por defecto. Los datos son enviado al método <code>createData(data)</code> del servicio <code>PostsServices</code>. Se incorpora el método <code>getAll()</code> para actualizar todas las entradas y el método <code>resetFields()</code> para limpiar el formulario en la vista.

```javascript
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

El servicio <code>createPostData(data)</code> recibe la entrada y la envía a la Rest Api de Wordpress mediante POST. Devolviendo la respuesta del servidor.

```javascript
return {
  createPostData: createPostData
};

function createPostData(data) {
  return $http({
    method : "POST",
    url : URL_API.BASE_URL + '/wp/v2/posts',
    data: data,
  }).then(function(response) {
    return response.data;
  }, function(error) {
    console.log(error);
  });
}
```

Los campos para la creación de la nueva entrada está dentro de la tabla donde se pintan todas las entradas. Será enviado al controlador al activar el evento <code>createPost(vm): ng-click="vm.createPost(vm)"</code>

```html
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

Para eliminar una entrada la realizaremos desde la vista <code>/posts</code> con el controlador <code>PostsCtrl</code>. El método <code>deletePost(id)</code> necesita la ID de la entrada a eliminar. Igual que hasta ahora, usamos para ello un servicio <code>deletePostData(id)</code> que se encarga de enviar la petición al servidor. Una vez procesado, se vuelve a solicitar todas las entradas con <code>getAll()</code> para actualizar la lista.

```javascript
var vm = this;

vm.deletePost = deletePost;

function deletePost(id) {
  PostsServices.deletePostData(id).then(function(dataResponse) {
    console.log(dataResponse);
    getAll();
  });
}
```

El servicio <code>deletePostData(id)</code> se encarga de enviar la petición DELETE a la Rest Api de Wordpress con la ID de la entrada a eliminar.

```javascript
return {
  deletePostData: deletePostData
};

function deletePostData(id) {
  return $http({
    method : "DELETE",
    url : URL_API.BASE_URL + '/wp/v2/posts/' + id,
  }).then(function(response) {
    console.log("Se ha eliminado: ", response.data);
    return response.data;
  }, function(error) {
    console.log(error);
  });
}
```

En la vista de todas las entradas aparece justo al lado de cada entrada un botón para eliminar la entrada.

```html
<a ng-click="vm.deletePost(post.id)" class="btn btn-danger">
  <i class="glyphicon glyphicon-trash"></i>
</a>
```

Hasta aquí está el **crud completo con AngularJS usando Wordpress como Api Rest.** <a href="https://github.com/ivanalbizu/angular_wordpress_rest_api" target="_blank">Código en mi GitHub</a>

En siguientes entradas publicaré como obtener las revisiones de una entrada.