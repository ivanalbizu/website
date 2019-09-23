---
title: Angular consumiendo de Wordpress Rest Api - Autenticación
published: true
description: Angular 1 consumiendo de Wordpress Rest Api - Autenticación
tags: AngularJS,JavaScript,Php,Wordpress
ctime: Thu, 05 May 2016 13:48:16 +0000
---

En esta entrada voy a trabajar con **AngularJS y Wordpress**. Wordpress lo voy a usar para generar la **Rest Api y AngularJS** para leer los datos de WordPress. (Al final de la entrada he publicado un vídeo y el repositorio en Git Hub). Usaré dos plugins, uno [WordPress REST API (Version 2)](https://es.wordpress.org/plugins/rest-api/)  genera la Api y otro [JWT Authentication for WP REST API](https://es.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) genera el sistema de Autenticación mediante JSON WEB TOKEN (JWT).

## Configuracíon de Wordpress y sus plugins:

El primer plugin, **WordPress REST API (Version 2)**, no requiere de ninguna configuración. En el segundo plugin, **JWT Authentication for WP REST API**, tal cómo viene en su página, hay que que modificar el archivo '.htaccess'. Mi archivo modificado queda así:

```
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /nombre/carpeta/wordpress/en/xampp/
RewriteRule ^index.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /nombre/carpeta/wordpress/en/xampp/index.php [L]
</IfModule>
# END WordPress
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
```

Para terminar con la configuración básica del plugin JWT hay que modificar el archivo 'wp-config.php' añadiendo estas dos línea:

```
define('JWT/AUTH/SECRET_KEY', 'palabra-clave-que-generará-el-token');
define('JWT/AUTH/CORS_ENABLE', true);
```

A partir de aquí la mayoría de las modificaciones van a ser sobre la **instalación de AngularJS realizada usando [Yeoman](http://ivanalbizu.eu/demo-angularjs-shop-01-generando-proyecto-con-yeoman/)**.

## Dependencias:

Añadimos la dependencia a UI Boostrap que será usada para mostrar una ventana modal.

## Constantes:

Para evitar repeticiones de código y facilitar su mantenimiento añadimos una constante para obtener la base url de nuestra **Api Wordpress**:

```
.constant('URL_API', {
  BASE_URL:  'http://localhost/wpapi/wp-json'
})
```

## Configuración de rutas y $httpProvider:

Según la ruta especificamos la vista y el controlador asociado. Añadimos 'Interceptor' al $httpProvider para que las peticiones a nuestro Wordpress Rest Api lleven la cabecera, en este caso la **Authorization Bearer** usado por el plugin **JWT**. La Autenticación la almacenamos en Local Storage del navegador.

```
$httpProvider.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded';

$httpProvider.interceptors.push(['$q', '$location', function( $q, $location ) {
  return {
    'request': function (config) {
      config.headers = config.headers || {};
      if (window.localStorage.token) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.token;
      }
      return config;
    },
    'responseError': function(response) {
      if(response.status === 401 || response.status === 403) {
        $location.path('/login');
      }
      return $q.reject(response);
    }
  };
}]);
```

## Login y Autenticación JWT

Creamos dos archivos, 'services/login-services.js' y 'controllers/login.js'. El servicio **LoginServices** tendrá un único método llamado **login(data)**, el cual recibe como parámetro el usuario y contraseña que ha introducido el usuario en el controlador. Este parámetro será enviando a la Api Wordpress mediante el método Post a la url '/jwt-Auth/v1/token'. La respuesta la recibe en controlador. Directamente he enviado el Token, pero podría enviar la respuesta JSON completa y tratarse  entonces en el controlador.

```
(function() {
  'use strict';

  angular.module('wpapiApp')
    .factory('LoginServices', LoginServices);

    LoginServices.$inject = [ '$http', 'URL_API' ];
    function LoginServices( $http, URL_API ) {

      return {
        login:  login,
      };

      function login(data) {
        window.localStorage.removeItem('token');
        return $http({
            method: 'POST',
            url: URL/API.BASE/URL + '/jwt-Auth/v1/token',
            data: data,
          })
          .then(function(result) {
              return result.data.token;
            }, function(error) {
              console.log(error);
            });
      }
    }
})();
```

El controlador **LoginCtrl** sólo tiene un método llamado **login(data)**. Se obtiene en el formulario de la vista los datos introducidos por el usuario que son enviados posteriormente a el servicio, la respuesta se guarda en Local Storage con el nombre 'token'.

```
(function() {
  'use strict';

  angular.module('wpapiApp')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$injector = [ 'LoginServices' ];
    function LoginCtrl ( LoginServices ) {

      var vm = this;

      vm.login = login;

      function login(data) {
        var serializedData = $.param({
          username: data.username,
          password: data.password
        });
        LoginServices.login(serializedData).then(function(dataResponse) {
          window.localStorage['token'] = dataResponse;
          console.log(dataResponse);
        });
      }
    }
})();
```

En siguientes entradas publicaré más ejemplos de interacción entre **Wordpress Rest Api y AngularJS**, más concretamente sobre como trabajar con las entradas de Wordpress: Listar una o más entradas, crearlas, editarlas y eliminarlas. [https://github.com/ivanalbizu/angular/wordpress/rest_api](http://Git Hub)