// https://www.sqlitetutorial.net/sqlite-nodejs/
//TODO: ASK ABOUT TABLE BEING RESPONSIVE, AND ABOUT REFRESHING IF IT IS A PROBLEM
//TODO: ask if delete and update are done correctly or should it be stupid ASK ABOUT ID AND DELETE AND IF THE WEBSITE SHOULD BE ON SAME SERVER OR NOT
const sqlite = require("sqlite3").verbose();
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");

const app = express();
const db = createDatabase("./products.db");

const corsOptions = {
  origin: "http://localhost:5500"
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

/// Add this for serving the client website (prevents refreshing)

app.use(express.static(__dirname + "/client"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
})

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/documentation.html");
})

app.get("/products", (req, res) => {
	db.all("SELECT id, product, origin, best_before_date, amount, image FROM products", (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("500 Error retrieving products from database");
    }
    res.status(200);
    res.json(rows);

    return res;
	})
});

app.get("/products/:id", (req, res) => {
  let id = req.params.id;

	db.all("SELECT id, product, origin, best_before_date, amount, image FROM products WHERE id=" + id, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("500 Error retrieving product from the database.");
    }
    else if (rows.length === 0) {
      return res.status(404).send(`404 Cannot find a product with id ${id}`);
    }
    res.status(200);
    
    return res.json(rows[0]);
	})
});

app.post("/products", (req, res) => {
  let item = req.body;

  if (!item["product"] || !item["origin"] || !item["best_before_date"] || !item["amount"] || !item["image"]) {
    return res.status(400).send("400 Bad request");
  }

	db.run(`INSERT INTO products (product, origin, best_before_date, amount, image)
	VALUES (?, ?, ?, ?, ?)`,
	[item["product"], item["origin"], item["best_before_date"], item["amount"],  item["image"]], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("500 Error inserting product into the database.");
      return res.send(err);
    }

    res.status(201);

    return res.send("201 Created");
	});
});

app.put("/products", (req, res) => {
  let item = req.body;

  db.all("SELECT * FROM products where id=" + item["id"], (err, rows) => {
    if (err) {
      return res.status(500).send("500 Error finding product in the database.");
    }
    else if (rows.length === 0) {
      return res.status(404).send(`404 Cannot find a product with id ${item["id"]}`);
    }
    else {
      // FIXME: Refresh
      db.run(`UPDATE products
        SET product=?, origin=?, best_before_date=?, amount=?,
        image=? WHERE id=?`,
        [item["product"], item["origin"], item["best_before_date"], item["amount"], item["image"], item["id"]], (err, rows) => {
          if (err) {
            console.error(err);
            return res.status(500).send("500 Error updating product in the database.");
          }
          res.status(200);

          return res.status(200).send("200 OK");
      });
    }
  })
});

app.get("/reset", (req, res) => {
  console.log("@andrulonis");
  db.run("DELETE FROM products",(err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("500 Error deleting products from the database." + err);
    }
    res.status(204);

    return res.send("204 No Content");
	});
});

app.delete("/products/:id", (req, res) => {
  let id = req.params.id;

  db.all("SELECT * FROM products where id=" + id, (err, rows) => {
    if (err) {
      return res.status(500).send("500 Error finding product in the database.");
    }
    else if (rows.length === 0) {
      return res.status(404).send(`404 Cannot find a product with id ${id}`);
    }
    else {
      db.run("DELETE FROM products WHERE id=" + id, err => {
        if (err) {
          return res.status(500).send("500 Error deleting product from the database.");
        }
        res.status(204);
    
        return res.send("204 No Content");
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.info(`Listening on http://localhost:${PORT}...`);
});

// === DATABASE === //
function createDatabase(filename) {
	var db = new sqlite.Database(filename, (err) => {
    if (err) {
      console.error(err.message);
    }

    console.log("Connected to the products database.");
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
				["Apples", "The Netherlands", "November 2019", "100", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Apples.jpg/512px-Apples.jpg"]);
				console.log("Inserted dummy Apples entry into empty product database");
			} else {
				console.log("Database already contains", result[0].count, " item(s) at startup.");
			}
		});
  });
  
	return db;
}