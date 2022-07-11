import React from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "./usersgql";
import { useHistory } from "react-router-dom";
import UserForm from "./UserForm";
import { Modal } from "@shopify/polaris";
import { WriteUsers } from "./UserCache";

function NewUser() {
	let history = useHistory();
	let back = () => {
		history.goBack();
	};
	const [addUser, { data, error, loading }] = useMutation(ADD_USER, {
		//refetchQueries: [{ query: GET_USERS }],
		update(cache, { data }) {
			cache.modify({
				fields: {
					users(existingUsers = []) {
						WriteUsers(data.insert_users.returning[0], cache, existingUsers);
					},
				},
			});
		},
	});

	if (loading) return "creating new users...";
	if (error) return `Failed to create user  ${error.message}`;
	if (data) {
		back();
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
