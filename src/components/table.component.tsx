import React, { ReactNode } from "react";

export interface TableHeader {
	/**
	 * Property accessor for data
	 */
	fieldKey: string;
	/**
	 * translated text to display to the user
	 */
	text: string;
	/**
	 * Flag indicating if the column in the table can be re-ordered
	 */
	orderable?: boolean;
	/**
	 * Flag for indicating that the column is sortable in the table
	 */
	sortable?: boolean;
}
export type GetDisplayCellFunc = (key: string, rowNum: number) => ReactNode;
export type TableDataCellType =
	| string
	| number
	| null
	| undefined
	| GetDisplayCellFunc;
export interface TableDataRow {
	[key: string]: TableDataCellType;
}
export interface TableComponentProps {
	/**
	 * Headers that will displayed and used in order to display data
	 */
	headers: TableHeader[];

	data: TableDataRow[];
	/**
	 * Callback for when sort has been clicked on a column header
	 */
	onSort: (fielKey: string) => void;
}

const IsFunction = (value: any): value is GetDisplayCellFunc =>
	typeof value === "function";

const TableComponent = ({ headers, data, onSort }: TableComponentProps) => {
	return (
		<table>
			<thead>
				<tr>
					{headers.map(({ fieldKey, sortable, text }) => (
						<th
							key={fieldKey}
							onClick={
								sortable ? () => onSort(fieldKey) : undefined
							}
						>
							{text}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, ix) => (
					<tr key={ix}>
						{headers.map(({ fieldKey }) => {
							const value = row[fieldKey];
							return (
								<td key={`${fieldKey}-${ix}`}>
									{IsFunction(value)
										? value(fieldKey, ix)
										: value}
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
};
export default TableComponent;
