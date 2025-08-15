import { useQuery, gql } from "@apollo/client";

const FORM_DASHBOARD_LIST_QUERY = gql`
	query GetForms {
		forms {
			forms {
				id
				name
			}
		}
	}
`;

const App = () => {
	const {
		loading,
		data = { forms: { forms: [] } },
		error = null,
		errors = [],
	} = useQuery<{ forms: { forms: { id: string; name: string }[] } }>(
		FORM_DASHBOARD_LIST_QUERY,
	);

	if (loading) {
		return (
			<div style={{ margin: "auto", width: "50%" }}>
				<h1>Loading...</h1>
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<h1>{error.name}</h1>
				{error.stack && <pre>{error.stack}</pre>}
			</div>
		);
	}

	console.debug("data = ", data);
	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				{data.forms.forms.map((item) => (
					<tr key={item.id}>
						<td>{item.id}</td>
						<td>{item.name}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default App;
