import React from "react";
import UserForm from "./UserForm";
import { useMutation, useQuery, useApolloClient, gql } from "@apollo/client";
import { UPDATE_USER, GET_USER, GET_USERS } from "./usersgql";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { Modal } from "@shopify/polaris";
import { WriteUsers } from "./UserCache";

function UserDetail() {
	const client = new useApolloClient();
	let history = useHistory();
	let back = () => {
		//e.stopPropagation();
		history.goBack();
	};
	let { userid: user } = useParams();
	const { data, loading, error } = useQuery(GET_USER, {
		variables: {
			userid: user,
		},
		fetchPolicy: "cache-and-network",
	});
	const [updateUser, { data: updatedUsers, loading: updatingUserLoading }] =
		useMutation(UPDATE_USER, {
			onError(error) {
				return `Failed to get user details ->   ${error.message}`;
			},
			update(cache, { data }) {
				cache.modify({
					fields: {
						users(existingUsers = []) {
							cache.writeQuery({
								query: GET_USERS,
								data: {
									users: [data.update_users.returning[0], ...existingUsers],
								},
								variables: {
									id: data.update_users.returning[0].id,
								},
							});
							//back();
						},
					},
				});
			},
			//refetchQueries: [{ query: GET_USERS }],
		});
	if (updatingUserLoading) {
		return "Updating user";
	}
	if (updatedUsers) {
		//let returnedUser = updatedUsers.update_users.returning[0];
		//WriteUsers(returnedUser, client);
		back();
		// return (
		// 	<Redirect
		// 		to={{
		// 			pathname: "/",
		// 		}}
		// 	/>
		// );
	}
	function addUpdateUser(users) {
		let updateObj = {
			set: users,
			where: {
				id: {
					_eq: user,
				},
			},
		};

		updateUser({ variables: updateObj });
	}
	if (loading)
		return user ? "getting user details..." : "creating new users...";
	if (error) return `Failed to get user details -> ${error.message}`;

	if (data)
		return (
			<div
				style={{
					position: "fixed",
					background: "#fff",
					top: "10%",
					left: "10%",
					right: "10%",
					padding: 15,
				}}
			>
				<Modal onClose={back} open="true" title="Edit User">
					<Modal.Section>
						<UserForm
							user={data.users_by_pk}
							addUpdateUser={addUpdateUser}
							goBack={back}
						/>
					</Modal.Section>
				</Modal>
			</div>
		);
}
export default UserDetail;
