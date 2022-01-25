const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
	{
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [
			{
				type: Schema.Types.ObjectId,
				ref: "Message",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
