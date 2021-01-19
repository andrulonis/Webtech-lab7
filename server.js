// https://www.sqlitetutorial.net/sqlite-nodejs/

const sqlite = require('sqlite3').verbose();
const express = require("express");

const db = createDatabase('./products.db');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// TODO: Add your routes here and remove the example routes once you know how

/*app.get('/db-example', function(req, res) {
    db.all(`SELECT * FROM products WHERE product=?`, ['Apples'], function(err, rows) {

    	// TODO: add code that checks for errors so you know what went wrong if anything went wrong
    	// TODO: set the appropriate HTTP response headers and HTTP response codes here.

    	return res.json(rows)
    });
});*/

app.get("/products", (req, res) => {

});

app.post("/products", (req, res) => {
	console.log(req.body);
	return res.json(req.body);
});

app.put("/products", (req, res) => {

});

app.delete("/products", (req, res) => {
  
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:3000/${PORT}...`);
});

// === DATABASE === //

function createDatabase(filename) {
	var db = new sqlite.Database(filename, (err) => {
    if (err) {
      console.error(err.message);
    }

    console.log('Connected to the products database.');
  });
  
	db.serialize(() => {
		db.run(`
        	CREATE TABLE IF NOT EXISTS products
        	(id 	  INTEGER PRIMARY KEY,
        	product	CHAR(100) NOT NULL,
        	origin 	CHAR(100) NOT NULL,
        	best_before_date 	CHAR(20) NOT NULL,
          amount  CHAR(20) NOT NULL,
        	image   CHAR(254) NOT NULL
          )`);
          
		db.all(`select count(*) as count from products`, (err, result) => {
			if (result[0].count == 0) {
				db.run(`INSERT INTO products (product, origin, best_before_date, amount, image) VALUES (?, ?, ?, ?, ?)`,
				["Apples", "The Netherlands", "November 2019", "100kg", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Apples.jpg/512px-Apples.jpg"]);
				console.log('Inserted dummy Apples entry into empty product database');
			} else {
				console.log("Database already contains", result[0].count, " item(s) at startup.");
			}
		});
  });
  
	return db;
}