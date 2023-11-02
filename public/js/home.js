const socket = io();

socket.on('new product', (product) => {
 // Actualice la lista de productos en el cliente
});

document.getElementById('productForm').addEventListener('submit', (e) => {
 e.preventDefault();

 const product = {
    name: e.target.name.value,
    price: e.target.price.value,
 };

 // Envíe el formulario a través de websocket en lugar de HTTP
 socket.emit('add product', product);
});