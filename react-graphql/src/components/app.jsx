import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import RoutesSwitch from "./Users/RoutesSwitch";

import { BrowserRouter as Router } from "react-router-dom";
function App() {
	return (
		<AppProvider>
			<Router>
				<RoutesSwitch />
			</Router>
		</AppProvider>
	);
}

export default App;
