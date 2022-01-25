const { gql } = require("apollo-server-express");

// All of this data was lifted from the shop-shop module.
// The only reason it's here is so that the server could start!
const typeDefs = gql`
	type Note {
		_id: ID
		text: String
		username: String
		latitude: Float
		longitude: Float
		createdAt: String
		date: String
		comments: [Comment]
	}

	type Comment {
		_id: ID
		text: String
		username: String
		createdAt: String
	}

	type User {
		_id: ID
		username: String
		email: String
		notes: [Note]
		conversations: [Conversation]
	}

	type Auth {
		token: ID
		user: User
	}

	type Conversation {
		_id: ID
		members: [User]
		messages: [Message]
	}

	type Message {
		_id: ID
		conversationId: String
		sender: String
		text: String
		date: String
	}

	type Subscription {
		newMessageCreated(conversationId: ID!): Message
	}

	type Query {
		me: User
		user(username: String!): User
		users: [User]
		notes(username: String): [Note]
		conversation(conversationId: ID): Conversation
		myConversations: User
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		updateUser(username: String, email: String, password: String): User
		login(email: String!, password: String!): Auth
		addNote(text: String!, latitude: Float!, longitude: Float!): Note
		addComment(text: String!, noteId: ID!): Note
		newConversation(username: ID): Conversation
		newMessage(text: String!, conversationId: ID): Message
	}
`;

module.exports = typeDefs;
