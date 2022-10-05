import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_NOTES } from "../../utils/queries";
import WrappedMap from "../../components/Map/Map";
import NoteForm from "../../components/NoteForm/NoteForm";
import SelectedNote from "../../components/SelectedNote/SelectedNote";
import { ObjectId } from "mongodb";

import "./Home.css";

const Home = () => {
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const { loading, data } = useQuery(QUERY_NOTES);
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

	// Get the user's location

	// Create a list of dummy notes to populate the map for demo purposes
	let exampleNotes = [
		{
			_id: ObjectId().toString(),
			text: "I saw a goofy guy trying to sell cigarettes to a minor. Watch out!",
			latitude: 30.3132001,
			longitude: -97.6709421,
			username: "SaltySimon",
			comments: [],
			createdAt: "Nov 27th, 2021 at 8:54 pm",
		},
	];

	return (
		<div>
			{!locationKnown && (
				<button onClick={handleLocation}>
					May we ascertain your location?
				</button>
			)}
			{latitude && data && (
				<div className="map">
					<WrappedMap
						setSelectedNote={setSelectedNote}
						notes={data.notes.concat(exampleNotes)}
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
				{latitude && data && !selectedNote && (
					<NoteForm lat={latitude} long={longitude} />
				)}
				{selectedNote && (
					<SelectedNote
						selectedNote={selectedNote}
						setSelectedNote={setSelectedNote}
					/>
				)}
			</div>
		</div>
	);
};

export default Home;
