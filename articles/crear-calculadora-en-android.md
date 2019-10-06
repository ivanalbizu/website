---
title: Crear calculadora en Android
description: Aplicación Android en la que se construye una calculadora de suma, resta, multiplicación y resta
published: true
tags: Android,Java
ctime: Sun, 26 Oct 2014 15:33:41 +0000
---

En el <code>MainActivity.java</code> se define en su comienzo las variables necesarias. Para poder trabajar mejor con las operaciones lo he dividido en <code>operando1</code>, <code>operando2</code>, <code>operacion</code>, <code>resultado</code> y botón <code>borrar</code>. El botón de <code>limpiar</code> no lo he declarado en el <code>MainActivity.java</code>, sólo he creado un método que será usado en el XML. Sus referencias de la vista XML son rescatadas con el método <code>findViewById(R.id.nombreCorrespondiente)</code>.

```java
private TextView operando1, operando2, operacion, resultado;
private Button borrar;
private final static int TESTIGO = 1234;

@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);

	operando1 = (TextView) findViewById(R.id.operando1);
	operando2 = (TextView) findViewById(R.id.operando2);
	operacion = (TextView) findViewById(R.id.operacion);
	resultado = (TextView) findViewById(R.id.resultado);
	borrar = (Button) findViewById(R.id.buttonBorrar);

	/*Código de onCreate(Bundle savedInstanceState) continua*/
};
```

Se crean "listener" dentro de <code>onCreate(Bundle savedInstanceState)</code> para botones numéricos y para seleccionar el tipo de operación:

```java
//Listener para botones numéricos
OnClickListener marcar = new View.OnClickListener() {
	@Override
	public void onClick(View v) {
		TextView txt = (TextView) v;
		//Si no se ha introducido operación a realizar (+ - x %)
		//Se introduce los valores a operando 1
		if (operacion.getText().toString().equals("")) {
			String existente1 = operando1.getText().toString();
			operando1.setText(existente1+txt.getText().toString());
		//Sólo se introduce dígitos a operando 2 cuando
		//Ya existe tipo de operación, 
		//y no se tenga ningún resultado anteriormente
		} else if (resultado.getText().toString().equals("")) {
			String existente2 = operando2.getText().toString();
			operando2.setText(existente2+txt.getText().toString());
		}
	}
};

//Listener para seleccionar tipo de operación a realizar (+ - x %)
OnClickListener accion = new View.OnClickListener() {
	@Override
	public void onClick(View v) {
		TextView txt = (TextView) v;
		//Dos condiciones para validar la operación
		//1. Que se tenga un resultado de operación anterior.
		//   En este caso, se asigna a operando1 y se valida la operación
		if (!resultado.getText().toString().equals("")){
			//Variable resultado contenía "dígitos extraños": (_=_)
			operando1.setText(resultado.getText().toString().substring(3));
			operacion.setText(txt.getText().toString());
			operando2.setText("");
			resultado.setText("");
		//2. Exista operando 1
		} else if (!operando1.getText().toString().equals("") 
				&& operacion.getText().toString().equals("")) {
			operacion.setText(txt.getText().toString());
		}
	}
};
```

Para poder <code>borrar</code> el último dígito el "listener" se lo he asignado directamente al botón y he seguido los siguientes pasos:

<ol class="list-bullets">
	<li>Si existe operando2, borro su último dígito (hasta dejar vacío)</li>
	<li>Si existe operación, la borro</li>
	<li>Si existe operando1, borro su último dígito (hasta dejar vacío)</li>
</ol>

Su código es:

```java
//Borrado el último dígito marcado
borrar.setOnClickListener(new View.OnClickListener() {
	@Override
	public void onClick(View v) {
		//Se permite editar cuando el usuario al menos ha introducido un dígito
		//El orden es de atrás hacía adelante: resultado, operando1, operación, operando1
		if (!resultado.getText().toString().equals("")){
			//Si ya se realizó operación se resetean todos los valores
			//Numéricos y de operaciones
			limpiar(v);
		//Se borra de atrás para adelante
		} else if (!operando2.getText().toString().equals("")) {
			operando2.setText(operando2.getText().subSequence(0, operando2.getText().length() - 1)+"");
		} else if (!operacion.getText().toString().equals("")){
			operacion.setText(operacion.getText().subSequence(0, operacion.getText().length() - 1)+"");
		} else if (!operando1.getText().toString().equals("")){
			operando1.setText(operando1.getText().subSequence(0, operando1.getText().length() - 1)+"");
		}
	}
});
```

La acción de obtener resultado (pulsar sobre "=") se llama <code>public void lanzarOperacion(View v)</code> y crea directamente al pulsar sobre de igual. El evento se adjudica directamente en el XML. Dicho evento lanzará <code>Intent</code> y recibirá el resultado procesado (hacer uso de <code>Intent</code> no es necesario, lo realizo así para abarcar más métodos). El evento no será lanzado si el operando2 esta vacío. Se usa sentencias <code>if</code>, <code>else if</code> para saber a que <code>Intent</code> se debe lanzar.

```java
public void lanzarOperacion(View v) {
	//Si operando 2 no contiene valor numérico, no se lanza el evento
	if (operando2.getText().toString().equals("")) {
		return;
	}

	Intent intent = null;
	
	//Según el tipo de operación seleccionado (+ - x %)
	//se lanza la actividad correspondiente
	if (operacion.getText().toString().equals("+"))
		intent = new Intent(MainActivity.this, SumaActivity.class);
	else if (operacion.getText().toString().equals("-"))
		intent = new Intent(MainActivity.this, RestaActivity.class);
	else if (operacion.getText().toString().equals("x"))
		intent = new Intent(MainActivity.this, MultiplicacionActivity.class);
	else if (operacion.getText().toString().equals("%"))
		intent = new Intent(MainActivity.this, DivisionActivity.class);
	
	//Se lanza la información extra de los operandos
	intent.putExtra("operando1", operando1.getText().toString());
	intent.putExtra("operando2", operando2.getText().toString());
	startActivityForResult(intent, TESTIGO);
}
```

Y el resultado recibido por la "actividad" se procesa en <code>protected void onActivityResult(int requestCode, int resultCode, Intent data)</code> y su código es el siguiente:

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	//Si lo recibido corresponde con lo esperado (TESTIGO)
	if (requestCode == TESTIGO) {
		switch (resultCode) {
		case RESULT_OK:
			String res = data.getStringExtra("resultado");
			resultado.setText(" = "+res);
			break;
		case RESULT_CANCELED:
			Toast.makeText(this, "Formato de número no válido", Toast.LENGTH_SHORT).show();
			break;
		}
	}
}
```

Para poder introducir decimales he creado el método <code>public void introducirDecimales(View v)</code>. Si el usuario acaba de obtener un resultado no procede insertar decimales, por lo que se sale del evento. La primera situación prevista es que se introdujera operación a realizar, lo que equivale a decir que se desea insertar decimal al segundo operando. Caso contrario, se trataría del primer operando. En ambos casos se comprueba que el número no tenga ya decimales <code>(operando1.getText().toString().split(".").length == 1)</code>, si ya tuviese decimales no hay nada más que hacer, pero si no tiene se concatena el punto al operando de que se trate.

El código es el siguiente:

```java
public void introducirDecimales(View v){
	TextView txt = (TextView) v;
	//Si ya existe un "resultado" no procede insertar decimal
	if (!resultado.getText().toString().equals("")) {
		return;
	}
	//Si no existe operación,
	//el punto decimal se trataría de introducir sobre primer operando
	if (operacion.getText().toString().equals("")){
		String[] partido = operando1.getText().toString().split(".");
		//No se ha generado dos elementos, quiere decir que no tiene decimal
		if (partido.length == 1) {
			String existente = operando1.getText().toString();
			operando1.setText(existente+txt.getText().toString());
		}
	} else {
		//Si existe operación,
		//el punto decimal se trataría de introducir sobre segundo operando
		String[] partido = operando2.getText().toString().split(".");
		//No se ha generado dos elementos, quiere decir que no tiene decimal
		if (partido.length == 1) {
			String existente = operando2.getText().toString();
			operando2.setText(existente+txt.getText().toString());
		}
	}
}
```

Termino el post comentado una de las clases que sirven para recibir el <code>startActivityForResult()</code>. En este caso, sólo comentar el caso de la suma, ya que su código sólo difiere de la multiplicación, resta o división en una operación.

En <code>public class SumaActivity extends Activity {...}</code> se capturan los dos operando del <code>MainActivity.java</code> mediante <code>getIntent().getStringExtra("operando1")</code>. Y se parsea a Double. Puede dar excepción si se introduce de manera incorrecta el punto decimal, por lo que se trata la excepción y mediante el bloque <code>cacth</code> y se envía el <code>Intent</code>, si no se da excepción se pasa el parámetro extra del resultado de la operación que está esperando la clase <code>MainActivity.java</code>.

Su código es el siguiente:

```java
public class SumaActivity extends Activity{
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		//Se obtienen los valores del Intent "Origen"
		String operando1 = getIntent().getStringExtra("operando1");
		String operando2 = getIntent().getStringExtra("operando2");
		
		//Se declara el Intent de regreso
		Intent returnIntent = new Intent();
		
		try {	
			Float op1 = Float.parseFloat(operando1);
			Float op2 = Float.parseFloat(operando2);
			Float res = op1+op2;
			
			//Si se ha llegado hasta aquí el formato de número es correcto
			String resultado = res.toString();

			returnIntent.putExtra("resultado", resultado);
			setResult(RESULT_OK,returnIntent);
			finish();
			
		} catch(NumberFormatException e) {
			//Si se entra aquí es que formato de número es incorrecto
			//Se envía resultado cancelado
			setResult(RESULT_CANCELED, returnIntent);
			finish();
		}
	}
}
```

**Nota Importante**: cuando se crean nuevas actividades sin usar el asistente de Eclipse, es decir, crear una clase que extienda <code>Activity</code> sin su vista layout (por que no se necesite, como este caso) hay que acordarse de registrar la actividad en el <code>AndroidManifiest.xml</code>. Si se genera la actividad y al mismo tiempo su vista Layout con el asistente de Eclipse no es necesario registrar la actividad ya que Eclipse se encarga de registrarla.

Proyecto en <a href="https://github.com/ivanalbizu/android/tree/master/Calculadora" target="_blank">mi GitHub</a>