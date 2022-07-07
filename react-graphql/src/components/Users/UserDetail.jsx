import React from "react";
import UserForm from "./UserForm";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER, GET_USER } from "./usersgql";
import { Redirect } from "react-router-dom";
function UserDetail() {
	let user = window.location.pathname.split("/users/")[1];
	const { data, loading, error } = useQuery(GET_USER, {
		variables: {
			userid: user,
		},
		fetchPolicy: "cache-and-network",
		nextFetchPolicy: "cache-first",
	});
	const [updateUser, { data: updatedUsers, loading: updatingUserLoading }] =
		useMutation(UPDATE_USER, {
			onError(error) {
				return `Failed to get user details  ${error.message}`;
			},
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
	if (error) return `Failed to get user details  ${error.message}`;

	if (data)
		return (
			<div>
				<UserForm user={data.users_by_pk} addUpdateUser={addUpdateUser} />
			</div>
		);
}
export default UserDetail;
