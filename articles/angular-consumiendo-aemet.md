---
title: Angular consumiendo de AEMET
published: true
description: Aplicación con Angular 1 para mostrar datos meteorológicos proporcionados por la AEMET en formato XML. Parseo con PHP los datos XML para transformarlos a JSON
tags: AngularJS,JavaScript,Php
ctime: Wed, 07 Dec 2016 15:46:05 +0000
cover_image: angular-consumiendo-aemet.jpg
---

En esta publicación vamos a crear una App Angular 1 que consume datos de la AEMET en formato Xml. Será necesario hacer operaciones en el backend y mostrarlos en el front.

## Servidor
Los datos que proporciona la <a href="http://www.aemet.es/es/datos_abiertos" target="_blank">AEMET</a> son en formato Xml. Para consumirlos he transformado los datos a Json mediante Php.

La petición que llega desde el cliente es tratada con Php mediante el Framework <a href="https://www.slimframework.com/" target="_blank">SlimPHP</a> para obtener el identificador de la localidad.

`server/index.php`
```php
<?php
header('Access-Control-Allow-Origin: *');
include_once("simple_html_dom.php");
require 'vendor/autoload.php';
$app = new Slim\App();
$app->get('/{id}', function ($request) {
    $id = $request->getAttribute('id');
    $url = 'http://www.aemet.es/xml/municipios/localidad_'. $id .'.xml';
    $xml = loadXML($url);
    $arr = xmlToArray($xml);
    $json = json_encode($arr);
    return $json;
});
function loadXML($url) {
  if (ini_get('allow_url_fopen') == true) {
    return load_fopen($url);
  } else if (function_exists('curl_init')) {
    return load_curl($url);
  } else {
    // Enable 'allow_url_fopen' or install cURL.
    throw new Exception("Can't load data.");
  }
}
function load_fopen($url) {
  return simplexml_load_file($url);
}
function load_curl($url) {
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  $result = curl_exec($curl);
  curl_close($curl);
  return simplexml_load_string($result);
}
function xmlToArray($xml, $options = array()) {
    $defaults = array(
        'namespaceSeparator' => ':',//you may want this to be something other than a colon
        'attributePrefix' => '__',   //to distinguish between attributes and nodes with the same name
        'alwaysArray' => array(),   //array of xml tag names which should always become arrays
        'autoArray' => true,        //only create arrays for tags which appear more than once
        'textContent' => 'text',       //key used for the text content of elements
        'autoText' => true,         //skip textContent key if node has no attributes or child nodes
        'keySearch' => false,       //optional search and replace on tag and attribute names
        'keyReplace' => false       //replace values for above search values (as passed to str_replace())
    );
    $options = array_merge($defaults, $options);
    $namespaces = $xml->getDocNamespaces();
    $namespaces[''] = null; //add base (empty) namespace
    //get attributes from all namespaces
    $attributesArray = array();
    foreach ($namespaces as $prefix => $namespace) {
        foreach ($xml->attributes($namespace) as $attributeName => $attribute) {
            //replace characters in attribute name
            if ($options['keySearch']) $attributeName =
                    str_replace($options['keySearch'], $options['keyReplace'], $attributeName);
            $attributeKey = $options['attributePrefix']
                    . ($prefix ? $prefix . $options['namespaceSeparator'] : '')
                    . $attributeName;
            $attributesArray[$attributeKey] = (string)$attribute;
        }
    }
    //get child nodes from all namespaces
    $tagsArray = array();
    foreach ($namespaces as $prefix => $namespace) {
        foreach ($xml->children($namespace) as $childXml) {
            //recurse into child nodes
            $childArray = xmlToArray($childXml, $options);
            list($childTagName, $childProperties) = each($childArray);
            //replace characters in tag name
            if ($options['keySearch']) $childTagName =
                    str_replace($options['keySearch'], $options['keyReplace'], $childTagName);
            //add namespace prefix, if any
            if ($prefix) $childTagName = $prefix . $options['namespaceSeparator'] . $childTagName;
            if (!isset($tagsArray[$childTagName])) {
                //only entry with this key
                //test if tags of this type should always be arrays, no matter the element count
                $tagsArray[$childTagName] =
                        in_array($childTagName, $options['alwaysArray']) || !$options['autoArray']
                        ? array($childProperties) : $childProperties;
            } elseif (
                is_array($tagsArray[$childTagName]) && array_keys($tagsArray[$childTagName])
                === range(0, count($tagsArray[$childTagName]) - 1)
            ) {
                //key already exists and is integer indexed array
                $tagsArray[$childTagName][] = $childProperties;
            } else {
                //key exists so convert to integer indexed array with previous value in position 0
                $tagsArray[$childTagName] = array($tagsArray[$childTagName], $childProperties);
            }
        }
    }
    //get text content of node
    $textContentArray = array();
    $plainText = trim((string)$xml);
    if ($plainText !== '') $textContentArray[$options['textContent']] = $plainText;
    //stick it all together
    $propertiesArray = !$options['autoText'] || $attributesArray || $tagsArray || ($plainText === '')
            ? array_merge($attributesArray, $tagsArray, $textContentArray) : $plainText;
    //return node as array
    return array(
        $xml->getName() => $propertiesArray
    );
}
$app->run();
?>
```

## App Cliente
Desde la App, el usuario dispone de tres Select para poder seleccionar la provincia, la localidad y la fecha. Los Selects de provincia y localidad leen de ficheros JSON que contiene lista de provincias y localidades, que luego son los datos mandados al backend.

`app/js/app.js`
```javascript
(function() {
  'use strict';

  angular.module('aemet', ['ngRoute'])

    .config(function($routeProvider) {

      $routeProvider
        .when('/', {
          controller:'SingleData'
        })
        .otherwise({
          redirectTo:'/'
        });
    })

    .constant('URL_API', {
      BASE_URL: 'http://mentiraspoliticas.es/projects/aemet/server/index.php/',
      BASE_RESOURCES: '../app/resources/'
    });

})();
```

`app/js/controller.js`
```javascript
(function() {
  'use strict';

  angular.module('aemet')
    .controller('SingleData', SingleData);

    SingleData.$inject = ['$http', 'URL_API'];
    function SingleData ($http, URL_API) {

        var vm = this;
        var today = new Date().toISOString().slice(0,10);


        //Se obtienen las provincias al cargar la página
        getProvincias();
        function getProvincias() {
          var url = URL_API.BASE_RESOURCES + 'provincias.json';
          $http.get(url)
            .then(function(response) {
              vm.dataprovincias = response.data;
            })
            .catch(function(response) {
              console.error('Error', response);
            });
        }

        function getLocalidades(provincia) {
          var url = URL_API.BASE_RESOURCES + 'localidades_provincia'+provincia+'.json';
          $http.get(url)
            .then(function(response) {
              vm.datalocalidades = response.data;
            })
            .catch(function(response) {
              console.error('Error', response);
            });
        }

        function getDataLocalidad(id) {
          if (id) {
            var url = URL_API.BASE_URL + id.slice(-5);

            $http.get(url)
            .then(function(response) {
              vm.datajson = response.data;
              console.log(vm.datajson);
            })
            .catch(function(response) {
              console.error('Error', response);
            });
          }

        }

        function isArrayOrObject(data) {
          return angular.isArray(data) || angular.isObject(data);
        }

        function isToday(data) {
          return today == data;
        }

        function log(showconsole) {
          console.log(showconsole);
        }

        vm.getLocalidades = getLocalidades;
        vm.getDataLocalidad = getDataLocalidad;

        vm.isArrayOrObject = isArrayOrObject;
        vm.isToday = isToday;
        vm.log = log;

    };

})();
```

La maquetación está con Bootstrap y <a href="http://fezvrasta.github.io/bootstrap-material-design/" target="_blank">Bootstrap Material</a>, y los iconos usados <a href="https://erikflowers.github.io/weather-icons/" target="_blank">Weather Icons</a>.

## Código y ejemplos
El código completo se encuentra en mi [GitHub](https://github.com/ivanalbizu/angular-consuming-aemet).

Y el [ejemplo funcionando](http://mentiraspoliticas.es/projects/aemet/app/#/).