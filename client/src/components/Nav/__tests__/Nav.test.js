import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Nav from "../Nav";
import { BrowserRouter as Router } from "react-router-dom";
import Auth from "../../../utils/auth";
jest.mock("../../../utils/auth");

describe("Nav component", () => {
	it("correctly displays logout button", () => {
		render(
			<Router>
				<Nav />
			</Router>
		);
	});

	it("mocks return value", () => {
		const login = new expect(Auth.loggedIn()).toBe(true);
	});
});
