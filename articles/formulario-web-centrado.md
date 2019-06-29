---
title: 'Formulario web centrado'
date: Mon, 03 Mar 2014 22:18:41 +0000
published: true
tags: Css3,Pildoritas
---

Formulario web centrado en la página web noes complicado. El método aquí explicado puede usarse para cualquier elemento, es válido para un formulario web como para cualquier otro elemento o caja. Para conseguir el centrado he posicionado el contenedor de manera absolute y definido sus atributos left, right, top y bottom a 0 para que ocupe todo el ancho y alto de la pantalla y dando márgenes autos en las cuatro direcciones. A dicho contenedor se le da width y height en porcentajes y para que no quede o muy pequeño o grande se le da mínimos y máximos a los width y height. Adicionalmente, para darle un poco más de juego al formulario web he insertado imágenes de background a cada uno de los campos input. El código **css**:

```
*{
    margin:0;
    padding:0;
}
body {
    font-family:sans-serif;
}
#contenedor {
    position:absolute;
    left:0; right:0;
    top:0; bottom:0;
    margin:auto;
    width:35%;
    height:30%;
    min-width:340px;
    min-height:200px;
    max-width:1920px;
    max-height:1080px;
}
form{
    background: -moz-linear-gradient(top,  rgba(242,244,242,0) 5%, rgba(237,247,239,0.47) 50%, rgba(237,247,239,1) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(5%,rgba(242,244,242,0)), color-stop(50%,rgba(237,247,239,0.47)), color-stop(100%,rgba(237,247,239,1)));
    background: -webkit-linear-gradient(top,  rgba(242,244,242,0) 5%,rgba(237,247,239,0.47) 50%,rgba(237,247,239,1) 100%);
    background: -o-linear-gradient(top,  rgba(242,244,242,0) 5%,rgba(237,247,239,0.47) 50%,rgba(237,247,239,1) 100%);
    background: -ms-linear-gradient(top,  rgba(242,244,242,0) 5%,rgba(237,247,239,0.47) 50%,rgba(237,247,239,1) 100%);
    background: linear-gradient(to bottom,  rgba(242,244,242,0) 5%,rgba(237,247,239,0.47) 50%,rgba(237,247,239,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00f2f4f2', endColorstr='#edf7ef',GradientType=0 );
}
fieldset{
    padding:20px 10px;
    text-align:center;
}
label, input {
    margin:3px 0;
    height:25px;
    line-height:25px;
}
label {
    float:left;
    clear:both;
    width:42%;
    text-align:right;
}
input {
    float:right;
    text-indent:30px;
    width:55%;
}
legend {
    background: url('../img/login_small.png') no-repeat 2px center;
    text-indent:40px;
    font-size:1.2em;
    text-transform:uppercase;
}
input#usuario {
    background: url('../img/user.png') no-repeat 2px center;
}
input#contrasena, input#repetir_contrasena{
    background: url('../img/pass.png') no-repeat 2px center;
}
input[type="submit"] {
    background: #ccc url('../img/send.png') no-repeat 5px center;
    border-radius:3px;
    padding:10px;
    cursor:pointer;
    margin-top:10px;
    height:30px;
    line-height:5px;
    width:auto;
}
```

El código **html**:

```
<!doctype html>
<html lang="es">
<head>
	<meta charset="UTF-8" http-equiv="Content-Type" content="text/html;" />
	<title>Formulario de login</title>
	<link rel="stylesheet" href="css/style.css" type="text/css" charset="utf-8"/>
</head>

<body>
    <div id="contenedor">
        <form action="index_submit" method="get" accept-charset="utf-8">

            <fieldset>
                <legend>Login</legend>
                <label for="usuario">Usuario</label><input type="text" name="usuario" id="usuario" required="required" />
                <label for="">Contraseña</label><input type="password" name="contrasena" id="contrasena" required="required" />
                <label for="repetir_contrasena">Repetir contraseña</label><input type="password" name="repetir_contrasena" id="repetir_contrasena" required="required" />
            </fieldset>
            <p><input type="submit" value="Logear"/></p>

        </form>
    </div>
</body>
</html>
```

Si te ha gustado el formulario, puedes descargarlo desde este enlace: [formulario web centrado](https://dl.dropboxusercontent.com/u/12043780/ivanalbizu.eu/formulario-login.zip "Formulario web centrado")