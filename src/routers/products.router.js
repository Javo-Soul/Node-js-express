const fs = require("fs");
const products = JSON.parse(fs.readFileSync("src/routers/products.json"));

const { Router } = require('express');
const router = Router();

router.get("/products", (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

router.post('/products', (req, res) =>{
  const {body} = req;
  const newProduct = {
      id : products.length + 1,
      ...body,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put('/products/:uid', (req, res) => {
  const { body, params } = req;
  const userId = params.uid
  const position = products.findIndex((currentUser) =>{
      return currentUser.id === parseInt(userId);
  });
  if (position === -1){
      res.status(404).json({message : 'el usuario no se encontro '})
  }
  products[position] = {
      id : parseInt(userId),
      ...body,
  };
  res.status(200).json({message : 'el usuario fue actualizado correctamente'});
});

router.get("/products/:pid", (req, res) => {
  const pid = req.params.pid;
  const product = products.find((p) => parseInt(p.id) === parseInt(pid));
  if (!product) {
    res.status(404).json({ error: `Producto con ID ${pid} no encontrado`});
  } else {
    res.json(product);
  }
});

router.delete('/products/:uid', (req, res) => {
  const { params } = req;
  const userId = params.uid;
  const position = products.findIndex((currentUser) => {
    return currentUser.id === parseInt(userId);
  });
  if (position === -1) {
    res.status(404).json({ message: 'El usuario no se encontro 😨'});
    return;
  }
  const user = products.splice(position, 1);
  res.status(200).json({ message: 'El usuario se elimino correctamente 😅', userDeleted: user });
});

module.exports = router;
