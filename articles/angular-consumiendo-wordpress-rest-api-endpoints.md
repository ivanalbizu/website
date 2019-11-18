---
title: Angular consumiendo de WordPress Rest Api – Endpoints
published: true
description: Publicación de sobre Angular 1 consumiendo de WordPress Rest Api – Endpoints
tags: AngularJS,JavaScript,Wordpress
ctime: Tue, 10 May 2016 18:02:38 +0000
---

Sigo hablando en esta entrada sobre Rest Api Wordpress consumida desde AngularJS.

Va a ser más breve que los anteriores. Algunas peticiones a la Rest Api pueden añadir información extra, tales como paginaciones y filtros. En otras ocasiones necesitamos pasar más parámetros a la URL de la petición para poder hacer GET, POST... (Al final de la entrada he publicado un vídeo y el repositorio en Git Hub). Aprovechando que en otra entrada hablé sobre <a href="angular-consumiendo-wordpress-rest-api-trabajando-usuarios/">obtener y editar usuarios de Wordpress con la Rest Api</a>, aprovecho para ampliar un poco el post anterior.

Visitando la sección de Users de la documentación de Rest Api podemos ver que algunos campos no son editables y otros necesitan para verse o editarse añadir información extra. Se añade al final de la URL el contexto: <code>embed</code>, <code>view</code> o <code>edit</code>.

<figure>
  <img alt="Schema Wordpress Rest Api" loading="lazy" src="/images/articles/angular-consumiendo-wordpress-rest-api-endpoints/schema-rest-api.jpg">
</figure>

Por ejemplo, para obtener y editar el campo <code>first_name</code> de un usuario tenemos que usar la siguiente URL <code>URL_API.BASE_URL + '/wp/v2/users/' + user_id +'?context=edit'</code>.

El código de la factoría que nos devuelve el usuario será:

```javascript
function getCurrentUserData() {
  var user_id = getUserId().user.id;
  return $http({
    method: 'GET',
    // Se concatena a la URL '?context=edit'
    // para poder tener acceso a más campos
    url: URL_API.BASE_URL + '/wp/v2/users/' + user_id +'?context=edit>',
  }).then(function(response) {
    return response.data;
  }, function(error) {
    console.log(error);
  });
}
```

Añadimos dos campos al controlador, <code>last_name</code> y <code>first_name</code>, para editarlos:

```javascript
function editUser(user, id) {
  var data = $.param({
    name: user.name,
    // Dos campos nuevos
    // No editables sin añadir el 'context'
    first_name: user.first_name,
    last_name: user.last_name,
    description: user.description,
    url: user.url
  });
  UserServices.editUserData(data, id).then(function(dataResponse) {
    vm.enable = false;
    getCurrentUser();
    console.log(dataResponse);
  });
}
```

Y la vista quedaría así:

```html
<div class="form-group">
  <label for="email">Email</label>
  <input type="text" value="{{vm.user.email}}" name="email" class="form-control" disabled>
</div>
<div class="form-group">
  <label for="last_name">Last name</label>
  <input type="text" ng-model="vm.user.last_name" ng-disabled="!vm.enable" value="{{vm.user.last_name}}" name="last_name" class="form-control">
</div>
<div class="form-group">
  <label for="first_name">First name</label>
  <input type="text" ng-model="vm.user.first_name" ng-disabled="!vm.enable" value="{{vm.user.first_name}}" name="first_name" class="form-control">
</div>
```


He añadido un tercer campo, email, que en este caso sólo lo he mostrado, pero no editado. <a href="https://github.com/ivanalbizu/angular_wordpress_rest_api">Código en mi GitHub</a>