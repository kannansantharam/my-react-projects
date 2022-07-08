import React from "react";
import { Icon } from "@shopify/polaris";
import { EditMajor, DeleteMajor } from "@shopify/polaris-icons";
import { Link, useLocation } from "react-router-dom";
import {
	InfiniteLoader,
	List,
	AutoSizer,
	Column,
	Table,
} from "react-virtualized";
import "react-virtualized/styles.css";

function User({ users }) {
	let location = useLocation();

	const userRows = users.map(({ id, name, rocket, twitter }) => (
		<tr className="border-b hover:bg-gray-200 group" key={id}>
			<td className="px-8 py-6 whitespace-nowrap text-sm font-light text-gray-900">
				{name}
			</td>
			<td className="px-8 py-6 whitespace-nowrap text-sm font-light text-gray-900">
				{rocket}
			</td>
			<td className="px-8 py-6 whitespace-nowrap text-sm font-light text-gray-900">
				{twitter}
			</td>

			<td className="px-8 py-6 w-5 whitespace-nowrap text-sm font-light text-gray-900 invisible group-hover:visible">
				<Link
					to={{
						pathname: `/users/${id}`,
						state: { background: location },
					}}
				>
					<Icon source={EditMajor} />
				</Link>
			</td>

			<td className="whitespace-nowrap px-8 py-6 w-5 text-sm font-light text-gray-900 invisible group-hover:visible">
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
	const Row = ({ index, style }) => {
		//	return <div style={style}>Row {index}</div>;
		let { id, twitter, name, rocket } = users[index];
		return (
			<tr className="border-b hover:bg-gray-200 group" key={id}>
				<td className="px-8 py-6 whitespace-nowrap text-sm font-light text-gray-900">
					{name}
				</td>
				<td className="px-8 py-6 whitespace-nowrap text-sm font-light text-gray-900">
					{rocket}
				</td>
				<td className="px-8 py-6 whitespace-nowrap text-sm font-light text-gray-900">
					{twitter}
				</td>

				<td className="px-8 py-6 w-5 whitespace-nowrap text-sm font-light text-gray-900 invisible group-hover:visible">
					<Link
						to={{
							pathname: `/users/${id}`,
							state: { background: location },
						}}
					>
						<Icon source={EditMajor} />
					</Link>
				</td>

				<td className="whitespace-nowrap px-8 py-6 w-5 text-sm font-light text-gray-900 invisible group-hover:visible">
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
		);
	};
	const Example = () => (
		// <InfiniteLoader>
		// 	{({ onRowsRendered, registerChild }) => (

		// 		// <div
		// 		// 	className="min-w-full min-h-full"
		// 		// 	style={{ height: "100%", width: "100%" }}
		// 		// >
		// 		// 	<AutoSizer>
		// 		// 		{({ height, width }) => (

		// 		// 		)}
		// 		// 	</AutoSizer>
		// 		// </div>
		// 	)}
		// </InfiniteLoader>
		<AutoSizer>
			{({ height, width }) => (
				<Table
					height={height}
					//onRowsRendered={onRowsRendered}
					//ref={registerChild}
					rowCount={users.length}
					headerHeight={20}
					rowHeight={50}
					//rowRenderer={Row}
					width={width}
					className="border-b"
					headerClassName=" text-sm font-medium text-gray-900 px-6 py-4 text-left"
					rowClassName="border-b hover:bg-gray-200 group"
					rowGetter={({ index }) => users[index]}
				>
					<Column
						className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						label="Name"
						dataKey="name"
						width={300}
					/>
					<Column
						className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						width={300}
						label="Twitter"
						dataKey="twitter"
					/>
					<Column
						className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						width={300}
						label="Rocket"
						dataKey="rocket"
					/>
					<Column
						width={100}
						dataKey=""
						label="Edit"
						className="px-8 py-6 w-5 whitespace-nowrap text-sm font-light text-gray-900 invisible group-hover:visible"
						cellRenderer={({ rowData }) => {
							return (
								<Link
									to={{
										pathname: `/users/${rowData.id}`,
										state: { background: location },
									}}
								>
									<Icon source={EditMajor} />
								</Link>
							);
						}}
					></Column>
					<Column
						className="whitespace-nowrap px-8 py-6 w-5 text-sm font-light text-gray-900 invisible group-hover:visible"
						width={100}
						dataKey="edit"
						label="Delete"
						cellRenderer={({ rowData }) => {
							return (
								<Link
									to={{
										pathname: `/users/delete/${rowData.id}`,
										state: { background: location },
									}}
								>
									<Icon source={DeleteMajor} />
								</Link>
							);
						}}
					></Column>
				</Table>
			)}
		</AutoSizer>
	);
	return (
		<div className="h-full overflow-scroll">
			<Example />
		</div>
		// 	{/*
		// 	<table className="min-w-full">
		// 		<thead className="border-b">
		// 			<tr className="">
		// 				<th
		// 					scope="col"
		// 					className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
		// 				>
		// 					Name
		// 				</th>
		// 				<th
		// 					scope="col"
		// 					className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
		// 				>
		// 					Rocket
		// 				</th>
		// 				<th
		// 					scope="col"
		// 					className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
		// 				>
		// 					Twitter
		// 				</th>
		// 				 <th
		// 					scope="col"
		// 					className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
		// 				>
		// 					Edit User
		// 				</th>
		// 				<th
		// 					scope="col"
		// 					className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
		// 				>
		// 					Delete User
		// 				</th>
		// 			</tr>
		// 		</thead>

		// 		<tbody className="min-w-full">{userRows}</tbody>
		// 	</table>
		// 	 <Page fullWidth>
		// 		<Grid key="userHeading" className="bg-gray-200">
		// 			<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
		// 				<DisplayText size="small">Name</DisplayText>
		// 			</Grid.Cell>
		// 			<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
		// 				<DisplayText size="small">Twitter</DisplayText>
		// 			</Grid.Cell>
		// 			<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
		// 				<DisplayText size="small">Rocket</DisplayText>
		// 			</Grid.Cell>
		// 			<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
		// 				<DisplayText size="small">Edit User</DisplayText>
		// 			</Grid.Cell>
		// 			<Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2 }}>
		// 				<DisplayText size="small">Delete User</DisplayText>
		// 			</Grid.Cell>
		// 		</Grid>
		// 		{userRows}
		// 	</Page>
		// */}
	);
}
export default User;
