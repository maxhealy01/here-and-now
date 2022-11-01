const { Schema, model } = require("mongoose");
const commentSchema = require("./Comment");
const dateFormat = require("../utils/dateFormat");

const noteSchema = new Schema(
	{
		text: {
			type: String,
			minlength: 1,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		username: {
			type: String,
			required: true,
		},
		latitude: {
			type: Number,
			required: true,
		},
		longitude: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
			default: new Date(),
		},
		comments: [commentSchema],
	},
	{
		toJSON: {
			getters: true,
		},
		timestamps: true,
	}
);

noteSchema.virtual("commentCount").get(function () {
	return this.comments.length;
});

const Note = model("Note", noteSchema);

module.exports = Note;
