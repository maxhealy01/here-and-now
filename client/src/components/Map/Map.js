import React from "react";
import {
	GoogleMap,
	withScriptjs,
	withGoogleMap,
	Marker,
} from "react-google-maps";
import { format } from "timeago.js";
import { ObjectId } from "mongodb";

const WrappedMap = withScriptjs(
	withGoogleMap((props) => (
		<GoogleMap
			defaultZoom={15}
			defaultCenter={{ lat: props.lat, lng: props.long }}
		>
			{props.notes.map((note) => {
				// Use the time ago to determine which icon color the marker will be
				// They are determined by being within 24 hours, 1 month, 1 year
				// Therefore, we can determine this by reading the TimeAgo string
				const time = ObjectId(note._id).getTimestamp();
				const timeAgo = format(time);
				let iconUrl;

				if (timeAgo.includes("month")) {
					iconUrl = "https://maps.google.com/mapfiles/ms/icons/red.png";
				} else if (timeAgo.includes("week")) {
					iconUrl = "https://maps.google.com/mapfiles/ms/icons/orange.png";
				} else if (timeAgo.includes("day")) {
					iconUrl = "https://maps.google.com/mapfiles/ms/icons/yellow.png";
				} else {
					iconUrl = "https://maps.google.com/mapfiles/ms/icons/green.png";
				}
				return (
					<Marker
						key={note._id}
						icon={iconUrl}
						position={{ lat: note.latitude, lng: note.longitude }}
						onClick={() => props.setSelectedNote(note)}
					/>
				);
			})}
		</GoogleMap>
	))
);

export default WrappedMap;
