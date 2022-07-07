import { AppProvider, Page } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import Users from "./Users/users";
import NewUser from "./Users/NewUser";
import UserDetail from "./Users/UserDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
	return (
		<AppProvider>
			<Page title="SpaceX Users">
				<Router>
					<Switch>
						<Route path="/users/:userid">
							<UserDetail />
						</Route>
						<Route path="/adduser">
							<NewUser />
						</Route>
						<Route path="/">
							<Users />
						</Route>
					</Switch>
				</Router>
			</Page>
		</AppProvider>
	);
}

export default App;
