# API RESTful

Proyecto Final de Coderhouse

## Instalar dependencias

npm install

## Iniciar el servidor

node ./server.js

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