const express = require('express');
const bcrypt = require('bcryptjs');
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
				return res.status(400).json({ error: 'User already exists' });
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

			res.json(user);
			await user.save();
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
