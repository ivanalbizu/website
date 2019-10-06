---
title: ListView en Android con ArrayAdapter
published: true
description: Pintado de listas con ListView en Android mediante ArrayAdapter, cada ítem contiene un ImageView y TextView dentro de LinearLayout
tags: Android,Java
ctime: Sun, 02 Nov 2014 15:14:15 +0000
---

<code>ListView</code> en Android con <code>ArrayAdapter</code> usando una clase modelo y su adaptador para definir cada ítem de la lista.

Los archivos de este programa van a ser:

<ul class="list-bullets">
  <li><code>Acciones.java</code> será el modelo.</li>
  <li><code>AccionesAdapter.java</code> será el adaptador.</li>
  <li><code>MainActivity.java</code> será el programa, el main.</li>
  <li><code>activity_main.xml</code> será el contenedor de la vista de lista.</li>
  <li><code>list_item_accion.xml</code> será la definición de la vista, cada ítem.</li>
</ul>

La <code>ListView</code> va a ser simple, cada ítem tendrá una imagen a la izquierda y un texto la derecha. Empiezo explicando los archivos XML.

El archivo <code>activity_main.xml</code> tendrá como layout RelaveLayout, dentro tiene etiqueta <code>&lt;ListView&gt;</code> y el valor del atributo <code>id</code> será <code>@android:id/list</code>. (Ojo, no será tipo @+id="").

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="#333"
  tools:context="${relativePackage}.${activityClass}">

  <ListView
      android:id="@android:id/list"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:layout_alignParentLeft="true"
      android:layout_alignParentTop="true">
  </ListView>
    
</RelativeLayout>
```

La vista de cada ítem queda definida en el archivo <code>list_item_accion.xml</code>, La imagen <cpde>ImageView</code> y el texto <code>TextView</code> quedan dentro de un <code>LinearLayout</code>.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="horizontal">

  <ImageView
      android:id="@+id/imageAccion"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:src="@drawable/ic_edit"/>

  <TextView
      android:id="@+id/textViewNombreAccion"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="@string/incompleto"
      android:textAppearance="?android:attr/textAppearanceLarge"
      android:padding="5sp"
      android:textColor="#fff"/>

</LinearLayout>
```

De aquí en adelante se va a definir la lógica, serán archivos java. El modelo se define en el archivo <code>Acciones.java</code>. Sólo tendrá dos atributos, uno de tipo <code>String</code> para el nombre y otro de tipo <code>int</code> para la imagen (en el XML será de tipo <code>ImageView</code>). Y su constructor y Getters y Setters.

```java
package eu.ivanalbizu.listview;

public class Acciones {
  
  //Variables del modelo
  private String nombre;
  private int icono;
  
  //Constructor del modelo
  public Acciones(String nombre, int icono) {
    this.nombre = nombre;
    this.icono = icono;
  }

  //Getters y setters
  public String getNombre() {
    return nombre;
  }
  public void setNombre(String nombre) {
    this.nombre = nombre;
  }
  public int getIcono() {
    return icono;
  }
  public void setIcono(int icono) {
    this.icono = icono;
  }
}
```

El adaptador de <code>ListView</code> queda definido en el archivo <code>AccionesAdapter.java</code>. Este archivo extiende de ArrayAdapter y hace uso de Acciones.java: <code>extends ArrayAdapter&lt;Acciones&gt;.</code>.

Se definen tres variables:

<ul class="list-bullets">
  <li><code>private List<Acciones> listadoOperaciones;</code></li>
  <li><code>private Activity context;</code></li>
  <li><code>private int layoutModel;</code></li>
</ul>

Se crea el constructor de dicha clase. Se sobrescribe el método <code>getView(...)</code> usando tres parámetro. Este método realiza como un bucle recorriendo cada ítem, capturando la <code>ImageView</code> y el <code>TextView</code>.

El código completo de esta clase:

```java
package eu.ivanalbizu.listview;

import java.util.List;

import android.app.Activity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

public class AccionesAdapter extends ArrayAdapter<Acciones> { 
  
  //Atributos del adaptador
  private List<Acciones> listadoOperaciones;
  private Activity context;
  private int layoutMolde;

  //Constructor del adaptador
  public AccionesAdapter(Activity context, int layout, List<Acciones> listadoOperaciones) {
    super(context, layout, listadoOperaciones);
    this.listadoOperaciones = listadoOperaciones;
    this.context = context;
    this.layoutMolde = layout;
  }

  
  //Este método se puede considerar como un bucle. Se leen todos los ítems de la lista
  @Override
  public View getView(int position, View convertView, ViewGroup parent) {
    
    LayoutInflater inflater = context.getLayoutInflater();
    
    convertView = inflater.inflate(layoutMolde, null);

    Acciones accionActual = listadoOperaciones.get(position);
    
    //Referencias a "list_item_accion.xml"
    ImageView iconoAccion = (ImageView) convertView.findViewById(R.id.imageAccion);
    TextView nombreAccion = (TextView) convertView.findViewById(R.id.textViewNombreAccion);
    
    //Se usan los SETTERS del modelo "Acciones.java"
    iconoAccion.setImageResource(accionActual.getIcono());
    nombreAccion.setText(accionActual.getNombre());
    
    //Se devuelve cada vez un item de la lista
    return convertView;
  }
}
```

El archivo <code>MainActivity.java</code> extiende de <code>ListView</code>. En el método <code>protected void onCreate(Bundle savedInstanceState)</code> se declara una lista de tipo <code>Acciones</code> y con el método <code>add</code> se añaden ítems a la lista:

```
List<Acciones> acciones = new ArrayList<Acciones>();
acciones.add(new Acciones("Editar",R.drawable.ic_edit));
```

Se crea el adaptador de la lista y se establece, pasando el layout a usar <code>list_item_accion</code>: 

```
AccionesAdapter adapter = new AccionesAdapter(this, R.layout.list_item_accion, acciones); setListAdapter(adapter);
```

```java
package eu.ivanalbizu.listview;

import java.util.ArrayList;
import java.util.List;

import android.app.ListActivity;
import android.os.Bundle;

public class MainActivity extends ListActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    
    //Se crea la lista de tipo Acciones(dos parámetros: texto e imagen)
    List<Acciones> acciones = new ArrayList<Acciones>();
    acciones.add(new Acciones("Editar",R.drawable.ic_edit));
    acciones.add(new Acciones("Nuevo",R.drawable.ic_new));
    acciones.add(new Acciones("Eliminar",R.drawable.ic_delete));
    acciones.add(new Acciones("Copiar",R.drawable.ic_copy));
    
    //Se contruye el adaptador para la lista
    //Se usa el Layout "list_item_accion.xml"
    AccionesAdapter adapter = new AccionesAdapter(this, R.layout.list_item_accion, acciones);
    
    setListAdapter(adapter);
  }
}
```

Se puede descargar el <a href="https://drive.google.com/open?id=0BzQS5pOyF_HjVUhvSFhMalVfYms" target="_blank">código completo de ListView en Android con ArrayAdapter</a>

Y aquí un vídeo de todo el proceso:

<div class="ratio-16-9">
    <iframe title="ListView en Android con ArrayAdapter" type="text/html" src="http://www.youtube.com/embed/WkysUx43Tr4?autoplay=0&origin=https://ivanalbizu.eu/" frameborder="0"></iframe>
</div>