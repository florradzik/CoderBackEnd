const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static('./public'));

const messages = [
  { author: 'Juan', text: '¡Hola! ¿Que tal?' },
  { author: 'Pedro', text: '¡Muy bien! ¿Y vos?' },
  { author: 'Ana', text: 'Genial!' }
];

io.on('connection', (socket) => {
  console.log('User conectado, id: ' + socket.id);
  socket.emit('messages', messages);

  socket.on('new-message', (data) => {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});

httpServer.listen(8080, () => {
  console.log('Servidor corriendo en http://localhost:8080');
});

