const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	Users: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
			name: {
				type: String
			}
		}
	]
});

module.exports = Room = mongoose.model('Room', RoomSchema);
