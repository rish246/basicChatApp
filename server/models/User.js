const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: [ true, 'Username Required' ]
	},
	email: {
		type: String,
		required: [ true, 'Email Required' ]
	},
	password: {
		type: String,
		required: [ true, 'Password Required' ]
	},
	rooms: [
		{
			room: {
				type: Schema.Types.ObjectId,
				ref: 'Room'
			},
			name: {
				type: String
			}
		}
	]
});

module.exports = User = mongoose.model('User', UserSchema);
