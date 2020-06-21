import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './CreateRoom.css';

const CreateRoom = () => {
	return (
		<div className="createRoomForm">
			<h3 className="heading">Create a new Room</h3>
			<div className="inputGroup">
				<label>Name: </label>
				<input type="text" className="roomName" placeholder="name of the room : eg 'Javascript'" />
			</div>

			<div className="inputGroup">
				<label>Description</label>
				<textarea className="description" placeholder="Description about your room" />
			</div>

			<button type="submit">Create Room</button>
		</div>
	);
};

export default CreateRoom;
