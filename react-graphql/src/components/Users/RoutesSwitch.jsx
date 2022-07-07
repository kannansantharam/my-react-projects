import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Users from "./users";
import NewUser from "./NewUser";
import UserDetail from "./UserDetail";
import DeleteUser from "./DeleteUser";
function RoutesSwitch() {
	let location = useLocation();
	let background = location.state && location.state.background;
	return (
		<div>
			<Switch location={background || location}>
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
			{background && <Route path="/adduser" children={<NewUser />} />}
			{background && (
				<Route exact path="/users/delete/:userid" children={<DeleteUser />} />
			)}
			{background && (
				<Route exact path="/users/:userid" children={<UserDetail />} />
			)}
		</div>
	);
}
export default RoutesSwitch;
