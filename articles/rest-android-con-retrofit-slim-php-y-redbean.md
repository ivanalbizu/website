---
title: Rest Android con Retrofit, Slim php y RedBean
published: true
description: Aplicación Android con librería Retrofit que consume una Rest API construida con PHP mediante librerías SlimPHP y ReadBeanPHP
tags: Android,Java, Php
ctime: Sun, 19 Apr 2015 21:10:57 +0000
img: assets/images/articles/rest-android-con-retrofit-slim-php-y-redbean/tree-rest-api.png
---

Rest Api con Retrofit, Slim php y RedBean. En esta ocasión voy a montar una aplicación Android que consume de base de datos MySQL usando Slim php y RedBean php. Las peticiones de la aplicación Android a la base de datos serán controladas con Retrofit.

## Configuración de la base de datos y backend:

<ul class="list-bullets">
	<li>Creamos una tabla llamada <code>users</code> que contendrá <code>id</code>, <code>name</code>, <code>mail</code> y <code>password</code></li>
	<li>Descargamos <a href="http://www.slimframework.com/" target="_blank">Slim PHP framework</a> y <a href="http://www.redbeanphp.com" target="_blank">RedBeanPHP</a></li>
</ul>

La estructura de directorios y archivos quedará así:
<figure>
	<img src="data:image/png;base64,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" alt="Estructura proyecto Android con Retrofit" loading="lazy">
</figure>

El único archivo que tenemos que crear es <code>v1/api.php</code>. En las primeras líneas añadimos las dependencias a SlimPHP y RedBeanPHP. 

El contenido será el siguiente:

```php
<?php

//Se cargan las librerías Slim php y Red Bean php
require '../Slim/Slim.php';
require '../rb.php';

\\Slim\\Slim::registerAutoloader();

$app = new \\Slim\\Slim();


//Configuración con nuestra base de datos
//R:: -> es la manera de comuncar con RedBean
R::setup('mysql:host=localhost;dbname=namedatabase','user','password'); 

//Rutas y métodos a ejecutar
$app->get('/users', 'getUsers');
$app->get('/users/:id',  'getUser');
$app->post('/users', 'addUser');
$app->put('/users/:id', 'updateUser');
$app->delete('/users/:id', 'deleteUser');

//Se corre la base de datos
$app->run();

function getUsers() {
	$users = R::find('users');
	 
	$app = \\Slim\\Slim::getInstance();
	 
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode(R::exportAll($users));
}

function getUser($id) {
	$users = R::findOne('users', 'id=?', array($id));

	$app = \\Slim\\Slim::getInstance();
	if ($users) {
		$app->response()->header('Content-Type', 'application/json');
		$json_user = $users->getProperties();
		echo json\_encode($json\_user);
	} else {
		$app->response()->status(404);
	}
}

function addUser() {
	$app = \\Slim\\Slim::getInstance();
	 
	$request = $app->request();
	$body = $request->getBody(); 
	$input = json_decode($body);
 
	$users = R::dispense('users');
	$users->id = (integer)$input->id;
	$users->name = (string)$input->name;
	$users->mail = (string)$input->mail;
	$users->password = (string)$input->password; 
	
	R::store($users); 

	$app->response()->status(201); 
	$app->response()->header('Content-Type', 'application/json');     
}

function updateUser($id) {
	$app = \\Slim\\Slim::getInstance();
	 
	$request = $app->request();
	 
	$body = $request->getBody();
	$input = json_decode($body);

	$users = R::findOne('users', 'id = ?', array($id)); 
	 
	if ($users) { 
		$users->name = (string)$input->name; 
		$users->mail = (string)$input->mail;
		$users->password = (string)$input->password; 

		R::store($users); 
		$app->response()->header('Content-Type', 'application/json');
	} else { 
		$app->response()->status(404); 
	}
}

function deleteUser($id) {
	$app = \\Slim\\Slim::getInstance();

	$users = R::findOne('users', 'id = ?', array($id)); 
	 
	if ($users) { 
		R::trash($users); 
		$app->response()->status(204); 
	} else { 
		$app->response()->status(404); 
	}
}
```

## Proyecto Android

Importamos <a href="http://square.github.io/retrofit/" target="_blank">Retrofit</a> y <a href="https://code.google.com/p/google-gson/" target="_blank">Google Gson</a>. Sin entrar en detalle en todos los archivos, comentar que los principales serán:

<ul class="list-bullets">
	<li>UsersAPI.java</li>
	<li>MainActivity.java</li>
	<li>EditUser.java</li>
</ul>

<code>UsersAPI.java</code> se comunica con el Backend.

```java
public interface UsersAPI {
	
	@GET("/users")
	void getUsers(Callback<List<User>> response);
	
	@GET("/users/{id}")
	void getUser(@Path("id") String id, Callback<User> response);
	
	@DELETE("/users/{id}")
	void deleteUser(@Path("id") String id, Callback<String> response);
	
	@POST("/users")
	void createUser(@Body User user, Callback<User> response);
	
	@PUT("/users/{id}")
	void updateUser(@Path("id") String id, @Body User user, Callback<String> response);

}
```

En <code>MainActivity.java</code> tendremos cuatro métodos:

<ul class="list-bullets">
	<li><code>getAllUser(String uri)</code>. Obtener todos los usuarios.</li>
	<li><code>delUser(String uri, String id)</code>. Borrar un usuario por su ID. (Usando <code>@Path</code> definido en <code>UsersAPI.java</code>)</li>
	<li><code>newUser(String uri, User user)</code>. Crear nuevo usuario. (Usando <code>@Body</code>)</li>
	<li>Un cuarto método, <code>refreshListUser()</code>, para cargar el <code>ListView</code>.</li>
</ul>

El código completo de esta clase:

```java
public class MainActivity extends Activity {

	public static final String BASE_URL = "http://tudominio.com/v1/api.php/";
	private List<User> userList;
	
	ProgressBar progress;
	
	User user;
	ListView listView;
	Button btnCrearUsuario, btnBorrarUsuario;
	EditText name, mail, password, borrar;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		progress = (ProgressBar)findViewById(R.id.progressBar1);
		btnCrearUsuario =(Button)findViewById(R.id.button1);
		btnBorrarUsuario =(Button)findViewById(R.id.button2);
		
		listView = (ListView)findViewById(R.id.listView);
		name = (EditText)findViewById(R.id.editText1);
		mail = (EditText)findViewById(R.id.editText2);
		password = (EditText)findViewById(R.id.editText3);
		borrar = (EditText)findViewById(R.id.editText4);
		
		btnCrearUsuario.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				User user = new User(
						name.getText().toString(),
						mail.getText().toString(), 
						password.getText().toString());
				newUser(BASE_URL, user);
				getAllUser(BASE_URL);
			}
		});
		
		btnBorrarUsuario.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				delUser(BASE_URL, borrar.getText().toString());
				getAllUser(BASE_URL);
			}
		});
		
		listView.setOnItemClickListener(new OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> arg0, View arg1, int arg2,
					long arg3) {
				User user = (User) (arg0.getItemAtPosition(arg2));
				String id = String.valueOf(user.getId());
				Intent i = new Intent(getApplicationContext(), EditUserActivity.class);
				i.putExtra("id", id);
				startActivity(i);
			}
		});
		
		getAllUser(BASE_URL);
	}
	
	private void getAllUser(String uri){
		RestAdapter adapter = new RestAdapter.Builder()
			.setEndpoint(uri)
			.build();
		UsersAPI api = adapter.create(UsersAPI.class);
		
		api.getUsers(new Callback<List<User>>() {
			@Override
			public void success(List<User> arg0, Response arg1) {
				userList = arg0;
				refreshListUser();
				progress.setVisibility(View.INVISIBLE);
			}
			@Override
			public void failure(RetrofitError arg0) {
				Toast.makeText(getApplicationContext(), "Error con GET ALL: "+arg0.getMessage(), Toast.LENGTH_LONG).show();
			}
		});
	}
	
	private void delUser(String uri, String id){
		RestAdapter adapter = new RestAdapter.Builder()
			.setEndpoint(uri)
			.build();
		UsersAPI api = adapter.create(UsersAPI.class);
		
		api.deleteUser(id, new Callback<String>() {
			@Override
			public void failure(RetrofitError arg0) {
				Toast.makeText(getApplicationContext(), "Error eliminando: "+arg0.getMessage(), Toast.LENGTH_LONG).show();
			}
			@Override
			public void success(String arg0, Response arg1) {
				Toast.makeText(getApplicationContext(), "Eliminado BIEN!!", Toast.LENGTH_LONG).show();	
			}
		});
	}
	
	private void newUser(String uri, User user){
		RestAdapter adapter = new RestAdapter.Builder()
			.setEndpoint(uri)
			.build();
		
		UsersAPI api = adapter.create(UsersAPI.class);
		
		api.createUser(user, new Callback<User>() {
			@Override
			public void failure(RetrofitError arg0) {
				Toast.makeText(getApplicationContext(), "Error al crear usuario: "+arg0.getMessage(), Toast.LENGTH_LONG).show();
			}
			@Override
			public void success(User arg0, Response arg1) {
				Toast.makeText(getApplicationContext(), "Éxito. Nuevo usuario creado", Toast.LENGTH_LONG).show();
			}
		});
	}
	
	protected void refreshListUser(){
		UserAdapter adapter = new UserAdapter(userList,this);
		listView.setAdapter(adapter);
	}
}
```

En la clase <code>EditUserActivty.java</code> obtendremos el usuario que se quiere editar, y se edita.

Para ello tenemos dos métodos.

<ul class="list-bullets">
	<li><code>getU(String uri, String id)</code>. Obtenemos el usuario por su ID. (Usando <code>@Path</code> de <code>UsersAPI.java</code>)</li>
	<li><code>upUser(String uri, String id, User user)</code>. Obtenemos el usuario por su ID y los nuevos datos del usuario modificados. (Usando <code>@Path</code> y <code>@Body</code>)</li>

El código completo es:

```java
public class EditUserActivity extends Activity {
	
	public static final String BASE_URL = "http://tudominio.com/v1/api.php/";
	
	private TextView idUser;
	private EditText name,mail,password;
	private Button btn;
	private String idIntent;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_edit_user);
		
		idUser = (TextView)findViewById(R.id.textView1);
		name = (EditText)findViewById(R.id.editText1);
		mail = (EditText)findViewById(R.id.editText2);
		password = (EditText)findViewById(R.id.editText3);
		btn = (Button)findViewById(R.id.button3);

		idIntent = getIntent().getExtras().getString("id");

		getU(BASE_URL,idIntent);
		
		btn.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				User user = new User(
						name.getText().toString(),
						mail.getText().toString(),
						password.getText().toString());
				upUser(BASE_URL,idIntent,user);
			}
		});
	}
	
	private void getU(String uri, String id){
		RestAdapter adapter = new RestAdapter.Builder()
			.setEndpoint(uri)
			.build();
		UsersAPI api = adapter.create(UsersAPI.class);
		
		api.getUser(id, new Callback<User>() {
			@Override
			public void failure(RetrofitError arg0) {
				Toast.makeText(getApplicationContext(), arg0.getMessage(), Toast.LENGTH_LONG).show();
			}
			@Override
			public void success(User user, Response arg1) {
				idUser.setText(String.valueOf(user.getId()));
				name.setText(user.getName());
				mail.setText(user.getMail());
				password.setText(user.getPassword());
			}
		});
	}
	
	private void upUser(String uri, String id, User user){
		RestAdapter adapter = new RestAdapter.Builder()
			.setEndpoint(uri)
			.build();
		UsersAPI api = adapter.create(UsersAPI.class);
		
		api.updateUser(id, user, new Callback<String>() {
			@Override
			public void failure(RetrofitError arg0) {
				Toast.makeText(getApplicationContext(), "Error actualizando: "+arg0.getMessage(), Toast.LENGTH_LONG).show();
			}
			@Override
			public void success(String arg0, Response arg1) {
				Toast.makeText(getApplicationContext(), "Actualizado PERFECT!!", Toast.LENGTH_LONG).show();
				startActivity(new Intent(getApplicationContext(),MainActivity.class));
			}
		});
	}
}
```

El código completo de [REST API Android](https://drive.google.com/open?id=0BzQS5pOyF_HjbVVqamNCTUNoRG8 "Rest API retrofit, Slim, RedBean")