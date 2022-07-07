import React from "react";
import User from "./user";
import { Heading, Frame, Loading, Button } from "@shopify/polaris";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./usersgql";
import { Link, useLocation } from "react-router-dom";

function Users() {
	let location = useLocation();
	const { loading, error, data } = useQuery(GET_USERS, {});
	if (loading)
		return (
			<div>
				<Frame>
					<Loading />
				</Frame>
			</div>
		);
	if (error) return <p>Error :</p>;

	return (
		<div className="container p-6 rounded-xl shadow-lg items-center space-x-4 border-r-4">
			<div className="text-right block mb-10">
				<Link
					to={{ pathname: "/adduser", state: { background: location } }}
					className="btn btn-primary"
				>
					<Button primary>Add New User</Button>
				</Link>
			</div>
			<User users={data.users} />
		</div>
	);
}
export default Users;
