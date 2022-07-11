import React from "react";
import User from "./user";
import { Frame, Loading, Button } from "@shopify/polaris";
import { useQuery, NetworkStatus } from "@apollo/client";
import { GET_USERS } from "./usersgql";
import { Link, useLocation } from "react-router-dom";

function Users() {
	let location = useLocation();

	const { error, data, networkStatus, fetchMore } = useQuery(GET_USERS, {
		variables: {
			offset: 0,
			limit: 20,
		},
		fetchPolicy: "cache-and-network",
	});
	if (networkStatus === NetworkStatus.loading)
		return (
			<div>
				<Frame>
					<Loading />
				</Frame>
			</div>
		);
	if (error) return <p>Error :</p>;

	return (
		<div className="w-full h-full overflow-scroll p-6 rounded-xl shadow-lg items-center space-x-4 border-r-4">
			<div className="text-right block mb-10">
				<Link
					to={{ pathname: "/adduser", state: { background: location } }}
					className="btn btn-primary"
				>
					<Button primary>Add New User</Button>
				</Link>
			</div>
			<User users={data.users} fetchMore={fetchMore} />
		</div>
	);
}
export default Users;
