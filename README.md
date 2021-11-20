# API RESTful

Proyecto Final de Coderhouse

## Instalar dependencias

    npm install

## Iniciar el servidor

    npm start

## Iniciar NodeMon para desarrollo

    npm run devStart

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

### Genericos
- **PORT** (**default**: 8080): Puerto donde se iniciara el servidor
- **PRODUCTOS_DAO** (**default**: Archivos): Dao de persistencia para los productos. Opciones: Archivos,DB,SqLite,Firebase,Mongo. 
- **CARRITOS_DAO** (**default**: Archivos): Dao de persistencia para los carritos. Opciones: Archivos,Firebase,Mongo.

### Base de Datos MySql
- **DB_HOST** (**default**: "localhost"): Host de conexion para la base de datos MySql/MariaDB
- **DB_USER** (**default**: "root"): Usuario de conexion para la base de datos MySql/MariaDB
- **DB_PASSWORD** (**default**: ""): Contraseña de conexion para la base de datos MySql/MariaDB
- **DB_DATABASE** (**default**: "test"): Esquema de conexion para la base de datos MySql/MariaDB

### Base de Datos SqLite
- **SQLITE_FILENAME** (**default**: "./DB/ecommerce.db"): Ubicacion del archivo de base de datos SqLite

### Base de Datos Mongo
- **MONGO_URL** (**default**: "mongodb://localhost:27017/ecommerce"): URL de conexion de MongoDB

### Base de Datos Firebase
- **FIREBASE_FILE** (**default**: "./DB/firebase.json"): Ubicacion del archivo de conexion de Firebase


## Api de Productos

### Obtener un listado de productos

#### Request

`GET /api/productos`

    curl -i http://localhost:8080/api/productos

### Obtener un producto segun su ID

#### Request

`GET /api/productos/{id}`

    curl -i http://localhost:8080/api/productos/1

### Agregar un producto al contenedor

#### Request

`POST /api/productos`

    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"title":"Escuadra","price":123.45,"thumbnail":"https://icon.foo.bar.escuadra.png"}' \
    http://localhost:8080/api/productos

### Reempplazar un producto segun su ID

#### Request

`PUT /api/productos/{id}`

    curl --header "Content-Type: application/json" \
    --request PUT \
    --data '{"title":"Escuadra","price":123.45,"thumbnail":"https://icon.foo.bar.escuadra.png"}' \
    http://localhost:8080/api/productos/1

### Eliminar un producto segun su ID

#### Request

`DELETE /api/productos/{id}`

    curl --header "Content-Type: application/json" \
    --request DELETE \
    http://localhost:8080/api/productos/1


## Api de Carrito

### Crear un nuevo carrito

#### Request

`POST /api/carrito`

    curl --header "Content-Type: application/json" \
    --request POST \
    http://localhost:8080/api/carrito

### Eliminar un carrito segun su ID

#### Request

`DELETE /api/carrito/{id}`

    curl --header "Content-Type: application/json" \
    --request DELETE \
    http://localhost:8080/api/carrito/1

### Obtener un listado de productos de un carrito

#### Request

`GET /api/carrito/:id/productos`

    curl -i http://localhost:8080/api/carrito/1/productos

### Incorporar un producto segun su ID de producto a un carrito segun su ID

#### Request

`POST /api/carrito/{idCarrito}/productos/{idProducto}`

    curl --header "Content-Type: application/json" \
    --request POST \ 
    http://localhost:8080/api/carrito/1/productos/2

### Eliminar un producto segun su ID de producto a un carrito segun su ID

#### Request

`POST /api/carrito/{idCarrito}/productos/{idProducto}`

    curl --header "Content-Type: application/json" \
    --request DELETE \ 
    http://localhost:8080/api/carrito/1/productos/2

## Front

## Pantalla Editor de productos

`localhost:8080`

En esta pantalla se pueden administrar los productos existentes. Para eliminar, editar o agregar cualquier producto se debe marcar la casilla de administrador.

## Pantalla del Carrito

`localhost:8080\carrito.html`

Al ingresar en esta pagina, automaticamente se genera un carrito nuevo. Luego, es posible agregar o quitar productos al carrito generado.