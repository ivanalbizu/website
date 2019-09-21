---
title: Tabs en Android
published: true
description: Sistemas de Tabs en Android usando TabHost, TabWidget LinearLayout
tags: Android,Java
ctime: Sun, 14 Dec 2014 10:35:52
---

Crear Tabs en Android es sencillo. Necesitaremos el archivo XML.

*   La etiqueta **TabHost** contiene toda la información.
*   La etiqueta **TabWidget** hace referencia al sistema de pestañas: al menú.
*   Los contenidos de cada pestaña está dentro de **LinearLayout**.

Su código:

```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  tools:context="eu.ivanalbizu.tabapp.MainActivity" >

  <TabHost
    android:id="@android:id/tabhost"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_alignParentLeft="true"
    android:layout_alignParentTop="true" >

    <LinearLayout
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:orientation="vertical" >

      <TabWidget
        android:id="@android:id/tabs"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" >
      </TabWidget>

      <FrameLayout
        android:id="@android:id/tabcontent"
        android:layout_width="match_parent"
        android:layout_height="match_parent" >

        <LinearLayout
          android:id="@+id/tab1"
          android:layout_width="match_parent"
          android:layout_height="match_parent"
          android:orientation="horizontal" >
        </LinearLayout>

        <LinearLayout
          android:id="@+id/tab2"
          android:layout_width="match_parent"
          android:layout_height="match_parent"
          android:orientation="horizontal" >
        </LinearLayout>

        <LinearLayout
          android:id="@+id/tab3"
          android:layout_width="match_parent"
          android:layout_height="match_parent"
          android:orientation="horizontal" >
        </LinearLayout>

        <LinearLayout
          android:id="@+id/tab4"
          android:layout_width="match_parent"
          android:layout_height="match_parent"
          android:orientation="horizontal" >
        </LinearLayout>
      </FrameLayout>
    </LinearLayout>
  </TabHost>

</RelativeLayout>
```

La clase MainActivity.java, dentro de onCreate,  obtiene las referencias de cada elemento de la vista.

*   Se obtiene la referencia al sistema de pestañas **TabHost tabs = (TabHost) findViewById(android.R.id.tabhost)**
*   Llamamos al método **setup()** antes de empezar a añadir pestañas usando la ID.
*   Indicamos una nueva pestaña **newTabSpec("Pestaña 1")**
*   Asignamos la referencia **spec.setContent(R.id.tab1)** e indicamos el nombre **spec.setIndicator("Menú 1")**
*   Asignamos la pestaña creada al sistema de pestañas **tabs.addTab(spec)**
*   Establecemos la primera pestaña como predeterminada **tabs.setCurrentTab(0)**

Su código:

```
@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	
	TabHost.TabSpec spec;
	TabHost tabs = (TabHost) findViewById(android.R.id.tabhost);
	tabs.setup();
	
	spec = tabs.newTabSpec("Pestaña 1");
	spec.setContent(R.id.tab1);
	spec.setIndicator("Menú 1");
	tabs.addTab(spec);
	
	spec = tabs.newTabSpec("Pestaña 2");
	spec.setContent(R.id.tab2);
	spec.setIndicator("Menú 2");
	tabs.addTab(spec);
	
	spec = tabs.newTabSpec("Pestaña 3");
	spec.setContent(R.id.tab3);
	spec.setIndicator("Menú 3");
	tabs.addTab(spec);
	
}
```

El vídeo del ejemplo