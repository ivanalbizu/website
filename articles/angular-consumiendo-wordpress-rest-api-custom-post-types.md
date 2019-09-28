---
title: Angular consumiendo de WordPress Rest Api – Custom post types
published: true
description: Publicación de sobre Angular 1 consumiendo de WordPress Rest Api – Custom post types
tags: AngularJS,JavaScript,Php,Wordpress
ctime: Mon, 09 May 2016 20:07:31 +0000
---

En esta cuarta entrada sobre AngularJS y Wordpress Rest Api voy a crear una entrada personalizada de Wordpress y añadir nuevo tipo de campo. Esta nueva entrada y sus nuevos campos serán consultados desde AngularJS. (Al final de la entrada he publicado un vídeo y el repositorio en Git Hub). Buena parte del código del cliente AngularJS será muy similar a una entrada anterior, en la que consumía las entradas de la [Rest Api de Wordpress con AngularJS](http://ivanalbizu.eu/angular-consumiendo-wordpress-rest-api-crud/), por tanto, no voy a repetir el código y sólo añadiré aquellas cosas que lo hagan diferente.

## Configurando wordpress

Lo primero es crear los tipos de entradas. En mi tema de Wordpress, en mi caso tema hijo de twentyfifteen, he editado el archivo functions.php para añadir el tipo de entrada. La documentación de <a href="http://v2.wp-api.org/extending/custom-content-types/" target="_blank">Wordpress Rest Api</a> está bastante bien, incluso explica como crear un tipo de entrada personalizada. Lo más importante es habilitar a las opciones del tipo que se muestra en nuestra Rest Api, para ello hay que pasarle como argumento: <code>'show_in_rest'=> true</code>. Hay más opciones, como la de cambiar los <code>'endpoint'</code>, en mi caso no lo he cambiado, ya que por defecto será en nombre de la entrada.

```php
global $theme_name;

add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
add_action( 'init', 'create_custom_post_types' );

function theme_enqueue_styles() {
  wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}

function create_custom_post_types() {
	$taxonomy_args = array(
		'hierarchical'	=> true
	);

	create_post_type( 'formacion', array( 'formacion_category' ), 'formacion', 'Estudio', 'Estudios' );
	register_taxonomy( 'formacion_category', 'formacion', $taxonomy_args );
	register_taxonomy_for_object_type( 'formacion_category', 'formacion' );
}

function create_post_type( $post_type_name, $taxonomies = '', $slug = '', $singular_name = '', $plural_name = '' ) {

	global $theme_name;

	if ( $singular_name == '' ) {
		$singular_name = $post_type_name;
	}

	if ( $plural_name == '' ) {
		$plural_name = $post_type_name . 's';
	}

	if ( $slug == '' ) {
		$slug = $singular_name;
	}

	$post_type_labels = array(
		'name'              => __( $plural_name, $theme_name ),
		'singular_name'	    => __( $singular_name, $theme_name ),
		'add_new'           => __( 'Add New', $theme_name ),
		'add_new_item'	    => __( 'Add New ' . $singular_name, $theme_name ),
		'edit'              => __( 'Edit', $theme_name ),
		'edit_item'         => __( 'Edit ' . $singular_name, $theme_name ),
		'new_item'          => __( 'New ' . $singular_name, $theme_name ),
		'view'              => __( 'View ' . $singular_name, $theme_name ),
		'view_item'         => __( 'View ' . $singular_name, $theme_name ),
		'search_items'	    => __( 'Search ' . $singular_name, $theme_name ),
		'not_found'         => __( 'No ' . $plural_name . ' found', $theme_name ),
		'not_found_in_trash'=> __( 'No ' . $plural_name . ' found in Trash', $theme_name )
	);

	$post_type_options = array(
		'labels'      => $post_type_labels,
		'public'      => true,
		'hierarchical'=> true,
		'has_archive' => true,
		'can_export'  => true,
		'supports'    => array(
      					'title',
      					'editor',
      					'excerpt',
      					'thumbnail',
                      			'revisions'
		                ),
		'rewrite'     => array(
					'slug' => $slug
		                ),
    		'show_in_rest'=> true
	);

	if ( $taxonomies != '' && !empty( $taxonomies ) ) {
		$post_type_options['taxonomies'] = $taxonomies;
	}

	register_post_type( $post_type_name, $post_type_options );
}
```

De momento podemos consultar, entre otros campos, el título, el contenido, el extracto y las revisiones de la nueva entrada creada. Vamos a añadir dos nuevos campos, pero no desde cero, si no con el <a href="https://wordpress.org/plugins/advanced-custom-fields/" target="_blank">plugin Advanced Custom Field</a>. Una vez que hemos creado los campos con el plugin anterior, tendremos que editar el archivo functions.php de nuestro tema de Wordpress. La documentación de Wp Rest Api nos ayuda para registrar los nuevos campos a nuestra Rest. Si visitamos la sección <a href="http://v2.wp-api.org/extending/modifying/" target="_blank">Extending -> Modifying Response</a> vemos las instrucciones. He usado las tres últimas funciones, tiene muchas líneas pero tan sólo hay que añadir nuestro nombre de campos creados con ACF.

```php
/**
 * Add the field "spaceship" to REST API responses for posts read and write
 */
add_action( 'rest_api_init', 'slug_register_spaceship' );
function slug_register_spaceship() {
  register_rest_field( 'formacion',
    'year',
    array(
      'get_callback'    => 'slug_get_spaceship',
      'update_callback' => 'slug_update_spaceship',
      'schema'          => null,
    )
  );
  register_rest_field( 'formacion',
    'school',
    array(
      'get_callback'    => 'slug_get_spaceship',
      'update_callback' => 'slug_update_spaceship',
      'schema'          => null,
    )
  );
}
/**
 * Handler for getting custom field data.
 *
 * @since 0.1.0
 *
 * @param array $object The object from the response
 * @param string $field_name Name of field
 * @param WP_REST_Request $request Current request
 *
 * @return mixed
 */
function slug_get_spaceship( $object, $field_name, $request ) {
  return get_post_meta( $object[ 'id' ], $field_name );
}

/**
 * Handler for updating custom field data.
 *
 * @since 0.1.0
 *
 * @param mixed $value The value of the field
 * @param object $object The object from the response
 * @param string $field_name Name of field
 *
 * @return bool|int
 */
function slug_update_spaceship( $value, $object, $field_name ) {
  if ( ! $value || ! is_string( $value ) ) {
    return;
  }

  return update_post_meta( $object->ID, $field_name, strip_tags( $value ) );
}
```

**Trabajos con AngularJS** Nuestro archivo <code>studies-services.js</code> es prácticamente igual a <code>posts-services.js</code>. Sólo cambiarán las diferentes rutas. Por ejemplo, para obtener todos los registros será: <code>URL_API.BASE_URL + '/wp/v2/formacion'</code>.

## Crear nuevo registro

Dentro de nuestro controlador <code>StudiesCtrl</code> creamos el método <code>createStudy(study)</code>. Tenemos los dos nuevos campos, <code>year</code> y <code>school</code>, que como vemos, es igual que el resto de campos

```javascript
function createStudy(study) {
  vm.enable = false;
  var data = $.param({
    title: study.title || 'Sin titulo',
    year: study.year || '', //ACF
    school: study.school || '', //ACF
    content: study.content || 'Lorem',
    status: 'publish',
  });
  StudiesServices.createStudyData(data).then(function(dataResponse) {
    resetFields();
    getAll();
    vm.enable = true;
  });
}
```

La única diferencia será en la vista, más en concreto será la forma de pintarla: <code>{{study.year[0]}}</code>.

```html
<div class="row">

  <table class="table table-striped">
    <tr>
      <th width="25%">Estudio</th>
      <th width="10%">Año</th>
      <th width="15%">Colegio</th>
      <th width="40%">Detalle formación</th>
      <th width="10%" colspan="2">Acciones</th>
    </tr>
    <tr>
      <td><input type="text" ng-model="vm.title" id="title" placeholder="Título" class="form-control" /></td>
      <td><input type="text" ng-model="vm.year" id="year" name="year" placeholder="Año" class="form-control" /></td>
      <td><input type="text" ng-model="vm.school" id="school" name="school" placeholder="Colegio" class="form-control" /></td>
      <td><input type="text" ng-model="vm.content" id="content" placeholder="Contenido" class="form-control" /></td>
      <td colspan="2">
        <a href="" ng-click="vm.createStudy(vm)" type="submit" ng-disabled="!vm.enable" class="btn btn-primary">Crear estudio</a>
      </td>
    </tr>
    <tr ng-repeat="study in vm.studies">
      <td ng-bind-html="study.title.rendered"></td>
      <td>{{study.year[0]}}</td>
      <td>{{study.school[0]}}</td>
      <td ng-bind-html="study.content.rendered"></td>
      <td>
        <a href="#/study/{{study.id}}" class="btn btn-warning"><i class="glyphicon glyphicon-eye-open"></i></a>
      </td>
      <td>
        <a ng-click="vm.deleteStudy(study.id)" ng-disabled="!vm.enable" class="btn btn-danger"><i class="glyphicon glyphicon-trash"></i></a>
      </td>
    </tr>
  </table>

</div>
```

## Editar un registro

Es similar a lo anterior, por lo que no explico otra vez lo mismo, el código es:

```php
function editStudy(study, id) {
  var data = $.param({
    title: study.title.rendered,
    year: study.year.toString() || '',
    school: study.school.toString() || '',
    content: study.content.rendered || 'Lorem',
    slug: encodeURIComponent(study.title.rendered.replace(/\\s+/g, '-').toLowerCase()),
  });
  StudyServices.editStudyData(data, id).then(function(dataResponse) {
    console.log("Se guarda en el modal ", dataResponse);
    $modalInstance.close($route.reload());
  });
}
```

```html
<h2>Contenido del ESTUDIO número {{vm.study.id}}</h2>
<h3>Título: {{vm.study.title.rendered}}</h3>
<h4>Año: {{vm.study.year[0]}}</h4>
<h4>Colegio: {{vm.study.school[0]}}</h4>
<h4>Contenido:</h4>
<div ng-bind-html="vm.study.content.rendered"></div>
<a href="{{vm.study.link}}" target="_blank">{{vm.study.link}}</a><br>
<button class="btn btn-primary" ng-click="vm.openModal()">Editar estudio</button>

<div>
  <script type="text/ng-template" id="modal.html">
    <form ng-submit="vmm.editStudy(vmm.study, vmm.study.id)" method="post" role="form">
      <div class="modal-header">
        <h3 class="modal-title">{{vmm.messageText}}</h3>
      </div>
      <div class="modal-body">
        <h4>Título: {{vmm.study.title.rendered}}</h4>
          <div class="form-group">
            <label for="title">Título:</label>
            <input type="text" ng-model="vmm.study.title.rendered" id="title" class="form-control" />
            <label for="year">Año:</label>
            <input type="text" ng-model="vmm.study.year" id="year" name="year" class="form-control" />
            <label for="school">Colegio:</label>
            <input type="text" ng-model="vmm.study.school" id="school" class="form-control" />
            <label for="content">Contenido:</label>
            <textarea rows="4" ng-model="vmm.study.content.rendered" ng-bind-html="vmm.study.content.rendered" id="content" class="form-control"></textarea>
          </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">Guardar cambios</button>
        <a href="" class="btn btn-danger" ng-click="vmm.cancel()">Cancel</a>
      </div>
    </form>
  </script>
</div>
```

<a href="https://github.com/ivanalbizu/angular_wordpress_rest_api" target="_blank">Código en mi GitHub</a>