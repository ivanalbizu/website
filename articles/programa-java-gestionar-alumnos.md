---
title: Programa Java gestionar alumnos
published: true
description: Programa Java para realizar operaciones CRUD. Crear, mostrar, actualizar y borrar elementos de lista de alumnos
tags: Java
ctime: Tue, 25 Feb 2014 21:07:50 +0000
---

El programa java sirve para gestionar el registro de alumnos de una clase. Las funciones habilitadas al programa son:

<ul class="list-bullets">
	<li>Registrar los alumnos de la clase</li>
	<li>Mostrar todos los alumnos</li>
	<li>Mostrar un alumno</li>
	<li>Modificar un alumno</li>
	<li>Borrar un alumno</li>
</ul>

El programa tiene tres archivos:

<ul class="list-bullets">
	<li><code>Test.java</code></li>
	<li><code>Alumno.java</code></li>
	<li><code>Gestion.java</code></li>
</ul>

<code>Test.java</code> es el principal archivo del programa, el que carga la aplicación

```java
package coleccionesEjerc07;
import java.util.*;

import leer.*;
public class Test {

	public static void main(String[] args) {

		System.out.println("Bienvenido al programa ADMINISTRADOR DE ALUMNOS n"
				+ "El programa permite: n"
				+ "tA.- Registrar los alumnos de la clase n"
				+ "tB.- Mostrar todos los alumnos n"
				+ "tC.- Mostrar un alumno n"
				+ "tD.- Modificar un alumno n"
				+ "tE.- Borrar un alumno n-------nn");

		boolean repetir = true;
		int cantidadAlumnosInicial=0, posicionAlumno=0;
		int aux = 1;

		Gestion gestion = new Gestion();
		System.out.println("¿Con cuántos alumnos desea iniciar el programa?");
		cantidadAlumnosInicial = Leer.datoInt();
		List<Alumno> listaAlumnos = new ArrayList<Alumno>(cantidadAlumnosInicial);

		for (int i = 0; i < cantidadAlumnosInicial; i++) {
			listaAlumnos.add(gestion.anadirAlumno());
		}

		do {
			gestion.mostrarMenu();
			switch (Leer.datoInt()) {
				case 1: //Añadir alumnos
					listaAlumnos.add(gestion.anadirAlumno());
					break;

				case 2: //Mostrar todos los alumnos
					for (Alumno alumno : listaAlumnos) {
						System.out.println(alumno.toString());
						System.out.println("------");
					}
					break;

				case 3: //Mostrar un alumno
					System.out.println("¿Qué alumno desea mostrar?");
					aux = 1;
					for (Alumno alumno : listaAlumnos) {
						System.out.println(aux+ ".- " +alumno.getNombre());
						aux++;
					}
					posicionAlumno = Leer.datoInt();
					System.out.println(gestion.obtenerAlumno(listaAlumnos, posicionAlumno));
					break;

				case 4: //Modificar alumnos
					System.out.println("¿Qué alumno desea modificar?");
					aux = 1;
					for (Alumno alumno : listaAlumnos) {
						System.out.println(aux+ ".- " + alumno.getNombre());
						aux++;
					}
					posicionAlumno = Leer.datoInt();
					gestion.modificarAlumno(listaAlumnos, posicionAlumno);
					break;

				case 5: //Eliminar alumnos
					System.out.println("¿Qué alumno desea eliminar?");
					aux = 1;
					for (Alumno alumno : listaAlumnos) {
						System.out.println(aux+ ".- " + alumno.getNombre());
						aux++;
					}
					posicionAlumno = Leer.datoInt();
					gestion.eliminarAlumno(listaAlumnos, posicionAlumno);
					break;

				default: //Salir
					repetir = false;
					break;
			}

		} while (repetir);

		System.out.println("---- Gracias por usar la aplicación ----");
	}

}
```

<code>Alumno.java</code> configura las características básicas de un alumno.

```java
package coleccionesEjerc07;

public class Alumno {

	//Attributes
	private String nombre;
	private String apellidos;
	private int edad;

	//Constructors
	public Alumno() { }
	public Alumno(String nombre, String apellidos, int edad) {
		this.nombre		= nombre;
		this.apellidos	= apellidos;
		this.edad		= edad;
	}

	//Methods
	@Override
	public String toString() {
		return	"Nombre: t"	+this.nombre+		"n"+
				"Apellidos: t"	+this.apellidos+	"n"+
				"Edad: tt"	+this.edad+			"n";
	}

	//Gets and Sets
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellidos() {
		return apellidos;
	}
	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}
	public int getEdad() {
		return edad;
	}
	public void setEdad(int edad) {
		this.edad = edad;
	}

}
```

<code>Gestion.java</code> realiza las operaciones propias del programa.

```java
package coleccionesEjerc07;
import java.util.List;

import leer.*;
public class Gestion {

	/**
	 * Muestra el menú principal de las opciones de la aplicación
	 */
	public void mostrarMenu(){
		System.out.println("n------nElija la opción que desea: n"
				+ "1.- Añadir alumnos n"
				+ "2.- Mostrar todos los alumnos n"
				+ "3.- Mostrar un alumno n"
				+ "4.- Modificar un alumno n"
				+ "5.- Borrar un alumno n"
				+ "OTRO NÚMERO --> Salir");
	}

	/**
	 * Muestra menú secundario perteneciente a la utilidad de edición de registros (Alumnos)
	 * @return	Devuelve entero válido con la opción seleccionada
	 */
	public int menuEditar(){
		int eleccion = 0;
		do {
			System.out.println("n------nElija que desea editar: n"
					+ "t1.- Nombre n"
					+ "t2.- Apellidos n"
					+ "t3.- Edad n");

			eleccion = Leer.datoInt();

		} while (eleccion < 0 || eleccion > 3);
		return eleccion;
	}

	/**
	 * Añadir nuevos registros (Alumnos)
	 * @return	Devuelve un nuevo objeto alumno
	 */
	public Alumno anadirAlumno(){
		System.out.println("Introduzca nombre");	String nom	= 	Leer.dato();
		System.out.println("Introduzca apellidos");	String ape	=	Leer.dato();
		System.out.println("Introduzca edad");		int edad	=	Leer.datoInt();

		Alumno alum = new Alumno(nom, ape, edad);

		return alum;
	}

	/**
	 * Comprueba que el usuario ha introducido un objeto (Alumno) válido y existente en la colección de Alumnos
	 * @param listaAlumnos		Colección (array) de los alumnos existentes
	 * @param posicionAlumno	Posición de un objeto Alumno, introducida por el usuario, dentro la colección
	 * @return					Booleano que indica si existe dicho objeto
	 */
	public boolean noVacio(List<Alumno> listaAlumnos, int posicionAlumno){
		boolean existeElemento = false;
		if (listaAlumnos.size() < posicionAlumno)	existeElemento = true;

		return existeElemento;
	}

	/**
	 * Obtiene un alumno indicado por la posición que ocupa en la colección
	 * @param listaAlumnos		Colección (array) de los alumnos existentes
	 * @param posicionAlumno	Posición de un objeto Alumno, introducida por el usuario, dentro la colección
	 * @return					Devuelve un nuevo objeto alumno indicado por el usuario por su posición
	 */
	public Alumno obtenerAlumno(List<Alumno> listaAlumnos, int posicionAlumno){
		//Llamada al método booleano "noVacio". Si no es válida la posición, no se continua
		while (this.noVacio(listaAlumnos, posicionAlumno)) {
			System.out.println("La posición elegida no existe. nPor favor, introduzca otra");
			//Se solicita nueva posición
			posicionAlumno = Leer.datoInt();
		}
		//Devuelve el objeto alumno
		return listaAlumnos.get(posicionAlumno-1);
	}

	/**
	 * Elimina un objeto alumno de la colección
	 * @param listaAlumnos		Colección (array) de los alumnos existentes
	 * @param posicionAlumno	Posición de un objeto Alumno, introducida por el usuario, dentro la colección
	 */
	public void eliminarAlumno(List<Alumno> listaAlumnos, int posicionAlumno){
		//Llamada al método "obtenerAlumno" (recuerdo, este método ya se encarga de obtener una posición válida)
		//Se elimina el alumno con el método "remove" de ArrayList
		listaAlumnos.remove(this.obtenerAlumno(listaAlumnos, posicionAlumno));

		System.out.println("Registro eliminado correctamente");
	}

	/**
	 * Permite editar nombre, apellidos y edad. Individualmente
	 * @param listaAlumnos		Colección (array) de los alumnos existentes
	 * @param posicionAlumno	Posición de un objeto Alumno, introducida por el usuario, dentro la colección
	 */
	public void modificarAlumno(List<Alumno> listaAlumnos, int posicionAlumno){
		//Llamada al método "obtenerAlumno" (recuerdo, este método ya se encarga de obtener una posición válida)
		this.obtenerAlumno(listaAlumnos, posicionAlumno);

		//Se presenta el menú de edición. Posibilita: Editar nombre, apellidos y edad.
		//Se modifica con los "set" creados en la clase "Alumno"
		switch (this.menuEditar()) {
			case 1://Se modifica el nombre
				System.out.println("Introduzca el nuevo nombre");
				this.obtenerAlumno(listaAlumnos, posicionAlumno).setNombre(Leer.dato());
				break;
			case 2://Se modifican los apellidos
				System.out.println("Introduzca los nuevos apellidos");
				this.obtenerAlumno(listaAlumnos, posicionAlumno).setApellidos(Leer.dato());
				break;
			case 3://Se modifica la edad
				System.out.println("Introduzca la nueva edad");
				this.obtenerAlumno(listaAlumnos, posicionAlumno).setEdad(Leer.datoInt());
				break;
			default://No es necesaria esta opción
				break;
		} System.out.println("Modificación realizada correctamente");
	}
}
```

Los atributos de <code>Alumno.java</code> son su nombre, sus apellidos y su edad. Contiene los <code>gets</code> y <code>sets</code> y el método <code>toString</code>, y sus constructores.

En <code>Test.java</code> se crea el objeto gestión y la colección para guardar los registros de alumnos. Contiene el menú propiamente dicho, con el que actuará el usuario en la aplicación. Para ello se crea un <code>switch</code> con cada una de las opciones posibles. La opción <code>default</code> del switch será la que hará salir del programa.

La clase más interesante de todas es la llamada <code>Gestion.java</code>, en esta se escriben los métodos que paso a comentar brévemente. (Los propios archivos ya viene comentados con javadoc, así que algunas cosas las obviaré en esta explicación).

<ul class="list-bullets">
	<li>El primer método, <code>void mostrarMenu</code> carga el menú general de la aplicación.</li>
	<li>El método <code>int menuEditar()</code> es llamado en el método <code>void modificarAlumno(...)</code>, éste último recibirá un número entero, que representa la opción elegida por el usuario.</li>
	<li>El método añadir <code>Alumno anadirAlumno()</code> devuelve un objeto <code>Alumno</code>. Éste método es llamado desde dos sitios. Una vez en el archivo <code>Test.java</code> para iniciar el programa, y se ejecutará tantas veces como el usuario marque en la opción de insertar X objetos. La otra llamada se realiza dentro del mismo archivo, en la opción de añadir más alumnos, pero en esta ocasión se ejecuta una sóla vez, para repetir esta opción el usuario deberá selecciona nuevamente la opción de añadir nuevo alumno.</li>
	<li>El método booleano <code>boolean noVacio(...)</code> devuelve si un objeto existe o no dentro dela colección de alumnos. Este método será llamado desde el método <code>Alumno obtenerAlumno(...)</code></li>
	<li>El método <code>Alumno obtenerAlumno(...)</code> devolverá un alumno elegido por el usuario. Se apoya en el método <code>boolean noVacio(...)</code>, no devolviendo objeto hasta que no se indique una posición válida. El objeto devuelto por este método es usado en los métodos <code>void eliminarAlumno(...)</code> y <code>void modificarAlumno(...)</code></li>
	<li>El método <code>void eliminarAlumno(...)</code> captura el objeto devuelto por <code>Alumno obtenerAlumno(...)</code> y lo elimina con el método propio <code>remove(...)</code> de <code>ArrayList</code></li>
	<li>El último método, <code>void modificarAlumno(...)</code> recibe los métodos <code>Alumno obtenerAlumno(...)</code> para operar sobre él (modificarlo) y el método <code>int menuEditar()</code> para realizar la operación seleccionada por el usuario, en este caso son: editar nombre, apellidos y edad. Las modificaciones se llevan a cabo mediante los <code>set</code> adecuados dentro del archivo <code>Alumno.java</code>.</li>
</ul>

Puedes descargar el código para probarlo en el siguiente enlace <a href="https://drive.google.com/open?id=0BzQS5pOyF_HjSFFtWldxQlQ5OFE" target="_blank">descargar programa Java gestionar Alumnos</a>