---
title: Programa java venta de móviles
published: true
description: Programa java que simula la gestión de ventas de teléfonos, permitiendo mostrar atributos como marca, precio y pago
tags: Java
ctime: Sun, 02 Mar 2014 22:24:10 +0000
---

Programa java venta de móviles desarrollado en el curso formativo de aplicaciones para móviles. El programa consta de tres clases: <code>Principal.java</code>, <code>Movil.java</code> y <code>GestionMovil.java</code>. La clase <code>Principal.java</code> gestiona el conjunto de la aplicación java. Dicha clase tiene como atributos <code>precio</code>, <code>caja</code>, <code>marca</code>, <code>repetir</code> programa y la <code>opcion</code> seleccionada por el usuario.

```java
package ejerc3;

import leer.*;

/**
 * Principal presenta la aplicación al usuario donde se gestionan todas sus instrucciones y peticiones
 * 
 * @author ivan <a href="http://ivanalbizu.eu" target="_blank">Iván González</a>
 *
 */
public class Principal {

	public static void main(String[] args) {

		//Atributos
        double precio = 0.0, caja = 0.0; 
        String marca = null; 
        int opcion = 0; 
        boolean repetir = true; 

        System.out.println("Bienvenido a Venca");
        System.out.println("El programa gestiona las venta de móviles por catálogo.n"
        		+ "Se puede consultar catálogo, vender móviles, ver precios, cajas, beneficios de un móviln-----");

        System.out.println("¿Con cuántos móviles quiere salir a la calle?");

        //Se crea el array "catalogo" de tipo "Movil". Con la dimensión introducida por el usuario
        Movil catalogo[] = new Movil[Leer.datoInt()];
        //Se crea el objeto "gestion" de tipo "GestionMovil"
        GestionMovil gestion = new GestionMovil();

        System.out.println("Elija los moviles que pondrá a la venta hoy");

        //Se rellena el array con los móviles (marca y precio)
        for (int i = 0; i < catalogo.length; i++) { 
            System.out.println("Introduzca la marca del móvil " + (i + 1));
            marca = Leer.dato();
            System.out.println("Introduzca el precio del móvil " + (i + 1));
            precio = Leer.datoFloat();
            Movil movil = new Movil(precio, marca);
            catalogo[i] = movil;
        } 

        //Se repiteel programa al menos una vez
        do { //Menú para gestionar el programa
            System.out.println("Menú:n"
            		+ "1. Ver Catálogon"
            		+ "2. Ver precio de un móviln"
            		+ "3. Vender un móviln"
            		+ "4. Ver cajan"
            		+ "5. Ver beneficios de un móviln"
            		+ "6. Ver beneficios del dían"
            		+ "Otro número. Salir"); 

            opcion = Leer.datoInt(); 
            switch (opcion) {
	            case 1: //Se muestra el catálogo
	                gestion.mostrarMoviles(catalogo); 
	                break;
	            case 2: //Se consulta el precio de un móvil
	                System.out.println("Introduce el número de movil del catálogo"); 
	                gestion.verPrecio(catalogo, Leer.datoInt()); 
	                break;
	            case 3: //Se compra un móvil
	                System.out.println("Introduce el número de movil del catálogo"); 
	                caja = gestion.comprarMovil(catalogo, Leer.datoInt()); 
	                break;
	            case 4: //Se muestra todas las ventas
	                System.out.println("La caja total es :" + caja + " €"); 
	                break;
	            case 5: //Se muestran el importe de un móvil
	                System.out.println("Introduce el número de movil del cual quiere ver ganacias"); 
	                gestion.verGanancias(catalogo, Leer.datoInt()); 
	                break;
	            case 6: //Se muestran las ganancias netas
	                gestion.cerrarCaja(catalogo);
	                break;
	            default: //Se sale del programa
	                repetir= false; 
	                break;
            } 
        } while (repetir); //Se sale del programa si en el switch se introduce número diferente de entre 1-6
        System.out.println("Hasta pronto");

	}

}
```

En la clase <code>Principal</code> se crea el array que que contendrá los móviles con la dimensión seleccionada por el usuario. Se crea también la variable gestión de tipo <code>GestionMovil</code> para poder operar con el array de móviles. Un bucle que solicitará los datos de cada uno de los móviles al usuario de la aplicación. El usuario interactuará con la aplicación mediante un menú, para ello construido con un bucle tipo <code>switch</code>.

La clase <code>Movil.java</code> tiene como atributos:

<ul class="list-bullets">
    <li>Precio</li>
    <li>Marca</li>
    <li>Cantidad de móviles vendidos</li>
    <li>Si se han vendido todos o no</li>
    <li>Beneficio de un móvil</li>
</ul>

```java
package ejerc3;
/**
 * Movil genera objetos de tipo móvil cuyos atributos son:
 * Precio, Marca, total vendidos, vendido o disponible y beneficio
 * 
 * @author ivan
 *
 */
public class Movil {

    //Atributos 
    private double precio; 
    private String marca; 
    private double totalVendido; 
    //Se inicializa a no ha vendido.
    //Sólo se modifica en el método "comprarMovil" mediante "setVendido(true)"
    private boolean vendido=false;
    private double beneficio=0.4;//Beneficio sobre las ventas

    //Constructores 
    public Movil (){ } 

    /**
     * Constructor de tipo Movil. Se rellena por el usuario
     * @param precio	Recibe un "double" introducido por el usuario
     * @param marca		Recibe un "string" introducido por el usuario
     */
    public Movil (double precio, String marca){ 
        this.precio = precio; 
        this.marca = marca; 
    }

    /** 
     * Muestra todos los móviles, precios guardados y si se han vendido
     *  
     * @param movil Recibe un tipo móvil
     * @author ivan <a href="http://ivanalbizu.eu" target="_blank">Iván González</a>
     */
    public void mostrarMovil(Movil[] movil) { 
        System.out.println(""
        		+ "Marca "		+ getMarca() + "n"
        		+ "Precio "		+ getPrecio() + " €");
        if(getVendido()) System.out.println("VENDIDO");
        else System.out.println("NO VENDIDO");
        System.out.println("------");
    }

    /**
     * Muestra precio y marca de un móvil elegido por el usuario.
     * Recibe dos parámetros
     * 
     * @param movil	Recibe un tipo Movil.
     * @param num	Recibe el identificador del móvil. Introducido por el usuario.
     * @author ivan <a href="http://ivanalbizu.eu" target="_blank">Iván González</a>
     */
    public void verPrecio(Movil[] movil) {
        System.out.println(""
        		+ "Marca: "		+ this.getMarca()+ "n"
                + "Precio: "	+ this.getPrecio() + " €"); 
        System.out.println("--------"); 	
    }

    //Getters and Setters
    public double getMargen() { 
        return this.beneficio; 
    }
    public void setMargen(double margen) { 
        this.beneficio = margen; 
    }
    public double getPrecio() { 
        return this.precio; 
    } 
    public void setPrecio(double precio) { 
        this.precio = precio; 
    }
    public String getMarca() { 
        return this.marca; 
    }
    public void setMarca(String marca) { 
        this.marca = marca; 
    }
    public double getTotalVendido() { 
        return this.totalVendido; 
    }
    public void setTotalVendido(double totalVendido) { 
        this.totalVendido = totalVendido; 
    }
    public boolean isVendido() { 
        return this.vendido; 
    }
    public void setVendido(boolean vendido) { 
        this.vendido = vendido; 
    } 
    public boolean getVendido(){ 
        return this.vendido; 
    } 

}
```

La clase <code>Movil</code> consta de dos constructores, uno vacío y el constructor que recibe el precio y la marca.

<ul class="list-bullets">
    <li>Tiene dos métodos, ambos reciben como parámetro el array de móviles</li>
    <li>Un método que imprime las características del móvil</li>
    <li>Precio y marca de un móvil concreto</li>
    <li>Los gets y sets La clase</li>
</ul>


<code>GestionMovil.java</code> tiene como atributos:

<ul class="list-bullets">
    <li>Array de móviles</li>
    <li>Una variable doble que almacena las ventas</li>
</ul>

Y cómo métodos:

<ul class="list-bullets">
    <li>Array de móviles</li>
    <li>Ver precio de un móvil</li>
    <li>Comprar un móvil</li>
    <li>Ver ganancias de las ventas</li>
    <li>Cerrar la caja</li>
</ul>

```java
package ejerc3;

/**
 * GestionMovil gestiona las operaciones que se pueden hacer con un conjunto de objetos de clase "movil"
 * 
 * @author ivan
 * @version 1.0
 *
 */
public class GestionMovil {

    // Atributos 
    private Movil moviles[]; 
    private double caja; 

    // Constructor 
    public GestionMovil() { }

    // Métodos

    /** 
     * Muestra todos los móviles, precios guardados y si se han vendido
     *  
     * @param movil Recibe un tipo móvil
     * @author ivan <a href="http://ivanalbizu.eu" target="_blank">Iván González</a>
     */
    public void mostrarMoviles(Movil[] movil) { 
        for (int i = 0; i < movil.length; i++) { 
        	movil[i].mostrarMovil(movil);
        }
    }

    /**
     * Muestra precio y marca de un móvil elegido por el usuario.
     * Recibe dos parámetros
     * 
     * @param movil	Recibe un tipo Movil.
     * @param num	Recibe el identificador del móvil. Introducido por el usuario.
     * @author ivan <a href="http://ivanalbizu.eu" target="_blank">Iván González</a>
     */
    public void verPrecio(Movil[] movil, int num) { 
        System.out.println(""
        		+ "Marca: "		+movil[num - 1].getMarca()+ "n"
                + "Precio: "	+movil[num - 1].getPrecio() + " €"); 
        System.out.println("--------"); 
    }

    /**
     * Se elige el móvil que se desea comprar. Se comprueba que no esté vendido anteriormente.
     * 
     * @param movil	Recibe un tipo Movil
     * @param num	Recibe el identificador del móvil. Introducido por el usuario.
     * @author ivan <a href="http://ivanalbizu.eu" target="_blank">Iván González</a>
     * @see			#getVendido()
     * @return		Devuelve tipo "double" en la variable caja. "caja" acumula las ventas de todos los móviles vendidos.
     */
    public double comprarMovil(Movil[] movil, int num) {
        if (!movil[num - 1].getVendido()) { //Comprueba que no esté vendido
            movil[num - 1].setVendido(true); //Modifica a verdadero booleano vendido 
            caja += movil[num - 1].getPrecio(); //Guarda(acumula) la venta
        }
        else { System.out.println("El móvil ya está vendido"); } 
        return caja; 
    } 

    /**
     * Muestra las ganacias netas de un móvil concreto
     * 
     * @param movil	Recibe un tipo Movil
     * @param num	Recibe el identificador del móvil. Introducido por el usuario.
     * @author ivan <a href="http://ivanalbizu.eu" target="_blank">Iván González</a>
     */
    public void verGanancias(Movil[] movil, int num) {
        double gananciasMovil = 0; 
        if (movil[num - 1].getVendido()) { //Comprueba que no esté vendido
        	//Se calcula el beneficio neto del móvil
            gananciasMovil = movil[num - 1].getMargen() * movil[num - 1].getPrecio(); 
            System.out.println("Las ganancias de la venta de "
                    + movil[num - 1].getMarca() + " es " + gananciasMovil);//Muestra la ganancia de un móvil concreto
            System.out.println("------");
        }
        else { System.out.println("El móvil todavía no ha sido vendido"); }
    }

    /**
     * Muestra las ganacias netas de todas la ventas realizadas durante el día
     * 
     * @param movil	Recibe un tipo Movil
     * @author ivan <a href="http://ivanalbizu.eu" target="_blank">Iván González</a>
     */
    public void cerrarCaja(Movil[] movil) {
        double gananciasDia = 0;
        for (int i = 0; i < movil.length; i++) {
            if (movil[i].getVendido()) {
                gananciasDia += movil[i].getMargen() * movil[i].getPrecio(); 
            }
        }
        System.out.println("Las ganacias del día han sido " +gananciasDia+ " €"); 
    }

    // Getters and setters 
    public Movil[] getMoviles() { 
        return moviles; 
    }
    public void setMoviles(Movil[] moviles) {
        this.moviles = moviles;
    }
}
```

El método mostrar móvil <code>void mostrarMoviles(...)</code> recibe un array de móviles y muestra la lista de móviles con sus atributos.

El método ver precio <code>void verPrecio(...)</code> recibe como parámetros el array de los móviles y un entero que es introducido por el usuario de la aplicación para devolver el precio de un móvil concreto.

El método comprar móvil <code>double comprarMovil(...)</code> recibe los mismos parámetros que el método anterior. Primero comprueba que no esté vendido el móvil solicitado, caso de estar vendido se muestra el mensaje correspondiente. Segundo, se modifica el atributo booleano vendido a <code>true</code> para marcar que el móvil elegido está vendido. Por último, se obtiene el precio del movil y se guarda en la variable que acumula las ganacias <code>caja</code>.

El método ver ganancias <code>void verGanancias(...)</code> recibe como parámetros el array de móviles y un número introducido por el usuario para seleccionar un móvil. Se comprueba que el móvil esté vendido y luego se obtienen dos datos, el precio y su beneficio y se multiplican, mostrando por pantalla su resultado.

El método cerrarCaja <code>void cerrarCaja(...)</code> recibe como parámetro el array de teléfonos, que es recorrido entero y guardado en la variable <code>gananciasDia</code> para aquellos móviles que fueron vendidos.

Puedes descargar el código para probarlo en el siguiente enlace <a href="https://drive.google.com/open?id=0BzQS5pOyF_HjMDdUdXRwTDhZZ0U" target="_blank">Descargar programa java venta móviles</a>