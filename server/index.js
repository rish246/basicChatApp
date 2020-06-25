const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const connectDB = require('./config/db');
const chatRouter = require('./Routes/api/chatRouter');
const roomRouter = require('./Routes/api/roomRouter');
const authRouter = require('./Routes/api/authRouter');

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Server is up and running');
});

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
app.use('/api/chat', chatRouter);
app.use('/api/auth', authRouter);
app.use('/api/room', roomRouter);

server.listen(PORT, () => {
	console.log(`listening at port number ${PORT}`);
});
