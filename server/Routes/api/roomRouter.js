const express = require('express');
const { check, validationResult } = require('express-validator');
const Room = require('../../models/Room');

const router = express.Router();

// @route    POST '/create/:name/:description
// @desc     create a room
// @access   open
router.post(
	'/create/:name/:description',
	[
		check('name').not().isEmpty().withMessage('name should not be empty'),
		check('description').not().isEmpty().withMessage('description should not be empty')
	],
	async (req, res) => {
		//use validation result to handle validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//adding the data to my mongo collection
		try {
			const { name, description } = req.params;
			const newRoom = new Room({
				name,
				description
			});
			const createdRoom = await newRoom.save();
			res.json(createdRoom);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    GET '/'
// @desc     get all rooms
// @access   open
router.get('/', async (req, res) => {
	try {
		const rooms = await Room.find();
		res.json(rooms);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
