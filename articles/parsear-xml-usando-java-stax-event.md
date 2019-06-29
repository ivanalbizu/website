---
title: 'Parsear XML usando Java Stax Event'
date: Wed, 19 Nov 2014 17:17:33 +0000
published: true
tags: Java
---

En mi último post realicé un [parseo de XML usando Java Stax Cursor](http://ivanalbizu.eu/parsear-xml-usando-java-stax-cursor/ "Enlace a entrada: parseo de XML usando Java Stax Cursor"), en esta ocasión voy a realizar el mismo ejemplo pero usando Java Stax Event. Sabiendo bien cómo está estructurado el XML, marcamos los pasos para obtener la temperatura máxima y la fecha del día en cuestión son;

1.  Instanciar día llegando a tagDia
2.  Añadir día mediante dentro de tagDia usando atrDia
3.  Añadir temperatura máxima mediante path: /root/prediccion/dia/temperatura/maxima
4.  Añadir POJO a lista días mediante tagDia

Necesitaremos entonces las siguientes variables:

```
String path = "";
String pathTemMax = "/root/prediccion/dia/temperatura/maxima";
String tagDia = "dia";
String atrDia = "fecha";
```

El código completo está comentado, y es el siguiente:

```
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
		String tagDia		= "dia";
		String atrDia		= "fecha";
		
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

Cómo se puede ver ha método para realizar el filtro de temperaturas. No he incluido el fichero XML, puede verse en el enlace al otro que post que publiqué [http://ivanalbizu.eu/parsear-xml-usando-java-stax-cursor/](http://ivanalbizu.eu/parsear-xml-usando-java-stax-cursor/ "http://ivanalbizu.eu/parsear-xml-usando-java-stax-cursor/") Enlace de descarga del [código Parsear XML con StAX Event](https://db.tt/1Rnb9kID "Parsear XML con StAX event")