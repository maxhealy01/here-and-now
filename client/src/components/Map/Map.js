import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Map.css";
import { format } from "timeago.js";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
	"pk.eyJ1IjoibWF4aGVhbHkwMSIsImEiOiJjbGJvYWk3czcwNG1rM3Zwam1rM3ltdGh1In0._vFdR1R9NVkGbfJzttCliA";

export function getIconColor(str) {
	let iconColor;
	if (str.includes("month")) {
		iconColor = "red";
	} else if (str.includes("week")) {
		iconColor = "orange";
	} else if (str.includes("day")) {
		iconColor = "yellow";
	} else {
		iconColor = "green";
	}
	return iconColor;
}

const Map = ({ setSelectedNote, notes, latitude, longitude }) => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(longitude);
	const [lat, setLat] = useState(latitude);
	const [zoom, setZoom] = useState(14);
	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [lng, lat],
			zoom: zoom,
		});
	});

	// useEffect(() => {
	// 	if (!map.current) return; // wait for map to initialize
	// 	map.current.on("move", () => {
	// 		setLng(map.current.getCenter().lng.toFixed(4));
	// 		setLat(map.current.getCenter().lat.toFixed(4));
	// 		setZoom(map.current.getZoom().toFixed(2));
	// 	});
	// });

	if (map.current) {
		notes.forEach((note) => {
			// Use the time ago to determine which icon color the marker will be
			// They are determined by being within 24 hours, 1 month, 1 year
			// Therefore, we can determine this by reading the TimeAgo string
			const timeAgo = format(note.createdAt);

			let iconColor = getIconColor(timeAgo);
			const el = document.createElement("div");
			el.className = `marker ${iconColor}`;
			el.onclick = () => setSelectedNote(note);
			new mapboxgl.Marker(el)
				// (
				// 	<div
				// 		style={{
				// 			width: "5rem",
				// 			height: "5rem",
				// 			borderRadius: "50%",
				// 			cursor: "pointer",
				// 			color: iconColor,
				// 		}}
				// 	/>
				// )
				.setLngLat([note.longitude, note.latitude])
				.addTo(map.current);
		});
	}
	return (
		<div>
			<div ref={mapContainer} className="map-container" />
		</div>
	);
};

export default Map;
