---
title: 'Programa java venta de móviles'
date: Sun, 02 Mar 2014 22:24:10 +0000
published: true
tags: Java
---

Programa java venta de móviles desarrollado en el curso formativo de aplicaciones para móviles. El programa consta de tres clases: Principal.java, Movil.java y GestionMovil.java. La clase **Principal.java** gestiona el conjunto de la aplicación java. Dicha clase tiene como atributos precio, caja, marca, repetir programa y la opción seleccionada por el usuario.

```
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

En dicha clase se crea el array que que contendrá los móviles con la dimensión seleccionada por el usuario. Se crea también la variable gestión de tipo "GestionMovil" para poder operar con el array de móviles. Un bucle que solicitará los datos de cada uno de los móviles al usuario de la aplicación. El usuario interactuará con la aplicación mediante un menú, para ello construido con un bucle tipo "switch" La clase **Movil.java** tiene como atributos:

*   Precio
*   Marca
*   Cantidad de móviles vendidos
*   Si se han vendido todos o no
*   Beneficio de un móvil

```
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

Consta de dos constructores, uno vacío y el constructor que recibe el precio y la marca.

*   Tiene dos métodos, ambos reciben como parámetro el array de móviles
*   Un método que imprime las características del móvil
*   Precio y marca de un móvil concreto

Los gets y sets La clase **GestionMovil.java** tiene como atributos:

*   Array de móviles
*   Una variable doble que almacena las ventas

Cómo métodos:

*   Array de móviles
*   Ver precio de un móvil
*   Comprar un móvil
*   Ver ganancias de las ventas
*   Cerrar la caja

```
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

El método mostrar móvil void mostrarMoviles(...) recibe un array de móviles y muestra la lista de móviles con sus atributos. El método ver precio void verPrecio(...) recibe como parámetros el array de los móviles y un entero que es introducido por el usuario de la aplicación para devolver el precio de un móvil concreto. El método comprar móvil double comprarMovil(...) recibe los mismos parámetros que el método anterior. Primero comprueba que no esté vendido el móvil solicitado, caso de estar vendido se muestra el mensaje correspondiente. Segundo, se modifica el atributo booleano vendido a "true" para marcar que el móvil elegido está vendido. Por último, se obtiene el precio del movil y se guarda en la variable que acumula las ganacias "caja". El método ver ganancias void verGanancias(...) recibe como parámetros el array de móviles y un número introducido por el usuario para seleccionar un móvil. Se comprueba que el móvil esté vendido y luego se obtienen dos datos, el precio y su beneficio y se multiplican, mostrando por pantalla su resultado. El método cerrarCaja void cerrarCaja(...) recibe como parámetro el array de teléfonos, que es recorrido entero y guardado en la variable "gananciasDia" para aquellos móviles que fueron vendidos. Puedes descargar el código para probarlo en el siguiente enlace: [Descargar programa Java - Venta de móviles.](https://drive.google.com/open?id=0BzQS5pOyF_HjMDdUdXRwTDhZZ0U "Descargar programa java venta móviles") Nota final. Este ejercicio se ha desarrollado con fines didácticos, para adquirir destreza en el manejo de colecciones y métodos, por lo que fuera de este uso -aprendizaje- no tiene mucho sentido.