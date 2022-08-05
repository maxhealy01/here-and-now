const { gql } = require("apollo-server-express");

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
	}

	type Auth {
		token: ID
		user: User
	}

	type Query {
		me: User
		user(username: String!): User
		users: [User]
		notes(username: String): [Note]
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		updateUser(username: String, email: String, password: String): User
		login(email: String!, password: String!): Auth
		addNote(text: String!, latitude: Float!, longitude: Float!): Note
		addComment(text: String!, noteId: ID!): Note
	}
`;

module.exports = typeDefs;
