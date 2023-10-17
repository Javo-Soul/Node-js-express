const fs = require('fs');

class ProductManager {
    constructor(path) {
      this.path = path;
      this.id = 0;
      this.products = this.loadProducts(path);
    }
    loadProducts(path) {
      let rawdata = fs.readFileSync(path);
      let products = JSON.parse(rawdata);
      return products;
    }
    addProduct(product) {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        throw new Error("Faltan campos obligatorios");
      }
      const productExists = this.products.find((p) => p.code === product.code);
      if (productExists) {
        throw new Error("El código del producto ya existe");
      }
      this.id++;
      product.id = this.id;
      this.products.push(product);
      this.saveProducts();      
    }
    getProducts() {
      return this.products;
    }
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    }
    updateProduct(id, product) {
      const productToUpdate = this.products.find((p) => p.id === id);
      if (!productToUpdate) {
        throw new Error("Producto no encontrado");
      }
      productToUpdate.title = product.title || productToUpdate.title;
      productToUpdate.description = product.description || productToUpdate.description;
      productToUpdate.price = product.price || productToUpdate.price;
      productToUpdate.thumbnail = product.thumbnail || productToUpdate.thumbnail;
      productToUpdate.code = product.code || productToUpdate.code;
      productToUpdate.stock = product.stock || productToUpdate.stock;
      this.saveProducts();
    }
    deleteProduct(id) {
      const productToDelete = this.products.find((p) => p.id === id);
      if (!productToDelete) {
        throw new Error("Producto no encontrado");
      }
      this.products = this.products.filter((p) => p.id !== id);
      this.saveProducts();
    }
    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
  }
};

// const productManager = new ProductManager('src/products.json');
// productManager.addProduct({
//     title: "Producto 1",
//     description: "Descripción del producto 1",
//     price: 100,
//     thumbnail: "ruta/a/imagen1.jpg",
//     code: "codigo3",
//     stock: 10,
// });
// console.log(productManager.getProducts());

// const productManager1 = new ProductManager('src/products.json');
// console.log(productManager1.getProducts());
