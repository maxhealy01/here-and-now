const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const { Server } = require("socket.io");

const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const PORT = process.env.PORT || 3001;
const app = express();

// Instantiating a new http server which will include both the express server and the subscription server for messages
const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const subscriptionServer = SubscriptionServer.create(
	{
		schema,
		execute,
		subscribe,
	},
	{
		server: httpServer,
		path: "/graphql",
	}
);

const server = new ApolloServer({
	schema,
	context: authMiddleware,
	plugins: [
		{
			async serverWillStart() {
				return {
					async drainServer() {
						subscriptionServer.close();
					},
				};
			},
		},
	],
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
// app.use("/images", express.static(path.join(__dirname, "../client/images")));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
	httpServer.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
