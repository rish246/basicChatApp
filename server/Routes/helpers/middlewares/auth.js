// this function will validate the token and give access if this satisfies
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	//grab token from 'x-auth-token' header
	const token = req.header('x-auth-token');
	if (!token) {
		return res.status(401).json({ error: { message: 'Unauthorised access' } });
	}

	//verify if the token is right or not
	try {
		jwt.verify(token, config.get('jwSecret'), (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: { message: 'Unauthorised access' } });
			}

			req.user = decoded.user;
			next();
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
};
