# API RESTful

Proyecto Final de Coderhouse

## Instalar dependencias

    npm install

## Iniciar el servidor

    npm start

## Iniciar NodeMon para desarrollo

    npm run devStart

## Iniciar test de carga

    artillery run benchmark.yml > test/loadTest.txt

## Instalar/Desinstalar Tablas en base de datos

### MariaDB

#### Instalar
    npm run installMariaDB

#### Desinstalar
    npm run uninstallMariaDB

### SqLite

#### Instalar
    npm run installSqLite

#### Desinstalar
    npm run uninstallSqLite

## Variables de Entorno

Ver archivo desa.env con el detalle de las configuraciones mediante variables de entorno.

Para seleccionar archivos .env de variables de entorno, se debe configurar la variable de entorno NODE_ENV

Estas son las opciones disponibles:

    - Desarrollo [DESA]: desa.env
    - Testing [TEST]: test.env
    - Staging [STG]: stg.env
    - Homologacion [HOMO]: homo.env
    - Produccion [PROD/default]: .env
    
# Front

## Pantalla del Carrito (inicio)

`localhost:8080`

Al ingresar en esta pagina, automaticamente se genera un carrito nuevo. Ademas, es posible agregar/quitar productos al carrito generado, limpiar el carrito y generar uno nuevo o crear una orden con los items del carrrito

## Pantalla Editor de productos

`localhost:8080/productos.html`

En esta pantalla se pueden administrar los productos existentes. Para eliminar, editar o agregar cualquier producto se debe ser administrador del sistema.

## Pantalla del Chat

`localhost:8080/chat.html`

Al ingresar en esta pagina, se accede a un canal de chat al cual todos los usuarios tienen acceso

## Pantalla del Ordenes

`localhost:8080/ordenes.html`

Al ingresar en esta pagina, se puede acceder al listado de las ordenes que realizo el usuario

## Pantalla del Login

`localhost:8080/login.html`

Pantalla requerida para iniciar sesion en el sistema

## Pantalla del Registro

`localhost:8080/info`

Pantalla de informacion del servidor y de la conifguracion de ejecucion

## Pantalla del Documentacion de Apis

`localhost:8080/swagger-ui`

Para obtener la especificacion de uso de todas las apis, se puede acceder al Swagger generado en la ruta mencionada.

# WebSockets

## Canal '/ws/chat'

### Eventos que recibe el servidor:

- `connection`: Evento con el cual el cliente puede conectarse al servidor. El servidor validara la identidad del cliente mediante un token de acceso y emitira un evento de tipo "invalidToken" al cliente en caso de no ser valido. En caso de validacion ok, el servidor emitira un evento de tipo "actualizarMensajes" a la conexion entrante.
    Query Parameters: token=access_token

- `nuevoMensaje`: Evento con el cual el cliente puede enviar un nuevo mensaje al servidor. El servidor validara la identidad del cliente mediante un token de acceso y emitira un evento de tipo "invalidToken" al cliente en caso de no ser valido. En caso de validacion ok, el servidor emitira un evento de tipo "actualizarMensajes" a todas las conexiones.
    Parameters: (mensaje, access_token)

- `obtenerMensajes`: Evento con el cual el cliente puede solicitar al servidor que emita un evento de tipo "actualizarMensajes" solo a el mismo. El servidor validara la identidad del cliente mediante un token de acceso y emitira un evento de tipo "invalidToken" al cliente en caso de no ser valido.
    Parameters: ({}, access_token)

### Eventos que puede emitir el servidor:

- `actualizarMensajes`: Evento con el cual el servidor informa a el/los cliente/s el listado total de mensajes persistidos en el servidor.
- `invalidToken`: Evento con el cual el servidor le infroma a el cliente que su token de acceso se encuentra expirado y debe solicitar uno nuevo.