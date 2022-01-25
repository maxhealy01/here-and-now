//	type Query {
// 		me: User
// 		user(username: String!): User
// 		users: [User]
// 		notes(username: String): [Note]
// 	}

import gql from "graphql-tag";

export const QUERY_ME = gql`
	{
		me {
			_id
			username
			email
			notes {
				_id
				text
				latitude
				longitude
				comments {
					_id
					text
					createdAt
				}
			}
			conversations {
				members {
					username
					_id
				}
				messages {
					text
					sender
				}
			}
		}
	}
`;

export const QUERY_NOTES = gql`
	query notes($username: String) {
		notes(username: $username) {
			_id
			text
			latitude
			longitude
			username
			createdAt
			comments {
				text
				createdAt
				username
			}
		}
	}
`;

export const MY_CONVOS = gql`
	query {
		myConversations {
			username
			conversations {
				_id
				members {
					_id
					username
				}
				messages {
					_id
					sender
					text
					date
				}
			}
		}
	}
`;
