---
title: Tabs en Android
published: true
description: Sistemas de Tabs en Android usando TabHost, TabWidget LinearLayout
tags: Android,Java
ctime: Sun, 14 Dec 2014 10:35:52 +0000
---

Crear Tabs en Android es sencillo. Necesitaremos el archivo XML.

<ul class="list-bullets">
  <li>La etiqueta <code>TabHost</code> contiene toda la información.</li>
  <li>La etiqueta <code>TabWidget</code> hace referencia al sistema de pestañas: al menú.</li>
  <li>Los contenidos de cada pestaña está dentro de <code>LinearLayout</code>.</li>
</ul>

Su código:

```xml
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

La clase <code>MainActivity.java</code>, dentro de <code>onCreate</code> obtiene las referencias de cada elemento de la vista.

<ul class="list-bullets">
  <li>Se obtiene la referencia al sistema de pestañas <code>TabHost tabs = (TabHost) findViewById(android.R.id.tabhost)</code></li>
  <li>Llamamos al método <code>setup()</code> antes de empezar a añadir pestañas usando la ID.</li>
  <li>Indicamos una nueva pestaña <code>newTabSpec("Pestaña 1")</code></li>
  <li>Asignamos la referencia <code>spec.setContent(R.id.tab1)</code> e indicamos el nombre <code>spec.setIndicator("Menú 1")</code></li>
  <li>Asignamos la pestaña creada al sistema de pestañas <code>tabs.addTab(spec)</code></li>
  <li>Establecemos la primera pestaña como predeterminada <code>tabs.setCurrentTab(0)</code></li>
</ul>

Su código:

```java
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

El vídeo del ejemplo:

<div class="ratio-16-9">
    <iframe title="Sistema de Tabs en Android" type="text/html" src="http://www.youtube.com/embed/sUYtMNP66xk?autoplay=0&origin=https://ivanalbizu.eu/" frameborder="0"></iframe>
</div>