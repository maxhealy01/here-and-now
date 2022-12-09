import React from "react";
import { Link } from "react-router-dom";
import "./SplashPage.css";

type SplashPageProps = {
	handleLocation: () => void;
	setCoordinates: (coordinates: {
		latitude: number;
		longitude: number;
	}) => void;
};

const SplashPage: React.FC<SplashPageProps> = ({
	handleLocation,
	setCoordinates,
}) => {
	return (
		<div className="splashPage">
			<p>
				Here and Now uses Google Maps to connect its users in time and space.
			</p>
			<p>
				Go to the map page to see what people around you have been saying,
				thinking, and feeling!
			</p>
			<button>
				<Link to="/signup">Signup</Link>
			</button>
			<button>
				<Link to="/login">Login</Link>
			</button>
			<button onClick={handleLocation}>
				Check out the map without signing up
			</button>
			<button
				onClick={() => {
					setCoordinates({ latitude: 30.3131266, longitude: -97.6709167 });
				}}
			>
				Check out the map without providing location
			</button>
		</div>
	);
};

export default SplashPage;
