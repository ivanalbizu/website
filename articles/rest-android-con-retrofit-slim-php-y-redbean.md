---
title: Rest Android con Retrofit, Slim php y RedBean
published: true
description: Rest Api construida con SlimPhp y ReadBean, consumida desde Android mediante Retrofit
tags: Android,Java, Php
ctime: Sun, 19 Apr 2015 21:10:57
---

Rest Api con Retrofit, Slim php y RedBean. En esta ocasión voy a montar una aplicación Android que consume de base de datos MySQL usando Slim php y RedBean php. Las peticiones de la aplicación Android a la base de datos serán controladas con Retrofit.

## Configuración de la base de datos y backend:

*   Creamos una tabla llamada "users" que contendrá _id_, _name_, _mail_ y _password_.
*   Descargamos [Slim php](http://www.slimframework.com/ "Slim PHP framwork") y [RedBean](http://www.redbeanphp.com/ "RedBeanPHP").

La estructura de directorios y archivos quedará así: [![rest-api-retrofit-android](storage/wp-content/uploads/2015/04/tree-rest-api.png)](http://ivanalbizu.eu/wp-content/uploads/2015/04/tree-rest-api.png) El único archivo que tenemos que crear es v1/api.php. En las primeras líneas añadimos las dependencias a SlimPHP y RedBeanPHP. El contenido será el siguiente:

```
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

Importamos [Retrofit](http://square.github.io/retrofit/ "Retrofit: retrofit-1.9.0.jar") y [Gson](https://code.google.com/p/google-gson/ "Gson: gson-2.3.1.jar") Sin entrar en detalle en todos los archivos, comentar que los principales serán:

*   UsersAPI.java
*   MainActivity.java
*   EditUser.java

UsersAPI.java se comunica con el Backend.

```
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

En MainActivity.java tendremos tres métodos:

*   getAllUser(String uri). Obtener todos los usuarios.
*   delUser(String uri, String id). Borrar un usuario por su ID. (Usando @Path definido en UsersAPI.java)
*   newUser(String uri, User user). Crear nuevo usuario. (Usando @Body)
*   Un cuarto método, refreshListUser(), para cargar el ListView.

El código completo de esta clase:

```
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

En la clase EditUserActivty.java obtendremos el usuario que se quiere editar, y se edita. Para ello tenemos dos métodos.

*   getU(String uri, String id). Obtenemos el usuario por su ID. (Usando @Path de UsersAPI.java)
*   upUser(String uri, String id, User user). Obtenemos el usuario por su ID y los nuevos datos del usuario modificados. (Usando @Path y @Body)

El código completo es:

```
public class EditUserActivity extends Activity {
	
	public static final String BASE_URL = "http://tudominio.com/v1/api.php/";
	
	private TextView idUser;
	private EditText name,mail,password;
	private Button btn;
	private String idIntent;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity\_edit\_user);
		
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