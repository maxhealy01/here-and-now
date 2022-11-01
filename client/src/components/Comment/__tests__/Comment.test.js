import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Comment from "../Comment";

describe("Comment", () => {
	const commentCreatedAt = new Date();
	commentCreatedAt.setMonth(commentCreatedAt.getMonth() - 2);
	const c = {
		createdAt: commentCreatedAt.getTime(),
		text: "This is a comment",
		username: "Randall",
	};

	it("renders comment correctly", () => {
		render(<Comment c={c} index={0} />);

		expect(screen.queryByText(c.text)).not.toBeNull();
		expect(screen.queryByText("2 months ago")).not.toBeNull();
		expect(screen.queryByText(c.username)).not.toBeNull();
	});
});
