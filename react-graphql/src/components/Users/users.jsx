import React from "react";
import User from "./user";
import { Heading, Frame, Loading } from "@shopify/polaris";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./usersgql";
import { Link } from "react-router-dom";
function Users() {
	const { loading, error, data } = useQuery(GET_USERS, {
		fetchPolicy: "cache-and-network",
		nextFetchPolicy: "cache-first",
	});
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
		<div>
			<div className="topRight">
				<Link to="/adduser" className="btn btn-primary">
					Add New User
				</Link>
			</div>
			<Heading>List of Users</Heading>
			<User users={data.users} />
		</div>
	);
}
export default Users;
