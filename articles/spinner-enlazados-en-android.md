---
title: Spinner enlazados en Android
published: true
description: Construcción de Spinners en Android cargados desde datos en formato XML y segundo Spinner en función de los seleccionado en el primero
tags: Android,Java
ctime: Fri, 31 Oct 2014 16:09:58 +0000
---

Spinner enlazados en Android, en el que un segundo Spinner carga sus contenidos en función del ítem seleccionado del primer Spinner. Los pasos que he seguido para conseguirlo han sido:

1.  Creación de arrays dentro del archivo strings.xml.
2.  Creación de la vista en el archivo layout.xml
3.  Declaración de variables.
4.  Referenciado de variables del XML.
5.  Construcción del "adaptador" para el primer Spinner.
6.  Cargar el tipo de vista para el adaptador.
7.  Aplicar el adaptador al Spinner de localidades.
8.  Listener para saber que item ha sido seleccionado y poder usarlo en el método "onItemSelected".
9.  Sobre escribir el método "onItemSelected" de la interfaz "OnItemSelectedListener".
    1.  Se guarda en array de enteros los arrays de las provincias.
    2.  Construcción del "adaptador" para el segundo Spinner.
    3.  Se carga el tipo de vista para el adaptador.
    4.  Se aplica el adaptador al Spinner de localidades.

Creación de los arrays para los Spinner:

```
<string-array name="array_provincias">
    <item>Sevilla</item>
    <item>Málaga</item>
</string-array>

<string-array name="array_sevilla">
    <item>Villanueva del Ariscal</item>
    <item>Tomares</item>
    <item>Mairena del Aljarafe</item>
</string-array>

<string-array name="array_malaga">
    <item>Casares</item>
    <item>Manilva</item>
    <item>Estepona</item>
</string-array>

Creación de Spinner en la vista:

<Spinner
    android:id="@+id/spinnerProvincia"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_alignParentTop="true"
    android:layout_centerHorizontal="true"
    android:layout_marginTop="40dp" />

<Spinner
    android:id="@+id/spinnerLocalidad"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_below="@+id/spinnerProvincia"
    android:layout_centerHorizontal="true"
    android:layout_marginTop="66dp" />
```

Declaración y referenciado de los Spinner:

```
//Declaración de variables
private Spinner spinnerPro, spinnerLoc;

@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  setContentView(R.layout.activity_main);
  
  //Referenciado de variables del XML
  spinnerPro = (Spinner) findViewById(R.id.spinnerProvincia);
  spinnerLoc = (Spinner) findViewById(R.id.spinnerLocalidad);

  /*------ Método OnCreate continua ------*/
```

Adaptador para primer Spinner:

```
@Override
protected void onCreate(Bundle savedInstanceState) {
  /*------ Método continuado ------*/

    //Construcción del "adaptador" para el primer Spinner
  ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(
    this, 
    R.array.array_provincias, //Se carga el array definido en el XML
    android.R.layout.simple_spinner_item);
  
  //Se carga el tipo de vista para el adaptador
  adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
  
  //Se aplica el adaptador al Spinner de localidades
  spinnerPro.setAdapter(adapter);
  //Se aplica listener para saber que item ha sido seleccionado
  //y poder usarlo en el método "onItemSelected"
  spinnerPro.setOnItemSelectedListener(this);
}
```

Segundo Spinner, enlazado:

```
//Sobre escrito el método "onItemSelected" de
//la interfaz "OnItemSelectedListener"
@Override
public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
  //Se guarda en array de enteros los arrays de las provincias
  int[] localdades = {R.array.array_sevilla,R.array.array_malaga};
  
  //Construcción del "adaptador" para el segundo Spinner
  ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(
    this,
    localidades[position],//En función de la provincia, se carga el array que corresponda del XML
    android.R.layout.simple_spinner_item);
  
  //Se carga el tipo de vista para el adaptador
  adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
  
  //Se aplica el adaptador al Spinner de localidades
  spinnerLoc.setAdapter(adapter); 
}
```

He creado un vídeo en el que realizo este ejemplo de Spinner enlazados en Android: Para descargar el código completo [Spinner enlazados en Android](https://drive.google.com/open?id=0BzQS5pOyF_HjSElVSTZuZlEzR00 "Spinner enlazadosen Android")