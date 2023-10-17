// Load the database connection module
let con = require('./connector');

// Load the module containing sample order data
let data = require('./data');

// Define an asynchronous function for database operations
let a = async (err) => {
    // Verify if the connection was successful
    if (err) return console.log("Connection to the MySQL server failed.", err);
    else {
        // Remove the 'orders' table if present
        await new Promise((resolve, reject) => {
            con.query('DROP TABLE IF EXISTS orders', (err) => {
                console.log('Table removal attempted');
                if (err) reject(err)
                else resolve(1)
            })
        });

        // Set up the 'orders' table structure
        await new Promise((resolve, reject) => {
            console.log('Setting up the orders table');
            con.query('CREATE TABLE orders(_id varchar(200), title varchar(100), description varchar(1000) )', (err) => {
                if (err) reject(err)
                else resolve(1)
            })
        });

        // Populate the 'orders' table with sample entries
        for (let i = 0; i < data.length; i++) {
            await new Promise((resolve, reject) => {
                con.query(`INSERT into orders values("${data[i]._id}","${data[i].title}","${data[i].description}")`, (err) => {
                    if (err) reject(err)
                    else resolve(1)
                })
            });
        }
    }

    // Fetch and display the data from the 'orders' table
    let [error, result] = await new Promise((resolve, reject) => {
        con.query('SELECT * FROM orders', (err, data) => {
            if (err) reject([err, undefined])
            else resolve([undefined, data])
        })
    });

    // Log any errors encountered during the fetch operation
    if (error) {
        console.log(error);
    }
}

// Initiate the database operations using the async function
a();
