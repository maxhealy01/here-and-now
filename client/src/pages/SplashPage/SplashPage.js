import React from "react";
import { Link } from "react-router-dom";

const SplashPage = ({ handleLocation }) => {
	return (
		<div>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
				aperiam ab tempora sit minus iste dolores eligendi unde molestiae
				voluptate, dolorem neque, id a explicabo rerum error exercitationem,
				tenetur molestias?
			</p>
			<Link to="/signup">Signup</Link>
			<Link to="/login">Login</Link>
			<button onClick={handleLocation}>
				Check out the map without signing up
			</button>
		</div>
	);
};

export default SplashPage;
