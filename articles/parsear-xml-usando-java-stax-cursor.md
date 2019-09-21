---
title: Parsear XML usando Java Stax Cursor
published: true
description: Parsear documento con información meteorológica en formato XML con Java usando Stax Cursor
tags: Java
ctime: Sat, 15 Nov 2014 10:23:28
---

En esta entrada voy a realizar un sencillo ejemplo para parsear un archivo XML usando Java Stax. El archivo a parsear contiene información meteorológica de la ciudad de Sevilla. Voy a obtener los días en los que la temperatura máxima fuese mayor a una temperatura "X". El procedimiento para llevarlo a cabo es:

1.  Llegar a la etiqueta de apertura día y obtener la fecha.
2.  Obtener la _etiqueta máxima_ que corresponde a la _etiqueta temperatura._
3.  Al llegar al cierre de la etiqueta día, añado el día a la lista.
4.  A partir de la lista generada de días, construyo método para que a partir de la lista y de una temperatura se muestren los días filtrados.

Un fragmento del archivo XML es el siguiente:

```
<?xml version="1.0" encoding="ISO-8859-15"?>
<root id="41091" version="1.0" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.aemet.es/xsd/localidades.xsd">
	<origen>
		<productor>AEMET</productor>
		<web>http://www.aemet.es</web>
		<enlace>http://www.aemet.es/es/eltiempo/prediccion/municipios/sevilla-id41091</enlace>
		<language>es</language>
		<copyright>© AEMET. Autorizado el uso de la información y su reproducción citando a AEMET como autora de la misma.</copyright>
		<nota_legal>http://www.aemet.es/es/nota_legal</nota_legal>
	</origen>
	<elaborado>2014-11-06T11:41:02</elaborado>
	<nombre>Sevilla</nombre>
	<provincia>Sevilla</provincia>
	<prediccion>
		<dia fecha="2014-11-10">
			<prob_precipitacion>25</prob_precipitacion>
			<cota_nieve_prov/>
			<estado_cielo descripcion="Intervalos nubosos">13</estado_cielo>
			<viento>
				<direccion>C</direccion>
				<velocidad>0</velocidad>
			</viento>
			<racha_max/>
			<temperatura>
				<maxima>17</maxima>
				<minima>7</minima>
			</temperatura>
			<sens_termica>
				<maxima>17</maxima>
				<minima>6</minima>
			</sens_termica>
			<humedad_relativa>
				<maxima>85</maxima>
				<minima>50</minima>
			</humedad_relativa>
			<uv_max>3</uv_max>
		</dia>
		<dia fecha="2014-11-11">
			<prob_precipitacion>100</prob_precipitacion>
			<cota_nieve_prov/>
			<estado_cielo descripcion="Cubierto con lluvia">26</estado_cielo>
			<viento>
				<direccion>SO</direccion>
				<velocidad>10</velocidad>
			</viento>
			<racha_max/>
			<temperatura>
				<maxima>18</maxima>
				<minima>10</minima>
			</temperatura>
			<sens_termica>
				<maxima>18</maxima>
				<minima>10</minima>
			</sens_termica>
			<humedad_relativa>
				<maxima>95</maxima>
				<minima>80</minima>
			</humedad_relativa>
		</dia>
	</prediccion>
</root>
```

La clase modelo contiene dos atributos: private String dia y private int temperatura. (Para hacerlo corto, no formateo la fecha).

```
public class Pojo {

	private String dia;
	private int temperatura;
	
	public Pojo() {}
	public Pojo(String dia, int temperatura) {
		this.dia = dia;
		this.temperatura = temperatura;
	}
	
	public String getDia() {
		return dia;
	}
	public void setDia(String dia) {
		this.dia = dia;
	}
	public int getTemperatura() {
		return temperatura;
	}
	public void setTemperatura(int temperatura) {
		this.temperatura = temperatura;
	}
	
	@Override
	public String toString() {
		return "Dia: " +getDia()+" Temperatura máxima: " +getTemperatura();
	}
}
```

El archivo Test.java ejecuta el programa. Contiene el método main, y dos métodos más. Uno genera una lista de fechas y sus tempearturas máximas de todos los días. El otro método, a partir de una lista de días obtiene aquellos días que cumplan la condición de temperatura máxima. El código es sencillo y está comentado, y se puede descargar más abajo.

```
public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String fileName;
		fileName = "src/inventadoAemet/localidad_41091.xml";
		List<Pojo> dias = parseXML(fileName);
		
		System.out.println(dias);
		
		List<Pojo> diasfiltrados = filtroTMax(dias, 21.0);
		System.out.println(diasfiltrados);		
	}

	private static List<Pojo> parseXML(String fileName) {
		//Se devolverá lista con los días que contenga el XML.
		//Al cerrar etiquetada "día" se añade el objeto a la lista
		List<Pojo> dias = new LinkedList<Pojo>();
		
		//Objeto que se añadirá a la lista.
		//Cada iteración sobre etiqueta de apertura "día" instancia el objeto
		Pojo dia = null;
		
		//Variables que almacenan la ruta dentro de la jerarquía de etiquetas
		String path			= ""; //Raiz. Se irá variando su contenido
		String pathDia		= "/root/prediccion/dia";
		String pathTemMax	= "/root/prediccion/dia/temperatura/maxima";
		
		XMLInputFactory xmlif = XMLInputFactory.newInstance();
		try {
			XMLStreamReader xmlsr = xmlif.createXMLStreamReader(new FileInputStream(fileName));
			int event = xmlsr.getEventType();
			
			while (xmlsr.hasNext()) {
				event = xmlsr.next();
				switch(event){
					//Se trata de etiqueta de apertura
					case XMLStreamConstants.START_ELEMENT:
						//Añade a Path la etiqueta apertura actual
						path = path +"/"+ xmlsr.getLocalName();
						//Si la ruta actual coincide con la Path
						if (path.equalsIgnoreCase(pathDia)) {
							dia = new Pojo();
							//Al objeto se añade atributo de la posición "0"
							dia.setDia(xmlsr.getAttributeValue(0));
						}
						break;
					//Se trata de contenido de una etiqueta
					case XMLStreamConstants.CHARACTERS:
						//Si la ruta actual coincide con la Path
						if (path.equalsIgnoreCase(pathTemMax))
							dia.setTemperatura(Integer.parseInt(xmlsr.getText()));
						break;
					case XMLStreamConstants.END_ELEMENT:
						//Si la ruta actual coincide con la Path
						if (path.equalsIgnoreCase(pathDia))
							dias.add(dia);//Se añade el día creado a la lista
						//Elimina a Path la etiqueta cierre actual
						path = path.substring(0, path.lastIndexOf("/"));
						break;
				}				
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (XMLStreamException e) {
			e.printStackTrace();
		}
		//Devuelve la lista
		return dias;
	}
	
	/**
	 * Devuelve una lista de objetos Días (Pojo) en los que la temperatura
	 * temperatura máxima sea mayor a la indicada por parámetro
	 * @param dias		Lista de todos los días que contiene el XML
	 * @param limite	Temperatura a partir de la que se desea filtrar
	 * @return			Lista de días que complen condición de temperatura
	 * 					máxima mayor a la indicada
	 */
	public static List<Pojo> filtroTMax(List<Pojo> dias, double limite){
		List<Pojo> filtroTempMax = new LinkedList<Pojo>();

		for (Pojo pojo : dias) {
			if (pojo.getTemperatura() > limite)
				filtroTempMax.add(pojo);
		}
		return filtroTempMax;
	}
}
```

El vídeo completo: El código para descargar [Xml parseado con Java Stax](https://db.tt/SMYeYC6o "Código Xml parseado con Java Stax")