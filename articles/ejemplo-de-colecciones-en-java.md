---
title: Ejemplo de colecciones en Java
published: true
description: Uso de colecciones en Java. Se permite mostrar todas las colecciones, añadir, editar y eliminar. Ordenación de colecciones por alguno de sus atributos
tags: Java
ctime: Sun, 23 Mar 2014 19:16:26 +0000
---

En este artículo quiero poner un ejemplo del **uso de colecciones en Java**. El ejemplo es sencillo. Se trata de modelar una empresa en la que se guardan datos de sus trabajadores. Sus datos personales, el departamento en el que trabajan, su puesto de trabajo y su salario. Las opciones habilitadas al programa son:

*   0.- SALIR
*   1.- Cargar trabajadores
*   2.- Añadir nuevo trabajador
*   3.- Mostrar trabajadores
*   4.- Borrar trabajador
*   5.- Editar trabajador
*   6.- Ordenar trabajadores por nombre
*   7.- Ordenar trabajadores por apellidos
*   8.- Ordenar trabajadores por departamento

Explicaré las partes del código que son más relevantes, y al final del post pondré  un enlace para descargar y así probarlo. El proyecto contiene varios paquetes. Gestión, persona, test, trabajador y utilidades. En Gestión se definen los principales métodos del programa. En Persona se definen los atributos generales de cualquier persona. En Test se ejecuta el programa.  En Trabajador se especifican los atributos propios de los trabajadores. En Utilidades se crean las clases para poder leer por teclado, se generan algunos mensajes estándar del programa y se crean clases para realizar ordenaciones de los trabajadores por diferentes criterios. La clase **persona.java** está dentro del paquete persona y define los atributos nombre, apellidos y dni. Se define el método "_toString_" y "_compareTo_", para esto último, clase persona debe implmentar la interfaz "_comparable<Persona>_".  La ordenación definida con "_compareTo_" es ordenar primero por apellidos, si estos fueran iguales se ordena por nombre, y si aún así se repiten nombre y apellidos se ordena por dni.

```
public int compareTo(Persona pers) {
//Ordered by default: 1º Surname, 2º Name, 3º Profession 

	if(this.apellidos.compareToIgnoreCase(pers.getApellidos()) == 0){            
		if(this.nombre.compareToIgnoreCase(pers.getNombre()) == 0){
			if (this.dni.compareToIgnoreCase(pers.getDni()) == 0){
				return this.dni.compareToIgnoreCase(pers.getDni());
			}
		} else {
			return this.nombre.compareToIgnoreCase(pers.getNombre());
		}
	}
	return this.apellidos.compareToIgnoreCase(pers.getApellidos());

}
```

La clase **Trabajador.java** extiende de la clase Persona.java y está dentro del paquete persona. Se definen sus atributos departamento, puesto de trabajo y el salario. La clase **Gestion.java** está dentro del paquete gestion. La clase Gestion.java realiza las principales operaciones del programa. Para poder trabajar con esta clase se declara el atributo como "trabajadores" de tipo _List<Trabajador>_ y su constructor de tipo _ArrayList<Trabajador>_. Se declara el método **public List<Trabajador> findAll()** para devolver toda la colección. El método **public void mostrarTodo()** como su nombre indica es usado para imprimir toda la colección de trabajadores mediante un _for each_. Un método importante e interesante dentro de Gestion.java es _public Trabajador findByName(String busqueda)_, ya que será un método usado para editar y para borrar un usuario (usando su nombre para devolver un objeto). El método **public Trabajador findByName(String busqueda)** recibe como parámetro un String que será la búsqueda que hará el usuario. Mediante un _while_ se recorre la colección de los trabajadores desde el principio (_int i = 0_ y _i < trabajadores.size()_) hasta que se llegue al final, o hasta que se encuentre la primera ocurrencia elegida por el usuario. Para esto último se usa el condicional _if (trabajadores.get(i).getNombre().equalsIgnoreCase(busqueda))_ en el que caso que se encuentre se devuelve _encontrado = true_ para poder salir del condicional _while (i < trabajadores.size() && **!encontrado**)_ donde se encontraba la ejecución del programa. Luego, mediante condicional _if(encontrado){} else {}_ se devueve el el objeto encontrado o _null_ para no encontrado.

```
public Trabajador findByName(String busqueda){
	int i = 0;
	boolean encontrado = false;

	while (i < trabajadores.size() && !encontrado){
	// Se recorre la coleción mientras existen (y no se encuentre coincidencia) elementos: i < trabajadores.size()
		if (trabajadores.get(i).getNombre().equalsIgnoreCase(busqueda))
		//Se ha encontrado elemento, se sale del bucle while
			encontrado = true;
		else
			//Se recorre el siguiente item
			i++;
		}
	if (encontrado)
		//Se devuelve el elemento encontrado
		return trabajadores.get(i);
	else
		return null;	
}
```

Otro método interesante, y que usa el método anterior es **public void borrarTrabajador()**. Para poder borrar a un trabajador necesitamos saber que trabajador desea borrar el usuario, a partir de un nombre elegido por él, para ello ese usa:_ Trabajador trab = null_ y _trab = findByName(Leer.dato())_ y con un condicional simple _if (trab != null)_ sabemos si el objeto ha sido encontrado y se procede a eliminar mediante _trabajadores.remove(trab)_.

```
public void borrarTrabajador(){
	Trabajador trab = null;
	System.out.println("Nombre de la persona que desea borrar");
	//Se llama a método "findByName"
	trab = findByName(Leer.dato());
	if (trab != null){
		//Se si ha encontrado coincidencia, se elimina de la colección el objeto trabajador
		trabajadores.remove(trab);
		Mensaje.exito();
	} else {
		Mensaje.error();
	}
}
```

El método  **public void editName()** es muy parecido al anterior. La diferencia se trata en el método usado, en este caso se usa el método definido en la clase Persona.java **trab.setNombre(...)**, mientras que antes se uso un método propio del API ArrayList.

```
public void editName(){
	Trabajador trab = null;
	System.out.println("Nombre de la persona que desea editar");
	//Se llama a método "findByName"
	trab = findByName(Leer.dato());
	if (trab != null) {
		//Si se ha encontrado coincidencia, se edita el nombre de la colección el objeto trabajador
		System.out.println("Introduzca nuevo nombre");
		//Se establece nuevo nombre
		trab.setNombre(Leer.dato());
		Mensaje.exito();
	} else {
		Mensaje.error();
	}
}
```

El último método que voy a explicar de esta clase es **public List<Trabajador> orderByDepart()**, este método necesita que se pase el array que se va a ordenar, en este caso el array de trabajadores. Por ser ArrayList se puede usar la interfaz **Collections** y su método **sort**, al que se le pasan como parámetros el array y la clase **OrderBySurname()** definido con los criterios necesarios para realizar la operación.

```
public List<Trabajador> orderBySurname(){
	Collections.sort(trabajadores, new OrderBySurname());
	return trabajadores;
}
```

Dentro del paquete de utilidades hay varias clases, una de ellas llamada **OrderBySurname.java**. La declario de la clase es **public class OrderBySurname implements Comparator<Trabajador>**, tiene un único método, y es usado para ordenar la colección por apellidos. El método "compare" recibe dos parámetros, dos objeto trabajadores, y devuelve un entero. Más información en la [API de Java](http://docs.oracle.com/javase/7/docs/api/java/util/Comparator.html "API JAVA COMPARATOR")

```
public class OrderBySurname implements Comparator<Trabajador>{
	@Override
	public int compare(Trabajador trab1, Trabajador trab2) {
		return trab1.getApellidos().compareToIgnoreCase(trab2.getApellidos());
	}
}
```

La clase principal que contiene la ejecución del programa se llama **Test.java** y está dentro del paquete test. Dentro de esta clase se crea un objeto tipo Gestion que será con el que se gestiona el programa. Dicha clase contiene un bucle _do while_ para que el usuario ejecute el programa con sus diferentes opciones. Dichas opciones son llamadas a petición del usuario con estructura _switch_. Las opciones que podrá hacer el usuario son las enumeradas al principio de este post. Por ejemplo, para el caso de cargar datos existentes se usa el caso 1. Sólo se puede cargar una vez, para no duplicar datos. Para ello, la variable booleana _flag_ al comienzo del programa (antes del _do while_) está iniciada a _true_, una vez se cargan los datos su valor se cambia a _false_.

```
case 1://add existent workers
	//Carga sólo una vez los trabajadores predefinidos
	if(flag){
		gestion.cargarTrabajadores();
		flag = false;
	} else {
		Mensaje.mostrar("Ya se han cargado los contactos");
	}
	break;
```

El programa contiene más clases, pero algunas son obvias y otras son similares a las que he comentado. No son difíciles de entender. Puedes descargar el código para probarlo en el siguiente enlace: [Descargar el programa de colecciones de la API de Java](https://drive.google.com/open?id=0BzQS5pOyF_HjcGNfRUswVE53a00 "Descargar ejemplo programa colecciones API Java") Nota final. Este ejercicio se ha desarrollado con fines didácticos, para adquirir destreza en el manejo de la API de Java, colecciones y métodos, por lo que fuera de este uso -aprendizaje- no tiene mucho sentido.