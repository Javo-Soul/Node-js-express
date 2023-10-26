const express = require("express");
const app = express();
const PORT = 8080;

const productRouter = require('./routers/products.router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', productRouter);


app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT} 🚀`);
});

//http://localhost:8080/products?limit=10