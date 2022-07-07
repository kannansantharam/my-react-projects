import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_USER, GET_USERS } from "./usersgql";
import { Modal } from "@shopify/polaris";
import { useHistory, useParams } from "react-router-dom";

function DeleteUser() {
	let history = useHistory();
	let back = () => {
		history.goBack();
	};
	let { userid } = useParams();
	console.log(userid);

	const [delete_user, { data, loading, error }] = useMutation(DELETE_USER, {
		refetchQueries: [{ query: GET_USERS }],
	});
	const deleteUser = async () => {
		let deleteObj = {
			where: {
				id: {
					_eq: userid,
				},
			},
		};
		await delete_user({ variables: deleteObj });
		return history.goBack();
	};
	if (data) {
		return "user deleted successfully";
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
			<Modal
				onClose={back}
				open="true"
				title="Are you sure you want to delete the user?"
				primaryAction={{
					content: "Delete User",
					onAction: deleteUser,
				}}
				secondaryActions={[
					{
						content: "Cancel",
						onAction: back,
					},
				]}
			>
				{/* <Modal.Section>
					<UserForm />
				</Modal.Section> */}
			</Modal>
		</div>
	);
}
export default DeleteUser;
