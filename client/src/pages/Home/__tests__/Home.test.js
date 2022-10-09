// import React from "react";
// import { render, cleanup, fireEvent, screen } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import Home from "../Home";
// import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient from "apollo-boost";

// // client for Apollo
// const client = new ApolloClient({
// 	request: (operation) => {
// 		// we'll need the logic for setting id_token -- related to auth, both in client and server
// 		const token = localStorage.getItem("id_token");
// 		operation.setContext({
// 			headers: {
// 				authorization: token ? `Bearer ${token}` : "",
// 			},
// 		});
// 	},
// 	uri: "http://localhost:3001/graphql",
// });

// describe("Home", () => {
// 	it();
// });
