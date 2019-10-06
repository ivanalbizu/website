---
title: Codio y Wordpress
published: true
description: Instalar CMS Wordpress mediante IDE web Cloud9. Configuración de base de datos y otros requerimientos
tags: Pildoritas,Wordpress
ctime: Thu, 21 Aug 2014 14:22:36 +0000
---

**Codio** es un editor (IDE) versión Web. Permite crear proyectos variados, desde **Wordpress**, AngularJS hasta mucho otros.

En su versión gratis permite tener muchos proyecto públicos y uno privado. Mejor dejo <a href="https://codio.com/" target="_blank" title="Abre en ventana nueva la web de Codio">enlace a la web de Codio</a> para que cada uno investigue si le merecería la pena.

En esta tendrá quiero comentar como se puede crear un proyecto Wordpress con Codio, que puede venir muy bien para probar una web antes de sacarla a producción. Los pasos que voy a seguir están <a href="https://codio.com/s/docs/specifics/wordpress/" title="Abre en ventana nueva los pasos para instalar Wordpress con Codio" target="_blank">indicados en su propia web</a>. La documentación que aporta el editor online Codio en su propia web está bastante bien, con Blog y recursos incluidos.

Será necesario crearse una cuenta, su registro es muy rápido, incluso permite hacerlo con cuenta de GitHub o Bitbucket. Una vez logeados accedemos a <code>Projects</code> y pulsamos sobre <code>Create Project</code>. Y damos nombre al proyecto. De entre todas las posibilidades que nos da Codio para crear un proyecto (Git, Templates, Zip...) elegimos <code>Templates/Empty Project</code> y pulsamos sobre <code>Create</code>. Se abrirá el editor Codio con el proyecto creado. Su aspecto inicial será un menú superior, sidebar del proyecto (vacío) a la izquierda con los archivos que contenga y el editor propiamente dicho a la derecha. Este aspecto es personalizable, tema en el que no voy a entrar. En el menú superior abrimos la consola: <code>Tools -> Terminal</code>

Añadimos Wordpress

```shell
wget http://wordpress.org/latest.tar.gz
```

Descomprimimos

```shell
tar -xzvf latest.tar.gz
```

Instalamos Php,Mysql y Apache

```shell
parts install php5 php5-apache2 php5-pdo-mysql php5-zlib mysql
```

Arrancamos el servidor

```shell
parts start apache2 mysql
```

En la raíz del proyecto creamos un archivo llamado <code>startup.sh</code> (para que arranque el servidor cada vez que abrimos el proyecto. Por defecto estará apagado) y añadimos estas dos línea de código:

```shell
parts stop apache2 mysql
parts start apache2 mysql
```

Para abrir Mysql y crear la base de datos introducimos:

```shell
mysql -u root -p
```

Creamos la base de datos

```shell
CREATE DATABASE nombre-base-datos;
```

Creamos un usuario

```shell
CREATE USER usuario-base-datos@localhost;
```

Damos contraseña al usuario

```shell
SET PASSWORD FOR usuario-base-datos@localhost= PASSWORD("pass-elegida");
```

Decimos que usuario va a manejar la base de datos con todos los privilegios

```shell
GRANT ALL PRIVILEGES ON nombre-base-datos.* TO usuario-base-datos@localhost IDENTIFIED BY 'pass-elegida';
```

Aplicamos cambios

```shell
FLUSH PRIVILEGES;
```

Salimos de Mysql

```shell
exit
```

Ya hemos terminado de usar la consola. Ahora realizamos modificaciones sobre Wordpress. Renombramos el archivo <code>wp-config-sample.php</code> a <code>wp-config.php</code> y lo abrimos y modificamos:

```php
//Línea 19:
define('DB_NAME', 'database_name_here'); --> define('DB_NAME', 'nombre-base-datos');

//Línea 22:
define('DB_USER', 'username_here'); --> define('DB_USER', 'usuario-base-datos');

//Línea 25:
define('DB_PASSWORD', 'password_here'); --> define('DB_PASSWORD', 'pass-elegida');
```

Cada vez que creamos un proyecto, Codio nos genera una URL que en este caso debemos saber. Y para saberlo... En el menú superior: <code>Project / Box Info</code>. En el pop up localizamos el apartado "WEB: Dynamic Content" y copiamos la URL de tipo HTTP (la HTTPS no la necesitamos). http://unaPalabra-otraPalabra.codio.io

Seguimos editando el fichero anterior <code>wp-config.php</code> y sustituimos "word1-word2" por las palabras nos generó Codio.

```php
//Antes de la línea 19:

define('WP_HOME','http://word1-word2.codio.io:3000/wordpress');
define('WP_SITEURL','http://word1-word2.codio.io:3000/wordpress');
```

En el menú superior, seleccionamos el ítem más a la derecha llamado <code>Project Index</code> y pinchamos al desplegar <code>Box URL</code>. Ahora se llamará <code>Box URL</code> en vez de <code>Project Index".

Falta terminar hacer la instalación guiada de Wordpress, en el que se pide título de la web, nombre de usuario y contraseña. Una vez instalada, Codio dice que se necesita instalar un plugin llamado <code>permalink-fix-disable-canonical-redirects-pack</code> y activarlo para que corra en el puerto 3000 sin ningún contratiempo. Cada vez que pinchemos sobre <code>BoxURL</code> se ejecutará en nueva pestaña el proyecto.

<div class="ratio-16-9">
    <iframe title="Wordpress con IDE Web Codio" type="text/html" src="http://www.youtube.com/embed/z9yEURWZ5S0?autoplay=0&origin=https://ivanalbizu.eu/" frameborder="0"></iframe>
</div>