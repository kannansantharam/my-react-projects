import React from "react";
import { DisplayText } from "@shopify/polaris";
import { Icon } from "@shopify/polaris";
import { EditMajor } from "@shopify/polaris-icons";
import { Page, Grid } from "@shopify/polaris";
import { Link } from "react-router-dom";
function User({ users }) {
	const userRows = users.map(({ id, name, rocket, twitter }) => (
		<Grid key={id}>
			<Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
				<DisplayText size="small">{name}</DisplayText>
			</Grid.Cell>
			<Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
				<DisplayText size="small">{twitter}</DisplayText>
			</Grid.Cell>
			<Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
				<DisplayText size="small">{rocket}</DisplayText>
			</Grid.Cell>
			<Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
				<Link
					to={{
						pathname: `/users/${id}`,
						state: { id, name, rocket, twitter },
					}}
				>
					<Icon source={EditMajor} />
				</Link>
			</Grid.Cell>
		</Grid>
	));
	return (
		<Page fullWidth>
			<Grid key="userHeading">
				<Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
					<DisplayText size="small">Name</DisplayText>
				</Grid.Cell>
				<Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
					<DisplayText size="small">Twitter</DisplayText>
				</Grid.Cell>
				<Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
					<DisplayText size="small">Rocket</DisplayText>
				</Grid.Cell>
				<Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
					<DisplayText size="small">Edit User</DisplayText>
				</Grid.Cell>
			</Grid>
			{userRows}
		</Page>
	);
}
export default User;
