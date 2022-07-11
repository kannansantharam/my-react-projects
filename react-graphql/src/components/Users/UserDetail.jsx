import React from "react";
import UserForm from "./UserForm";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER, GET_USER } from "./usersgql";
import { useHistory, useParams } from "react-router-dom";
import { Modal, Spinner } from "@shopify/polaris";
import { WriteUsers } from "./UserCache";

function UserDetail() {
	let history = useHistory();
	let back = () => {
		history.goBack();
	};
	let { userid: user } = useParams();
	const { data, loading, error } = useQuery(GET_USER, {
		variables: {
			userid: user,
		},
		fetchPolicy: "cache-and-network",
	});
	const [updateUser, { data: updatedUsers }] = useMutation(UPDATE_USER, {
		onError(error) {
			return `Failed to get user details ->   ${error.message}`;
		},
		update(cache, { data }) {
			cache.modify({
				fields: {
					users(existingUsers = []) {
						WriteUsers(data.update_users.returning[0], cache, existingUsers);
					},
				},
			});
		},
		//refetchQueries: [{ query: GET_USERS }],
	});
	if (updatedUsers) {
		back();
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
	if (loading) {
		return <Spinner accessibilityLabel="Spinner" size="large" />;
	}
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
