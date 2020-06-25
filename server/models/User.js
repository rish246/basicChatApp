const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
	// rooms: [
	// 	{
	// 		room: {
	// 			id: Schema.Types.ObjectId,
	// 			ref: 'room'
	// 		},
	// 		name: {
	// 			type: String
	// 		}
	// 	}
	// ]
});

module.exports = User = mongoose.model('user', UserSchema);
