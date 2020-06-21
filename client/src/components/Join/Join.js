import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
	// [ nameOfState, setterFunction ] = useState( initialValueOfTheState )
	const [ name, setName ] = useState('');
	const [ room, setRoom ] = useState(''); //pass in the initial value to this function

	//work on these onChange handlers

	//write a function that will render the Link to form
	const renderCreateFormButton = () => {
		return (
			<Fragment>
				<Link to="/create">
					<button type="submit" className="button mt-0">
						<h1 className="heading">Create your own room</h1>
					</button>
				</Link>
			</Fragment>
		);
	};

	return (
		<div className="joinOuterContainer">
			{/* render a link to CreateRoom component */}
			<div className="createFormLink">{renderCreateFormButton()}</div>

			<div className="joinInnerContainer">
				<h1 className="heading">Join</h1>
				<div>
					<input
						placeholder="Name"
						className="joinInput"
						type="text"
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="Room"
						className="joinInput mt-20"
						type="text"
						onChange={(event) => setRoom(event.target.value)}
					/>
				</div>
				<Link
					onClick={(e) => (!name || !room ? e.preventDefault() : null)}
					to={`/chat?name=${name}&room=${room}`}
				>
					<button className={'button mt-20'} type="submit">
						Sign In
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Join;
