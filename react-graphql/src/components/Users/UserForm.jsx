import React, { useEffect, useState } from "react";
import {
	Form,
	FormLayout,
	TextField,
	Button,
	DisplayText,
} from "@shopify/polaris";
import { Link } from "react-router-dom";
function UserForm({ user, addUpdateUser }) {
	const [userDetail, setUserDetails] = useState({});
	const handleSubmit = () => {
		addUpdateUser(userDetail);
	};
	const onInputChange = (type, value) => {
		let obj = {
			[type]: value,
		};
		let users = { ...userDetail, ...obj };
		setUserDetails(users);
	};
	useEffect(() => {
		setUserDetails(user);
	}, [user]);
	return (
		<div>
			<Link to="/">All users</Link>
			<DisplayText size="large">
				{user ? "Edit User" : "Create new user"}
			</DisplayText>
			<Form onSubmit={handleSubmit}>
				<FormLayout>
					<TextField
						value={userDetail?.name || ""}
						onChange={(e) => onInputChange("name", e)}
						label="Name"
						type="text"
					/>
					<TextField
						onChange={(e) => onInputChange("rocket", e)}
						value={userDetail?.rocket || ""}
						label="Rocket"
						type="text"
					/>
					<TextField
						value={userDetail?.twitter || ""}
						label="Twitter ID"
						type="text"
						onChange={(e) => onInputChange("twitter", e)}
					/>
					<Button submit>{user ? "Update user" : "Create user"}</Button>
				</FormLayout>
			</Form>
		</div>
	);
}
export default UserForm;
