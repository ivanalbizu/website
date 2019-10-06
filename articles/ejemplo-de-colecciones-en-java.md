---
title: Ejemplo de colecciones en Java
published: true
description: Uso de colecciones en Java. Se permite mostrar todas las colecciones, añadir, editar y eliminar. Ordenación de colecciones por alguno de sus atributos
tags: Java
ctime: Sun, 23 Mar 2014 19:16:26 +0000
---

En este artículo quiero poner un ejemplo del **uso de colecciones en Java**. El ejemplo es sencillo. Se trata de modelar una empresa en la que se guardan datos de sus trabajadores. Sus datos personales, el departamento en el que trabajan, su puesto de trabajo y su salario.

Las opciones habilitadas al programa son:

<ol class="list-bullets">
	<li>SALIR</li>
	<li>Cargar trabajadores</li>
	<li>Añadir nuevo trabajador</li>
	<li>Mostrar trabajadores</li>
	<li>Borrar trabajador</li>
	<li>Editar trabajador</li>
	<li>Ordenar trabajadores por nombre</li>
	<li>Ordenar trabajadores por apellidos</li>
	<li>Ordenar trabajadores por departamento</li>
</ol>

Explicaré las partes del código que son más relevantes, y al final del post pondré un enlace para descargar y así probarlo.

El proyecto contiene varios paquetes. <code>Gestion</code>, <code>persona</code>, <code>test</code>, <code>trabajador</code> y <code>utilidades</code>.

En <code>Gestion</code> se definen los principales métodos del programa.

En <code>Persona</code> se definen los atributos generales de cualquier persona.

En <code>Test</code> se ejecuta el programa.

En <code>Trabajador</code> se especifican los atributos propios de los trabajadores. 

En <code>Utilidades</code> se crean las clases para poder leer por teclado, se generan algunos mensajes estándar del programa y se crean clases para realizar ordenaciones de los trabajadores por diferentes criterios.

La clase <code>persona.java</code> está dentro del paquete persona y define los atributos <code>nombre</code>, <code>apellidos</code> y <code>dni</code>. Se define el método <code>toString</code> y <code>compareTo</code>, para esto último, clase persona debe implementar la interfaz <code>comparable&lt;Persona&gt;</code>. La ordenación definida con <code>compareTo</code> es ordenar primero por apellidos, si estos fueran iguales se ordena por nombre, y si aún así se repiten nombre y apellidos se ordena por dni.

```java
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

La clase <code>Trabajador.java</code> extiende de la clase <code>Persona.java</code> y está dentro del paquete persona. Se definen sus atributos departamento, puesto de trabajo y el salario.

La clase <code>Gestion.java</code> está dentro del paquete gestion. esta clase realiza las principales operaciones del programa. Para poder trabajar con esta clase se declara el atributo como <code>trabajadores</code> de tipo <code>List&lt;Trabajador&gt;</code> y su constructor de tipo <code>ArrayList&lt;Trabajador&gt;</code>.

Se declara el método <code>public List&lt;Trabajador&gt; findAll()</code> para devolver toda la colección.

El método <code>public void mostrarTodo()</code> como su nombre indica es usado para imprimir toda la colección de trabajadores mediante un <code>for each</code>.

Un método importante e interesante dentro de <code>Gestion.java</code> es <code>public Trabajador findByName(String busqueda)</code>, ya que será un método usado para editar y para borrar un usuario (usando su nombre para devolver un objeto).

El método <code>public Trabajador findByName(String busqueda)</code> recibe como parámetro un <code>String</code> que será la búsqueda que hará el usuario.

Mediante un <code>while</code> se recorre la colección de los trabajadores desde el principio (<code>int i = 0</code> y <code>i < trabajadores.size()</code>) hasta que se llegue al final, o hasta que se encuentre la primera ocurrencia elegida por el usuario. Para esto último se usa el condicional <code>if (trabajadores.get(i).getNombre().equalsIgnoreCase(busqueda))</code> en el que caso que se encuentre se devuelve <code>encontrado = true</code> para poder salir del condicional <code>while (i < trabajadores.size() && !encontrado)</code> donde se encontraba la ejecución del programa.

Luego, mediante condicional <code>if(encontrado){} else {}</code> se devueve el el objeto encontrado o <code>null</code> para no encontrado.

```java
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

Otro método interesante, y que usa el método anterior es <code>public void borrarTrabajador()</code>. Para poder borrar a un trabajador necesitamos saber que trabajador desea borrar el usuario, a partir de un nombre elegido por él, para ello ese usa: <code>Trabajador trab = null</code> y <code>trab = findByName(Leer.dato())</code> y con un condicional simple <code>if (trab != null)</code> sabemos si el objeto ha sido encontrado y se procede a eliminar mediante <code>trabajadores.remove(trab)</code>.

```java
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

El método <code>public void editName()</code> es muy parecido al anterior. La diferencia se trata en el método usado, en este caso se usa el método definido en la clase <code>Persona.java</code> <code>trab.setNombre(...)</code>, mientras que antes se uso un método propio del <code>API ArrayList</code>.

```java
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

El último método que voy a explicar de esta clase es <code>public List&lt;Trabajador&gt; orderByDepart()</code>, este método necesita que se pase el array que se va a ordenar, en este caso el array de trabajadores. Por ser <code>ArrayList</code> se puede usar la interfaz <code>Collections</code> y su método <code>sort</code>, al que se le pasan como parámetros el array y la clase <code>OrderBySurname()</code> definido con los criterios necesarios para realizar la operación.

```java
public List<Trabajador> orderBySurname(){
	Collections.sort(trabajadores, new OrderBySurname());
	return trabajadores;
}
```

Dentro del paquete de utilidades hay varias clases, una de ellas llamada <code>OrderBySurname.java</code>. La declario de la clase es <code>public class OrderBySurname implements Comparator&lt;Trabajador&gt;</code>, tiene un único método, y es usado para ordenar la colección por apellidos. El método <code>compare</code> recibe dos parámetros, dos objeto trabajadores, y devuelve un entero.

Más información en la <a href="http://docs.oracle.com/javase/7/docs/api/java/util/Comparator.html" target="_blank">API JAVA COMPARATOR</a>

```java
public class OrderBySurname implements Comparator<Trabajador>{
	@Override
	public int compare(Trabajador trab1, Trabajador trab2) {
		return trab1.getApellidos().compareToIgnoreCase(trab2.getApellidos());
	}
}
```

La clase principal que contiene la ejecución del programa se llama <code>Test.java</code> y está dentro del paquete test.

Dentro de esta clase se crea un objeto tipo <code>Gestion</code> que será con el que se gestiona el programa. Dicha clase contiene un bucle <code>do while</code> para que el usuario ejecute el programa con sus diferentes opciones. Dichas opciones son llamadas a petición del usuario con estructura <code>switch</code>. Las opciones que podrá hacer el usuario son las enumeradas al principio de este post. Por ejemplo, para el caso de cargar datos existentes se usa el caso 1. Sólo se puede cargar una vez, para no duplicar datos. Para ello, la variable booleana <code>flag</code> al comienzo del programa (antes del <code>do while</code>) está iniciada a <code>true</code>, una vez se cargan los datos su valor se cambia a <code>false</code>.

```java
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

El programa contiene más clases, pero algunas son obvias y otras son similares a las que he comentado. No son difíciles de entender.

Puedes descargar el código para probarlo en el siguiente enlace <a href="https://drive.google.com/open?id=0BzQS5pOyF_HjcGNfRUswVE53a00" target="_blank">descargar ejemplo programa colecciones API Java</a>