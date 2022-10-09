import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_NOTES } from "../../utils/queries";

import SplashPage from "../SplashPage/SplashPage";
import MapPage from "../MapPage/MapPage";

import Auth from "../../utils/auth";
import { exampleNotes } from "../../utils/exampleNotes";

import "./Home.css";

const Home = () => {
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");

	const [selectedNote, setSelectedNote] = useState("");

	// Create logic for the button that asks for a user's location
	const [locationKnown, setLocationKnown] = useState(false);

	const handleLocation = (e) => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setLatitude(position.coords.latitude);
			setLongitude(position.coords.longitude);
			setLocationKnown(true);
		});
	};

	// If user is logged in, get coordinates automatically
	if (Auth.loggedIn()) {
		navigator.geolocation.getCurrentPosition(function (position) {
			setLatitude(position.coords.latitude);
			setLongitude(position.coords.longitude);
			setLocationKnown(true);
		});
	}

	// Query notes and then make them stateful in order to update map on note submission
	// This occurs after Lat + Long are set so that the exampleNotes can be placed
	// in visible locations
	const [notes, setNotes] = useState([]);
	const { error, data } = useQuery(QUERY_NOTES, {
		onCompleted: () => {
			setNotes(data.notes.concat(exampleNotes));
		},
	});

	return (
		<div>
			{!Auth.loggedIn() && !locationKnown ? (
				<SplashPage handleLocation={handleLocation} />
			) : (
				<MapPage
					setSelectedNote={setSelectedNote}
					selectedNote={selectedNote}
					setNotes={setNotes}
					notes={notes}
					latitude={latitude}
					longitude={longitude}
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
