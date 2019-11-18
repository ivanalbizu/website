---
title: Angular consumiendo de WordPress Rest Api – Trabajando con usuarios
published: true
description: Publicación de sobre Angular 1 consumiendo de WordPress Rest Api – Trabajando con usuarios
tags: AngularJS,JavaScript,Wordpress
ctime: Sun, 08 May 2016 12:32:51 +0000
---

En esta entrada es continuación de dos entradas anteriores sobre Wordpress y Angular, <a href="angular-consumiendo-wordpress-rest-api-autenticacion/">Autenticación con JWT</a> y <a href="angular-consumiendo-wordpress-rest-api-crud/">CRUD con entradas de Wordpress</a>. En esta ocasión sólo voy a obtener el usuario actualmente autenticado y permitir edición de algunos campos de su perfil. Podría mejorarse el tratamiento de las páginas que puede ver un usuario, como por ejemplo no mostrar toda la navegación ni mostrar la página de login si ya está Autenticado.

No me extenderé mucho ya que muchas cosas son comunes y repetitivas en mis anteriores publicaciones. (Al final de la entrada he publicado un vídeo y el repositorio en Git Hub).

Vamos a realizar:

<ul class="list-bullets">
  <li>Obtener el usuario autenticado.</li>
  <li>Habilitar al usuario la edición de algunos de sus datos.</li>
  <li>Vistas.</li>
</ul>

Cuando la ruta sea <code>/user</code> usaremos la vista <code>views/user.html</code> y el controlador <code>UserCtrl</code>

```javascript
.when('/user', {
  templateUrl: 'views/user.html',
  controller: 'UserCtrl',
  controllerAs: 'vm'
})
```

## Obtener el usuario autenticado
El método getCurrentUser() del controlador 'UserCtrl' obtendrá (caso de existir) el token almacenado en el LocalStorage del navegador y lanzará la petición a la factoría getCurrentUserData del archivo 'users.services.js' para obtener los datos del usuario y guardarlo en user: 'vm.user = dataResponse;' añadiendo una nueva variable 'vm.login = 3' para mostrar o no usando la directiva 'ng-show' en la vista.

```javascript
var vm = this;
vm.login = '1';

vm.getCurrentUser = getCurrentUser;

vm.getCurrentUser();

function getCurrentUser() {
  if (typeof window.localStorage !== 'undefined') {
    try {
      if (window.localStorage.getItem('token') == null) {
        vm.login = '2';
        $location.path('/login');
      } else {
        vm.login = '3';
        UserServices.getCurrentUserData().then(function(dataResponse) {
          vm.user = dataResponse;
        });
      }
    } catch(e) {
      vm.login = '4';
      $location.path('/login');
    }
  } else {
    vm.login = '5';
    $location.path('/login');
  }
}
```

En el archivo <code>users-services.js</code> tenemos dos métodos para obtener el usuario <code>getUserId()</code> y getCurrentUserData(). El método <code>getUserId()</code> decodificará el Json Web Token (JWT) para devolver la id del usuario.

```javascript
function getUserId() {
  try{
    var token = localStorage['token'];
    if (token === '') return;

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');

    console.log(JSON.parse(window.atob(base64)).data);

    return JSON.parse(window.atob(base64)).data;
  } catch(err) {
    //$location.path('/');
  }
}
```

Para más información podemos visitar la <a href="https://jwt.io/" target="_blank">web https://jwt.io</a> y trastear un poco. Por ejemplo, he obtenido el token generado imprimiendo en el método anterior <code>console.log(base64);</code> y lo he copiado en la web anterior, y me ha dado la ID de usuario 1:

<figure>
  <img alt="JWT - Json Web Token" loading="lazy" src="/images/articles/angular-consumiendo-wordpress-rest-api-trabajando-usuarios/jwt-header.png">
</figure>

El otro método, <code>getCurrentUserData()</code>, devolverá los datos del usuario al controlador haciendo petición GET a la URL de la Api de Wordpress <code>'URL_API.BASE_URL + '/wp/v2/users/' + user_id'</code>.

```javascript
function getCurrentUserData() {
  var user_id = getUserId().user.id;
  return $http({
    method: 'GET',
    url: URL_API.BASE_URL + '/wp/v2/users/' + user_id,
  }).then(function(response) {
    return response.data;
  }, function(error) {
    console.log(error);
  });
}

return {
  getCurrentUserData: getCurrentUserData,
};
```

## Edición de un usuario
Los datos que el usuario puede editar son su nombre, descripción (biografía) y link (link personalizado, no el link propio a su perfil de Wordpress). La petición a la Rest de Api de Wordress se realizará con el método <code>editUserData(data, id)</code> del servicio <code>UserServices</code> mediante POST pasando como parámetro los campos editados y la ID del usuario.

```javascript
function editUserData(data, id) {
  return $http({
    method : "POST",
    url : URL_API.BASE_URL + '/wp/v2/users/' + id,
    data: data,
  }).then(function(response) {
    return response.data;
  }, function(error) {
    console.log(error);
  });
}

return {
  editUserData: editUserData,
};
```

En el controlador <code>UserCtrl</code> contiene el método <code>editUser(data, id)</code> que lanza la petición al servicio tras obtener en la vista los campos editados y la Id del usuario, refrescando la vista con la llamada <code>getCurrentUser()</code> si la petición fue correcta.

## Configurando la vista

La vista es mostrada al usuario en <code>views/user.html</code>. Las etiquetas html usadas son de un formulario. Por defecto los campos el formulario aparecen deshabilitados mediante la directiva <code>ng-disabled = !vm.enable</code>. Se usa una variable <code>enable</code> para controlar estados. Al cargar el controlador por defecto enable toma el valor <code>false</code>. Existe tres botones. Uno de ellos habilita la edición del formulario. Los otros dos (Cancelar y Guardar) se muestran cuando se ha seleccionado el primero (en este caso, el primer botón se oculta). Según los diferentes casos se opera con la variable cambiando su valor.

```html
<div ng-show="vm.login === '3'">
  <form ng-submit="vm.editUser(vm.user, vm.user.id)" method="post" role="form">
    <h2>Datos del usuario: </h2>
    <div class="form-group">
      <label for="id">ID</label>
      <input type="text" value="{{vm.user.id}}" name="nombre" class="form-control" disabled>
    </div>
    <div class="form-group">
      <label for="nombre">Nombre</label>
      <input type="text" ng-model="vm.user.name" ng-disabled="!vm.enable" value="{{vm.user.name}}" name="nombre" class="form-control">
    </div>
    <div class="form-group">
      <label for="description">Biografía</label>
      <input type="text" ng-model="vm.user.description" ng-disabled="!vm.enable" value="{{vm.user.description}}" name="description" class="form-control">
    </div>
    <div class="form-group">
      <label for="url">Url del autor</label>
      <input type="url" ng-model="vm.user.url" ng-disabled="!vm.enable" value="{{vm.user.url}}" name="url" class="form-control">
    </div>
    <button ng-show="vm.enable == true" type="submit" class="btn btn-primary">Guardar cambios</button>
    <a ng-show="vm.enable == false" ng-click="vm.enable = !vm.enable" class="btn btn-default">Habilitar edición</a>
    <a ng-show="vm.enable == true" ng-click="vm.cancelEditUser()" class="btn btn-danger">Cancelar</a>
  </form>
</div>
```

<a href="https://github.com/ivanalbizu/angular_wordpress_rest_api" target="_blank">Código en mi Git Hub</a>

En siguientes entradas me gustaría poder practicar con Custom Post Types. Añadiendo mi propio tipo de entrada y habilitarla para la Rest Api.