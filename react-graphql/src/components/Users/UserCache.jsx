import { GET_USERS } from "./usersgql";

function WriteUsers(user, cache, existingUsers) {
	let usersQuery = GET_USERS;
	cache.writeQuery({
		query: usersQuery,
		data: {
			users: [user, ...existingUsers],
		},
		variables: {
			id: user.id,
		},
	});
}
export { WriteUsers };
