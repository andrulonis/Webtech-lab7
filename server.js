const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

// TODO: Return products from database
router.get("/products", (req, res) => {
  res.send("Products");
});

router.post("/products", (req, res) => {})
router.put("/products", (req, res) => {})
router.delete("/products", (req, res) => {})

app.use(bodyParser.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});