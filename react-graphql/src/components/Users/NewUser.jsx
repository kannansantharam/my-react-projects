import React from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "./usersgql";
import { Redirect } from "react-router-dom";
import UserForm from "./UserForm";
function NewUser() {
	const [addUser, { data, loading, error }] = useMutation(ADD_USER);
	if (loading) return "creating new users...";
	if (error) return `Failed to create user  ${error.message}`;
	if (data) {
		return (
			<Redirect
				to={{
					pathname: "/",
				}}
			/>
		);
	}
	function addUpdateUser(userDetail) {
		let newuser = {
			objects: [userDetail],
		};
		addUser({ variables: newuser });
	}
	return (
		<div>
			<UserForm addUpdateUser={addUpdateUser} />
		</div>
	);
}
export default NewUser;
