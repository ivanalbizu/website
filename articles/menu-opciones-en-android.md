---
title: 'Menú contextual en Android'
date: Fri, 28 Nov 2014 20:28:58 +0000
published: true
tags: Android,Java
---

El menú opciones en Android y con Eclipse se puede crear directamente al generar un Activity usando la plantilla "Blank Activity". En esta publicación he querido construirlo paso a paso, creando todas las líneas de código. Se trabajará sobre dos archivos:

*   MainActivity.java
*   options_menu.xml

El archivo "options_menu.xml" se creará dentro de una carpeta que tendremos que crear llamada "menu", que estará dentro de la carpeta "res". La interfaz gráfica o mediante código XML directamente, se creará tres ítems.

*   El atributo android:id contendrá la referencia del ítem.
*   El atributo android:icon captura la imagen del atributo.
*   El atributo android:orderInCategory permite mostrar el orden de aparición de los ítems.
*   El atributo android:showAsAction sirve para especificar que y como queremos mostrar los ítems.
*   El atributo android:title se usará para especificar el texto del ítem.

El código del XML puede ser:

```
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

```
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

Hay tres métodos más que sólo son usados para mostrar un Toast. Se puede ver el vídeo: Se puede [descargar el código Menú contextual en Android.](https://db.tt/wemwubDo "Menú opciones en Android")