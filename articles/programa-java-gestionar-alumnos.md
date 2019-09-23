---
title: Programa Java gestionar alumnos
published: true
description: Programa Java para realizar operaciones CRUD. Crear, mostrar, actualizar y borrar elementos de lista de alumnos
tags: Java
ctime: Tue, 25 Feb 2014 21:07:50 +0000
---

El programa java sirve para gestionar el registro de alumnos de una clase. Las funciones habilitadas al programa son:

*   Registrar los alumnos de la clase
*   Mostrar todos los alumnos
*   Mostrar un alumno
*   Modificar un alumno
*   Borrar un alumno

El programa tiene tres archivos:

*   Test.java
*   Alumno.java
*   Gestion.java

**Test.java** es el principal archivo del programa, el que carga la aplicación

```
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

**Alumno.java** configura las características básicas de un alumno.

```
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

**Gestion.java** realiza las operaciones propias del programa.

```
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

Los atributos de _Alumno.java_ son su nombre, sus apellidos y su edad. Contiene los "_gets_" y sets y el método "_toString_", y sus constructores. En _Test.java_ se crea el objeto gestión y la colección (array) para guardar los registros de alumnos. Contiene el menú propiamente dicho, con el que actuará el usuario en la aplicación. Para ello se crea un "_switch_" con cada una de las opciones posibles. La opción "_default_" del switch será la que hará salir del programa. La clase más interesante de todas es la llamada _Gestion.java_, en esta se escriben los métodos que paso a comentar brévemente. (Los propios archivos ya viene comentados con javadoc, así que algunas cosas las obviaré en esta explicación). El primer método, _void mostrarMenu_ carga el menú general de la aplicación. El método _int menuEditar()_ es llamado en el método _void modificarAlumno(...)_, éste último recibirá un número entero, que representa la opción elegida por el usuario. El método añadir _Alumno anadirAlumno()_ devuelve un objeto "_Alumno_". Éste método es llamado desde dos sitios. Una vez en el archivo Test.java para iniciar el programa, y se ejecutará tantas veces como el usuario marque en la opción de insertar X objetos. La otra llamada se realiza dentro del mismo archivo, en la opción de añadir más alumnos, pero en esta ocasión se ejecuta una sóla vez, para repetir esta opción el usuario deberá selecciona nuevamente la opción de añadir nuevo alumno. El método booleano _boolean noVacio(...)_ devuelve si un objeto existe o no dentro dela colección de alumnos. Este método será llamado desde el método _Alumno obtenerAlumno(...)_. El método _Alumno obtenerAlumno(...)_ devolverá un alumno elegido por el usuario. Se apoya en el método _boolean noVacio(...)_, no devolviendo objeto hasta que no se indique una posición válida. El objeto devuelto por este método es usado en los métodos _void eliminarAlumno(...)_ y _void modificarAlumno(...)_. El método _void eliminarAlumno(...)_ captura el objeto devuelto por _Alumno obtenerAlumno(...)_ y lo elimina con el método propio _remove(...)_ de ArrayList El último método, _void modificarAlumno(...)_ recibe los métodos _Alumno obtenerAlumno(...)_ para operar sobre él (modificarlo) y el método _int menuEditar()_ para realizar la operación seleccionada por el usuario, en este caso son: editar nombre, apellidos y edad. Las modificaciones se llevan a cabo mediante los "_set_" adecuados dentro del archivo Alumno.java. Puedes descargar el código para probarlo en el siguiente enlace: [Descargar programa Java - Gestion de alumnos.](https://drive.google.com/open?id=0BzQS5pOyF_HjSFFtWldxQlQ5OFE "Descargar programa Java gestionar Alumnos") Nota final. Este ejercicio se ha desarrollado con fines didácticos,  para adquirir destreza en el manejo de colecciones y métodos, por lo que fuera de este uso -aprendizaje- no tiene mucho sentido.