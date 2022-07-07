import React, { useEffect, useState } from "react";
import { Form, FormLayout, TextField, Button } from "@shopify/polaris";
function UserForm({ user, addUpdateUser, goBack }) {
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
					<div>
						<div className="inline-block mr-5">
							<Button className="text-right" onClick={(e) => goBack(e)}>
								{"<"} Back
							</Button>
						</div>
						<div className="inline-block ">
							<Button primary className="text-right mr-5" submit>
								{user ? "Update user" : "Create user"}
							</Button>
						</div>
					</div>
				</FormLayout>
			</Form>
		</div>
	);
}
export default UserForm;
