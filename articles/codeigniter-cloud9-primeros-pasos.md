---
title: Codeigniter + Cloud9. Primeros pasos
description: Instalar Codeigniter con IDE web Cloud9
published: true
tags: Codeigniter,Php,Pildoritas
ctime: Tue, 17 Feb 2015 22:13:10 +0000
---

En esta primera publicación comenzaré con la descarga de Codeigniter y la preparación del IDE web Cloud9 para poder empezar a trabajar. Para ello necesito descargar la última versión estable de Codeigniter. Creación de un Workspace en Cloud9 e instalación de phpmyadmin en Clou9. Los pasos seguidos son los siguientes:

1.  Crear Workspace PHP
2.  Vaciar el contenido del Workspace
3.  Descargar última versión estable CodeIgniter
4.  Subir a Cloud 9
5.  Descomprimir:
    1.  sudo unzip CodeIgniter-2.2.1.zip
6.  Copiar CodeIgniter al Workspace:
    1.  sudo cp -r CodeIgniter-2.2.1/* /home/ubuntu/workspace/
7.  Eliminar directorio y comprimido de CodeIgniter:
    1.  sudo rm -r CodeIgniter-2.2.1
    2.  sudo rm -r CodeIgniter-2.2.1.zip
8.  Instalar PHPMyAdmin:
    1.  phpmyadmin-ctl install
    2.  En consola aparece enlace y usuario(mismo de Cloud9) y contraseña(vacío)

Y el vídeo del paso a paso: Nota: para dar un poco de seguridad a nuestro PhpMyAdmin: Ejecutamos la siguiente línea: Editamos un archivo PHP:

    sudo nano /etc/phpmyadmin/config.inc.php 

Al final del documento localizamos la línea:

    $cfg['Servers'][$i]['AllowNoPassword'] = TRUE;

Y lo ponemos a FALSE, para que sea necesaria la contraseña Accedemos a mysql para establecer la contraseña:

    mysql-ctl cli
    UPDATE mysql.user SET Password=PASSWORD('nuestraContraseña') WHERE User='poner_usuario_cloud9';

Salimos guardando (Ctrl+x.  Yes.  Enter)