import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
const client = new ApolloClient({
	uri: "https://api.spacex.land/graphql/",
	cache: new InMemoryCache({
		//	addTypename: false,
		typePolicies: {
			Query: {
				fields: {
					users: offsetLimitPagination(),
				},
			},
		},
	}),
});
// const client = ...

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);
