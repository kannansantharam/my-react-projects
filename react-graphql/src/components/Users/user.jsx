import React from "react";
import { Icon } from "@shopify/polaris";
import { EditMajor, DeleteMajor } from "@shopify/polaris-icons";
import { Link, useLocation } from "react-router-dom";
import { AutoSizer, Column, Table } from "react-virtualized";
import "react-virtualized/styles.css";

function User({ users, fetchMore }) {
	let location = useLocation();
	const onScroll = async (tableRef) => {
		if (tableRef) {
			const { scrollTop, scrollHeight, clientHeight, offsetHeight } =
				tableRef.target;
			console.log({ scrollTop, scrollHeight, clientHeight, offsetHeight });
			if (scrollTop + 1 + clientHeight === scrollHeight) {
				console.log("Reached bottom");
				await fetchMore({
					variables: {
						offset: users.length,
					},
				});
			}
		}
	};
	const Example = () => (
		<AutoSizer>
			{({ height, width }) => (
				<Table
					height={height}
					rowCount={users.length}
					headerHeight={50}
					rowHeight={50}
					width={width}
					className="border-b"
					headerClassName="text-black font-extrabold text-sm px-6 py-4 text-left"
					rowClassName="border-b hover:bg-gray-200 group"
					rowGetter={({ index }) => users[index]}
				>
					<Column
						className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						label="Name"
						dataKey="name"
						width={width}
					/>
					<Column
						className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						width={width}
						label="Twitter"
						dataKey="twitter"
					/>
					<Column
						className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						width={width}
						label="Rocket"
						dataKey="rocket"
					/>
					<Column
						width={200}
						dataKey=""
						label=""
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
						width={200}
						dataKey=""
						label=""
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
		<div className="h-screen overflow-y-auto" onScroll={(e) => onScroll(e)}>
			<Example className="h-screen overflow-y-auto" />
		</div>
	);
}
export default User;
