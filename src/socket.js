import { Server } from 'socket.io'

const conversation = [
  { socketId: 1234, msg: 'Hola, que tal?'},
];

let socketServer;

export const init = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socketClient) => {
    console.log(`Nuevo cliente socket conectado ${socketClient.id} 🎊`);

    socketClient.on('disconnect', () => {
      console.log(`cliente socket desconectado ${socketClient.id} 🎊`);
      });

   socketClient.emit('conversation', { conversation });

   socketClient.on('message', (msg) => {
    conversation.push({ socketId: socketClient.id, msg });
    socketServer.emit('conversation', { conversation });
      });
   
   socketClient.on('add product', (product) => {
    io.emit('new product', product);
    });
  });
}
