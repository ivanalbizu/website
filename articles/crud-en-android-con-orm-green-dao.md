---
title: 'Crud en Android con ORM Green Dao'
date: Wed, 19 Nov 2014 21:59:59 +0000
published: true
tags: Android,Java
---

En este proyecto realizaré un sistema Crud en Android con el ORM de Green Dao. Para crear el proyecto he adaptado a mis necesidades el DaoExampleGenerator que se puede encontrar en [GitHub de Green Dao](https://github.com/greenrobot/greenDAO "GitHub de Green Dao").

```
public static void main(String[] args) throws Exception {
	//Primer parámetro: versión de la base de datos
	//Segundo parámetro: paquete de mi proyecto Android quiero que se exporten 
	//los POJO que identifican a mis tablas en la Base de datos
	Schema schema = new Schema(1, "eu.ivanalbizu.gestorescontenidos.entity");
	
	//Ficheros DAO de cada tabla de la base de datos los exporte al paquete 
	//"eu.ivanalbizu.gestorescontenidos.dao" de mi proyecto Android
	schema.setDefaultJavaPackageDao("eu.ivanalbizu.gestorescontenidos.dao");

	//Se añade la base de datos
	addGestor(schema);

	//Especificar la ruta del proyecto
	new DaoGenerator().generateAll(schema, "/home/ivan/workspace/PMDM/GestoresContenidos/src");
}

private static void addGestor(Schema schema) {
	//Definición de la tabla
	Entity gestor = schema.addEntity("Gestor");
	gestor.addIdProperty().autoincrement();
	gestor.addStringProperty("nombre").notNull();
	gestor.addStringProperty("icono").notNull();
}
```

Prepara contenidos para luego cargarlos a la base de datos en el archivo Data.java

```
public class Data {
	
	public static SQLiteDatabase db;
	
	public static void generarDatos(SQLiteDatabase db){
		Data.db = db;
		
		ContentValues gestor = new ContentValues();
		
		//Repetir tantas veces como registros queramos
		gestor.put(GestorDao.Properties.Nombre.columnName, "Wordpress");
		gestor.put(GestorDao.Properties.Icono.columnName, "wordpress");
		db.insert(GestorDao.TABLENAME, "", gestor);
		
		gestor.put(GestorDao.Properties.Nombre.columnName, "Drupal");
		gestor.put(GestorDao.Properties.Icono.columnName, "drupal");
		db.insert(GestorDao.TABLENAME, "", gestor);		
		
		gestor.put(GestorDao.Properties.Nombre.columnName, "Joomla!");
		gestor.put(GestorDao.Properties.Icono.columnName, "joomla");
		db.insert(GestorDao.TABLENAME, "", gestor);
	}
}
```

Y para cargar los datos en la aplicación vamos al archivo DaoMaster.java y en el método onCreate(SQLiteDatabase db) que está dentro del método Abstracto OpenHelper extends SQLiteOpenHelper añadimos Data.generarDatos(db);

```
public static abstract class OpenHelper extends SQLiteOpenHelper {

    public OpenHelper(Context context, String name, CursorFactory factory) {
        super(context, name, factory, SCHEMA_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        Log.i("greenDAO", "Creating tables for schema version " + SCHEMA_VERSION);
        createAllTables(db, false);
        Data.generarDatos(db);
    }
}
```

Ahora voy a crear las Activitys y las Vistas (cuando proceda). Son las siguientes:

*   ListadoActivity.java + activity_listado.xml
*   list_item_gestor.xml
*   AddActivity.java + activity_add.xml
*   EditDeleteActivity.java + activity_edit_delete.xml

Vista "list_item_gestor.xml" el contenedor será RelativeLayout. No usaremos clase, sóĺo vista XML. Para representar cada ítem dentro de un LinearLayout colocamos ImageView y TextView. Vista "activity_main.xml". Sólo tendremos dos botones, a los cuales añadiremos los eventos más adelante. Uno será para ver listado de gestores de contenido y el otro para ir a la interfaz de añadir. Vista "activity_add.xml". Contiene TextView y EditText. Y un Button para incluir el evento de añadir gestor de contenido. Vista "activity_edit_delete.xml". Recibe en el nombre en un TextView del gestor de contenido sobre el que se pulsó, y un EditText para que se pueda cambiar el nombre. Y dos botones, uno para "Modificar" y otro para "Eliminar". **A partir de ahora sólo tocamos archivos "java", excepto para insertar los eventos dentro de los layouts.** **GestorAdapter.java** Primero configuro el adaptador de la vista, cuyo código es:

```
public class GestorAdapter extends ArrayAdapter<Gestor> {

	private List<Gestor> gestores;
	private Activity context;
	private int layoutMolde;
	
	public GestorAdapter(Activity context, int layoutMolde, List<Gestor> gestores) {
		super(context, layoutMolde, gestores);
		this.gestores = gestores;
		this.context = context;
		this.layoutMolde = layoutMolde;
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		LayoutInflater inflater = context.getLayoutInflater();
		convertView = inflater.inflate(layoutMolde, null);
		
		Gestor gestorActual = gestores.get(position);
		
		ImageView iconoGestor = (ImageView) convertView.findViewById(R.id.imageDefecto);
		TextView textoGestor = (TextView) convertView.findViewById(R.id.textDefecto);
		
		int resourceId = context.getResources().getIdentifier(gestorActual.getIcono(), "ic_wordpress", context.getPackageName());
		iconoGestor.setImageResource(resourceId);
		textoGestor.setText(gestorActual.getNombre());
		
		return convertView;
	}
}
```

**ListadoActivity.java** Se declaran las variables propias de la base de datos de Green Dao, que son:

```
public DaoSession daoSession;
public DaoMaster daoMaster;
private SQLiteDatabase db;
```

Y las variables que modelan las clases de la aplicación y sus relaciones, que son:

```
private GestorDao gestorDao;
private List<Gestor> gestores;
private Gestor gestor;
private ListView list;
private GestorAdapter adaptadorGestor;
private static final int EDITAR_ELIMINAR_GESTOR = 1;
```

Tendremos tres métodos. En el método onCreate(Bundle savedInstanceState) se trabaja con las variables creadas para la base de datos. Se trata de obtener los ítems de la tabla y pasarlo al adaptador. El segundo método es onListItemClick(ListView l, View v, int position, long id), para enviar el "Intent" con la ID del gestor seleccionado. El tercer método es  onActivityResult(int requestCode, int resultCode, Intent data), para recibir el resultado que nos envía la clase EditDeleteActivity.java. El código completo de esta clase:

```
public class ListadoActivity extends ListActivity {

	//Variables propias
	private GestorDao gestorDao;
	private List<Gestor> gestores;
	private Gestor gestor;
	private ListView list;
	private GestorAdapter adaptadorGestor;
	private static final int EDITAR_ELIMINAR_GESTOR = 1;
	
	//Variables relativas a Green Dao Database
	public DaoSession daoSession;
	public DaoMaster daoMaster;
	private SQLiteDatabase db;
	
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_listado);
		
		//Otenemos la referencia de la lista
		list = getListView();
		//Conexión a la base de datos
		DevOpenHelper helper = new DaoMaster.DevOpenHelper(this, "gestor-db", null);
		db = helper.getWritableDatabase();
		daoMaster = new DaoMaster(db);
		daoSession = daoMaster.newSession();
		
		//Obtenemos un objeto de tipo "GestorDao" que manipula por nosotros
		//la tabla Gestor de la Base de Datos
		gestorDao = daoSession.getGestorDao();
		
		//Obtiene listado de Gestores, equivale a: SELECT * FROM GESTOR
		gestores = gestorDao.loadAll();
		
		//Pasamos el adaptador
		adaptadorGestor = new GestorAdapter(this, R.layout.list_item_gestor, gestores);
		setListAdapter(adaptadorGestor);
		
	}
	
	@Override
	protected void onListItemClick(ListView l, View v, int position, long id) {
		super.onListItemClick(l, v, position, id);
		
		//Se obtiene la posición del elemento seleccionado
		Gestor gestorSeleccionado = (Gestor) gestores.get(position);
		
		//Se envía ID del elemento seleccionado
		Intent intent = new Intent(this, EditDeleteActivity.class);
		intent.putExtra("idGestor", gestorSeleccionado.getId());
		startActivityForResult(intent, EDITAR_ELIMINAR_GESTOR);
		
	}
	
	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		//Se evalua lo recibido, si es OK, se procede a actualizar la interfaz
		if (resultCode == Activity.RESULT_OK && requestCode == EDITAR_ELIMINAR_GESTOR) {
			
			Toast.makeText(this, "Operación realizada con éxito", Toast.LENGTH_SHORT).show();
			
			adaptadorGestor.clear();
			adaptadorGestor.addAll(gestorDao.loadAll());
			adaptadorGestor.notifyDataSetChanged();

			adaptadorGestor = new GestorAdapter(this, R.layout.list_item_gestor, gestores);
			
			list.setAdapter(adaptadorGestor);
			
			//Realizada la operación, se envía a la página principal
			Intent intent = new Intent(this, MainActivity.class);
			startActivity(intent);
			
		}
	}
}
```

**EditDeleteActivity.java** Recibe el gestor que ha sido seleccionado en en la clase ListadoActivity.java y se habilita la opción de editar o eliminar. Se declaran las variables propias de la base de datos de Green Dao, que son:

```
public DaoSession daoSession;
public DaoMaster daoMaster;
private SQLiteDatabase db;
```

Y las variables que modelan las clases de la aplicación y sus relaciones, que son:

```
private GestorDao gestorDao;
private EditText editTexto;
private Gestor gestorAEditarEliminar;
```

Tendremos tres métodos. En el método onCreate(Bundle savedInstanceState) se trabaja con las variables creadas para la base de datos. Se trata de obtener los ítems de la tabla y pasarlo al adaptador. El método editarGestor(View v), captura la información del TextView y se actualiza en la base de datos. Y el otro, eliminarGestor(View v), elimina el gestor seleccionado. El código completo de esta clase:

```
public class EditDeleteActivity extends Activity {
	
	//Variables propias
	private GestorDao gestorDao;
	private EditText editTexto;
	private Gestor gestorAEditarEliminar;
	
	//Variables relativas a Green Dao Database
	public DaoSession daoSession;
	public DaoMaster daoMaster;
	private SQLiteDatabase db;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_edit_delete);
		
		//Se obtiene referencia al elemento XML
		editTexto = (EditText) findViewById(R.id.editTextNombreGestor);
		
		//Se obtiene el elemento seleccionado en ListadoActivity.java
		//mediante su ID recibida mediante startActivityForResut()
		Bundle extras = getIntent().getExtras();
		long idGestor = extras.getLong("idGestor");
		
		//Conexión a la base de datos
		DevOpenHelper helper = new DaoMaster.DevOpenHelper(this, "gestor-db", null);
		db = helper.getWritableDatabase();
		daoMaster = new DaoMaster(db);
		daoSession = daoMaster.newSession();
		
		//Obtenemos un objeto de tipo "GestorDao" para manipular
		//la tabla Gestor de la Base de Datos
		gestorDao = daoSession.getGestorDao();
		
		//Se obtiene un Gestor con id = i mediante el método load(long i)
		gestorAEditarEliminar = gestorDao.load(idGestor);
		
		//Se carga en el EditText el nombre a la fruta a editar
		editTexto.setText(gestorAEditarEliminar.getNombre());
	}
	
	public void editarGestor(View v){
		
		//Evento disparado al pulsar sobre el botón Editar
		//Se captura el texto introducido en el TextView
		String nuevoNombre = editTexto.getText().toString();
		
		//Se actualiza la base de datos
		gestorAEditarEliminar.setNombre(nuevoNombre);
		gestorDao.update(gestorAEditarEliminar);
		
		//Si se llega hasta aquí todo va bien, y se devuelve OK 
		setResult(RESULT_OK);
		finish();
	}
	
	public void eliminarGestor(View v){
		
		//Evento disparado al pulsar sobre el botón Eliminar
		gestorDao.delete(gestorAEditarEliminar);
		
		//Si se llega hasta aquí todo va bien, y se devuelve OK 
		setResult(RESULT_OK);
		finish();
	}
}
```

**AddActivity.java** Se declaran las variables propias de la base de datos de Green Dao, que son:

```
public DaoSession daoSession;
public DaoMaster daoMaster;
private SQLiteDatabase db;
```

Y las variables que modelan las clases de la aplicación y sus relaciones, que son:

```
private EditText nombreGestor;
private GestorDao gestorDao;
```

Tendremos dos métodos. En el método onCreate(Bundle savedInstanceState) se carga la base de datos. El método guardarGestor(View v) guarda el nuevo contenido en la base de datos y nos envía a la página principal. El código completo de esta clase:

```
public class AddActivity extends Activity {
	
	//Variables propias
	private EditText nombreGestor;
	private GestorDao gestorDao;
	
	//Variables relativas a Green Dao Database
	public DaoSession daoSession;
	public DaoMaster daoMaster;
	private SQLiteDatabase db;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_add);
		
		//Obtiene el texto del EditText
		nombreGestor = (EditText) findViewById(R.id.editTextNombreGestor);
		
		DevOpenHelper helper = new DaoMaster.DevOpenHelper(this, "gestor-db", null);
		db = helper.getWritableDatabase();
		daoMaster = new DaoMaster(db);
		daoSession = daoMaster.newSession();
		
		gestorDao = daoSession.getGestorDao();
	}
	
	public void guardarGestor(View v){
		
		//Se obtiene el nombre del EditText
		String nombre = nombreGestor.getText().toString();
		
		//Se crea nuevo gestor
		Gestor gestorNuevo = new Gestor();
		gestorNuevo.setNombre(nombre);
		gestorNuevo.setIcono("ic_wordpress");
		
		//Se inserta el nuevo gestor en la base de datos
		gestorDao.insert(gestorNuevo);
		Toast.makeText(this, "Se ha añadido "+nombre, Toast.LENGTH_SHORT).show();
		
		//Realizada la operación, se envía a la página principal
		Intent intent = new Intent(this, MainActivity.class);
		startActivity(intent);
	}
}
```

**MainActivity.java** Sólo había que crear dos métodos. El primero listadoGestor(View v) y el segundo anadirGestor(View v), nos lanzan a las Activitys correspondientes. El código completo es:

```
public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
	}
	
	public void listadoGestor(View v){
		Intent intent = new Intent(this, ListadoActivity.class);
		startActivity(intent);
	}
	
	public void anadirGestor(View v){
		Intent intent = new Intent(this, AddActivity.class);
		startActivity(intent);
	}
}
```

El vídeo: Y el enlace de descarga del [proyecto Android Green Dao ORM](https://db.tt/FiOBFetH "Descargar proyecto Android Green Dao ORM")