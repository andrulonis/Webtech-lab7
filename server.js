const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

router.get("/products", (req, res) => {
  res.send("Products");
});

app.use(bodyParser.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});