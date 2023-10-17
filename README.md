# Zomato Backend Boilerplate: Order API

A robust Node.js server that offers an API endpoint to fetch order details from a MySQL database's `orders` table.

## Table of Contents

- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Launching the Server](#launching-the-server)

## Key Features

- Seamless retrieval of orders from the `orders` database table.
- Provision for optional `offset` and `limit` query parameters to fine-tune the fetched results.
- Smart parameter validation that defaults to pre-set values in case of anomalies.

## Getting Started

1. Clone the repository:
   ```shell
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   npm install
   ```

2. Install necessary extensions:
   ```shell
   npm i swagger-jsdoc swagger-ui-express
   ```

3. Set up the database:
   ```shell
   node createdatabase.js
   ```

4. Fire up the server:
   ```shell
   node index.js
   ```

Our backend is architected with a modular approach. While the main API connections reside in the core file, database interactions are modularized into a separate file, ensuring clean and maintainable code. The primary routing mechanism is orchestrated through the `index.js` file.

## API Endpoints

- **Fetch All Orders**
  - **Endpoint**: `GET [http://localhost:8080/api/orders
  - **Response**: An array of order objects.

- **Fetch Orders with Pagination**
  - **Endpoint**: `GET [http://localhost:8080/api/orders?limit=4&offset=1
  - **Response**: An array of order objects, filtered by provided `limit` and `offset` parameters.

- Error Handling:
  - **Response**: In the event of server errors, the API will return a status code of 500, accompanied by an error message such as "Internal server error."

## Launching the Server

Once the setup is complete, you can access the server locally at `http://localhost:8080/`. Explore various API routes to fetch data or retrieve documentation.

 
