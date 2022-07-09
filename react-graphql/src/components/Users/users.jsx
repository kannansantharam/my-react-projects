import React, { useState } from "react";
import User from "./user";
import { Frame, Loading, Button } from "@shopify/polaris";
import { useQuery, NetworkStatus } from "@apollo/client";
import { GET_USERS } from "./usersgql";
import { Link, useLocation } from "react-router-dom";
import { InView } from "react-intersection-observer";

function Users() {
	let location = useLocation();
	const [fullyLoaded, setFullyLoaded] = useState(false);
	const { error, data, networkStatus, fetchMore, variables } = useQuery(
		GET_USERS,
		{
			variables: {
				offset: 0,
				limit: 1000,
			},
			notifyOnNetworkStatusChange: true,
			fetchPolicy: "cache-and-network",
		}
	);
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
			<User users={data.users} />
			{networkStatus !== NetworkStatus.fetchMore &&
				data.users.length % variables.limit === 0 && (
					<InView
						onChange={async (inView, entry) => {
							if (inView && fullyLoaded) {
								// const result = await fetchMore({
								// 	variables: {
								// 		offset: data.users.length,
								// 	},
								// });
							}
							setFullyLoaded(!inView);
						}}
					/>
				)}
		</div>
	);
}
export default Users;
