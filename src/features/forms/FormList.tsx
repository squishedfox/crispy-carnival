import { useState } from "react";
import { ApolloError } from "../../components/Error.component";
import LoadingComponent from "../../components/loading.component";
import Paginatable from "../../components/paginatable.compoent";
import Table, { TableComponentProps } from "../../components/table.component";
import { useFormListQuery } from "./formListQuery";

const headers: TableComponentProps["headers"] = [
	{
		fieldKey: "id",
		text: "ID",
		orderable: true,
		sortable: true,
	},
	{
		fieldKey: "name",
		text: "Name",
		orderable: true,
		sortable: true,
	},
];

const FormList = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(25);

	const {
		count = 0,
		forms = [],
		isFormListLoading,
		error = null,
	} = useFormListQuery({
		id: null,
		limit: pageSize,
		page: pageNumber,
	});

	const handlePage = (_: number, newPageNum: number): void => {
		setPageNumber(newPageNum);
	};

	if (isFormListLoading) {
		return <LoadingComponent />;
	}
	if (error) {
		return <ApolloError error={error} />;
	}

	const totalPages: number = !!count ? Math.floor(count / pageSize) : 0;
	const rows = !!forms.length
		? forms.map((form) => ({
				id: form.id,
				name: form.name,
			}))
		: [];

	return (
		<Paginatable
			onPage={handlePage}
			pageSize={pageSize}
			pageNumber={pageNumber}
			title='Forms List'
			totalPages={totalPages}
		>
			<Table
				headers={headers}
				data={rows}
				onSort={(key) => console.debug("Sorting on key", key)}
			/>
		</Paginatable>
	);
};

export default FormList;
