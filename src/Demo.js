const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const port = process.env.PORT || 8080;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config()

// Set up Swagger documentation options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: '1.0.0',
    },
  },
  apis: ["index.js"],
};

// Initialize Swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Swagger doc for GET /api/orders endpoint
/**
 * @swagger
 * /api/orders?limit=4&offset=3:
 *   get:
 *     description: Retrieve orders with pagination
 *     responses:
 *       200:
 *         description: Successful retrieval of orders
 * 
 */
// Apply middleware to process request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up MySQL connection parameters
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
  connectionLimit: 10,
});

// Endpoint to fetch orders with pagination
app.get('/api/orders', async (req, res) => {
  // Extract and validate query parameters
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const validLimit = Number.isInteger(limit) && limit > 0 ? limit : 10;
  const validOffset = Number.isInteger(offset) && offset >= 0 ? offset : 0;

  try {
    // Get a database connection and fetch data
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      'SELECT * FROM orders LIMIT ? OFFSET ?',
      [validLimit, validOffset]
    );
    res.status(200).json(rows);
  } catch (error) {
    // Log and respond in case of an error
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// Initialize server
app.listen(port, () => console.log(`Server running on port ${port}.`));
