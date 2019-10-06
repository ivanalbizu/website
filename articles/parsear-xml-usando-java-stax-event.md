---
title: Parsear XML usando Java Stax Event
published: true
description: Parsear documento con información meteorológica en formato XML con Java usando Stax Event
tags: Java
ctime: Wed, 19 Nov 2014 17:17:33 +0000
---

En mi último post realicé un <a href="parsear-xml-usando-java-stax-cursor/">parseo de XML usando Java Stax Cursor</a>, en esta ocasión voy a realizar el mismo ejemplo pero usando Java Stax Event. Sabiendo bien cómo está estructurado el XML, marcamos los pasos para obtener la temperatura máxima y la fecha del día en cuestión son:

<ol class="list-bullets">
	<li>Instanciar día llegando a <code>tagDia</code></li>
	<li>Añadir día mediante dentro de <code>tagDia</code> usando <code>atrDia</code></li>
	<li>Añadir temperatura máxima mediante path: <code>/root/prediccion/dia/temperatura/maxima</code></li>
	<li>Añadir POJO a lista días mediante <code>tagDia</code></li>
</ol>

Necesitaremos entonces las siguientes variables:

```java
String path = "";
String pathTemMax = "/root/prediccion/dia/temperatura/maxima";
String tagDia = "dia";
String atrDia = "fecha";
```

El código completo está comentado, y es el siguiente:

```java
public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String fileName;
		fileName = "src/inventadoAemet/localidad_41091.xml";
		List<Pojo> dias = parseXML(fileName);
		List<Pojo> diasFiltrados = filtroTMax(dias, 20.0);
		
		System.out.println(dias);
		System.out.println(diasFiltrados);
	}
		
	private static List<Pojo> parseXML(String fileName) {
		List<Pojo> dias = new LinkedList<Pojo>();
		Pojo dia = null;
		
		//Localizar elementos
		String path			= "";
		String pathTemMax	= "/root/prediccion/dia/temperatura/maxima";
		String tagDia			= "dia";
		String atrDia			= "fecha";
		
		XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
		try {
			InputStream in  = new FileInputStream(fileName);
			XMLEventReader eventReader = xmlInputFactory.createXMLEventReader(in);
			while (eventReader.hasNext()) {
				XMLEvent event = eventReader.nextEvent();
				
				if (event.isStartElement()) {
					StartElement startElement = event.asStartElement();
					path = path +"/"+ startElement.getName().getLocalPart();

					if (startElement.getName().getLocalPart().equalsIgnoreCase(tagDia)) {
						//Instanciar dia
						dia = new Pojo();
						
						//Añadir dia usando atrDia
						Iterator<Attribute> atributos = startElement.getAttributes();
						while (atributos.hasNext()) {
							Attribute atributo = atributos.next();
							if (atributo.getName().toString().equalsIgnoreCase(atrDia)) {
								dia.setDia(atributo.getValue());
							}
						}
					}
					//Añadir temperatura máxima mediante path: /root/prediccion/dia/temperatura/maxima
					if (event.isStartElement()) {
						event = eventReader.nextEvent();
						if (path.equalsIgnoreCase(pathTemMax)) {
							System.out.println("traza");
							dia.setTemperatura(Integer.parseInt(event.asCharacters().getData()));
						}
					}
				}
				
				if (event.isEndElement()) {
					EndElement endElement = event.asEndElement();
					
					//Añadir POJO a lista días mediante tagDia
					if (endElement.getName().getLocalPart().equalsIgnoreCase(tagDia))
						dias.add(dia);

					//Actualizar PATH 
					path = path.substring(0,path.lastIndexOf("/"));
				}
			}
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (XMLStreamException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return dias;
	}

	/**
	 * Devuelve una lista de objetos Días (Pojo) en los que la temperatura
	 * temperatura máxima sea mayor a la indicada por parámetro
	 * @param dias		Lista de todos los días que contiene el XML
	 * @param limite		Temperatura a partir de la que se desea filtrar
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

Cómo se puede ver hay método para realizar el filtro de temperaturas <code>List&lt;Pojo&gt; filtroTMax(List&lt;Pojo&gt; dias, double limite)</code>.

No he incluido el fichero XML, puede verse en el enlace al otro que post que publiqué sobre <a href="parsear-xml-usando-java-stax-cursor/">parseo de XML usando Java Stax Cursor</a>

El vídeo completo:

<div class="ratio-16-9">
    <iframe title="Parsear XML usando Java Stax Event" type="text/html" src="http://www.youtube.com/embed/LZo76kHNWh0?autoplay=0&origin=https://ivanalbizu.eu/" frameborder="0"></iframe>
</div>

Enlace de descarga del <a href="https://db.tt/1Rnb9kID" target="_blank">código Parsear XML con Stax Event</a>