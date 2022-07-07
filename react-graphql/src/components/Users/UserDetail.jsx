import React from "react";
import UserForm from "./UserForm";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER, GET_USER, GET_USERS } from "./usersgql";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { Modal } from "@shopify/polaris";

function UserDetail() {
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
	});
	const [updateUser, { data: updatedUsers, loading: updatingUserLoading }] =
		useMutation(UPDATE_USER, {
			onError(error) {
				return `Failed to get user details ->   ${error.message}`;
			},
			refetchQueries: [{ query: GET_USERS }],
		});
	if (updatingUserLoading) {
		return "Updating user";
	}
	if (updatedUsers) {
		return (
			<Redirect
				to={{
					pathname: "/",
				}}
			/>
		);
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
