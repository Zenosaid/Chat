const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const filteredWords = ['fuck', 'shit', 'bitch', 'dick', 'nigger', 'nigga', 'ass', 'asshole', 'whore', 'hoe']

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    const hasFilteredWords = filteredWords.some((word) =>
      msg.toLowerCase().includes(word.toLowerCase())
    );
    // Check if the message contains any filtered words

    if (!hasFilteredWords) {
      io.emit('chat message', msg);
    }
  });

  app.get('/chatroom', (req, res) => {
    const joinCode = req.query.code;
    if (joinCode) {
      const chatRoom = chatRooms.find(room => room.code === joinCode);
      if (chatRoom) {
        return res.sendFile(__dirname + '/chat.html');
      }
    }
    res.status(404).send('Chat room not found.');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

