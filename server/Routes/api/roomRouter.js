const express = require('express');
const { route } = require('./chatRouter');
const router = express.Router();

router.post('/api/room/create/:name/:description', (req, res) => {
	//first we have to parse the data
	console.log(req.params);
	res.json({ msg: 'got your request' });
});

module.exports = router;
