import React from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER, GET_USERS } from "./usersgql";
import { Redirect, useHistory } from "react-router-dom";
import UserForm from "./UserForm";
import { Modal } from "@shopify/polaris";
function NewUser() {
	let history = useHistory();
	let back = () => {
		history.goBack();
	};
	const [addUser, { data, loading, error }] = useMutation(ADD_USER, {
		refetchQueries: [{ query: GET_USERS }],
	});

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
		<div
			style={{
				position: "absolute",
				background: "#fff",
				top: 25,
				left: "10%",
				right: "10%",
				padding: 15,
			}}
		>
			<Modal onClose={back} open="true" title="Create New User">
				<Modal.Section>
					<UserForm addUpdateUser={addUpdateUser} goBack={back} />
				</Modal.Section>
			</Modal>
		</div>
	);
}
export default NewUser;
