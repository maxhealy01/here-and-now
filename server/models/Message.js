const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
	{
		conversationId: {
			type: Schema.Types.ObjectId,
			ref: "Conversation",
		},
		sender: {
			type: String,
		},
		text: {
			type: String,
		},
		date: {
			type: Date,
			default: new Date(),
		},
	},
	{
		timestamps: true,
		toJSON: {
			getters: true,
		},
	}
);

const Message = model("Message", messageSchema);

module.exports = Message;
