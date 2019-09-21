---
title: Construir custom dial en Android
published: true
description: Proyecto Android para realizar un custom dial
tags: Android,Java
ctime: Sun, 19 Oct 2014 15:36:18
---

Construir custom dial en Android con pocas líneas de código. Crearé un proyecto Android en el que sólo añada esta funcionalidad. El proyecto contendrá sólo un archivo java llamado MainActivity.java y un archivo xml asociado llamado activity_main.xml encargado de contener el aspecto gráfico. Empezando por el aspecto visual, el archivo activity_main.xml contendrá:

1.  Un "LinearLayout" con un "TextView" para el número de teléfono y un "ImageView" para una imagen que permitirá borrar el último dígito introducido.
2.  Un "TableLayout" para incluir los botones del teclado numérico.
3.  Y finalmente un "ImageView" que será el que lance la llamada de teléfono.

Su código es el siguiente:

```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#6F8C82"
    tools:context="${relativePackage}.${activityClass}" >
    
    <LinearLayout
        android:id="@+id/tab1"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical" >

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="20sp" >

            <TextView
                android:id="@+id/numeroLlamada"
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:layout_weight="0.8"
                android:background="#d1d1d1"
                android:textColor="#D91E1E"
                android:textSize="30sp"
                android:typeface="monospace"
                android:text="@string/txt_num_marcado" />

            <ImageButton
                android:id="@+id/imageButton1"
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:background="#00000000"
                android:layout_weight="0.2"
                android:src="@drawable/ic_delete" />

        </LinearLayout>

        <TableLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="20sp"
            android:stretchColumns="*" >

            <TableRow
                android:id="@+id/tableRow1"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content" >

                <Button
                    android:id="@+id/button1"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/btn_1" />

                <Button
                    android:id="@+id/button2"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/btn_2" />

                <Button
                    android:id="@+id/button3"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/btn_3" />

            </TableRow>

            <TableRow
                android:id="@+id/tableRow2"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content" >

                <Button
                    android:id="@+id/button4"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/btn_4" />

                <Button
                    android:id="@+id/button5"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/btn_5" />

                <Button
                    android:id="@+id/button6"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/btn_6" />

            </TableRow>

            <TableRow
                android:id="@+id/tableRow3"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content" >

                <Button
                    android:id="@+id/button7"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/btn_7" />

                <Button
                    android:id="@+id/button8"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/btn_8" />

                <Button
                    android:id="@+id/button9"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/btn_9" />

            </TableRow>
            
            <TableRow
             android:id="@+id/tableRow4"
             android:layout_width="match_parent"
             android:layout_height="wrap_content" >

                <Button
                    android:id="@+id/button10"
                    style="?android:attr/buttonStyleSmall"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/btn_almohadilla" />

                <Button
                    android:id="@+id/button0"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/btn_0" />

                <Button
                    android:id="@+id/button12"
                    style="?android:attr/buttonStyleSmall"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/btn_asterisco" />

         </TableRow>
         
        </TableLayout>

        <ImageButton
            android:id="@+id/call"
            android:layout_width="match_parent"
            android:layout_height="50sp"
            android:layout_margin="20sp"
            android:background="#F25F1F"
            android:src="@drawable/ic_call" />

    </LinearLayout>
</RelativeLayout>
```

El archivo **MainActivity.java** será el que lleve la funcionalidad.

1.  Al inicio de la clase se declaran tres variables para poder trabajar con sus referencias dentro del main.
2.  Dentro del método **onCreate(...)** se inician las variables anteriores con sus referencias por ID del archivo XML.
3.  Se construye un "listener" para ser asignado a los botones de la vista. Para ello se obtiene el botón que produjo el evento, se concatena el teléfono que aparece en en TextView con el texto del número de dígito marcado (máximo 10 dígitos, se mostraría con Toast que no se permiten más dígitos).
4.  Se asigna a cada uno de los botones el listener anterior creado.
5.  Se habilita funcionalidad de editar el número de teléfono marcado. Se activa para ello un listener sobre el elemento de borrado.
6.  Se habilita listener para lanzar la llamada. Se activa para ello un listener sobre el botón de realizar llamada. Capturando el teléfono marcado, caso de ser vacio, se asigna el número de emergencias, se parsea y se lanza el Intent.

El código es el siguiente:

```
package eu.ivanalbizu.customdial;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {
	//Se declaran variables
	TextView numero;
	ImageButton editNumero;
	ImageButton doCall;
			
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        //Se inician las variables hacen uso de la referencia del archivo XML
        numero = (TextView) findViewById(R.id.numeroLlamada);
        editNumero = (ImageButton) findViewById(R.id.imageButton1);
        doCall = (ImageButton) findViewById(R.id.call);
        
        
        //Se construye un "listener" para ser asignado a los botones de la vista
        OnClickListener listenerAddNumber = new OnClickListener() {
			@Override
			public void onClick(View v) {
				//Se obtiene el botón que produjo el evento
				TextView txt = (TextView) v;
				//Se permite un máximo de 10 dígitos paraun número de teléfono
				if (numero.getText().toString().length() < 10) {
					//Se concatena el teléfono que aparece en en TextView con el
					//texto del número de dígito marcado
					numero.setText(numero.getText().toString()+txt.getText().toString());
				} else {
					//Se muestra mensaje cuando se quiere introducir teléfono de más
					//de 10 dígitos
	                Toast.makeText(
	                		MainActivity.this,
	                		"No puede introducir más dígitos",
	                		Toast.LENGTH_SHORT
	                		).show();
				}
			}
		};
		
		//Se asigna a cada uno de los botones el listener anterior creado
		((Button) findViewById(R.id.button1)).setOnClickListener(listenerAddNumber);
		((Button) findViewById(R.id.button2)).setOnClickListener(listenerAddNumber);
		((Button) findViewById(R.id.button3)).setOnClickListener(listenerAddNumber);
		((Button) findViewById(R.id.button4)).setOnClickListener(listenerAddNumber);
		((Button) findViewById(R.id.button5)).setOnClickListener(listenerAddNumber);
		((Button) findViewById(R.id.button6)).setOnClickListener(listenerAddNumber);
		((Button) findViewById(R.id.button7)).setOnClickListener(listenerAddNumber);
		((Button) findViewById(R.id.button8)).setOnClickListener(listenerAddNumber);
		((Button) findViewById(R.id.button9)).setOnClickListener(listenerAddNumber);
		((Button) findViewById(R.id.button0)).setOnClickListener(listenerAddNumber);

		//Se habilita funcionalidad de editar el número de teléfono marcado
		//Se activa para ello un listener sobre el elemento de borrado
		editNumero.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				//Se permite editar cuando el usuario al menos ha introducido un dígito
				if (numero.getText().length() > 0 ){
					//Se desprecia el último dígito del teléfono marcado
					numero.setText(numero.getText().subSequence(0, numero.getText().length() - 1)
					\+ "");
				}
			}
		});
		
		
		//Se habilita listener para lanzar la llamada
		//Se activa para ello un listener sobre el botón de realizar llamada
		doCall.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				//Se captura el teléfono introducido
				String llamarNumero = numero.getText().toString();
				//Si el usuario no introducido teléfono, se introduce número de emergencias
				if (llamarNumero.equals("")) {
					llamarNumero = "112";
				}
				//Se parsea el teléfono a URI
				Uri number = Uri.parse("tel:"+llamarNumero);
				
				//Se lanza intent de llamada
				Intent callIntent = new Intent(Intent.ACTION_VIEW, number);
				startActivity(callIntent);				
			}
		});		
		
    }
}
```

Aquí dejo el [código](https://db.tt/0NKYZ5tE "Código de Crear Custom Dial en Android") de la entrada. Y aquí enlace a dos vídeos de youtube en el que explico paso a paso como [crear custom dial](http://www.youtube.com/playlist?list=PLQPVd8xnMbz6pqg50U0zZ5eMF6ItK6fMl "Crear paso a paso custom dial")