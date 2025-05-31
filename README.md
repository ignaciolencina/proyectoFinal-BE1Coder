# API Endpoints - Productos y Carritos

Instrucciones para el uso de la APP. Se debe utilizar el comando `npm run dev` para inicializar el servidor. El repositorio cuenta con un archivo `.env.sample` donde se indica las variables de entorno que deben de usarse.

## 🛍️ PRODUCTS - SOLO PARA POSTMAN - /api/v1/products

Estos endpoints se pueden utilizar a través de postman. Estos endpoints no renderizan vistas en handlebars, sino devuelven respuestas en formato JSON.

### 🔹 Get all products

**GET**  
`http://localhost:8080/api/v1/products`

---

### 🔹 Get product by ID

**GET**  
`http://localhost:8080/api/v1/products/6833a4f8ee455ec794c5a569`

---

### 🔹 Create a new product

**POST**
`http://localhost:8080/api/v1/products`

Los productos por default se crean con estado "active" = true;

**Body (JSON):**

```json
{
  "name": "Mouse Logitech M120",
  "description": "Mouse color negro",
  "code": "Mouse004",
  "price": 150000,
  "stock": 10,
  "category": "Mouses",
  "imageUrl": "mouse004URL"
}
```

---

### 🔹 Update product by ID

**PUT**  
`http://localhost:8080/api/v1/products/6833a4f8ee455ec794c5a569`

**Body (JSON):**

```json
{
  "description": "Silla ergonómica de color blanco con base plástica",
  "price": 320000
}
```

---

### 🔹 Delete product by ID

**DELETE**  
`http://localhost:8080/api/v1/products/6833a4f8ee455ec794c5a569`

---

## 🛒 CARTS - SOLO PARA POSTMAN - api/v1/carts

Estos endpoints se pueden utilizar a través de postman. Estos endpoints no renderizan vistas en handlebars, sino devuelven respuestas en formato JSON. 
El esquema de `carts` utiliza `populate` en su relación con el esquema de `products`, lo que permite obtener toda la información del producto referenciado simplemente pasando su ID. Esto facilita el acceso a los datos completos del producto dentro de cada carrito.

### 🔹 Get all carts

**GET**  
`http://localhost:8080/api/v1/carts`

---

### 🔹 Get cart by ID

**GET**  
`http://localhost:8080/api/v1/carts/683629426922d78a5a6e7b65`

---

### 🔹 Create a new cart

**POST**  
`http://localhost:8080/api/v1/carts`

**Body (JSON):**

```json
{
  "products": [
    {
      "productId": "6833a4f8ee455ec794c5a569",
      "quantity": 2
    },
    {
      "productId": "6833a550b55db15aa0e81ab1",
      "quantity": 1
    }
  ]
}
```

---

### 🔹 Update all cart

**PUT**  
`http://localhost:8080/api/v1/carts/683629426922d78a5a6e7b65`

**Body (JSON):**

```json
{
  "products": [
    {
      "productId": "6833a66bb55db15aa0e81ab9",
      "quantity": 10
    },
    {
      "productId": "6834e2cee2b44004e0cc5655",
      "quantity": 10
    }
  ]
}
```

---


### 🔹 Update product quantity

**PUT**  
`http://localhost:8080/api/v1/carts/683629426922d78a5a6e7b65/products/6833a66bb55db15aa0e81ab9`

**Body (JSON):**

```json
{ "quantity": 5 }
```

---

### 🔹 Delete cart

**DELETE**
`http://localhost:8080/api/v1/carts/683629426922d78a5a6e7b65`

---

### 🔹 Delete a product from a cart

**DELETE**
`http://localhost:8080/api/v1/carts/683629426922d78a5a6e7b65/products/6833a66bb55db15aa0e81ab9`

---

## 🛠️ RENDERIZADO DE VISTAS - /api/v1/views

Estos endpoints permiten visualizar productos y carritos utilizando Handlebars como motor de plantillas.
Siguiendo el principio de Separation of Concerns (SoC), la lógica de renderizado se encuentra encapsulada en un controlador independiente, cuya única responsabilidad es gestionar las vistas y devolver las respuestas necesarias para el funcionamiento de características como paginación, filtros y ordenamiento.


### 🔹 Get all products

En caso de no proporcionar parámetros de paginación, se aplican los valores predeterminados: `page=1` y `limit=10`.

**GET - Ejemplos**  
Endpoint base: `http://localhost:8080/api/v1/views/products`
- `http://localhost:8080/api/v1/views/products?page=2`
- `http://localhost:8080/api/v1/views/products?limit=5`
- `http://localhost:8080/api/v1/views/products?sort=asc`
- `http://localhost:8080/api/v1/views/products?sort=desc`
- `http://localhost:8080/api/v1/views/products?query=auriculares`
- `http://localhost:8080/api/v1/views/products?page=2&limit=3&sort=desc&query=redragon`

---

### 🔹 Get all carts
**GET**
`http://localhost:8080/api/v1/views/carts`

---

### 🔹 Get cart by ID
**GET**
`http://localhost:8080/api/v1/views/carts/68375d878d166adc11198cab`
