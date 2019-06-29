---
title: 'ListView en Android con ArrayAdapter'
date: Sun, 02 Nov 2014 15:14:15 +0000
published: true
tags: Android,Java
---

**ListView** en Android con **ArrayAdapter** usando una clase modelo y su adaptador para definir cada ítem de la lista. Los archivos de este programa van a ser:

*   Acciones.java. Será el modelo.
*   AccionesAdapter.java. Será el adaptador.
*   MainActivity.java. Será el programa, el main.
*   activity_main.xml. Será el contenedor de la vista de lista.
*   list_item_accion.xml. Será la definición de la vista, cada ítem.

La ListView va a ser simple, cada ítem tendrá una imagen a la izquierda y un texto la derecha. Empiezo explicando los archivos XML. El archivo **activity_main.xml** tendrá como layout RelaveLayout, dentro tiene etiqueta <ListView></ListView> y el valor del atributo "id" será "@android:id/list". (Ojo, no será tipo @+id="").

```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="#333"
  tools:context="${relativePackage}.${activityClass}" >

  <ListView
      android:id="@android:id/list"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:layout_alignParentLeft="true"
      android:layout_alignParentTop="true" >
  </ListView>
    
</RelativeLayout>
```

La vista de cada ítem queda definida en el archivo **list_item_accion.xml**, La imagen (ImageView) y el texto (TextView) quedan dentro de un LinearLayout.

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="horizontal" >

  <ImageView
      android:id="@+id/imageAccion"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:src="@drawable/ic_edit" />

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

De aquí en adelante se va a definir la lógica, serán archivos java. El modelo se define en el archivo **Acciones.java**. Sólo tendrá dos atributos, uno de tipo "String" para el nombre y otro de tipo "int" para la imagen (en el XML será de tipo ImageView). Y su constructor y Getters y Setters.

```
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

El adaptador de ListView queda definido en el archivo **AccionesAdapter.java**. Este archivo extiende de ArrayAdapter y hace uso de Acciones.java: **extends ArrayAdapter<Acciones>.** Se definen tres variables:

*   private List<Acciones> listadoOperaciones;
*   private Activity context;
*   private int layoutModel;

Se crea el constructor de dicha clase. Se sobrescribe el método getView(...) usando tres parámetro. Este método realiza como un bucle recorriendo cada ítem, capturando la ImageView y el TextView. El código completo de esta clase:

```
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

El archivo **MainActivity.java** extiende de ListView. En el método protected void onCreate(Bundle savedInstanceState) se declara una lista de tipo Acciones y con el método **add** se añaden ítems a la lista:

```
List<Acciones> acciones = new ArrayList<Acciones>(); acciones.add(new Acciones("Editar",R.drawable.ic_edit));
```

Se crea el adaptador de la lista y se establece, pasando el layout a usar list_item_accion: 

```
AccionesAdapter adapter = new AccionesAdapter(this, R.layout.list_item_accion, acciones); setListAdapter(adapter);
```

```
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

Se puede descargar el [código completo de ListView en Android con ArrayAdapter](https://drive.google.com/open?id=0BzQS5pOyF_HjVUhvSFhMalVfYms "Código ListView en Android") Y aquí un vídeo de todo el proceso: