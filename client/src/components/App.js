import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './Join/Join.js';
import Chat from './Chat/Chat';

class App extends Component {
	render() {
		return (
			<Router>
				<Route path="/" exact component={Join} />
				<Route path="/chat" component={Chat} />
			</Router>
		);
	}
}

export default App;
