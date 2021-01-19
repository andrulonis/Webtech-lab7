// https://www.sqlitetutorial.net/sqlite-nodejs/

const sqlite = require('sqlite3').verbose();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const db = createDatabase('./products.db');

app.use(bodyParser.json());

// TODO: add code that checks for errors so you know what went wrong if anything went wrong
// TODO: set the appropriate HTTP response headers and HTTP response codes here.

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/documentation.html");
})

app.get("/products/", (req, res) => {
	db.all("SELECT id, product, origin, best_before_date, amount, image FROM products", function(err, rows) {
    return res.json(rows);
	})
});

app.get("/products/:id", (req, res) => {
	db.all("SELECT id, product, origin, best_before_date, amount, image FROM products WHERE id=" + req.params.id, (err, rows) => {
    if (err) {
      return res.send(err);
    }
    else {
      return res.json(rows[0]);
    }
	})
});

app.post("/products", (req, res) => {
  let item = req.body;

	db.run(`INSERT INTO products (product, origin, best_before_date, amount, image)
	VALUES (?, ?, ?, ?, ?)`,
	[item['product'], item['origin'], item['best_before_date'], item['amount'],  item['image']], (err, rows) => {
    return res.status(201).send("success");
	});
});

app.put("/products", (req, res) => {
  let item = req.body;

	db.run(`UPDATE products
	SET product=?, origin=?, best_before_date=?, amount=?,
	image=? WHERE id=?`,
	[item['product'], item['origin'], item['best_before_date'], item['amount'], item['image'], item['id']], (err, rows) => {
    return res.status(200).send("success");
	});
});

app.delete("/products/:id", (req, res) => {
  db.run("DELETE FROM products WHERE id=" + req.params.id, (err, rows) => {
    return res.status(204).send("success");
	});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}...`);
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