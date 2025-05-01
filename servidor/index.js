const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const server = http.createServer(app);
const io = new Server(server);

// Ruta absoluta segura hacia index.html en carpeta cliente
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../cliente/index.html'));
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});