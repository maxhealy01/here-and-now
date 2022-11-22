import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SelectedNote from "../SelectedNote";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

// client for Apollo
const cache = new InMemoryCache();

const client = new ApolloClient({
	request: (operation) => {
		// we'll need the logic for setting id_token -- related to auth, both in client and server
		const token = localStorage.getItem("id_token");
		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : "",
			},
		});
	},
	uri: "http://localhost:3001/graphql",
	cache: cache,
});
// // Functionality:

describe("SelectedNote", () => {
	const noteCreatedAt = new Date();
	noteCreatedAt.setMonth(noteCreatedAt.getMonth() - 2);
	const note = {
		comments: [
			{ createdAt: "1663982709120", text: "Hey!", username: "anonymous" },
			{ createdAt: "1663982709120", text: "2!", username: "johnson" },
		],
		createdAt: noteCreatedAt.getTime(),
		text: "Note!!!!",
		username: "Ricardo",
	};

	it("renders note", () => {
		render(<SelectedNote selectedNote={note} setSelectedNote={() => {}} />);

		expect(screen.queryByText(note.text)).not.toBeNull();
		expect(screen.queryByText("2 months ago")).not.toBeNull();
		expect(screen.queryByText(note.username)).not.toBeNull();
	});

	//1 User clicks on 'show comments', comments are rendered
	//   Render same # of comments as indicated on button
	//   Show input form and 'post' button
	//   Show becomes 'Hide'
	it("shows comments and input", () => {
		render(
			<ApolloProvider client={client}>
				<SelectedNote selectedNote={note} setSelectedNote={() => {}} />
			</ApolloProvider>
		);

		expect(
			screen.queryByText(`Show ${note.comments.length} Comments`)
		).not.toBeNull();

		// Make sure comment text is absent from page
		note.comments.forEach((comment) => {
			expect(screen.queryByText(comment.text)).toBeNull();
		});

		// Simulate 'Show Comments' click
		fireEvent.click(
			screen.queryByText(`Show ${note.comments.length} Comments`)
		);

		// Make sure comment text is present on page
		note.comments.forEach((comment) => {
			expect(screen.queryByText(comment.text)).not.toBeNull();
		});

		expect(screen.queryByText(/hide comments/i)).not.toBeNull();
		expect(screen.queryByText("Post")).not.toBeNull();
	});

	//2 Input: user can create a comment
	//   After button submit, comments += 1
	it("posts comments", () => {
		render(
			<ApolloProvider client={client}>
				<SelectedNote selectedNote={note} setSelectedNote={() => {}} />
			</ApolloProvider>
		);

		fireEvent.click(
			screen.queryByText(`Show ${note.comments.length} Comments`)
		);

		fireEvent.change(screen.getByPlaceholderText("Leave a comment!"), {
			target: { value: "New comment" },
		});

		fireEvent.click(screen.queryByText(`Post`));

		expect(screen.queryByText(/new comment/i)).not.toBeNull();
	});

	//3 Comment is rendered correctly:
	//   New comment appears last on list

	//4 User clicks on 'hide comments', comments and input disappear
	it("hides comments and input", () => {
		render(
			<ApolloProvider client={client}>
				<SelectedNote selectedNote={note} setSelectedNote={() => {}} />
			</ApolloProvider>
		);

		fireEvent.click(
			screen.queryByText(`Show ${note.comments.length} Comments`)
		);

		fireEvent.click(screen.queryByText("Hide Comments"));

		// Make sure comment text is absent from page
		note.comments.forEach((comment) => {
			expect(screen.queryByText(comment.text)).toBeNull();
		});

		//
		expect(screen.queryByPlaceholderText("Leave a comment!")).toBeNull();
	});
});
