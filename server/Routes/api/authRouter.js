const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const router = express.Router();

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
	'/signup',
	[
		check('username').not().isEmpty().isLength({ min: 5 }).withMessage('Username cannot be empty'),
		check('email').isEmail().withMessage('email is required'),
		check('password').exists().isLength({ min: 6, max: 15 }),
		check('confirmPassword').exists().isLength({ min: 6, max: 15 })
	],
	async (req, res) => {
		//this is done outside of trycatch cause we are not making calls to the db now
		// once we start making calls to the database, we might have to use trycatch just in case something goes wrong
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
		}

		let { username, email, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: 'Passwords do not match' });
		}

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ error: { message: 'User already exists' } });
			}

			// console.log('Can create account');

			// hash the password and create a new User
			const salt = await bcrypt.genSalt(10);
			password = await bcrypt.hash(password, salt);

			user = new User({
				username,
				email,
				password
			});

			// apply jsonWebToken based authentication for tomorrow

			//define payload
			const payload = {
				user: {
					id: user._id
				}
			};

			//call jwt.sign function
			jwt.sign(payload, config.get('jwSecret'), { expiresIn: 3600 }, (err, token) => {
				if (err) throw err;

				res.json({ token });
			});
			await user.save();
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}
);

// @route    POST api/users/signin
// @desc     loginUser
// @access   Public
router.post(
	'/signin',
	[
		check('email').isEmail().withMessage('Email is required'),
		check('password').exists().withMessage('Password is required')
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		///// try to login the user
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ error: { message: 'User does not exist' } });
			}

			let isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ error: { message: 'Invalid email or password' } });
			}

			//generate a jsonWebToken and send to user
			const payload = {
				user: {
					id: user._id
				}
			};

			jwt.sign(payload, config.get('jwSecret'), { expiresIn: 3600 }, (err, token) => {
				if (err) throw err;

				res.json({ token });
			});

			//match the passwords
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;

//generate a jsonwebtoken and send the jsontoken in response
