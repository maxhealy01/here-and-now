const { AuthenticationError } = require("apollo-server-express");
const { User, Note } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findById(context.user._id)
					.select("-__v -password")
					.populate("notes");

				return userData;
			}
			throw new AuthenticationError("Not logged in");
		},
		user: async (parent, { username }) => {
			return User.findOne({ username })
				.select("-__v -password")
				.populate("notes");
		},
		users: async () => {
			return User.find().select("-__v -password").populate("notes");
		},
		notes: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Note.find(params).sort({ createdAt: -1 });
		},
	},
	// 	me: User
	// user(username: String!): User
	// users: [User]
	// notes(username: String): [Note]
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		updateUser: async (parent, args, context) => {
			if (context.user) {
				return await User.findByIdAndUpdate(context.user._id, args, {
					new: true,
				});
			}

			throw new AuthenticationError("Not logged in");
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const token = signToken(user);

			return { token, user };
		},
		addNote: async (parent, args, context) => {
			if (context.user) {
				const note = await Note.create({
					...args,
					username: context.user.username,
				});
				await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $push: { notes: note._id } },
					{ new: true }
				);

				return note;
			} else {
				const note = await Note.create({
					...args,
					username: "anonymous",
				});

				return note;
			}
		},
		addComment: async (parent, { noteId, text }, context) => {
			if (context.user) {
				const updatedNote = await Note.findOneAndUpdate(
					{ _id: noteId },
					{
						$push: {
							comments: { text: text, username: context.user.username },
						},
					},
					{ new: true, runValidators: true }
				);

				return updatedNote;
			} else {
				const updatedNote = await Note.findOneAndUpdate(
					{ _id: noteId },
					{
						$push: {
							comments: { text: text, username: "anonymous" },
						},
					},
					{ new: true, runValidators: true }
				);

				return updatedNote;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
	},
};

module.exports = resolvers;
