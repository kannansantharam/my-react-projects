import { GET_USERS } from "./usersgql";

function WriteUsers(user, client) {
	let usersQuery = GET_USERS;
	const existingUsers = client.readQuery({ query: usersQuery });

	let writeNewUserToCache = {
		id: user.id,
		name: user.name,
		rocket: user.rocket,
		twitter: user.twitter,
	};
	client.writeQuery({
		query: usersQuery,
		data: {
			users: [writeNewUserToCache, ...existingUsers.users],
		},
		variables: {
			id: user.id,
		},
	});
}
export { WriteUsers };
