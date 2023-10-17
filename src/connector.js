// Use the 'mysql2' module for connecting to MySQL
var mysql = require('mysql2');

// Set up the MySQL connection details
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    port: "3306"  // Default MySQL port
});

// Attempt to establish the connection
con.connect(function (err) {
    if (err) {
        console.error("Error connecting to the MySQL server.", err);
    } else {
        console.log("Successfully connected to the database!");
    }
});

// Make the connection object available for other files
module.exports = con;   

