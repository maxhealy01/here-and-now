const { Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const commentSchema = new Schema(
	{
		text: {
			type: String,
			required: true,
			maxlength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: new Date(),
			get: (timestamp) => dateFormat(timestamp),
		},
	},
	{
		toJSON: {
			getters: true,
		},
		timestamps: true,
	}
);

module.exports = commentSchema;
