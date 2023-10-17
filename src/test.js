const fs = require('fs');

class ProductManager {
    constructor(path) {
      this.path = path;
      this.id = 0;
      this.products = [];
    }
    addProduct(product) {
      // ... (código existente)

      this.saveProducts();
    }
    getProducts() {
      return this.products;
    }
    getProductById(id) {
      // ... (código existente)
    }
    updateProduct(id, product) {
      // ... (código existente)

      this.saveProducts();
    }
    deleteProduct(id) {
      // ... (código existente)

      this.saveProducts();
    }
    saveProducts() {
      fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
 }

const productManager = new ProductManager('products.json');
productManager.addProduct({
 title: "Producto 1",
 description: "Descripción del producto 1",
 price: 100,
 thumbnail: "ruta/a/imagen1.jpg",
 code: "codigo1",
 stock: 10,
});

console.log(productManager.getProducts());