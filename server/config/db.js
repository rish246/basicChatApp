//connect to the database using  this file
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			dbName: 'basicChatApp',
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error('error message', err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;

//we just exported the connectDB function
