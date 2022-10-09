import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_NOTES } from "../../utils/queries";

import SplashPage from "../SplashPage/SplashPage";
import WrappedMap from "../../components/Map/Map";
import NoteForm from "../../components/NoteForm/NoteForm";
import SelectedNote from "../../components/SelectedNote/SelectedNote";
import Auth from "../../utils/auth";
import { exampleNotes } from "../../utils/exampleNotes";

import "./Home.css";

const Home = () => {
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");

	const [selectedNote, setSelectedNote] = useState("");

	// Query notes and then make them stateful in order to update map on note submission
	const [notes, setNotes] = useState([]);
	const { error, data } = useQuery(QUERY_NOTES, {
		onCompleted: () => {
			setNotes(data.notes.concat(exampleNotes));
		},
	});

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

	return (
		<div>
			{!Auth.loggedIn() && !locationKnown && (
				<SplashPage handleLocation={handleLocation} />
			)}
			{latitude && data && (
				<div className="map">
					<WrappedMap
						setSelectedNote={setSelectedNote}
						notes={notes}
						lat={latitude}
						long={longitude}
						isMarkerShown
						googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAE5FDeD7mf02RHDXEu2SzZWlrWJCbwSw"
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div style={{ height: `400px` }} />}
						mapElement={<div style={{ height: `100%` }} />}
					/>
				</div>
			)}
			<div className="notesOrComments">
				{latitude && notes && !selectedNote && (
					<NoteForm
						lat={latitude}
						long={longitude}
						setNotes={setNotes}
						notes={notes}
					/>
				)}
				{selectedNote && (
					<SelectedNote
						selectedNote={selectedNote}
						setSelectedNote={setSelectedNote}
					/>
				)}
			</div>
			<script
				src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAE5FDeD7mf02RHDXEu2SzZWlrWJCbwSw&callback=initMap&v=weekly"
				defer
			></script>
		</div>
	);
};

export default Home;
