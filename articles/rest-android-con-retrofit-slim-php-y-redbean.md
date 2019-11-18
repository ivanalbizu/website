---
title: Rest Android con Retrofit, Slim php y RedBean
published: true
description: Aplicación Android con librería Retrofit que consume una Rest API construida con PHP mediante librerías SlimPHP y ReadBeanPHP
tags: Android,Java, Php
ctime: Sun, 19 Apr 2015 21:10:57 +0000
---

Rest Api con Retrofit, Slim php y RedBean. En esta ocasión voy a montar una aplicación Android que consume de base de datos MySQL usando Slim php y RedBean php. Las peticiones de la aplicación Android a la base de datos serán controladas con Retrofit.

## Configuración de la base de datos y backend:

<ul class="list-bullets">
	<li>Creamos una tabla llamada <code>users</code> que contendrá <code>id</code>, <code>name</code>, <code>mail</code> y <code>password</code></li>
	<li>Descargamos <a href="http://www.slimframework.com/" target="_blank">Slim PHP framework</a> y <a href="http://www.redbeanphp.com" target="_blank">RedBeanPHP</a></li>
</ul>

La estructura de directorios y archivos quedará así:
<figure>
	<img src="/images/articles/rest-android-con-retrofit-slim-php-y-redbean/tree-rest-api.png" alt="Estructura proyecto Android con Retrofit" loading="lazy">
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
		echo json_encode($json_user);
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