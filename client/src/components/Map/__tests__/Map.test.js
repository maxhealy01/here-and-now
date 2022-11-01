import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WrappedMap from "../Map";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

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
});
