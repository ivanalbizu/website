---
title: GridView con librería Picasso I
published: true
description: Primera publicación sobre la construcción de GridView de Android usando la librería Picasso
tags: Android,Java
ctime: Mon, 15 Dec 2014 15:40:06 +0000
---

Gridview con libreria Picasso Android. En esta entrada voy a hacer un sencillo ejemplo de GridvView. Para ello necesitamos descargarnos el JAR <a href="http://square.github.io/picasso/" target="_blank">Web para descargar librería Picasso</a>.

Se trabajará sobre cuatro archivos:

<ol class="list-bullets">
	<li>La vista de la aplicación <code>activity_main.xml</code></li>
	<li>El adaptador del GridView <code>GridviewAdapter.java</code></li>
	<li>El programa principal <code>MainActivity.java</code></li>
	<li>Modificar el <code>AndroidManifest.xml</code> para dar permisos de internet</li>
</ol>

El primer archivo, <code>activity_main.xml</code>, contiene el GridView y su ID será <code>@+id/gridView</code>.

Su código es:

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:padding="10sp"
  tools:context="${relativePackage}.${activityClass}" >

  <GridView
    android:id="@+id/gridView"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_alignParentLeft="true"
    android:layout_alignParentTop="true"
    android:numColumns="3" >
  </GridView>

</RelativeLayout>
```

El segundo archivo, el adaptador del <code>GridView</code> se llama <code>GridviewAdapter.java</code> lo construyo extendiendo de <code>BaseAdapter</code>.

<ul class="list-bullets">
	<li>El constructor del adaptador será con dos parámetros. El primero hace referencia al contexto, y el segundo aun Array de String que contendrá lista de URL que pasarán en el programa principal.</li>
	<li>Se implementan los tres métodos propios del base adapter: <code>public int getCount()</code>, <code>public Object getItem(int position)</code> y <code>public long getItemId(int position)</code>.</li>
	<li>Se da forma al <code>public View getView(int position, View convertView, ViewGroup parent)</code>.
		<ul class="list-bullets">
			<li>Se declara un <code>ImageView</code>. La primera vez que se itere dentro de <code>getView</code> se instancia el <code>ImageView</code> y se iguala a <code>convertView</code>. En el resto de iteraciones el <code>convertView</code> se castea y se pasa al <code>ImageView</code>.</li>
			<li>Se usa la librería Picasso. Existen muchos métodos. Los necesarios son cargar <code>load()</code> las imágenes y especificar sobre que se cargarán, en mi caso sobre <code>img</code>, es decir, sobre el <code>ImageView</code>.</li>
		</ul>
	</li>
</ul>

El código es:

```java
package eu.ivanalbizu.picasso;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;

import com.squareup.picasso.Picasso;

public class GridviewAdapter extends BaseAdapter{

	private Context context;
	private String[] items;

	//Constructor de dos parámetros
	public GridviewAdapter(Context context, String[] items){
		super();
		this.context = context;
		this.items = items;
	}

	//Obetenemos la cantidad de imágenes
	@Override
	public int getCount() {
		return items.length;
	}

	//Obtenemos el objeto a partir de su posición
	@Override
	public Object getItem(int position) {
		return items[position];
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	//Generamos la vista
	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		//Declaramos el ImageView
		ImageView img = null;
		if (convertView == null) {
			//Referenciamos el ImageView
			img = new ImageView(context);
			//Referenciamos el ImageView al convertView
			convertView = img;
			img.setPadding(5, 5, 5, 5);
		} else {
			img = (ImageView) convertView;
		}
		
		
		//Uso de la librería Picasso
		Picasso.with(context)
			//Cargamos la imagen sobre la que se esté iterando
			.load(items[position])
			//Imagen por defecto usada mientras se cargan las imágenes
			.placeholder(R.drawable.picture)
			.resize(200, 300)
			//Se aplica sobre la imagen (ImageView - se hizo referencia a "convertView")
			.into(img);
		
		return convertView;
	}

}
```

En <code>MainActivity.java:</code>

<ul class="list-bullets">
	<li>Se declaran tres variables, una variable GridView y obtengo la referencia de la vista, otra variable para hacer uso del adaptador y un Array de String que contiene las URL de las imágenes.</li>
	<li>Se construye el adaptador con los dos parámetros, primero se pasa la clase actual (MainActivity.this) y segundo el Array de String</li>
	<li>Al gridView se le especifica que haga uso del adaptador que acabamos de crear.</li>
</ul>

Su código:

```java
package eu.ivanalbizu.picasso;

import android.app.Activity;
import android.os.Bundle;
import android.widget.GridView;

public class MainActivity extends Activity {
  
  private GridView gridView;
  private GridviewAdapter gridAdapter;
  
  //Array de String que contiene las URL de las imágenes externas que usemos
  String[] items = {
    "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/324px-Tour_Eiffel_Wikimedia_Commons.jpg",
    "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/324px-Tour_Eiffel_Wikimedia_Commons.jpg",
    "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/324px-Tour_Eiffel_Wikimedia_Commons.jpg",
    "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/324px-Tour_Eiffel_Wikimedia_Commons.jpg",
    "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/324px-Tour_Eiffel_Wikimedia_Commons.jpg",
  };
  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    
    //Obtenemos la referencia de la vista
    gridView = (GridView) findViewById(R.id.gridView);
    
    //Construímos el adaptador pasando como
    //segundo parámetro el array de imágenes
    gridAdapter = new GridviewAdapter(MainActivity.this, items);
    
    //Especificamos el adaptador
    gridView.setAdapter(gridAdapter);

  }
}
```

En <code>AndroidManifest.xml</code> tenemos que dar permisos de internet <code>&lt;uses-permission android:name=&quot;android.permission.INTERNET&quot;/&gt;</code>

Vídeo del proyecto:

<div class="ratio-16-9">
    <iframe title="GridView Android con librería Picaso" type="text/html" src="http://www.youtube.com/embed/LpLq3OC3478?autoplay=0&origin=https://ivanalbizu.eu/" frameborder="0"></iframe>
</div>

Descargar el código completo <a href="(https://db.tt/EFMK4Nm4" target="_blank">GridView con Picasso de galería del móvil</a>