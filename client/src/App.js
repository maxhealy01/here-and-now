import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
// In order for the {StoreProvider} to be accessible, we need a big old reducer function first
// import { StoreProvider } from "./utils/GlobalState";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";

import Nav from "./components/Nav";

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
	uri: "http://localhost:3001/graphql",
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div>
					<Nav />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/profile" component={Profile} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/login" component={Login} />
					</Switch>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
