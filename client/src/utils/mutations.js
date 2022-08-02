import gql from "graphql-tag";

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const ADD_NOTE = gql`
	mutation addNote($text: String!, $latitude: Float!, $longitude: Float!) {
		addNote(text: $text, latitude: $latitude, longitude: $longitude) {
			_id
			text
			latitude
			longitude
			username
			createdAt
		}
	}
`;

export const ADD_COMMENT = gql`
	mutation addComment($noteId: ID!, $text: String!) {
		addComment(noteId: $noteId, text: $text) {
			_id
			comments {
				_id
				text
				createdAt
				username
			}
		}
	}
`;
