const mongoose = require("mongoose");

try {
	mongoose.connect(
		"mongodb+srv://maxwellhealy:eFa4qOMoXYVCUMTE@cluster0.cyk9y.mongodb.net/?retryWrites=true&w=majority" ||
			"mongodb://localhost/hereandnowww",
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
