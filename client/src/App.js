import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import ApolloClient from "apollo-boost";

import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Nav from "./components/Nav/Nav";
const cache = new InMemoryCache();

const client = new ApolloClient({
	request: (operation) => {
		// we'll need the logic for setting id_token -- related to auth, both in client and server
		const token = localStorage.getItem("id_token");
		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : "",
			},
		});
	},
	uri: "https://app-hereandnow.herokuapp.com/",
	cache: cache,
});

function App() {
	return (
		<ApolloProvider client={client}>
			<p>Hello world</p>
			{/* <Router>
				<div>
					<Nav />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/login" component={Login} />
					</Switch>
				</div>
			</Router> */}
		</ApolloProvider>
	);
}

export default App;
