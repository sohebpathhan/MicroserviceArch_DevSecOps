# Basic Microservices Web App Template

Starter template for learning microservices with Node.js (Express) and simple frontend (HTML/CSS/JS).

## Folder Structure

```text
basic-microservices-template/
  user-service/
    src/
      controllers/
      routes/
      services/
      app.js
  product-service/
    src/
      controllers/
      routes/
      services/
      app.js
  order-service/
    src/
      controllers/
      routes/
      services/
      app.js
  api-gateway/
    src/
      app.js
  frontend/
    index.html
    products.html
    orders.html
    css/
    js/
```

## Services and Ports

- User Service: `http://localhost:3001`
- Product Service: `http://localhost:3002`
- Order Service: `http://localhost:3003`
- API Gateway: `http://localhost:4000`

## APIs (via gateway)

- User:
  - `POST /users/register`
  - `POST /users/login`
- Product:
  - `GET /products`
  - `POST /products`
- Order:
  - `GET /orders`
  - `POST /orders`

## Run Backend

Open 4 terminals:

### 1) User Service

```bash
cd basic-microservices-template/user-service
npm install
npm start
```

### 2) Product Service

```bash
cd basic-microservices-template/product-service
npm install
npm start
```

### 3) Order Service

```bash
cd basic-microservices-template/order-service
npm install
npm start
```

### 4) API Gateway

```bash
cd basic-microservices-template/api-gateway
npm install
npm start
```

## Run Frontend

Use any static server:

```bash
cd basic-microservices-template/frontend
python -m http.server 5500
```

Open:

- `http://localhost:5500/index.html`
- `http://localhost:5500/products.html`
- `http://localhost:5500/orders.html`

## Notes

- Data is stored in memory; restarting a service resets its data.
- Login returns a mock JWT-like token for template purposes.
- This starter is intentionally simple and ready to be extended with database/auth later.
