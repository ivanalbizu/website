---
title: 'Codio y Wordpress'
ctime: Thu, 21 Aug 2014 14:22:36
published: true
tags: Pildoritas,Wordpress
---

**Codio** es un editor (IDE) pero en remoto. Permite crear proyectos variados. Desde **Wordpress**, AngularJS hasta mucho otros. En su versión gratis permite tener muchos proyecto públicos y uno privado. Mejor dejo [enlace a la web](https://codio.com/ "Abre en ventana nueva la web de Codio") para que cada uno investigue si le merecería la pena. En esta tendrá quiero comentar como se puede crear un proyecto Wordpress con Codio, que puede venir muy bien para probar una web antes de sacarla. Los pasos que voy a seguir están [sacados de su propia web](https://codio.com/s/docs/specifics/wordpress/ "Abre en ventana nueva los pasos para instalar Wordpress con Codio"). La documentación que aporta el editor online Codio en su propia web está bastante bien, con Blog y recursos incluidos. Vídeo paso a paso de la instalación: Registrarse es sencillo, incluso permite hacerlo con cuenta de GitHub o Bitbucket. Una vez logeados accedemos a "_Projects_" y pulsamos sobre "_Create Project_". Y damos nombre al proyecto. De entre todas las posibilidades que nos da Codio para crear un proyecto (Git, Templates, Zip...) elegimos "_Templates/Empty Project_" y pulsamos sobre "_Create_". Se abrirá el editor Codio con el proyecto creado. Su aspecto inicial será un menú superior, sidebar del proyecto (vacío) a la izquierda con los archivos que contenga y el editor propiamente dicho a la derecha. Este aspecto es personalizable, tema en el que no voy a entrar. En el menú superior abrimos la consola: Tools -> Terminal Añadimos Wordpress

wget http://wordpress.org/latest.tar.gz

Descomprimimos

tar -xzvf latest.tar.gz

Instalamos Php,Mysql y Apache

parts install php5 php5-apache2 php5-pdo-mysql php5-zlib mysql

Arrancamos el servidor

parts start apache2 mysql

En la raíz del proyecto creamos un archivo llamado (para que arranque el servidor cada vez que abrimos el proyecto. Por defecto estará apagado) "_startup.sh_" Y añadimos estas dos línea de código:

parts stop apache2 mysql
parts start apache2 mysql

Para abrir Mysql y crear la base de datos introducimos:

mysql -u root -p

Creamos la base de datos

CREATE DATABASE nombre-base-datos;

Creamos un usuario

CREATE USER usuario-base-datos@localhost;

Damos contraseña al usuario

SET PASSWORD FOR usuario-base-datos@localhost= PASSWORD("pass-elegida");

Decimos que usuario va a manejar la base de datos con todos los privilegios

GRANT ALL PRIVILEGES ON nombre-base-datos.* TO usuario-base-datos@localhost IDENTIFIED BY 'pass-elegida';

Aplicamos cambios

FLUSH PRIVILEGES;

Salimos de Mysql

exit

Ya hemos terminado de usar la consola. Ahora realizamos modificaciones sobre Wordpress. Renombramos el archivo _wp-config-sample.php_ a _wp-config.php_ y lo abrimos y modificamos: Línea 19:

define('DB\_NAME', 'database\_name\_here'); --> define('DB\_NAME', 'nombre-base-datos');

Línea 22:

define('DB\_USER', 'username\_here'); --> define('DB_USER', 'usuario-base-datos');

Línea 25:

define('DB\_PASSWORD', 'password\_here'); --> define('DB_PASSWORD', 'pass-elegida');

Cada vez que creamos un proyecto, Codio nos genera una URL que en este caso debemos saber. Y para saberlo... En el menú superior: _Project / Box Info_. En el pop up localizamos el apartado "WEB: Dynamic Content" y copiamos la URL de tipo HTTP (la HTTPS no la necesitamos). http://unaPalabra-otraPalabra.codio.io Antes de la línea 19:

define('WP_HOME','http://word1-word2.codio.io:3000/wordpress');
define('WP_SITEURL','http://word1-word2.codio.io:3000/wordpress');

Y sustituimos "word1-word2" por las palabras nos generó Codio. En el menú superior, seleccionamos el ítem más a la derecha llamado "_Project Index_" y pinchamos al desplegar  "_Box URL_". Ahora se llamará "Box URL" en vez de "Project Index". Falta terminar hacer la instalación guiada de Wordpress, en el que se pide título de la web, nombre de usuario y contraseña. Una vez instalada, Codio dice que se necesita instalar un plugin llamado "permalink-fix-disable-canonical-redirects-pack" y activarlo para que corra en el puerto 3000 sin ningún contratiempo. Cada vez que pinchemos sobre "BoxURL" se ejecutará en nueva pestaña el proyecto. Espero que sirva este post a mucha gente.