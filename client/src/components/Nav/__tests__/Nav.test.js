import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Nav from "../Nav";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

describe("Nav component", () => {
	it("renders", () => {
		render(
			<Router>
				<Nav />
			</Router>
		);
	});

	it("matches snapshot DOM node structure", () => {
		const { asFragment } = render(
			<Router>
				<Nav />
			</Router>
		);

		expect(asFragment()).toMatchSnapshot();
	});
});
