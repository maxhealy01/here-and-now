import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_NOTES } from "../../utils/queries";

import SplashPage from "../SplashPage/SplashPage";
import MapPage from "../MapPage/MapPage";

import Auth from "../../utils/auth";
import { NoteType as Note } from "../../utils/types";

import "./Home.css";

const Home = () => {
	const [coordinates, setCoordinates] = useState({
		latitude: 0,
		longitude: 0,
	});
	const [notes, setNotes] = useState<Note[]>([]);

	const handleLocation = () => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setCoordinates({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	};

	// If user is logged in, get coordinates automatically
	if (Auth.loggedIn()) {
		handleLocation();
	}
	let exampleNotes: Note[];

	useEffect(() => {
		// Create example notes based on the user's location (for demo purposes)
		// eslint-disable-next-line react-hooks/exhaustive-deps
		exampleNotes = [
			{
				comments: [
					{
						_id: Math.random().toString(),
						createdAt: "1666735337581",
						text: "I can totally agree with that.",
						username: "ricky44",
					},
					{
						_id: Math.random().toString(),
						createdAt: "1666735344330",
						text: "I've always felt the same :)",
						username: "cherryblossomgirl",
					},
				],
				_id: Math.random().toString(),
				createdAt: "1665337808309",
				latitude: coordinates.latitude + 0.005,
				longitude: coordinates.longitude + 0.0025,
				text: "<p><strong>I really <em>really <u>really</u></em></strong> love the way the birds sound in this part of town.</p>",
				username: "Littleguy",
			},
			{
				comments: [
					{
						_id: Math.random().toString(),
						createdAt: "1664948211135",
						text: "It's my favorite time of year",
						username: "wanderer4011",
					},
				],
				_id: Math.random().toString(),
				createdAt: "1664946083084",
				latitude: coordinates.latitude - 0.0065,
				longitude: coordinates.longitude - 0.0055,
				text: "<h1>It feels so beautiful out here.</h1><h2>The birds, <u>the bees,</u> <em>the way it feels.</em></h2><h3>Springtime is making a comeback.</h3>",
				username: "NatureAppreciator",
			},
			{
				comments: [
					{
						_id: Math.random().toString(),
						createdAt: "1638054925319",
						text: "Whoa",
						username: "suss36",
					},
					{
						_id: Math.random().toString(),
						createdAt: "1658888226747",
						text: "That's too much, man",
						username: "sickoModeJonny",
					},
					{
						_id: Math.random().toString(),
						createdAt: "1659223024369",
						text: "It's my favorite time of year",
						username: "watcherOfTheWinds",
					},
				],
				_id: Math.random().toString(),
				createdAt: "1638053694562",
				latitude: coordinates.latitude + 0.035,
				longitude: coordinates.longitude - 0.0075,
				text: "<p>Fire and brimstone alights passion, roaming in the evening of empty-headed nights.</p><p><br></p><p><strong>Alas</strong>, some <u>trefoil </u><em>rumination </em>dispels the antiquated concept: we are emancipated, but briefly, in the hedgeways and dredgeways of life.</p>",
				username: "BabyGenius88",
			},
			{
				comments: [],
				_id: Math.random().toString(),
				createdAt: "1667328418468",
				latitude: coordinates.latitude - 0.0025,
				longitude: coordinates.longitude - 0.0075,
				text: `<p>This is a crazy place, man. <u>I've never felt this way before,</u> and frankly speaking I'm not sure that I ever will again. Life is a chrysalis, ever-emerging from an open wound in the forest floor. Who am I to project from my vastly limited experience anything approximating the full glory of the world? I can only scurry along, learning as I go.</p>`,
				username: "PontificationMan",
			},
			{
				_id: Math.random().toString(),
				comments: [],
				createdAt: "1638053442251",
				latitude: coordinates.latitude + 0.0035,
				longitude: coordinates.longitude + 0.0075,
				text: `<p><em>Is anyone out there capable of understanding this profound sense of abandonment? </em></p><p>\t\t\t\t\t\t<strong>Or am I merely talking to myself, lost in the cold?</strong></p>`,
				username: "loneLookerOuter",
			},
			{
				_id: Math.random().toString(),
				comments: [],
				createdAt: "1638053442251",
				latitude: coordinates.latitude - 0.0075,
				longitude: coordinates.longitude - 0.0025,
				text: `<p>I sure do love watching street fights break out.</p>`,
				username: "josephine84",
			},
			{
				_id: Math.random().toString(),
				comments: [],
				createdAt: "1638053442251",
				latitude: coordinates.latitude + 0.0035,
				longitude: coordinates.longitude - 0.0075,
				text: `<p>I just saw the most beautiful girl in the world. She was blonde and wore a long blue cartigan with a yellow skirt. I'm a scruffy brunette boy with stumpy legs. Does anyone have a line on this sassy mama?</p>`,
				username: "LovelornFella",
			},
			{
				_id: Math.random().toString(),
				comments: [],
				createdAt: "1638053442251",
				latitude: coordinates.latitude + 0.0005,
				longitude: coordinates.longitude - 0.0005,
				text: `<p>I'm so tired of spending every day in this junky city. I want something new and exciting!</p>`,
				username: "seltzerwater",
			},
		];
		setNotes(notes.concat(exampleNotes));
	}, [coordinates]);

	// Query notes and then make them stateful in order to update map on note submission
	// This occurs after Lat + Long are set so that the exampleNotes can be placed
	// in visible locations
	const { error, data } = useQuery(QUERY_NOTES, {
		onCompleted: () => {
			setNotes(data.notes);
		},
	});
	// const setNotes = (notes: Note[]) => {};
	return (
		<div>
			{!Auth.loggedIn() && coordinates.latitude === 0 ? (
				<SplashPage
					handleLocation={handleLocation}
					setCoordinates={setCoordinates}
				/>
			) : (
				<MapPage
					setNotes={setNotes}
					notes={notes}
					latitude={coordinates.latitude}
					longitude={coordinates.longitude}
				/>
			)}
			<script
				src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAE5FDeD7mf02RHDXEu2SzZWlrWJCbwSw&callback=initMap&v=weekly"
				defer
			></script>
		</div>
	);
};

export default Home;
