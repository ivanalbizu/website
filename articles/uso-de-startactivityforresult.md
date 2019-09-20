---
title: 'Uso de startActivityForResult'
ctime: Thu, 23 Oct 2014 16:21:47
published: true
tags: Android,Java
---

En esta entrada voy a crear, mediante un ejemplo, un interfaz Android en la que se use startActivityForResult(). El método **startActivityForResult()** se emplea para lanzar una actividad y que ésta nos devuelva una información que será usada en la actividad "origen".

1.  Para ello, en la actividad "origen" crearemos:
    1.  Un método que lanzará un Intent al pulsar sobre un botón.
    2.  Otro método que será el que espere el resultado del Intent.
2.  En la actividad "destino" crearemos:
    1.  Dos métodos, cada uno vinculado a su botón correspondiente, para devolver el Intent mediante setResult()

El código de la clase "origen" es el siguiente:

```
package eu.ivanalbizu.condicionesregistro;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {

	//Se declaran las variables
	private final static int NOMBRE = 0;//Variable usada para almacenar el "testigo"
	private TextView nombre;
	
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    
    //Se referencia la variable mediante la ID del XML
    nombre = (TextView) findViewById(R.id.tNombre);
  }
    
  public void rellenarNombre(View v){
    //Si no ha completado nombre se advierte mediante Toast
    if (nombre.getText().toString().equals("")) {
      Toast.makeText(this, "Debe indicar su nombre", Toast.LENGTH_SHORT).show();
      System.out.println("campo vacio");
    //Si ha introducido nombre se lanza Intent con testigo y pasando información extra
    } else {
      Intent intent = new Intent(MainActivity.this, CondicionActivity.class);
        intent.putExtra("nombre", nombre.getText().toString());
        startActivityForResult(intent, NOMBRE);	
    }
  }
    
  //Se recibe la información de CondicionActivity.java
  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    //Se no ha habido fallo:
    if (requestCode == NOMBRE){
      //Se procesa la devolución
      switch (resultCode) {
      case RESULT_OK:
        Toast.makeText(this, "Aceptó las condiciones", Toast.LENGTH_SHORT).show();
        break;
      case RESULT_CANCELED:
        Toast.makeText(this, "Rechazó las condiciones", Toast.LENGTH_SHORT).show();
        break;
      }
    }
  }
    
}
```

Y el código de la clase "destino" es:

```
package eu.ivanalbizu.condicionesregistro;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class CondicionActivity extends Activity {

  //Se declaran las variables
  private Button btnAceptar;
  private Button btnRechazar;
  private TextView catchExtra;
  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_condicion);
    
    //Se referencian las variables mediante la ID del XML
    btnAceptar = (Button) findViewById(R.id.buttonAceptar);
    btnRechazar = (Button) findViewById(R.id.buttonRechazar);
    catchExtra = (TextView) findViewById(R.id.tPersona);

    //Del intent recibido se obtiene el contenido mediante: getStringExtra("nombre")
    String datoUsuario = getIntent().getStringExtra("nombre");
    catchExtra.setText("Hola "+datoUsuario);
    
    //Si se pulsa el botón aceptar se establece resultado OK
    //Se manda a MainActivity.java al método onActivityResult(...)
    btnAceptar.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        Intent returnIntent = new Intent();
        setResult(RESULT_OK,returnIntent);
        finish();
      }
    });
    
    //Si se pulsa el botón cancelar se establece resultado CANCELED
    //Se manda a MainActivity.java al método onActivityResult(...)
    btnRechazar.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        Intent returnIntent = new Intent();
        setResult(RESULT_CANCELED,returnIntent);
        finish();
      }
    });
    
  }
}
```

El código XML para las vistas no está incluido en la entrada, es muy simple, y se puede descargar el [ejemplo completo desde aquí](https://db.tt/z9PuhFkh "Ejemplo startActivityForResult")