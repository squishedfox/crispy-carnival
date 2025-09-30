import { gql, useQuery } from "@apollo/client";

const GET_FORM_LIST_QUERY = gql`
	query filterForms($id: String, $page: Int, $limit: Int) {
		list(id: $id, page: $page, limit: $limit) {
			count
			results {
				id
				name
				fieldsets {
					legend
					fields {
						ordinal
						name
						type
					}
				}
			}
		}
	}
`;

export interface UseFormListResponse {
	count: number;
	results: Array<{
		id: string;
		name: string;
		fieldsets: Array<{
			legend: string;
			fields: Array<{ ordinal: number; name: string; type: string }>;
		}>;
	}>;
}

export interface UseFormListVariables {
	id: string | null | undefined;
	page: number;
	limit: number;
}

export const useFormListQuery = ({ id, page, limit }: UseFormListVariables) => {
	const query = useQuery<UseFormListResponse, UseFormListVariables>(
		GET_FORM_LIST_QUERY,
		{
			variables: {
				id,
				page,
				limit,
			},
		},
	);

	return {
		count: query.data?.count ?? 0,
		forms: query.data?.results ?? [],
		isFormListLoading: query.loading,
		error: query.error,
	};
};
