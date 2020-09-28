---
title: Aplicación con vue y nodejs para registro de horas trabajadas 
published: true
description: Aplicación construida nodejs para backend y vue para frontend. Utilizando sockets, vuex, mongo, notificaciones de escritorio y autenticación con JWT
tags: node,javascript,vue
ctime: Mon, 31 Aug 2020 18:30:00 +0000
cover_image: aplicacion-nodejs-vuejs.png
alt_image: Aplicación con vue y nodejs para registro de horas trabajadas 
---

La aplicación usa nodejs como backend y vue como frontend

## La parte backend nodejs:

<ul class="list-bullets">
  <li>Nodejs +14.0.0</li>
  <li>Base de datos Mongo para el registro y acceso de usuarios en la aplicación</li>
  <li>Ficheros para guardar la información de trackings de usarios. Más concretamente ficheros JSON que son leidos y editados mediante filesystem de nodejs</li>
</ul>

## La parte frontend con vuejs:

<ul class="list-bullets">
  <li>Login de usuario y autenticación con JWT</li>
  <li>Marcar tracking de horas trabajadas y pausas</li>
  <li>Visualizacoón de trackings por fechas</li>
  <li>Detección cuando el usuario ha cerrado o refrescado la App y caso de tener un descanso o trabajo en curso se guarda la hora actual</li>
  <li>Notificaciones de escritorio cuando inicie una Pausa. Configurable el tiempo que debe transcurrir para recibir la notificación</li>
  <li>Cambio de contraseña</li>
  <li>Definición de jornada laboral</li>
</ul>

#  Los usuarios con perfil administrador:

<ul class="list-bullets">
  <li>Creación de nuevos usuarios</li>
  <li>Ver histórico de Trackings de cada usuario</li>
</ul>

Me hubiera gustado poder publicar la aplicación en Heroku y crear usuarios para que se pueda probar. Heroku tiene lo que llaman "Ephemeral Disk" (cuando la App se reinicia, se hace deploy o pasadas unas 24h se pierden los datos que la aplicación ha grabado en los ficheros). Se puede solucionar con AWS, para más detalles: https://devcenter.heroku.com/articles/active-storage-on-heroku
Otras posibles alternativas serían cambiar el sistema de filesystem por base de datos o implementar Backend con firebase, Dropbox Api, Google Drive Api...

Si alguien estuviera interesado (me puede escribir por privado), podría crearle usuario y cargar datos Dummy para ver históricos aunque sus grabaciones serán "Efímeras"

## Levantar la aplicación

### Servidor node

El servidor nodejs usa <code>http://localhost:8080/</code>. El Build de vue se genera dentro de la carpeta <code>public</code>

```javascript
// Instalación
npm install

// Arrancar servidor
npm run dev
```

### Conexión con mongoDB

Será necesario crear un fichero (<code>./config/config.env</code>) para realizar la conexión con la base de datos. Yo he usado una cuenta Free con MongoDB, pero también podría ser local para testearlo

```javascript
DATABASE=mongodb+srv://TU_USUARIO_MONGO_DB:<PASSWORD>@cluster0-bowo8.mongodb.net/NOMBRE_DE_TU_BASE_DE_DATOS?retryWrites=true
DATABASE_PASSWORD=contrasena_de_tu_base_de_datos
```

Crear directamente en la base de datos Mongo un usuario para poder acceder y crear a partir de este usuario, ya una vez logeado, el resto de usuarios

Los campos de la base de datos serán:

```javascript
email: 'tu@email.com'
password: 'password_con_bcrypt_salt_10' //crear password usando Salt 10: https://bcrypt-generator.com/ (aunque se puede editar posteriormente)
name: 'tu nombre'
role: 'ADMIN'
```

Token encriptado con <code>bcrypt</code>. Puedes crear variable de entorno para Local y para Producción

```javascript
// Ficheros:
// ./helpers/auth.js
// ./routes/auth.js
const jwtKey = process.env.JWT_SECRET || 'tu_palabra_super_secreta'
```

### Aplicación vue

La aplicación vue se ejecutará en <code>http://localhost:8081/</code> consumiendo datos del servidor

```javascript
// Instalación
npm install

// Compilar y hot-reloads para desarrollo
npm run serve

// Compilar y minificar para producción
npm run build
```

### Socket

Si la aplicación es llevada a producción, es necesario cambiar la ruta por el dominio que corresponda

```javascript
// ./vue-client/src/main.js
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'tu_dominio',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}));
```

Puede verse todo el código completo en mi Git

<a href="https://github.com/ivanalbizu/tracking-app" target="_blank" rel="noopener">Código en mi GitHub</a>