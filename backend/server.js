const http = require('http')
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer)

const board = Array(25 * 25).fill('')
io.on('connection', async (socket) => {
    socket.emit('starterinfo', board)

    socket.on('place', ({index, piece}) => {
        board[index] = piece
        io.emit('place', {index, piece})
    })
})

app.use(express.static(path.join(__dirname, '../frontend/public')));

httpServer.listen(port);
console.log(`Listening on port ${port}`)




