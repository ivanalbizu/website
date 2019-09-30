---
title: GridView con librería Picasso II
published: true
description: Segunda publicación sobre la construcción de GridView de Android usando la librería Picasso
tags: Android,Java
ctime: Wed, 17 Dec 2014 18:17:18 +0000
---

Continuando con mi publicación anterior sobre <a href="gridview-con-libreria-picasso/">GridView con librería Picasso</a>, voy a implementar:

<ul class="list-bullets">
	<li>Usar las imágenes de nuestro móvil</li>
	<li>Posibilidad de controlar el número de columnas del <code>GridView</code></li>
	<li>Permitir ver la imagen con la aplicación por defecto</li>
	<li>Mejorar la visualización en función del tamaño de pantalla</li>
</ul>

## Usar imágenes de nuestro móvil.

Para obtener las imágenes que tenemos en nuestro teléfono usaremos un método estático que nos devuelve un <code>ArrayList</code> de <code>String</code>. El método lo implementamos dentro de <code>MainActivity.java</code>. Su código:

```java
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

Necesitamos ahora modificar el código del adaptador, ya que su constructor recibía como uno de sus parámetros un <code>Array</code> de <code>String</code>. Por tanto

<ol class="list-bullets">
	<li>La variable que contiene las imágenes será <code>private ArrayList<String> items;</code></li>
	<li>El contructor será del tipo <code>public GridviewAdapter(Context context, ArrayList<String> items) {...}</code>.</li>
	<li>Para determinar cuantos elementos tiene el <code>Array</code> ahora será <code>public int getCount() { return items.length; }</code></li>
	<li>Para conocer sobre que imagen se itera dentro de <code>getView</code> necesitaremos cambiarlo a <code>public Object getItem(int position) { return items.get(position); }</code></li>
	<li>Para hacer uso de la librería Picasso modificaremos el método que obtiene la imagen a procesar <code>.load("file://"+items.get(position))</code>. Concatenamos antes de la ruta de la imagen un trozo de <code>String</code> para referenciarla correctamente: <code>file://</code></li>
</ol>

Hasta aquí ya usamos las imágenes de nuestro móvil para crear el <code>GridView</code>.

## Controlar el número de columnas.

Necesitaremos crear y modificar varios archivos.

<ol class="list-bullets">
	<li>Crear el menú de opciones, sobre esto ya hice un [vídeo](https://www.youtube.com/watch?v=4r7RNfK89lg&list=UUgAVPB3yw74JP5UEEXHgccA "Vídeo menú de opciones")</li>
	<li>Registramos el menú en el <code>MainActivity.java</code> con <code>public boolean onCreateOptionsMenu(Menu menu) {...}</code></li>
	<li>Le damos funcionalidad a los ítems del menú con <code>public boolean onOptionsItemSelected(MenuItem item) {...}</code>
		<ol class="list-bullets">
			<li>Establecemos al comienzo todos los ítems como no seleccionados <code>item.setChecked(false);</code></li>
			<li>Según ítem seleccionado, pasamos <code>numColumn</code> a una variable el valor de columnas y establecemos el ítem como <code>checked</code> <code>item.setChecked(true);</code></li>
			<li>Después del SWITCH le comunicamos al <code>GridView</code> el número de columnas: <code>.setNumColumns(numColumn);</code> y el adaptador actualizado: <code>.setAdapter(new GridviewAdapter(MainActivity.this, getAllShownImagesPath(this), numColumn));</code></li>
			<li>Añadimos nueva variable al adaptador y modificamos el constructor para que reciba el tercer parámetro que indica el número de columnas: <code>public GridviewAdapter(Context context, ArrayList<String> items, int numColumn) {..}</code></li>
		</ol>
	</li>
</ol>

Código XML del menú:

```xml
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

```java
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

## Permitir ver la imagen con la aplicación por defecto.

Dentro del método <code>onCreate(...)</code> incluimos listener al GridView del tipo "ítem seleccionado". Su código:

```java
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

## Mejorar la visualización en función del tamaño de pantalla.

Para optimizar el ancho de pantalla del móvil y el número de columnas a mostrar modificaremos el código del <code>getView</code> del adaptador. Se necesita obtener el ancho de pantalla del teléfono (detecta si está vertical u horizontal el móvil). Al método <code>resize(...)</code> de la librería Picasso le pasamos como parámetros el resultado de dividir el ancho del móvil entre el número de columnas <code>int imageWidth = (int) (width / numColumn);</code>.

El método completo del <code>getView</code> es:

```java
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

Vídeo del proyecto:

<div class="ratio-16-9">
    <iframe title="GridView Android con librería Picaso" type="text/html" src="http://www.youtube.com/embed/KRIBZyP1hd8?autoplay=0&origin=https://ivanalbizu.eu/" frameborder="0"></iframe>
</div>

Descargar el código completo <a href="https://drive.google.com/open?id=0BzQS5pOyF_HjOWc5ekxRWS01bjQ" target="_blank">GridView con Picasso de galería del móvil</a>