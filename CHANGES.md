# Cambios implementados para refactorizar la aplicación hecha con Node Express 

## Estructura y archivos

- He cambiado el nombre del archivo principal de 'index.js' a 'app.js' que se usa en las aplicaciones hechas con Express para definirla. 'index.js' (o 'server.js') normalmente se usa como un archivo de entrada que arranca la aplicación.

- He creado la carpeta `src` para separar el código principal de la configuración.

- He cambiado el script de entrada con el nombre nuevo: También he añadido un script de desarrollo `"dev": "nodemon src/app.js"` usando la herramienta nodemon que reinicia automaticamente la aplicación cada vez que detecta un cambio. Esto agiliza el proceso de desarrollo y no hay que escribir el comando cada vez manualmente.

- He creado el archivos de rutas, middlewares y controladores para separar las resposabilidas de capa parte de aplicación y he distribuido cada parte en su sitio.

- La variable SECRET he movido a un archivo `.env` para ocultarla porque tiene que estar protegida por seguridad. Esta variable he duplicado en `.env.template` pero sin enseñar su valor para los compañeros de este proyecto sepán que variables se usa en él. Para usarla como una variable de entorno hr instalado una dependencia `dotenv`. También he añadido la varibe PORT porque el puerto se puede cambiar y al desplegar el provedor asigna su puerto a la variable PORT.

- He creado el archivpo `.gitignore` para evitar que se suban la carpeta con los módulos y el archivo privado `.env`.

## verifyToken.middleware.js

- He centrado la lógica de la comprobación del token en este middleware por que es un paso intermedio antes de seguir manejando la respuesta. Si el usuario no está autenticado o autorisado, el siguiente paso ya no se implementa.

- He ampliado la respuesta JSON para poder manejala mejor desde el forntend: 

```javascript
return res.status(401).json({
    ok: false,
    message: 'No hay token en la petición.'
});
```

Esta parte de código no es recomendable para Node.js porque bloquea otras peticiones de HTTP mientas se espera el fin de su ejecución. Además, gasta los recursos de CPU. 

```javascript
const end = Date.now() + 200; while (Date.now() < end) { /* espera activa */ }
```
Es mejor simular la espera mediante una promesa que no bloque las peticiones:

```javascript
await new Promise(resolve => setTimeout(resolve, 200));
```
## Comprobación del funcionamiento
He hecho las llamadas con POSTMAN:

1. Login:
```javascript
http://localhost:3001/api/v1/auth/login  
method: POST,
body: {
    "username": "juan"
}
```
He recibido la respuesta correcta:
```javascript
{
    "ok": true,
    "message": "Login de usuario",
    "user": "juan",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1YW4iLCJpYXQiOjE3Njg1MTc1NDF9.x24g2pDnrCDdmcgsyYgK8q3NxqTaAPKJNTFZCpKnaoc"
}
```

2. Recibir la información sobre el usuario autenticado:
```javascript
http://localhost:3001/api/v1/auth/me
method: GET,
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1YW4iLCJpYXQiOjE3Njg1MTY1MjV9.IpjKwmadr-3iHxKN70VdoKw3lMxlyRWoTFiZHcJOnlQ
```
He recibido la respuesta correcta:
```javascript
{
    "ok": true,
    "message": "Token verificado",
    "user": "juan"
}
```