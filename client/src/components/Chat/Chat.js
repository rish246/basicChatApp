import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

//assign a new socket to the user
let socket;
const Chat = ({ location }) => {
	//we use lifecycle methods
	const [ name, setName ] = useState('');
	const [ room, setRoom ] = useState('');
	const ENDPOINT = 'localhost:5000';
	useEffect(
		() => {
			const { name, room } = queryString.parse(location.search);

			socket = io(ENDPOINT); //user connects to our server

			setName(name);
			setRoom(room);

			//emit an event to the backend
			socket.emit('join', { name, room }, () => {});

			//return when component unmounts
			return () => {
				socket.emit('disconnect');

				//turn the socket off
				socket.off();
			};
		},
		[ ENDPOINT, location.search ]
	); // parameters which will trigger the useEffect hook only when one of these pm changes

	return <div> Chat </div>;
};

export default Chat;
