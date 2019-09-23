---
title: Obtener diferentes url de imagen destacada de Wordpress
published: true
description: Creación de función Php en Wordpress para obtener diferentes Urls de imagen destacada
tags: Php,Pildoritas,Wordpress
ctime: Thu, 09 Jun 2016 19:46:35 +0000
---

En esta entrada explicaré como obtener diferentes url de imagen destacada de Wordpress. Al añadir  una imagen destacada a una entrada de Wordpress podemos acceder a la misma mediante la función [the_post_thumbnail ( string|array $size = 'post-thumbnail', string|array $attr = '' )](https://developer.wordpress.org/reference/functions/the_post_thumbnail/) en la que se pueden especificar atributos y tamaño de imagen a obtener. En un proyecto de Ionic que estoy realizando me interesaba crear una función en Wordpress que me devolviera diferentes tamaños de imagen para cada tipo de entrada.

```
function ng_get_thumbnail_url( $post ) {
	// Default images size to Return
	$sizes = ['thumbnail', 'medium'];
	$imgArray = [];

	if ( has_post_thumbnail( $post['id'] ) ){
		$post_type = get_post_type();

		switch ( $post_type ) {
			case 'team':
				// Add new images size for post type 'team'
				$sizes['ionic-team'] = 'ionic-team';
				// Iterate over selected sizes
				foreach ($sizes as $size) {
					//wp_get_attachment_image_src(id, size)[0] -> with [0] get URL from attachment
					$imgArray[$size] = wp_get_attachment_image_src( get_post_thumbnail_id( $post['id'] ), $size )[0];
				}
				break;
			case 'work':
				// Add new images size for post type 'work'
				$sizes['ionic-work'] = 'ionic-work';
				foreach ($sizes as $size) {
					$imgArray[$size] = wp_get_attachment_image_src( get_post_thumbnail_id( $post['id'] ), $size )[0];
				}
				break;
			default:
				foreach ($sizes as $size) {
					$imgArray[$size] = wp_get_attachment_image_src( get_post_thumbnail_id( $post['id'] ), $size )[0];
				}
				break;
		}
		return $imgArray;
	}else{
		return false;
	}
}
```

Por defecto se añaden en un array dos tamaños de imágenes que vienen incluidas en Wordpress: 'thumbnail' y 'medium'. Se comprueba que la entrada tenga Imagen Destacada y si es así, se obtiene el tipo de entrada que se trata, para añadir nuevos tamaños personalizados. Con la función _wp_get_attachment_image_src_ de Wordpress dentro de un _foreach_ se obtiene las Urls de cada imagen con sus diferentes tamaños, que será almacenada en un array asociativo que finalmente será devuelto. Un ejemplo de uso de esta función puede ser:

```
add_action( 'rest_api_init', 'ng_thumbnail_url' );
function ng_thumbnail_url() {
  register_rest_field( 'team',
      'url_team_thumbnail',
      array(
          'get_callback'    => 'ng_get_thumbnail_url',
          'update_callback' => null,
          'schema'          => null,
      )
  );
  register_rest_field( 'work',
      'url_work_thumbnail',
      array(
          'get_callback'    => 'ng_get_thumbnail_url',
          'update_callback' => null,
          'schema'          => null,
      )
  );
}
```

Con el código anterior y con el plugin Wordpress Rest Api activado hacemos uso de la función anterior pasándola como callback. Si accedemos a la url http://localhost/nombre_instalacion/wp-json/wp/v2/team/ obtendremos las rutas a las imágenes que hallamos añadido.   ![Thumbnail url](storage/wp-content/uploads/2016/06/thumbs_url.png)