---
title: Codeigniter + Cloud9. Primeros pasos
description: Ejemplo de como usar Framework PHP Codeigniter y base de datos MySql usando IDE web Cloud9
published: true
tags: Codeigniter,Php,Pildoritas
ctime: Tue, 17 Feb 2015 22:13:10 +0000
---

En esta primera publicación comenzaré con la descarga de Codeigniter y la preparación del IDE web Cloud9 para poder empezar a trabajar. Para ello necesito descargar la última versión estable de Codeigniter. Creación de un Workspace en Cloud9 e instalación de phpmyadmin en Cloud9. Los pasos seguidos son los siguientes:

<ol class="list-bullets">
    <li>Crear Workspace PHP</li>
    <li>Vaciar el contenido del Workspace</li>
    <li>Descargar última versión estable CodeIgniter</li>
    <li>Subir a Cloud 9</li>
    <li>Descomprimir:
        <ol class="list-bullets">
            <li><code>sudo unzip CodeIgniter-2.2.1.zip</code></li>
        </ol>
    </li>
    <li>Copiar CodeIgniter al Workspace:
        <ol class="list-bullets">
            <li><code>sudo cp -r CodeIgniter-2.2.1/* /home/ubuntu/workspace/</code></li>
        </ol>
    </li>
    <li>Eliminar directorio y comprimido de CodeIgniter:
        <ol class="list-bullets">
            <li><code>sudo rm -r CodeIgniter-2.2.1</code></li>
            <li><code>sudo rm -r CodeIgniter-2.2.1.zip</code></li>
        </ol>
    </li>
    <li>Instalar PHPMyAdmin:
        <ol class="list-bullets">
            <li><code>phpmyadmin-ctl install</code></li>
            <li>En consola aparece enlace y usuario (mismo de Cloud9) y contraseña(vacío)</li>
        </ol>
    </li>
</ol>

Y el vídeo del paso a paso: Nota: para dar un poco de seguridad a nuestro PhpMyAdmin: Ejecutamos la siguiente línea: Editamos un archivo PHP:

```shell
sudo nano /etc/phpmyadmin/config.inc.php 
```

Al final del documento localizamos la línea:

```shell
$cfg['Servers'][$i]['AllowNoPassword'] = TRUE;
```

Y lo ponemos a FALSE, para que sea necesaria la contraseña Accedemos a mysql para establecer la contraseña:

```shell
mysql-ctl cli
UPDATE mysql.user SET Password=PASSWORD('nuestraContraseña') WHERE User='poner_usuario_cloud9';
```

Salimos guardando (Ctrl+x.  Yes.  Enter)

Y el vídeo del paso a paso

<div class="ratio-16-9">
    <iframe title="Codeigniter con IDE Web Cloud9" type="text/html" src="http://www.youtube.com/embed/GO04WRhjjVk?autoplay=0&origin=https://ivanalbizu.eu/" frameborder="0"></iframe>
</div>