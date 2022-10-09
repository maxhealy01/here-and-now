import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SplashPage from "../SplashPage";
import { BrowserRouter as Router } from "react-router-dom";

// 1. The description text is visible.
describe("SplashPage", () => {
	it("renders", () => {
		render(
			<Router>
				<SplashPage />
			</Router>
		);

		// expect(
		// 	screen.queryByText(
		// 		"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti aperiam ab tempora sit minus iste dolores eligendi unde molestiae voluptate, dolorem neque, id a explicabo rerum error exercitationem, tenetur molestias?"
		// 	)
		// ).not.toBeNull();
	});
});
