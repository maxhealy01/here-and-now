import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoteForm from "../NoteForm";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

afterEach(cleanup);

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
});

const lat = 30.267153;
const long = -97.743057;

describe("NoteForm component", () => {
	it("renders", () => {
		render(
			<ApolloProvider client={client}>
				<NoteForm lat={lat} long={long} />
			</ApolloProvider>
		);
	});

	it("matches snapshot DOM node structure", () => {
		const { asFragment } = render(
			<ApolloProvider client={client}>
				<NoteForm lat={lat} long={long} />
			</ApolloProvider>
		);

		expect(asFragment()).toMatchSnapshot();
	});
});
