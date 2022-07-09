import React from "react";

import { useMutation, useApolloClient, gql } from "@apollo/client";
import { ADD_USER, GET_USERS } from "./usersgql";
import { Redirect, useHistory } from "react-router-dom";
import UserForm from "./UserForm";
import { Modal } from "@shopify/polaris";
function NewUser() {
	const client = new useApolloClient();
	let history = useHistory();
	let back = () => {
		history.goBack();
	};
	console.log(client);
	const [addUser, { data, loading, error }] = useMutation(ADD_USER, {
		//refetchQueries: [{ query: GET_USERS }],
	});

	if (loading) return "creating new users...";
	if (error) return `Failed to create user  ${error.message}`;
	if (data) {
		let readUsersQuery = gql`
			query Query($id: Int!) {
				users(id: $id) {
					name
					rocket
					twitter
					id
				}
			}
		`;
		const existingUsers = client.readQuery({ query: readUsersQuery });

		let writeNewUserToCache = {
			__typename: "Query",
			id: data.insert_users.returning[0].id,
			name: data.insert_users.returning[0].name,
			rocket: data.insert_users.returning[0].rocket,
			twitter: data.insert_users.returning[0].twitter,
		};
		client.writeQuery({
			query: readUsersQuery,
			data: {
				users: [...existingUsers.users, writeNewUserToCache],
			},
		});
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
