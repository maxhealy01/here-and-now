import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoteForm from "../NoteForm";
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

const lat = 30.267153;
const long = -97.743057;

describe("NoteForm component", () => {
	it("renders NoteForm, shows input", () => {
		const notes = [];
		render(
			<ApolloProvider client={client}>
				<NoteForm lat={lat} long={long} setNotes={() => {}} notes={notes} />
			</ApolloProvider>
		);
		const field = screen.queryByTestId("text-editor").querySelector("input");
		// 1. User sees the note form.
		expect(screen.queryByTestId("text-editor")).not.toBeNull();

		// 2. User can type into the note form and post a note.
		fireEvent.change(field, {
			target: { value: "Here is a new note!" },
		});

		expect(field).toHaveValue("Here is a new note!");
		// Post the note
		fireEvent.click(screen.queryByText(`Post`));

		// 3. The input form will be empty.
		expect(field).toHaveValue("");
	});
});
