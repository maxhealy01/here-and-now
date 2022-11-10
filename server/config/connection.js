const mongoose = require("mongoose");

try {
	mongoose.connect(
		process.env.MONGODB_URI || "mongodb://localhost/hereandnowww",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
			tls: false,
		}
	);
} catch (error) {
	console.log(error);
}

module.exports = mongoose.connection;
