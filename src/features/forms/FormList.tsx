import { useState } from "react";
import {
	ApolloErrorDisplay,
	LoadingSpinner,
	Paginatable,
	Table,
	TableComponentProps,
} from "@app/components";
import { useFormListQuery } from "./formListQuery";
import {
	PageSize,
	PaginatableTable,
} from "@app/components/paginatable.component";

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
	const [pageSize, setPageSize] = useState<PageSize>(25);

	const {
		count = 0,
		forms = [],
		isFormListLoading,
		error = null,
	} = useFormListQuery({
		id: null,
		limit: Number(pageSize),
		page: pageNumber,
	});

	const handlePage = (_: number, newPageNum: number): void => {
		setPageNumber(newPageNum);
	};

	const handlePageSizeChange = (_: PageSize, newPageSize: PageSize): void => {
		setPageSize(newPageSize);
	};

	if (isFormListLoading) {
		return <LoadingSpinner />;
	}
	if (error) {
		return <ApolloErrorDisplay error={error} />;
	}

	const totalPages: number = !!count
		? Math.floor(count / Number(pageSize))
		: 0;

	const rows = !!forms.length
		? forms.map((form) => ({
				id: form.id,
				name: form.name,
			}))
		: [];

	return (
		<Paginatable
			pageSize={pageSize}
			pageNumber={pageNumber}
			title='Forms List'
			totalPages={totalPages}
			onPage={handlePage}
			onPageSizeChange={handlePageSizeChange}
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
