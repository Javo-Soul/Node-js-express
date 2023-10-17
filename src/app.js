const express = require("express");
const fs = require("fs");
const app = express();
const products = JSON.parse(fs.readFileSync("src/products.json"));
app.get("/products", (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});
app.get("/products/:pid", (req, res) => {
  const pid = req.params.pid;
  const product = products.find((p) => p.id === pid);
  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
  } else {
    res.json(product);
  }
});
app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

