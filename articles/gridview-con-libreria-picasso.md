---
title: 'GridView con librería Picasso I'
ctime: Mon, 15 Dec 2014 15:40:06
published: true
tags: Android,Java
---

Gridview con libreria Picasso Android. En esta entrada voy a hacer un sencillo ejemplo de GridvView. Para ello necesitamos descargarnos el [Jar de la librería Picasso](http://square.github.io/picasso/ "Web para descargar librería Picasso") Se trabajará sobre cuatro archivos:

1.  La vista de la aplicación: **activity_main.xml**
2.  El adaptador del GridView: **GridviewAdapter.java**
3.  El programa principal: **MainActivity.java**
4.  Modificar el **AndroidManifest.xml** para dar permisos de internet

El primer archivo, **activity_main.xml**, contiene el GridView y su ID será **@+id/gridView**. Su código es:

```
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

El segundo archivo, el adaptador del GridView se llama **GridviewAdapter.java** lo construyo extendiendo de BaseAdapter.

*   El constructor del adaptador será con dos parámetros. El primero hace referencia al contexto, y el segundo aun Array de String que contendrá lista de URL que pasarán en el programa principal.
*   Se implementan los tres métodos propios del base adapter: public int getCount(), public Object getItem(int position) y public long getItemId(int position).
*   Se da forma al public View getView(int position, View convertView, ViewGroup parent).
    *   Se declara un ImageView. La primera vez que se itere dentro de getView se instancia el ImageView y se iguala a convertView. En el resto de iteraciones el convertView se castea y se pasa al ImageView.
    *   Se usa la librería Picasso. Existen muchos métodos. Los necesarios son cargar (load()) las imágenes y especificar sobre que se cargarán, en mi caso sobre "img", es decir, sobre el ImageView.

El código es:

```
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

En **MainActivity.java:**

*   Se declaran tres variables, una variable GridView y obtengo la referencia de la vista, otra variable para hacer uso del adaptador y un Array de String que contiene las URL de las imágenes.
*   Se construye el adaptador con los dos parámetros, primero se pasa la clase actual (MainActivity.this) y segundo el Array de String
*   Al gridView se le especifica que haga uso del adaptador que acabamos de crear.

Su código:

```
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

En **AndroidManifest.xml** tenemos que dar permisos de internet: <uses-permission android:name="android.permission.INTERNET"/> Vídeo del proyecto: Se puede decargar [código de GridView con librería Picasso](https://db.tt/EFMK4Nm4 "Código GridView con librería Picasso")