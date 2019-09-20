---
title: 'Ecuación de segundo grado en Java'
ctime: Mon, 07 Apr 2014 07:11:45
published: true
tags: Java,Pildoritas
---

En la clase **CEcuacion2Grado.java** se realizan las operaciones necesarias para resolver una ecuación de segundo y lanzar las excepciones principales. La clase contiene dos métodos que serán los que devuelvan los resultados: **public double calcularUnSigno(double a, double b, double c) {...}** y **public double calcularOtroSigno(double a, double b, double c) {...}**. El primer método devuelve un resultado tras realizar la operación a este fragmento de la ecuación: -b-... y el segundo método tras realizar: -b+... Ambos métodos reciben tres parámetros dobles introducidos por el usuario y ambas lanzan una excepción que es definida en este programa. También se crean dos métodos más para lanzar la excepción que pudieran surgir en el programa. El método **public double calcularDiscriminante(double a, double b, double c) {...}** sirve para saber si el discriminante (operación realizada dentro de la raíz cuadrada) es negativo, y el método **public double comprobarDivisible(double a) {...}** se usa para saber si en la resolución de la ecuación a introducido un valor igual a 0 como divisor.

```
package ejerc05;

public class CEcuacion2Grado {

	public double calcularDiscriminante(double a, double b, double c) throws ExcepcionNegativo {
		return Math.pow(b, 2)-4*a*c;
	}
	public double comprobarDivisible(double a) throws ExcepcionNegativo {
		return a;
	}
	public double calcularUnSigno(double a, double b, double c) throws ExcepcionNegativo{
		return (-b+Math.sqrt(calcularDiscriminante(a, b, c)))/(2*a);
	}
	public double calcularOtroSigno(double a, double b, double c) throws ExcepcionNegativo{
		return (-b-Math.sqrt(calcularDiscriminante(a, b, c)))/(2*a);
	}

}
```

La excepción llamada **ExcepcionNegativo.java** extiende de Exception y se construye sin parámetros y llamando a su clase padre (Exception) mediante super();, y con un parámetros para dar la posibilidad de añadir un mensaje al invocar la excepción.

```
package ejerc05;

public class ExcepcionNegativo extends Exception {

	private static final long serialVersionUID = 1L;

	public ExcepcionNegativo(){
		super();
	}
	public ExcepcionNegativo(String msg){
		super(msg);
	}
}
```

Para este programa se ha creado una clase **Menu.java** para realizar la lectura por teclado. En este caso se crean dos métodos, uno devuelve un "entero" y el otro un "doble" (siendo puntillosos, se podría haber casteado la salida de ambos métodos ya que en el código interior se realizan operaciones como: opcion=Integer.parseInt(sc.nextLine());). El entero se usa como opción elegida por elusuario, y el doble para que el usuario introduzca los datos con que operar. Ambos métodos capturan y tratan las excepciones.

```
package ejerc05;

import java.util.Scanner;

public class Menu {

	static Scanner sc = new Scanner(System.in);

	public static int opcion(){
		int opcion=0;
		boolean error=true;
		while(error){
			try {
				opcion=Integer.parseInt(sc.nextLine());
				error=false;			
			} catch (Exception e) {
				System.err.println("Error. Número no válido: "+ e.getMessage());
			}
		}
		return opcion;
	}

	public static double pedirNumero(){
		double opcion=0.;
		boolean error=true;
		while(error){
			try {
				opcion=Double.parseDouble(sc.nextLine());
				error=false;			
			} catch (Exception e) {
				System.err.println("Error. Número no válido: "+ e.getMessage());
			}
		}
		return opcion;
	}
}
```

La clase Test.java ejecuta el programa. En ella se declaran las variables necesarias. Se realizan las llamadas a las clases Menu.java para solocitar al usuario si desea repetir el programa y para solicitar los números necesarios para resolver la ecuación de 2º. Si los datos introducidos por el usuario no tiene solución posible (se capturan y tratan las excepciones) se le solicita que introduzca nuevamente los datos.

```
package ejerc05;

public class Test {

	public static void main(String[] args) {

		System.out.println("Bienvenido al programa de cálculo de ecuación de 2º GRADO"
				+ "El programa realiza el cálculo de una ecuación de segundo grado para el que el usuario deben"
				+ "introducir los datos necesarios.");

		int ejecutar = 0;
		boolean repetir=true, error=true;
		double a=0., b=0., c=0.;
		double resultado1=0., resultado2=0.;
		CEcuacion2Grado ecuacion = new CEcuacion2Grado();

		do{
			do{
				System.out.println("Introduzca valor para 'a'"); a=Menu.pedirNumero();
				System.out.println("Introduzca valor para 'b'"); b=Menu.pedirNumero();
				System.out.println("Introduzca valor para 'c'"); c=Menu.pedirNumero();
				try {
					if (ecuacion.calcularDiscriminante(a, b, c) <=0 || ecuacion.comprobarDivisible(a) == 0) {
						throw new ExcepcionNegativo("Operación no válida. La ecuación no tiene soluciones reales o no es cuadrática");
					}else{
						resultado1=ecuacion.calcularUnSigno(a, b, c);
						resultado2=ecuacion.calcularOtroSigno(a, b, c);		
						error=false;
					}
				} catch (ExcepcionNegativo en) {
					en.printStackTrace();
					System.out.println("Introduzca otros números");
				}

			}while(error);

		System.out.printf("Los resultados de la operación son: %.2f %.2f ", resultado1, resultado2);

		if (ejecutar!=1) repetir = false;	
		}while(repetir);

		System.out.println("-----  Gracias por usar la aplicación  -----");
	}

}
```

Puedes descargar el código para probarlo en el siguiente enlace: [Descargar el programa de colecciones de la API de Java](https://dl.dropboxusercontent.com/u/12043780/ivanalbizu.eu/ejerc05.zip "Descargar ejemplo programa Excepciones Ecuación de 2 grado") Nota final. Este ejercicio se ha desarrollado con fines didácticos, para adquirir destreza en el manejo de excepciones de Java, por lo que fuera de este uso -aprendizaje- no tiene mucho sentido.