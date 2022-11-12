import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MapPage from "../MapPage";
import { ApolloProvider, ApolloClient } from "@apollo/client";

// client for Apollo
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

describe("MapPage", () => {
	const lat = 30.3131498;
	const long = -97.6708796;
	const notes = [
		{
			comments: [],
			createdAt: new Date().setMonth(-2),
			text: "Month old note",
			username: "Anonymous",
			latitude: lat,
			longitude: long,
		},
		{
			comments: [],
			createdAt: new Date().setHours(-180),
			text: "Week old note",
			username: "Anonymous",
			latitude: lat,
			longitude: long,
		},
		{
			comments: [],
			createdAt: new Date().setHours(-30),
			text: "Day old note",
			username: "Anonymous",
			latitude: lat,
			longitude: long,
		},
	];
	console.log(notes);
	// 1. User sees a map. It has icons representing three established posts.
	it("shows map", () => {
		render(
			<ApolloProvider client={client}>
				<MapPage
					setSelectedNote={() => {}}
					setNotes={() => {}}
					notes={notes}
					latitude={lat}
					longitude={long}
				/>
			</ApolloProvider>
		);

		expect(screen.getByText("Map")).toBeTruthy();
	});
	// 2. User sees a note form.
	// 3. User can type into the note form and post a note.
	// 3.5. The input form will be empty.
	// 4. User will see a green icon on the map.
	// 5. User can click on this icon, and the text of their post will appear on the screen.
	// 6. User can click on the X button, and the text will no longer appear.
	// 6.5. The empty input form will appear.
});
