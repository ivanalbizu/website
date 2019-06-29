---
title: 'GridView con librería Picasso II'
date: Wed, 17 Dec 2014 18:17:18 +0000
published: true
tags: Android,Java
---

Continuando con mi publicación anterior sobre [GridView con librería Picasso I](http://ivanalbizu.eu/gridview-con-libreria-picasso/ "GridView con librería Picasso"), voy a implementar:

*   Usar las imágenes de nuestro móvil
*   Posibilidad de controlar el número de columnas del GridView
*   Permitir ver la imagen con la aplicación por defecto
*   Mejorar la visualización en función del tamaño de pantalla

## 1. Usar imágenes de nuestro móvil.

Para obtener las imágenes que tenemos en nuestro teléfono usaremos un método estático que nos devuelve un ArrayList de String. El método lo implementamos dentro de MainActivity.java Su código:

```
/**
 * Getting All Images Path
 * 
 * @param activity
 * @return ArrayList with images Path
 */
public static ArrayList<String> getAllShownImagesPath(Activity activity) {
	Uri uri;
	Cursor cursor;
	int column_index_data, column_index_folder_name;
	ArrayList<String> listOfAllImages = new ArrayList<String>();
	String absolutePathOfImage = null;
	uri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;

	String[] projection = { MediaColumns.DATA,
			MediaStore.Images.Media.BUCKET_DISPLAY_NAME };

	cursor = activity.getContentResolver().query(uri, projection, null,
			null, MediaStore.Images.Media.DATE_ADDED);

	column_index_data = cursor.getColumnIndexOrThrow(MediaColumns.DATA);
	column_index_folder_name = cursor
			.getColumnIndexOrThrow(MediaStore.Images.Media.BUCKET_DISPLAY_NAME);
	while (cursor.moveToNext()) {
		absolutePathOfImage = cursor.getString(column_index_data);

		listOfAllImages.add(absolutePathOfImage);
	}

	Collections.reverse(listOfAllImages);
	return listOfAllImages;
}
```

Necesitamos ahora modificar el código del adaptador, ya que su constructor recibía como uno de sus parámetros un Array de String. Por tanto

1.  La variable que contiene las imágenes será **private ArrayList<String> items;**
2.  El contructor será del tipo **public GridviewAdapter(Context context, ArrayList<String> items) {...}**.
3.  Para determinar cuantos elementos tiene el Array ahora será **public int getCount() { return items.length; }**
4.  Para conocer sobre que imagen se itera dentro de getView necesitaremos cambiarlo a **public Object getItem(int position) { return items.get(position); }**
5.  Para hacer uso de la librería Picasso modificaremos el método que obtiene la imagen a procesar **.load("file://"+items.get(position))**. Concatenamos antes de la ruta de la imagen un trozo de String para referenciarla correctamente: "file://"

Hasta aquí ya usamos las imágenes de nuestro móvil para crear el GridView.

## 2. Controlar el número de columnas.

Necesitaremos crear y modificar varios archivos.

1.  Crear el menú de opciones, sobre esto ya hice un [vídeo](https://www.youtube.com/watch?v=4r7RNfK89lg&list=UUgAVPB3yw74JP5UEEXHgccA "Vídeo menú de opciones")
2.  Registramos el menú en el MainActivity.java con **public boolean onCreateOptionsMenu(Menu menu) {...}**
3.  Le damos funcionalidad a los ítems del menú con **public boolean onOptionsItemSelected(MenuItem item) {...}**
    1.  Establecemos al comienzo todos los ítems como no seleccionados **item.setChecked(false);**
    2.  Según ítem seleccionado, pasamos (**numColumn**) a una variable el valor de columnas y establecemos el ítem como "checked" **item.setChecked(true);**
    3.  Después del SWITCH le comunicamos al GridView el número de columnas: **.setNumColumns(numColumn);** y el adaptador actualizado: **.setAdapter(new GridviewAdapter(MainActivity.this, getAllShownImagesPath(this), numColumn));**
    4.  Añadimos nueva variable al adaptador y modificamos el constructor para que reciba el tercer parámetro que indica el número de columnas: **public GridviewAdapter(Context context, ArrayList<String> items, int numColumn) {..}**

Código XML del menú:

```
<menu xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:app="http://schemas.android.com/apk/res-auto"
	xmlns:tools="http://schemas.android.com/tools"
	tools:context="eu.ivanalbizu.picassogridviewgallery.MainActivity" >

	<group android:id="@+id/group1" android:checkableBehavior="single">
		<item
			android:id="@+id/oneColumn"
			android:orderInCategory="100"
			android:title="@string/one_column"
			app:showAsAction="never"/>
		<item
			android:id="@+id/twoColumn"
			android:orderInCategory="200"
			android:title="@string/two_column"
			app:showAsAction="never"/>
		<item
			android:id="@+id/threeColumn"
			android:orderInCategory="300"
			android:title="@string/three_column"
			app:showAsAction="never" android:checked="true"/>
		<item
			android:id="@+id/fourColumn"
			android:orderInCategory="400"
			android:title="@string/four_column"
			app:showAsAction="never"/>
	</group>

</menu>
```

Código de creación y control del menú:

```
@Override
public boolean onCreateOptionsMenu(Menu menu) {
	getMenuInflater().inflate(R.menu.main, menu);
	getOverflowMenu();
	return super.onCreateOptionsMenu(menu);
}

private void getOverflowMenu() {

	try {
		ViewConfiguration config = ViewConfiguration.get(this);
		Field menuKeyField = ViewConfiguration.class.getDeclaredField("sHasPermanentMenuKey");
		if (menuKeyField != null) {
			menuKeyField.setAccessible(true);
			menuKeyField.setBoolean(config, false);
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
}

@Override
public boolean onOptionsItemSelected(MenuItem item) {
	item.setChecked(false);
	
	switch (item.getItemId()) {
	case R.id.oneColumn:
		numColumn=1;
		item.setChecked(true);
		break;
	case R.id.twoColumn:
		numColumn=2;
		item.setChecked(true);
		break;
	case R.id.threeColumn:
		numColumn=3;
		item.setChecked(true);
		break;
	case R.id.fourColumn:
		numColumn=4;
		item.setChecked(true);
		break;
	default:
		break;
	}
	
	gridView.setNumColumns(numColumn);
	gridView.setAdapter(new GridviewAdapter(MainActivity.this,
			getAllShownImagesPath(this),numColumn));
	
	return super.onOptionsItemSelected(item);
}
```

## 3. Permitir ver la imagen con la aplicación por defecto.

Dentro del método onCreate(...) incluimos listener al GridView del tipo "ítem seleccionado". Su código:

```
gridView.setOnItemClickListener(new OnItemClickListener() {

	@Override
	public void onItemClick(AdapterView<?> parent, View view,
			int position, long id) {
		String rutaDeLaImagen = gridAdapter.getItem(position).toString();

		Intent intent = new Intent();
		intent.setAction(Intent.ACTION_VIEW);
		intent.setDataAndType(Uri.parse("file://" + rutaDeLaImagen), "image/*");
		startActivity(intent);
	}
});
```

## 4. Mejorar la visualización en función del tamaño de pantalla.

Para optimizar el ancho de pantalla del móvil y el número de columnas a mostrar modificaremos el código del getView del adaptador. Se necesita obtener el ancho de pantalla del teléfono (detecta si está vertical u horizontal el móvil). Al método **.resize(...)** de la librería Picasso le pasamos como parámetros el resultado de dividir el ancho del móvil entre el número de columnas** int imageWidth = (int) (width / numColumn);** El método completo del getView es:

```
@Override
public View getView(int position, View convertView, ViewGroup parent) {
	WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
	Display display = wm.getDefaultDisplay();
	Point size = new Point();
	display.getSize(size);
	int width = size.x;
	
	int imageWidth = (int) (width / numColumn);
	
	//Declaramos el ImageView
	ImageView img = null;
	if (convertView == null) {
		//Referenciamos el ImageView
		img = new ImageView(context);
		//Referenciamos el ImageView al convertView
		img.setPadding(10,0,10,0);
		convertView = img;
	} else {
		img = (ImageView) convertView;
	}

	//Uso de la librería Picasso
	Picasso.with(context)
		//Cargamos la imagen sobre la que se esté iterando
		.load("file://"+items.get(position))
		//Imagen por defecto usada mientras se cargan las imágenes
		.placeholder(R.drawable.picture)
		.noFade()
		.resize(imageWidth, imageWidth)
		.centerCrop()
		//Se aplica sobre la imagen (ImageView - se hizo referencia a "convertView")
		.into(img);
	
	return convertView;
}
```

Vídeo del proyecto: Descargar el código completo de el [GridView con librería Picasso](https://drive.google.com/open?id=0BzQS5pOyF_HjOWc5ekxRWS01bjQ "GridView con Picasso de galería del móvil")