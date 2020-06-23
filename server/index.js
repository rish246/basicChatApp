const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const connectDB = require('./config/db');
const chatRouter = require('./Routes/api/chatRouter');
const roomRouter = require('./Routes/api/roomRouter');

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

//creating a new instance of socketio
const io = socketio(server);

//when a user joins => we assign a socket to the user
io.on('connection', (socket) => {
	console.log('User connected to our server');

	//when user disconnects, the socket is disconnected as well
	socket.on('join', ({ name, room }) => {
		console.log(name, room);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected from the server');
	});
});

app.use(express.json({ extended: true }));
app.use(chatRouter);
app.use('/api/room', roomRouter);

server.listen(PORT, () => {
	console.log(`listening at port number ${PORT}`);
});
