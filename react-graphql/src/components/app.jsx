import { AppProvider, Page } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import RoutesSwitch from "./Users/RoutesSwitch";

import { BrowserRouter as Router } from "react-router-dom";
function App() {
	return (
		<AppProvider>
			<Page title="SpaceX Users">
				<Router>
					<RoutesSwitch />
				</Router>
			</Page>
		</AppProvider>
	);
}

export default App;
