import { gql } from "@apollo/client";

const GET_USERS = gql`
	query ExampleQuery {
		users {
			name
			rocket
			twitter
			id
		}
	}
`;
const GET_USER = gql`
	query Query($userid: uuid!) {
		users_by_pk(id: $userid) {
			id
			name
			rocket
			twitter
		}
	}
`;
const ADD_USER = gql`
	mutation Mutation($objects: [users_insert_input!]!) {
		insert_users(objects: $objects) {
			returning {
				name
				rocket
				twitter
				id
			}
		}
	}
`;
const UPDATE_USER = gql`
	mutation Mutation($set: users_set_input, $where: users_bool_exp!) {
		update_users(_set: $set, where: $where) {
			returning {
				id
				name
				twitter
				rocket
			}
		}
	}
`;
const DELETE_USER = gql`
	mutation Delete_users($where: users_bool_exp!) {
		delete_users(where: $where) {
			returning {
				name
			}
		}
	}
`;
export { GET_USERS, ADD_USER, GET_USER, UPDATE_USER, DELETE_USER };
