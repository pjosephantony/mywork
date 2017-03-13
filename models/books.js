var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
	name: String,
	image: String,
	author: String,
	genre: String,
	price: String,
	review: String,
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Book", bookSchema);
