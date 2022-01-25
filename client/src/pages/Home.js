import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_NOTE, ADD_COMMENT } from "../utils/mutations";
import { QUERY_NOTES } from "../utils/queries";
import WrappedMap from "../components/Map";
import NoteForm from "../components/NoteForm";
import SelectedNote from "../components/selectedNote/SelectedNote";

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
				<>
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
					<NoteForm lat={latitude} long={longitude} data={data} />
				</>
			)}
			{selectedNote && <SelectedNote selectedNote={selectedNote} />}
		</div>
	);
};

export default Home;
