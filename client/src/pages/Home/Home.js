import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_NOTES } from "../../utils/queries";
import WrappedMap from "../../components/Map";
import NoteForm from "../../components/noteForm/NoteForm";
import SelectedNote from "../../components/selectedNote/SelectedNote";

import "./Home.css";

const Home = () => {
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const { loading, data } = useQuery(QUERY_NOTES);
	const [selectedNote, setSelectedNote] = useState("");

	navigator.geolocation.getCurrentPosition(function (position) {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	});
	return (
		<div>
			{latitude && data && (
				<div className="map">
					<WrappedMap
						setSelectedNote={setSelectedNote}
						notes={data.notes}
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
					<NoteForm lat={latitude} long={longitude} data={data} />
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
