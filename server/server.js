
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const logRoutes = require('./routes/logRoutes');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app); 
const io = socketIo(server);  


app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],  
  })
);

app.use(bodyParser.json());  

app.use('/api/auth', authRoutes);
app.use('/api', logRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('message', { message: 'Welcome to the WebSocket server!' });

  socket.on('new-log', (newLog) => {
    console.log('Received new log:', newLog);
    io.emit('new-log', newLog); 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

db.sync()
  .then(() => {
    console.log('Database synced successfully');
    server.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
