import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WrappedMap, { getIconUrl } from "../Map";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { format } from "timeago.js";

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

describe("Map", () => {
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
	// Functionality
	// 1. Show a marker for each prop.
	// 2. Make sure the marker contains the right image.
	it("renders map", () => {
		render(
			<WrappedMap
				setSelectedNote={() => {}}
				notes={notes}
				lat={lat}
				long={long}
				isMarkerShown
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAE5FDeD7mf02RHDXEu2SzZWlrWJCbwSw"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	});

	it("returns proper icon URLs", () => {
		let icons = notes.map((note) => {
			const timeAgo = format(note.createdAt);

			return getIconUrl(timeAgo);
		});

		expect(icons).toStrictEqual([
			"https://maps.google.com/mapfiles/ms/icons/green.png",
			"https://maps.google.com/mapfiles/ms/icons/orange.png",
			"https://maps.google.com/mapfiles/ms/icons/yellow.png",
		]);
	});
});
