const http = require('http')
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer)

const board = Array(25 * 25).fill('')
const listOfPlayers = {}
io.on('connection', async (socket) => {
    listOfPlayers[socket.id] = {position: {x: 0, y: 0}, nextRound: 1}
    io.emit('starterinfo', {board, listOfPlayers})

    socket.on('place', ({index, piece, nextPiece}) => {
        board[index] = piece
        listOfPlayers[socket.id].nextRound = nextPiece;
        io.emit('place', {index, piece, nextPiece, id: socket.id})
    })
    socket.on('move', (position) => {
        listOfPlayers[socket.id].position = position
        io.emit('move', {position, id: socket.id})
    })
    socket.on('disconnect', () => {
        delete listOfPlayers[socket.id]
        io.emit('starterinfo', {board, listOfPlayers})
    })
})

app.use(express.static(path.join(__dirname, '../frontend/public')));

httpServer.listen(port);
console.log(`Listening on port ${port}`)




