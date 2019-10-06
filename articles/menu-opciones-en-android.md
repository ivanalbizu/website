---
title: Menú contextual en Android
published: true
description: Creación de menú contextual para App Android dentro de un Activity
tags: Android,Java
ctime: Fri, 28 Nov 2014 20:28:58 +0000
---

El menú opciones en Android se puede crear directamente al generar un Activity desde IDE Eclipse usando la plantilla "Blank Activity". En esta publicación he querido construirlo paso a paso, creando todas las líneas de código.

Se trabajará sobre dos archivos:

<ul class="list-bullets">
	<li><code>MainActivity.java</code></li>
	<li><code>options_menu.xml</code></li>
</ul>

El archivo <code>options_menu.xml</code> se creará dentro de una carpeta que tendremos que crear llamada <code>menu</code>, que estará dentro de la carpeta <code>res</code>. La interfaz gráfica o mediante código XML directamente, se creará tres ítems.

<ul class="list-bullets">
	<li>El atributo <code>android:id</code> contendrá la referencia del ítem.</li>
	<li>El atributo <code>android:icon</code> captura la imagen del atributo.</li>
	<li>El atributo <code>android:orderInCategory</code> permite mostrar el orden de aparición de los ítems.</li>
	<li>El atributo <code>android:showAsAction</code> sirve para especificar que y como queremos mostrar los ítems.</li>
	<li>El atributo <code>android:title</code> se usará para especificar el texto del ítem.</li>
</ul>

El código del XML puede ser:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android" >

	<item
		android:id="@+id/optionAdd"
		android:icon="@drawable/ic_add"
		android:orderInCategory="1"
		android:showAsAction="ifRoom"
		android:title="@string/add">
	</item>
	<item
		android:id="@+id/optionDelete"
		android:icon="@drawable/ic_delete"
		android:orderInCategory="2"
		android:showAsAction="ifRoom"
		android:title="@string/delete">
	</item>
	<item
		android:id="@+id/optionEdit"
		android:icon="@drawable/ic_edit"
		android:orderInCategory="3"
		android:showAsAction="ifRoom"
		android:title="@string/edit">
	</item>

</menu>
```

En el archivo "MainActivity.java" se sobre escriben dos métodos para crear y dar funcionalidad el menú, **public boolean onCreateOptionsMenu(Menu menu)** y **public boolean onOptionsItemSelected(MenuItem item)**. En el primero se llama y se muestra el menú definido en el XML. Y en el segundo se la da funcionalidad a los ítems, detectando sobre que ítem se hizo "click". El código de la clase es el siguiente:

```java
public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
	}
	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		MenuInflater inflater = getMenuInflater();
		inflater.inflate(R.menu.options_menu, menu);
		return true;
	}
	
	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case R.id.optionAdd:
			clickAdd();
			break;
		case R.id.optionDelete:
			clickDelete();
			break;
		case R.id.optionEdit:
			clickEdit();
			break;
		}
		return super.onOptionsItemSelected(item);
	}

	private void clickEdit() {
		Toast.makeText(this, "Ha seleccionado Editar", Toast.LENGTH_SHORT).show();
	}

	private void clickDelete() {
		Toast.makeText(this, "Ha seleccionado Delete", Toast.LENGTH_SHORT).show();
	}

	private void clickAdd() {
		Toast.makeText(this, "Ha seleccionado Añadir", Toast.LENGTH_SHORT).show();
	}
}
```

Hay tres métodos más que sólo son usados para mostrar un <code>Toast</code>: <code>clickAdd()</code>, <code>clickDelete()</code> y <code>clickEdit()</code> 

Se puede ver el vídeo:

<div class="ratio-16-9">
    <iframe title="Menú de opciones den Android" type="text/html" src="http://www.youtube.com/embed/EKBtNNfqRqY?autoplay=0&origin=https://ivanalbizu.eu/" frameborder="0"></iframe>
</div>

Se puede [descargar el código Menú contextual en Android.](https://db.tt/wemwubDo "Menú opciones en Android")