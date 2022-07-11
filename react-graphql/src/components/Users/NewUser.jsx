import React from "react";

import { useMutation, useApolloClient, gql } from "@apollo/client";
import { ADD_USER, GET_USERS } from "./usersgql";
import { Redirect, useHistory } from "react-router-dom";
import UserForm from "./UserForm";
import { Modal } from "@shopify/polaris";
import { WriteUsers } from "./UserCache";

function NewUser() {
	let history = useHistory();
	let back = () => {
		history.goBack();
	};
	const client = new useApolloClient();
	const [addUser, { data, error, loading }] = useMutation(ADD_USER, {
		//refetchQueries: [{ query: GET_USERS }],
		update(cache, { data }) {
			cache.modify({
				fields: {
					users(existingUsers = []) {
						cache.writeQuery({
							query: GET_USERS,
							data: {
								users: [data.insert_users.returning[0], ...existingUsers],
							},
							variables: {
								id: data.insert_users.returning[0].id,
							},
						});
						back();
					},
				},
			});
		},
	});

	if (loading) return "creating new users...";
	if (error) return `Failed to create user  ${error.message}`;
	if (data) {
		//write created user directly in the cache instead of refetching
		//let returnedUser = data.insert_users.returning[0];
		//WriteUsers(returnedUser, client);
		//back();
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
