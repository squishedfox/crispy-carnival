import { ChangeEvent, PropsWithChildren, useEffect, useState } from "react";

const DEFAULT_PAGE_SIZE = 25;
const DEFAULT_PAGE_NUMBER = 1;

export interface PaginatableTable extends PropsWithChildren<{}> {
	/**
	 * Title of the table to give user additional information
	 */
	title: string;
	/**
	 * Pass in to override the page number that might be default selected.
	 * Default page number starts at 1
	 */
	pageNumber?: number;
	/**
	 * Pass in to override the page size that might be default selected
	 */
	pageSize?: number;
	/**
	 * Total number of pages that the user can migrate between
	 */
	totalPages?: number;
	/**
	 * Callback for when the next or previous buttons are clicked
	 */
	onPage: (prevPage: number, newPage: number) => void;
}
const Paginatable = ({
	title,
	pageNumber = DEFAULT_PAGE_NUMBER,
	pageSize = DEFAULT_PAGE_SIZE,
	onPage,
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
		const numValue = Number(currentTarget.value);
		if (!Number.isNaN(numValue)) {
			setSelectedPagNumber(numValue);
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
			onPage(pageNumber, numValue);
		}
	};

	/**
	 * Callback handler for when users are navigating forwards and backwards in their pages
	 */
	const onPaginateClick = (newValue: number) => {
		if (newValue === 1) {
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
				<div>
					<select
						defaultValue='25'
						value={selectedPageSize}
						onChange={onPageSizeChange}
					>
						<option selected={selectedPageSize === 25} value='25'>
							25
						</option>
						<option selected={selectedPageSize === 50} value='50'>
							50
						</option>
						<option selected={selectedPageSize === 100} value='100'>
							100
						</option>
					</select>
				</div>
				<div role='navigation'>
					<div role='group'>
						<label aria-description='current page number'>
							Page
						</label>
						<input
							min='0'
							type='number'
							value={selectedPageNumber}
							onChange={onPageNumberChange}
						/>
					</div>
					<div role='group'>
						<button
							onClick={() =>
								onPaginateClick(selectedPageNumber - 1)
							}
						>
							Previous
						</button>
						<button
							onClick={() =>
								onPaginateClick(selectedPageNumber + 1)
							}
						>
							Next
						</button>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Paginatable;
