import { ChangeEvent, PropsWithChildren, useEffect, useState } from "react";
import "./paginatable.css";

export type PageSize = 10 | 25 | 50 | 75 | 100 | null;
export interface PaginatableTable extends PropsWithChildren<{}> {
	/**
	 * Title of the table to give user additional information
	 */
	title: string;
	/**
	 * Pass in to override the page number that might be default selected.
	 * Default page number starts at 1
	 */
	pageNumber?: number | null;
	/**
	 * Pass in to override the page size that might be default selected
	 */
	pageSize?: PageSize;
	/**
	 * Total number of pages that the user can migrate between
	 */
	totalPages?: number;
	/**
	 * Callback for when the next or previous buttons are clicked
	 */
	onPage: (prevPage: number, newPage: number) => void;

	/**
	 * Callback for when the user changes the pages size to scroll
	 */
	onPageSizeChange: (prevSize: PageSize, newSize: PageSize) => void;
}

const DEFAULT_PAGE_SIZE: PageSize = 25;
const DEFAULT_PAGE_NUMBER = 1;

const Paginatable = ({
	title,
	pageNumber = DEFAULT_PAGE_NUMBER,
	pageSize = DEFAULT_PAGE_SIZE,
	onPage,
	onPageSizeChange: onSizeChange,
	children,
}: PaginatableTable) => {
	const [selectedPageSize, setSelectedPageSize] = useState(
		pageNumber ?? DEFAULT_PAGE_SIZE,
	);
	const [selectedPageNumber, setSelectedPagNumber] = useState(
		pageSize ?? DEFAULT_PAGE_NUMBER,
	);

	useEffect(() => {
		if (pageSize !== selectedPageSize) {
			if (pageSize === null || pageSize === undefined) {
				setSelectedPageSize(DEFAULT_PAGE_SIZE);
			} else {
				setSelectedPageSize(pageSize);
			}
		}
	}, [pageSize]);

	useEffect(() => {
		if (pageNumber !== selectedPageNumber) {
			if (pageNumber === null || pageNumber === undefined) {
				setSelectedPagNumber(DEFAULT_PAGE_NUMBER);
			} else {
				setSelectedPagNumber(pageNumber);
			}
		}
	}, [pageNumber]);

	/**
	 * Callback handler for when user changes the page size select option dropdown
	 */
	const onPageSizeChange = ({
		currentTarget,
	}: ChangeEvent<HTMLSelectElement>) => {
		const newValue = Number(currentTarget.value);
		const currentValue = selectedPageSize;
		if (!Number.isNaN(newValue)) {
			setSelectedPageSize(newValue);
			onSizeChange(currentValue as PageSize, newValue as PageSize);
		}
	};

	/**
	 * Callback handler for when the user changes the number in the input
	 */
	const onPageNumberChange = ({
		currentTarget,
	}: ChangeEvent<HTMLInputElement>) => {
		const numValue = Number(currentTarget.value);
		if (!Number.isNaN(numValue)) {
			setSelectedPagNumber(numValue);
			onPage(pageNumber!, numValue);
		}
	};

	/**
	 * Callback handler for when users are navigating forwards and backwards in their pages
	 */
	const onPaginateClick = (newValue: number) => {
		if (newValue === 0) {
			return; // nothing to do
		}
		const currentPageNumber = selectedPageNumber;
		setSelectedPagNumber(newValue);
		onPage(currentPageNumber, newValue);
	};

	return (
		<div>
			<header>
				<hgroup>
					<h2>{title}</h2>
					<hr />
				</hgroup>
			</header>
			{children}
			<footer>
				<div role='navigation'>
					<div role='group'></div>
					<div role='group'>
						<button
							onClick={() =>
								onPaginateClick(selectedPageNumber - 1)
							}
						>
							Previous
						</button>
						<label
							hidden
							aria-hidden={false}
							aria-description='current page number'
						>
							Page
						</label>
						<input
							min='0'
							type='number'
							value={selectedPageNumber}
							onChange={onPageNumberChange}
						/>
						<button
							onClick={() =>
								onPaginateClick(selectedPageNumber + 1)
							}
						>
							Next
						</button>
					</div>
					<div role='group'>
						<select
							value={selectedPageSize}
							onChange={onPageSizeChange}
						>
							<option value='25'>25</option>
							<option value='50'>50</option>
							<option value='100'>100</option>
						</select>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Paginatable;
