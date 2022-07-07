import React from "react";
import { Button, DisplayText } from "@shopify/polaris";
import { Icon } from "@shopify/polaris";
import { EditMajor, DeleteMajor } from "@shopify/polaris-icons";
import { Page, Grid } from "@shopify/polaris";
import { Link, useLocation } from "react-router-dom";

function User({ users }) {
	let location = useLocation();
	const userRows = users.map(({ id, name, rocket, twitter }) => (
		<tr className="border-b">
			<td className="px-8 py-6 whitespace-nowrap text-sm font-light text-gray-900">
				{name}
			</td>
			<td className="px-8 py-6 whitespace-nowrap text-sm font-light text-gray-900">
				{rocket}
			</td>
			<td className="px-8 py-6 whitespace-nowrap text-sm font-light text-gray-900">
				{twitter}
			</td>
			<td className="px-8 py-6 whitespace-nowrap text-sm font-light text-gray-900">
				<Link
					to={{
						pathname: `/users/${id}`,
						state: { background: location },
					}}
				>
					<Icon source={EditMajor} />
				</Link>
			</td>
			<td className="whitespace-nowrap text-sm font-light text-gray-900">
				<Link
					to={{
						pathname: `/users/delete/${id}`,
						state: { background: location },
					}}
				>
					<Icon source={DeleteMajor} />
				</Link>
			</td>
		</tr>
		// <Grid key={id} className="m-10 bg-gray-200">
		// 	<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
		// 		<DisplayText size="small">{name}</DisplayText>
		// 	</Grid.Cell>
		// 	<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
		// 		<DisplayText size="small">{twitter}</DisplayText>
		// 	</Grid.Cell>
		// 	<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
		// 		<DisplayText size="small">{rocket}</DisplayText>
		// 	</Grid.Cell>
		// 	<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
		// 		<Link
		// 			to={{
		// 				pathname: `/users/${id}`,
		// 				state: { background: location },
		// 			}}
		// 		>
		// 			<Icon source={EditMajor} />
		// 		</Link>
		// 	</Grid.Cell>
		// 	<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
		// 		<Link
		// 			to={{
		// 				pathname: `/users/delete/${id}`,
		// 				state: { background: location },
		// 			}}
		// 		>
		// 			<Icon source={DeleteMajor} />
		// 		</Link>
		// 	</Grid.Cell>
		// </Grid>
	));
	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg h-screen">
			<table className="min-w-full">
				<thead className="border-b">
					<tr className="">
						<th
							scope="col"
							className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						>
							Name
						</th>
						<th
							scope="col"
							className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						>
							Twitter
						</th>
						<th
							scope="col"
							className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						>
							Rocket
						</th>
						<th
							scope="col"
							className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						>
							Edit User
						</th>
						<th
							scope="col"
							className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						>
							Delete User
						</th>
					</tr>
				</thead>
				<tbody>{userRows}</tbody>
			</table>
			{/* <Page fullWidth>
				<Grid key="userHeading" className="bg-gray-200">
					<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
						<DisplayText size="small">Name</DisplayText>
					</Grid.Cell>
					<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
						<DisplayText size="small">Twitter</DisplayText>
					</Grid.Cell>
					<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
						<DisplayText size="small">Rocket</DisplayText>
					</Grid.Cell>
					<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
						<DisplayText size="small">Edit User</DisplayText>
					</Grid.Cell>
					<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
						<DisplayText size="small">Delete User</DisplayText>
					</Grid.Cell>
				</Grid>
				{userRows}
			</Page> */}
		</div>
	);
}
export default User;
