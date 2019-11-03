---
title: Wp Rest Api - habilitar filtro de Custom Fields
published: true
description: Habilitar nuevos campos a la Rest API creada con el plugin WP Rest API cuyos campos son creados en Wordpress con plugin Advanded Custom Fields (ACF)
tags: AngularJS,Php,Pildoritas,Wordpress
ctime: Sun, 02 Oct 2016 16:04:38 +0000
cover_image: wp-rest-api-habilitar-filtro-de-custom-fields.png
alt_image: Wp Rest Api - habilitar filtro de Custom Fields
---

Usando Wp Rest Api, Advanced Custom Fields y Angular he necesitado habilitar el filtrado por la URL de la petición de los nuevos campos creados. En mi Custom Post Type tenía creado varios campos y necesitaba que se mostrasen las entradas que cumpliesen cierta condición.

En la primera función <code>valid_vars_metaquery</code> indico cuales son los campos que quiero añadir para filtrar. En la segunda función <code>filter_num_hab_ban</code> realizo las operaciones que deben cumplir los campos

```php
add_filter( 'rest_query_vars', valid_vars_metaquery);
function valid_vars_metaquery( $valid_vars ) {
    return array_merge( $valid_vars, array( 'numero_habitaciones', 'numero_banos', 'meta_query' ) );
}

add_filter( 'rest_sale_query', filter_num_hab_ban, 10, 2 );
function filter_num_hab_ban( $args, $request ) {
    $numero_habitaciones = $request->get_param( 'numero_habitaciones' );
    $numero_banos = $request->get_param( 'numero_banos' );

    if ( ! empty( $numero_habitaciones ) && ! empty( $numero_banos )) {
        $args['meta_query'] = array(
            array(
                'key'     => 'numero_habitaciones',
                'value'   => $numero_habitaciones,
                'compare' => '=',
            ),
            array(
                'key'     => 'numero_banos',
                'value'   => $numero_banos,
                'compare' => '=',
            )
        );
    }

    return $args;
}
```

La petición se realiza con el método <code>getRelevantPostData(...)</code> pasando por url los parámetros por los que se filtra.

```php
function getRelevantPostData(numero_habitaciones, numero_banos) {
    return $http.get(URL_API.BASE_URL + '/wp/v2/sale?numero_habitaciones=' + numero_habitaciones + '&numero_banos=' + numero_banos).success(function(res){
        return res;
    });
}
```