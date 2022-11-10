import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_NOTES, QUERY_ME } from "../../utils/queries";

import SplashPage from "../SplashPage/SplashPage";
import MapPage from "../MapPage/MapPage";

import Auth from "../../utils/auth";

import "./Home.css";

const Home = () => {
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");

	const [selectedNote, setSelectedNote] = useState("");

	// Create logic for the button that asks for a user's location
	const [locationKnown, setLocationKnown] = useState(false);

	const handleLocation = () => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setLatitude(parseFloat(position.coords.latitude));
			setLongitude(parseFloat(position.coords.longitude));
			setLocationKnown(true);
		});
	};

	// If user is logged in, get coordinates automatically
	if (Auth.loggedIn()) {
		handleLocation();
	}
	let exampleNotes;

	useEffect(() => {
		// Create example notes based on the user's location (for demo purposes)
		exampleNotes = [
			{
				comments: [
					{
						createdAt: "1666735337581",
						text: "I can totally agree with that.",
						username: "ricky44",
					},
					{
						createdAt: "1666735344330",
						text: "I've always felt the same :)",
						username: "cherryblossomgirl",
					},
				],
				createdAt: "1665337808309",
				latitude: parseFloat(latitude + 0.005),
				longitude: parseFloat(longitude + 0.0025),
				text: "<p><strong>I really <em>really <u>really</u></em></strong> love the way the birds sound in this part of town.</p>",
				username: "Littleguy",
			},
			{
				comments: [
					{
						createdAt: "1664948211135",
						text: "It's my favorite time of year",
						username: "wanderer4011",
					},
				],
				createdAt: "1664946083084",
				latitude: parseFloat(latitude - 0.0065),
				longitude: parseFloat(longitude - 0.0055),
				text: "<h1>It feels so beautiful out here.</h1><h2>The birds, <u>the bees,</u> <em>the way it feels.</em></h2><h3>Springtime is making a comeback.</h3>",
				username: "NatureAppreciator",
			},
			{
				comments: [
					{
						createdAt: "1638054925319",
						text: "Whoa",
						username: "suss36",
					},
					{
						createdAt: "1658888226747",
						text: "That's too much, man",
						username: "sickoModeJonny",
					},
					{
						createdAt: "1659223024369",
						text: "It's my favorite time of year",
						username: "watcherOfTheWinds",
					},
				],
				createdAt: "1638053694562",
				latitude: parseFloat(latitude + 0.035),
				longitude: parseFloat(longitude - 0.0075),
				text: "<p>Fire and brimstone alights passion, roaming in the evening of empty-headed nights.</p><p><br></p><p><strong>Alas</strong>, some <u>trefoil </u><em>rumination </em>dispels the antiquated concept: we are emancipated, but briefly, in the hedgeways and dredgeways of life.</p>",
				username: "BabyGenius88",
			},
			{
				comments: [],
				createdAt: "1667328418468",
				latitude: parseFloat(latitude - 0.0025),
				longitude: parseFloat(longitude - 0.0075),
				text: `<p>This is a crazy place, man. <u>I've never felt this way before,</u> and frankly speaking I'm not sure that I ever will again. Life is a chrysalis, ever-emerging from an open wound in the forest floor. Who am I to project from my vastly limited experience anything approximating the full glory of the world? I can only scurry along, learning as I go.</p>`,
				username: "PontificationMan",
			},
			{
				comments: [],
				createdAt: "1638053442251",
				latitude: parseFloat(latitude + 0.0035),
				longitude: parseFloat(longitude + 0.0075),
				text: `<p><em>Is anyone out there capable of understanding this profound sense of abandonment? </em></p><p>\t\t\t\t\t\t<strong>Or am I merely talking to myself, lost in the cold?</strong></p>`,
				username: "loneLookerOuter",
			},
			{
				comments: [],
				createdAt: "1638053442251",
				latitude: parseFloat(latitude - 0.0075),
				longitude: parseFloat(longitude - 0.0025),
				text: `<p>I sure do love watching street fights break out.</p>`,
				username: "josephine84",
			},
			{
				comments: [],
				createdAt: "1638053442251",
				latitude: parseFloat(latitude + 0.0035),
				longitude: parseFloat(longitude - 0.0075),
				text: `<p>I just saw the most beautiful girl in the world. She was blonde and wore a long blue cartigan with a yellow skirt. I'm a scruffy brunette boy with stumpy legs. Does anyone have a line on this sassy mama?</p>`,
				username: "LovelornFella",
			},
			{
				comments: [],
				createdAt: "1638053442251",
				latitude: parseFloat(latitude + 0.0005),
				longitude: parseFloat(longitude - 0.0005),
				text: `<p>I'm so tired of spending every day in this junky city. I want something new and exciting!</p>`,
				username: "seltzerwater",
			},
		];
		setNotes(notes.concat(exampleNotes));
	}, [locationKnown]);

	// Query notes and then make them stateful in order to update map on note submission
	// This occurs after Lat + Long are set so that the exampleNotes can be placed
	// in visible locations
	const [notes, setNotes] = useState([]);
	const { error, data } = useQuery(QUERY_NOTES, {
		onCompleted: () => {
			setNotes(data.notes);
		},
	});

	return (
		<div>
			{Auth.loggedIn() && locationKnown && notes ? (
				<MapPage
					setSelectedNote={setSelectedNote}
					selectedNote={selectedNote}
					setNotes={setNotes}
					notes={notes}
					latitude={latitude}
					longitude={longitude}
				/>
			) : (
				<SplashPage
					handleLocation={handleLocation}
					setLatitude={setLatitude}
					setLongitude={setLongitude}
					setLocationKnown={setLocationKnown}
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
