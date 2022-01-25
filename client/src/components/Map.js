import React from "react";
import {
	GoogleMap,
	withScriptjs,
	withGoogleMap,
	Marker,
} from "react-google-maps";

const WrappedMap = withScriptjs(
	withGoogleMap((props) => (
		<GoogleMap
			defaultZoom={15}
			defaultCenter={{ lat: props.lat, lng: props.long }}
		>
			{/* {props.isMarkerShown && (
				<Marker position={{ lat: props.lat, lng: props.long }} />
				
			)} */}
			{props.notes.map((note) => {
				return (
					<Marker
						position={{ lat: note.latitude, lng: note.longitude }}
						onClick={() => props.setSelectedNote(note)}
					/>
				);
			})}
		</GoogleMap>
	))
);

export default WrappedMap;
