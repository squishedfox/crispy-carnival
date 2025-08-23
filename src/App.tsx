import { useQuery, gql } from "@apollo/client";
import LoadingComponent from "./components/loading.component";

export interface FormListQueryResponse {
	forms: {
		forms: Array<{
			id: string;
			name: string;
		}>;
	};
}

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
	} = useQuery<FormListQueryResponse>(FORM_DASHBOARD_LIST_QUERY);

	if (loading) {
		return <LoadingComponent />;
	}

	if (error) {
		return (
			<div>
				<h1>{error.name}</h1>
				{error.stack && <pre>{error.stack}</pre>}
			</div>
		);
	}

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
